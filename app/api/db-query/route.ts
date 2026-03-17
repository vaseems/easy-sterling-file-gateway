import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface DBConfig {
  driver: string;
  host: string;
  port: string;
  name: string;
  schema: string;
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  let body: { config: DBConfig; query: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { config, query } = body;

  if (!config || !query) {
    return NextResponse.json(
      { error: "Request body must include 'config' and 'query'" },
      { status: 400 },
    );
  }

  // Safety: allow only read queries
  const upperQ = query.trim().replace(/\s+/g, " ").toUpperCase();
  if (
    !upperQ.startsWith("SELECT") &&
    !upperQ.startsWith("WITH") &&
    !upperQ.startsWith("VALUES")
  ) {
    return NextResponse.json(
      { error: "Only SELECT / WITH / VALUES queries are allowed." },
      { status: 400 },
    );
  }

  try {
    switch (config.driver) {
      case "postgresql":
        return await runPostgres(config, query);
      case "mysql":
        return await runMysql(config, query);
      case "mssql":
        return await runMssql(config, query);
      case "db2":
        return await runDb2(config, query);
      case "oracle":
        return await runOracle(config, query);
      default:
        return NextResponse.json(
          { error: `Unsupported driver: ${config.driver}` },
          { status: 400 },
        );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ─── PostgreSQL ───────────────────────────────────────────────────────────────
async function runPostgres(
  cfg: DBConfig,
  query: string,
): Promise<NextResponse> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let pgModule: {
    Client: new (opts: object) => {
      connect(): Promise<void>;
      query(
        q: string,
      ): Promise<{
        rows: Record<string, unknown>[];
        fields?: { name: string }[];
        rowCount: number;
      }>;
      end(): Promise<void>;
    };
  };
  try {
    pgModule = require("pg");
  } catch {
    throw new Error("PostgreSQL driver not installed. Run: npm install pg");
  }

  const client = new pgModule.Client({
    host: cfg.host,
    port: Number(cfg.port) || 5432,
    database: cfg.name,
    user: cfg.username,
    password: cfg.password,
    connectionTimeoutMillis: 10_000,
    ssl: false,
  });

  await client.connect();
  try {
    const result = await client.query(query);
    const columns = result.fields?.map((f) => f.name) ?? [];
    return NextResponse.json({
      rows: result.rows,
      columns,
      rowCount: result.rowCount,
    });
  } finally {
    await client.end();
  }
}

// ─── MySQL / MariaDB ──────────────────────────────────────────────────────────
async function runMysql(cfg: DBConfig, query: string): Promise<NextResponse> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let mysql2: {
    createConnection(opts: object): Promise<{
      execute(
        q: string,
      ): Promise<[Record<string, unknown>[], { name: string }[]]>;
      end(): Promise<void>;
    }>;
  };
  try {
    mysql2 = require("mysql2/promise");
  } catch {
    throw new Error("MySQL driver not installed. Run: npm install mysql2");
  }

  const conn = await mysql2.createConnection({
    host: cfg.host,
    port: Number(cfg.port) || 3306,
    database: cfg.name,
    user: cfg.username,
    password: cfg.password,
    connectTimeout: 10_000,
  });

  try {
    const [rows, fields] = await conn.execute(query);
    const columns = (fields as { name: string }[])?.map((f) => f.name) ?? [];
    return NextResponse.json({
      rows,
      columns,
      rowCount: (rows as unknown[]).length,
    });
  } finally {
    await conn.end();
  }
}

// ─── Microsoft SQL Server ─────────────────────────────────────────────────────
async function runMssql(cfg: DBConfig, query: string): Promise<NextResponse> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let mssql: {
    connect(
      cfg: object,
    ): Promise<{
      request(): {
        query(q: string): Promise<{ recordset: Record<string, unknown>[] }>;
      };
      close(): Promise<void>;
    }>;
  };
  try {
    mssql = require("mssql");
  } catch {
    throw new Error("MSSQL driver not installed. Run: npm install mssql");
  }

  const pool = await mssql.connect({
    server: cfg.host,
    port: Number(cfg.port) || 1433,
    database: cfg.name,
    user: cfg.username,
    password: cfg.password,
    options: { encrypt: true, trustServerCertificate: true },
    connectionTimeout: 10_000,
  });

  try {
    const result = await pool.request().query(query);
    const rows = result.recordset ?? [];
    const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
    return NextResponse.json({ rows, columns, rowCount: rows.length });
  } finally {
    await pool.close();
  }
}

// ─── IBM DB2 ──────────────────────────────────────────────────────────────────
async function runDb2(cfg: DBConfig, query: string): Promise<NextResponse> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let ibmDb: {
    open(
      connStr: string,
      cb: (
        err: Error | null,
        conn: {
          query(
            q: string,
            cb: (err: Error | null, rows: Record<string, unknown>[]) => void,
          ): void;
          close(cb: () => void): void;
        },
      ) => void,
    ): void;
  };
  try {
    ibmDb = require("ibm_db");
  } catch {
    throw new Error(
      "IBM DB2 driver not installed. Run: npm install ibm_db  " +
        "(also requires IBM Data Server Client installation).",
    );
  }

  const connStr =
    `DATABASE=${cfg.name};HOSTNAME=${cfg.host};PORT=${cfg.port || 50000};` +
    `PROTOCOL=TCPIP;UID=${cfg.username};PWD=${cfg.password};`;

  return new Promise<NextResponse>((resolve, reject) => {
    ibmDb.open(connStr, (err, conn) => {
      if (err) {
        reject(err);
        return;
      }
      conn.query(query, (err2, rows) => {
        conn.close(() => {});
        if (err2) {
          reject(err2);
          return;
        }
        const columns = rows?.length > 0 ? Object.keys(rows[0]) : [];
        resolve(
          NextResponse.json({
            rows: rows ?? [],
            columns,
            rowCount: rows?.length ?? 0,
          }),
        );
      });
    });
  });
}

// ─── Oracle ───────────────────────────────────────────────────────────────────
async function runOracle(cfg: DBConfig, query: string): Promise<NextResponse> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let oracledb: {
    OUT_FORMAT_OBJECT: number;
    outFormat: number;
    getConnection(opts: object): Promise<{
      execute(q: string): Promise<{
        rows: Record<string, unknown>[];
        metaData?: { name: string }[];
      }>;
      close(): Promise<void>;
    }>;
  };
  try {
    oracledb = require("oracledb");
  } catch {
    throw new Error(
      "Oracle driver not installed. Run: npm install oracledb  " +
        "(also requires Oracle Instant Client).",
    );
  }

  oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

  const conn = await oracledb.getConnection({
    user: cfg.username,
    password: cfg.password,
    connectString: `${cfg.host}:${cfg.port || 1521}/${cfg.name}`,
  });

  try {
    const result = await conn.execute(query);
    const rows = result.rows ?? [];
    const columns = result.metaData?.map((m) => m.name) ?? [];
    return NextResponse.json({ rows, columns, rowCount: rows.length });
  } finally {
    await conn.close();
  }
}
