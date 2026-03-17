/**
 * generate-schema-map.js
 * Reads swagger.json and outputs lib/schema-map.ts with all create/update
 * request body schemas pre-extracted, keyed by basePath.
 * Run: node generate-schema-map.js
 */
const fs = require('fs');
const path = require('path');

const swagger = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf-8'));

function toLabel(camelCase) {
  return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
}

function extractFromDef(defName) {
  const def = swagger.definitions && swagger.definitions[defName];
  if (!def || !def.properties) return [];

  const required = def.required || [];
  return Object.entries(def.properties).map(([name, prop]) => {
    const constrained = prop['x-constrained-codes'];
    let type = 'text';
    if (constrained) {
      type = 'enum';
    } else if (prop.type === 'boolean') {
      type = 'boolean';
    } else if (prop.type === 'integer' || prop.type === 'number') {
      type = 'number';
    } else if (prop.type === 'array') {
      type = 'array';
    }
    return {
      name,
      label: toLabel(name),
      description: (prop.description || '').replace(/\s+/g, ' ').trim().slice(0, 150),
      type,
      required: required.includes(name),
      options: constrained || undefined,
      format: prop.format || undefined,
    };
  });
}

function getFieldsForPath(pathKey, method) {
  const pathDef = swagger.paths && swagger.paths[pathKey];
  if (!pathDef) return null;
  const opDef = pathDef[method];
  if (!opDef) return null;
  const bodyParam = (opDef.parameters || []).find(p => p.in === 'body');
  if (!bodyParam || !bodyParam.schema || !bodyParam.schema['$ref']) return null;
  const defName = bodyParam.schema['$ref'].replace('#/definitions/', '');
  const fields = extractFromDef(defName);
  return fields.length > 0 ? fields : null;
}

// Collect all base paths from swagger
const allPaths = Object.keys(swagger.paths || {});

// Build a map: basePath -> { create?: fields, update?: fields }
const schemaMap = {};

for (const swaggerPath of allPaths) {
  // Determine operation type from path
  const isCollection = !swaggerPath.includes('{id}') && !swaggerPath.includes('/actions/');
  const isItem = swaggerPath.includes('{id}');

  if (isCollection) {
    const fields = getFieldsForPath(swaggerPath, 'post');
    if (fields) {
      // Normalize basePath: remove trailing slash, it becomes the key
      const basePath = swaggerPath.replace(/\/$/, '');
      if (!schemaMap[basePath]) schemaMap[basePath] = {};
      schemaMap[basePath].create = fields;
    }
  }

  if (isItem && !swaggerPath.includes('/actions/')) {
    const fields = getFieldsForPath(swaggerPath, 'put');
    if (fields) {
      const basePath = swaggerPath.replace(/\/\{id\}$/, '');
      if (!schemaMap[basePath]) schemaMap[basePath] = {};
      schemaMap[basePath].update = fields;
    }
  }
}

// Generate TypeScript file
const fieldTypeStr = `export type FieldType = "text" | "number" | "boolean" | "enum" | "array";

export interface SchemaField {
  name: string;
  label: string;
  description: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  format?: string;
}

export interface ResourceSchema {
  create?: SchemaField[];
  update?: SchemaField[];
}

export const SCHEMA_MAP: Record<string, ResourceSchema> = `;

const mapJson = JSON.stringify(schemaMap, null, 2);

const output = `/* eslint-disable */
// AUTO-GENERATED — do not edit manually.
// Run: node generate-schema-map.js to regenerate.

${fieldTypeStr}${mapJson};

/**
 * Get form fields for a resource operation from the pre-extracted swagger schema.
 */
export function getSchemaFields(
  basePath: string,
  operation: "create" | "update"
): SchemaField[] {
  const normalized = basePath.startsWith("/") ? basePath : "/" + basePath;
  const entry = SCHEMA_MAP[normalized];
  if (!entry) return [];
  return entry[operation] ?? [];
}

/**
 * Coerce a string field value to the proper JSON type.
 */
export function coerceFieldValue(value: string, field: SchemaField): unknown {
  if (value === "" || value === undefined || value === null) return undefined;
  switch (field.type) {
    case "number":
      return isNaN(Number(value)) ? value : Number(value);
    case "boolean":
      return value === "true" || value === "1" || value === "yes";
    case "array":
      try {
        return JSON.parse(value);
      } catch {
        return value.split(",").map((v) => v.trim()).filter(Boolean);
      }
    default:
      return value;
  }
}
`;

fs.writeFileSync(path.join(__dirname, 'lib', 'schema-map.ts'), output, 'utf-8');
console.log(`Done! Wrote ${Object.keys(schemaMap).length} resource schemas to lib/schema-map.ts`);
