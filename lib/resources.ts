import {
  Radio,
  KeyRound,
  ShieldCheck,
  Handshake,
  Inbox,
  ClipboardList,
  GitBranch,
  Users,
  Cable,
  Settings2,
  SlidersHorizontal,
  BarChart3,
  Route,
  Paintbrush,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Resource definitions from Sterling B2B Integrator Swagger API
export interface ResourceConfig {
  tag: string;
  basePath: string;
  label: string;
  category: string;
  color: string;
  operations: ("read" | "create" | "update" | "delete")[];
  searchParam?: string;
  extraActions?: {
    label: string;
    operationId: string;
    method: string;
    path: string;
  }[];
  readParams?: {
    name: string;
    label: string;
    type: "string" | "number" | "select";
    options?: string[];
  }[];
}

export const RESOURCE_CATEGORIES: Record<
  string,
  { label: string; color: string; icon: LucideIcon }
> = {
  as2: { label: "AS2 Protocol", color: "#667eea", icon: Radio },
  ssh: { label: "SSH Keys", color: "#06b6d4", icon: KeyRound },
  certificates: { label: "Certificates", color: "#f59e0b", icon: ShieldCheck },
  trading: { label: "Trading Partners", color: "#10b981", icon: Handshake },
  mailbox: { label: "Mailbox", color: "#8b5cf6", icon: Inbox },
  codelists: { label: "Code Lists", color: "#ec4899", icon: ClipboardList },
  workflows: { label: "Workflows", color: "#f97316", icon: GitBranch },
  users: { label: "Users & Groups", color: "#14b8a6", icon: Users },
  sterling_cd: { label: "Sterling C:D", color: "#6366f1", icon: Cable },
  services: { label: "Services", color: "#a855f7", icon: Settings2 },
  properties: {
    label: "Properties",
    color: "#84cc16",
    icon: SlidersHorizontal,
  },
  monitoring: { label: "Monitoring", color: "#ef4444", icon: BarChart3 },
  routing: { label: "Routing", color: "#0ea5e9", icon: Route },
  branding: { label: "UI & Branding", color: "#fb923c", icon: Paintbrush },
};

export const RESOURCES: ResourceConfig[] = [
  // AS2
  {
    tag: "AS2Organization",
    basePath: "/as2organizations",
    label: "AS2 Organizations",
    category: "as2",
    color: "#667eea",
    operations: ["read", "create", "update", "delete"],
    readParams: [
      { name: "identityName", label: "Identity Name", type: "string" },
      { name: "profileName", label: "Profile Name", type: "string" },
      { name: "AS2Identifier", label: "AS2 Identifier", type: "string" },
    ],
  },
  {
    tag: "AS2TradingPartner",
    basePath: "/as2tradingpartners",
    label: "AS2 Trading Partners",
    category: "as2",
    color: "#764ba2",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "AS2TradingRelationship",
    basePath: "/as2tradingrelationships",
    label: "AS2 Trading Relationships",
    category: "as2",
    color: "#a78bfa",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  // SSH
  {
    tag: "SSHAuthorizedUserKey",
    basePath: "/sshauthorizeduserkeys",
    label: "SSH Authorized User Keys",
    category: "ssh",
    color: "#06b6d4",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "SSHKnownHostKey",
    basePath: "/sshknownhostkeys",
    label: "SSH Known Host Keys",
    category: "ssh",
    color: "#0284c7",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "SSHRemoteProfile",
    basePath: "/sshremoteprofiles",
    label: "SSH Remote Profiles",
    category: "ssh",
    color: "#0369a1",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "SSHUserIdentityKey",
    basePath: "/sshuseridentitykeys",
    label: "SSH User Identity Keys",
    category: "ssh",
    color: "#0891b2",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "SSHDuplicateCheck",
    basePath: "/sshduplicatechecks",
    label: "SSH Duplicate Checks",
    category: "ssh",
    color: "#22d3ee",
    operations: ["read"],
    readParams: [
      {
        name: "type",
        label: "Type",
        type: "select",
        options: ["KHK", "AUK", "UIK", "RP"],
      },
      { name: "name", label: "Name", type: "string" },
    ],
  },
  {
    tag: "SshHostIdentityKeyGrabber",
    basePath: "/sshhostidentitykeygrabbers",
    label: "SSH Host Key Grabber",
    category: "ssh",
    color: "#67e8f9",
    operations: ["read"],
    readParams: [
      { name: "hostName", label: "Host Name", type: "string" },
      { name: "port", label: "Port", type: "number" },
    ],
  },
  // Certificates
  {
    tag: "CADigitalCertificate",
    basePath: "/cadigitalcertificates",
    label: "CA Digital Certificates",
    category: "certificates",
    color: "#f59e0b",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "SystemDigitalCertificate",
    basePath: "/systemdigitalcertificates",
    label: "System Digital Certificates",
    category: "certificates",
    color: "#d97706",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "TrustedDigitalCertificate",
    basePath: "/trusteddigitalcertificates",
    label: "Trusted Digital Certificates",
    category: "certificates",
    color: "#b45309",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "DigitalCertificateDuplicateCheck",
    basePath: "/digitalcertificateduplicatechecks",
    label: "Certificate Duplicate Checks",
    category: "certificates",
    color: "#fbbf24",
    operations: ["read"],
    searchParam: "searchFor",
  },
  {
    tag: "PGPKey",
    basePath: "/pgpkeys",
    label: "PGP Keys",
    category: "certificates",
    color: "#f59e0b",
    operations: ["read", "create", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "PgpServerProfile",
    basePath: "/pgpserverprofiles",
    label: "PGP Server Profiles",
    category: "certificates",
    color: "#ea580c",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  // Trading
  {
    tag: "TradingPartner",
    basePath: "/tradingpartners",
    label: "Trading Partners",
    category: "trading",
    color: "#10b981",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "Community",
    basePath: "/communities",
    label: "Communities",
    category: "trading",
    color: "#059669",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "PartnerGroup",
    basePath: "/partnergroups",
    label: "Partner Groups",
    category: "trading",
    color: "#047857",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "ExternalUser",
    basePath: "/externalusers",
    label: "External Users",
    category: "trading",
    color: "#34d399",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  // Mailbox
  {
    tag: "Mailbox",
    basePath: "/mailboxes",
    label: "Mailboxes",
    category: "mailbox",
    color: "#8b5cf6",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "MailboxContent",
    basePath: "/mailboxcontents",
    label: "Mailbox Contents",
    category: "mailbox",
    color: "#7c3aed",
    operations: ["read"],
    readParams: [
      { name: "mailboxPath", label: "Mailbox Path", type: "string" },
    ],
  },
  {
    tag: "MailboxMessage",
    basePath: "/mailboxmessages",
    label: "Mailbox Messages",
    category: "mailbox",
    color: "#6d28d9",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
    extraActions: [
      {
        label: "Extract",
        operationId: "ExtractMailboxMessage",
        method: "POST",
        path: "/{id}/actions/extract",
      },
      {
        label: "Move",
        operationId: "MoveMailboxMessage",
        method: "POST",
        path: "/{id}/actions/move",
      },
    ],
  },
  {
    tag: "Document",
    basePath: "/documents",
    label: "Documents",
    category: "mailbox",
    color: "#a78bfa",
    operations: ["read", "create", "delete"],
    searchParam: "searchFor",
  },
  // Code Lists
  {
    tag: "CodeList",
    basePath: "/codelists",
    label: "Code Lists",
    category: "codelists",
    color: "#ec4899",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "CodeListCode",
    basePath: "/codelistcodes",
    label: "Code List Codes",
    category: "codelists",
    color: "#db2777",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  // Workflows
  {
    tag: "Workflow",
    basePath: "/workflows",
    label: "Workflows",
    category: "workflows",
    color: "#f97316",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
    readParams: [
      {
        name: "fieldList",
        label: "Field List",
        type: "select",
        options: ["brief", "full", "names"],
      },
      { name: "searchFor", label: "Search", type: "string" },
    ],
    extraActions: [
      {
        label: "Toggle Enabled",
        operationId: "toggleEnabledWorkflow",
        method: "POST",
        path: "/{id}/actions/toggleenabledworkflow",
      },
      {
        label: "Change Version",
        operationId: "changeDefaultVersion",
        method: "POST",
        path: "/{id}/actions/changedefaultversion",
      },
    ],
  },
  {
    tag: "WorkFlowMonitor",
    basePath: "/workflowmonitors",
    label: "Workflow Monitor",
    category: "workflows",
    color: "#ea580c",
    operations: ["read"],
    readParams: [
      { name: "workFlowId", label: "Workflow ID", type: "number" },
      {
        name: "fieldList",
        label: "Field List",
        type: "select",
        options: ["Brief", "Full"],
      },
    ],
  },
  {
    tag: "Schedule",
    basePath: "/schedules",
    label: "Schedules",
    category: "workflows",
    color: "#fb923c",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  // Users
  {
    tag: "UserAccount",
    basePath: "/useraccounts",
    label: "User Accounts",
    category: "users",
    color: "#14b8a6",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "UserGroup",
    basePath: "/usergroups",
    label: "User Groups",
    category: "users",
    color: "#0d9488",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "Permission",
    basePath: "/permissions",
    label: "Permissions",
    category: "users",
    color: "#0f766e",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "UserExit",
    basePath: "/userexits",
    label: "User Exits",
    category: "users",
    color: "#2dd4bf",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "UserVirtualRoot",
    basePath: "/uservirtualroots",
    label: "User Virtual Roots",
    category: "users",
    color: "#5eead4",
    operations: ["read", "create", "update", "delete"],
    readParams: [{ name: "userName", label: "User Name", type: "string" }],
  },
  // Sterling C:D
  {
    tag: "SterlingConnectDirectNetmap",
    basePath: "/sterlingconnectdirectnetmaps",
    label: "C:D Netmaps",
    category: "sterling_cd",
    color: "#6366f1",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "SterlingConnectDirectNetmapXref",
    basePath: "/sterlingconnectdirectnetmapxrefs",
    label: "C:D Netmap Xrefs",
    category: "sterling_cd",
    color: "#4f46e5",
    operations: ["read", "create", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "SterlingConnectDirectNode",
    basePath: "/sterlingconnectdirectnodes",
    label: "C:D Nodes",
    category: "sterling_cd",
    color: "#4338ca",
    operations: ["read", "create", "update", "delete"],
    readParams: [
      { name: "searchByNodeName", label: "Node Name", type: "string" },
      { name: "searchByNetMap", label: "Net Map", type: "string" },
    ],
  },
  {
    tag: "SterlingConnectDirectNodeDuplicateCheck",
    basePath: "/sterlingconnectdirectnodeduplicatechecks",
    label: "C:D Node Duplicate Check",
    category: "sterling_cd",
    color: "#818cf8",
    operations: ["read"],
    readParams: [{ name: "nodeName", label: "Node Name", type: "string" }],
  },
  {
    tag: "SterlingConnectDirectXREFDuplicateCheck",
    basePath: "/sterlingconnectdirectxrefduplicatechecks",
    label: "C:D XREF Duplicate Check",
    category: "sterling_cd",
    color: "#a5b4fc",
    operations: ["read"],
    readParams: [
      { name: "netmapName", label: "Netmap Name", type: "string" },
      { name: "nodeName", label: "Node Name", type: "string" },
    ],
  },
  // Services
  {
    tag: "ServiceDefinition",
    basePath: "/servicedefinitions",
    label: "Service Definitions",
    category: "services",
    color: "#a855f7",
    operations: ["read"],
    searchParam: "searchFor",
  },
  {
    tag: "ServiceInstance",
    basePath: "/serviceinstances",
    label: "Service Instances",
    category: "services",
    color: "#9333ea",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "CustomService",
    basePath: "/customservices",
    label: "Custom Services",
    category: "services",
    color: "#7c3aed",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "CustomSFGExtensions",
    basePath: "/customsfgextensions",
    label: "Custom SFG Extensions",
    category: "services",
    color: "#c084fc",
    operations: ["read", "update"],
    searchParam: "searchFor",
  },
  {
    tag: "CustomProtocol",
    basePath: "/customprotocols",
    label: "Custom Protocols",
    category: "services",
    color: "#d946ef",
    operations: ["read"],
    searchParam: "searchFor",
  },
  {
    tag: "CustomJar",
    basePath: "/customjars",
    label: "Custom JARs",
    category: "services",
    color: "#e879f9",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  // Properties
  {
    tag: "Property",
    basePath: "/properties",
    label: "Properties",
    category: "properties",
    color: "#84cc16",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "PropertyFile",
    basePath: "/propertyfiles",
    label: "Property Files",
    category: "properties",
    color: "#65a30d",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "PropertyNodeValue",
    basePath: "/propertynodevalues",
    label: "Property Node Values",
    category: "properties",
    color: "#4d7c0f",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
  },
  // Monitoring
  {
    tag: "FgArrivedFile",
    basePath: "/fgarrivedfiles",
    label: "FG Arrived Files",
    category: "monitoring",
    color: "#ef4444",
    operations: ["read", "update"],
    readParams: [
      { name: "producerName", label: "Producer Name", type: "string" },
      { name: "fileName", label: "File Name", type: "string" },
    ],
    extraActions: [
      {
        label: "Redeliver",
        operationId: "RedeliverFGArrivedFile",
        method: "POST",
        path: "/{id}/actions/redeliver",
      },
      {
        label: "Replay",
        operationId: "ReplayFGArrivedFile",
        method: "POST",
        path: "/{id}/actions/replay",
      },
    ],
  },
  {
    tag: "FgDelivery",
    basePath: "/fgdeliveries",
    label: "FG Deliveries",
    category: "monitoring",
    color: "#dc2626",
    operations: ["read"],
    searchParam: "searchFor",
  },
  {
    tag: "FgRoute",
    basePath: "/fgroutes",
    label: "FG Routes",
    category: "monitoring",
    color: "#b91c1c",
    operations: ["read"],
    searchParam: "searchFor",
  },
  {
    tag: "JDBCServiceTracking",
    basePath: "/jdbcservicetrackings",
    label: "JDBC Service Tracking",
    category: "monitoring",
    color: "#f87171",
    operations: ["read", "update"],
    searchParam: "searchFor",
  },
  {
    tag: "MessageBatch",
    basePath: "/messagebatches",
    label: "Message Batches",
    category: "monitoring",
    color: "#fca5a5",
    operations: ["read", "create"],
    searchParam: "searchFor",
  },
  {
    tag: "TestSFGDeliveryStatus",
    basePath: "/testsfgdeliverystatus",
    label: "Test SFG Delivery Status",
    category: "monitoring",
    color: "#fee2e2",
    operations: ["read"],
    readParams: [
      { name: "fileName", label: "File Name", type: "string" },
      { name: "mailboxPath", label: "Mailbox Path", type: "string" },
      { name: "producerName", label: "Producer Name", type: "string" },
      { name: "defaultTimeout", label: "Default Timeout", type: "number" },
    ],
  },
  {
    tag: "TestTradingPartner",
    basePath: "/testtradingpartners",
    label: "Test Trading Partners",
    category: "monitoring",
    color: "#fecaca",
    operations: ["read"],
    readParams: [
      {
        name: "tradingPartnerName",
        label: "Trading Partner Name",
        type: "string",
      },
      {
        name: "connection",
        label: "Connection",
        type: "select",
        options: ["Consumer", "Producer"],
      },
    ],
  },
  // Routing
  {
    tag: "RoutingChannel",
    basePath: "/routingchannels",
    label: "Routing Channels",
    category: "routing",
    color: "#0ea5e9",
    operations: ["read", "create", "delete"],
    searchParam: "searchFor",
  },
  {
    tag: "RoutingChannelDuplicateCheck",
    basePath: "/routingchannelduplicatechecks",
    label: "Routing Channel Dup. Check",
    category: "routing",
    color: "#0284c7",
    operations: ["read"],
    searchParam: "searchFor",
  },
  {
    tag: "RoutingRule",
    basePath: "/routingrules",
    label: "Routing Rules",
    category: "routing",
    color: "#0369a1",
    operations: ["read", "create", "update", "delete"],
    searchParam: "searchFor",
    extraActions: [
      {
        label: "Evaluate Rule",
        operationId: "EvaluateRule",
        method: "POST",
        path: "/{id}/actions/evaluate",
      },
    ],
  },
  // Identity
  {
    tag: "Identity",
    basePath: "/identities",
    label: "Identities",
    category: "users",
    color: "#a3e635",
    operations: ["read"],
    searchParam: "searchFor",
  },
  {
    tag: "GeneratedPassword",
    basePath: "/generatedpasswords",
    label: "Generated Passwords",
    category: "users",
    color: "#bef264",
    operations: ["read"],
    searchParam: "searchFor",
  },
  {
    tag: "HttpClientAdapter",
    basePath: "/httpclientadapters",
    label: "HTTP Client Adapters",
    category: "services",
    color: "#f0abfc",
    operations: ["read"],
    searchParam: "searchFor",
  },
  // Branding
  {
    tag: "UIBranding",
    basePath: "/uibrandings",
    label: "UI Branding",
    category: "branding",
    color: "#fb923c",
    operations: ["read", "update"],
    readParams: [
      { name: "name", label: "Name", type: "string" },
      {
        name: "type",
        label: "Type",
        type: "select",
        options: ["IMAGE", "PROPERTY", "ZIP"],
      },
    ],
  },
];

export const RESOURCES_BY_TAG = Object.fromEntries(
  RESOURCES.map((r) => [r.tag, r]),
);

export function getResourcesByCategory(): Record<string, ResourceConfig[]> {
  const result: Record<string, ResourceConfig[]> = {};
  for (const resource of RESOURCES) {
    if (!result[resource.category]) result[resource.category] = [];
    result[resource.category].push(resource);
  }
  return result;
}

export const BASE_URL =
  "";
