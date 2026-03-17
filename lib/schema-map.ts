/* eslint-disable */
// AUTO-GENERATED — do not edit manually.
// Run: node generate-schema-map.js to regenerate.

export type FieldType = "text" | "number" | "boolean" | "enum" | "array";

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

export const SCHEMA_MAP: Record<string, ResourceSchema> = {
  "/as2organizations": {
    "update": [
      {
        "name": "identityName",
        "label": "Identity Name",
        "description": "Name of the identity.",
        "type": "text",
        "required": true
      },
      {
        "name": "AS2Identifier",
        "label": "A S2 Identifier",
        "description": "AS2 Identifier for the organization.",
        "type": "text",
        "required": true
      },
      {
        "name": "profileName",
        "label": "Profile Name",
        "description": "Name of the AS2 profile.",
        "type": "text",
        "required": true
      },
      {
        "name": "exchangeCertSelectionPolicy",
        "label": "Exchange Cert Selection Policy",
        "description": "Selection policy for the exchange certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "exchangeCert",
        "label": "Exchange Cert",
        "description": "",
        "type": "array",
        "required": true
      },
      {
        "name": "signingCertSelectionPolicy",
        "label": "Signing Cert Selection Policy",
        "description": "Selection Policy for Signing certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "signingCert",
        "label": "Signing Cert",
        "description": "",
        "type": "array",
        "required": true
      },
      {
        "name": "emailAddress",
        "label": "Email Address",
        "description": "Email address of the AS2 profile.",
        "type": "text",
        "required": false
      },
      {
        "name": "emailHost",
        "label": "Email Host",
        "description": "Email host of the AS2 profile.",
        "type": "text",
        "required": false
      },
      {
        "name": "emailPort",
        "label": "Email Port",
        "description": "Email Port number of the AS2 profile.",
        "type": "number",
        "required": false,
        "format": "int32"
      }
    ],
    "create": [
      {
        "name": "selectNewIdentity",
        "label": "Select New Identity",
        "description": "Option to create new identity.",
        "type": "enum",
        "required": true,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "identityName",
        "label": "Identity Name",
        "description": "Name of the identity.",
        "type": "text",
        "required": false
      },
      {
        "name": "useExistingIdentity",
        "label": "Use Existing Identity",
        "description": "Select existing identity from the list.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "AS2Identifier",
        "label": "A S2 Identifier",
        "description": "AS2 Identifier for the organization.",
        "type": "text",
        "required": false
      },
      {
        "name": "profileName",
        "label": "Profile Name",
        "description": "Name of the AS2 profile.",
        "type": "text",
        "required": true
      },
      {
        "name": "emailAddress",
        "label": "Email Address",
        "description": "Email address of the AS2 profile.",
        "type": "text",
        "required": false
      },
      {
        "name": "emailHost",
        "label": "Email Host",
        "description": "Email host of the AS2 profile.",
        "type": "text",
        "required": false
      },
      {
        "name": "emailPort",
        "label": "Email Port",
        "description": "Email Port number of the AS2 profile.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "exchangeCertSelectionPolicy",
        "label": "Exchange Cert Selection Policy",
        "description": "Selection policy for the exchange certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "exchangeCert",
        "label": "Exchange Cert",
        "description": "",
        "type": "array",
        "required": true
      },
      {
        "name": "signingCertSelectionPolicy",
        "label": "Signing Cert Selection Policy",
        "description": "Selection Policy for Signing certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "signingCert",
        "label": "Signing Cert",
        "description": "",
        "type": "array",
        "required": true
      }
    ]
  },
  "/as2tradingpartners": {
    "update": [
      {
        "name": "identityName",
        "label": "Identity Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "as2Identifier",
        "label": "As2 Identifier",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "profileName",
        "label": "Profile Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "httpClientAdapter",
        "label": "Http Client Adapter",
        "description": "",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "endPoint",
        "label": "End Point",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "userId",
        "label": "User Id",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "password",
        "label": "Password",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "responseTimeout",
        "label": "Response Timeout",
        "description": "",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "firewallProxy",
        "label": "Firewall Proxy",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "firewallConnectCount",
        "label": "Firewall Connect Count",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "socketTimeout",
        "label": "Socket Timeout",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "ssl",
        "label": "Ssl",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "SSL_MUST",
          "SSL_NONE",
          "SSL_OPTIONAL"
        ]
      },
      {
        "name": "keyCertificatePassphrase",
        "label": "Key Certificate Passphrase",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "cipherStrength",
        "label": "Cipher Strength",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "ALL",
          "STRONG",
          "WEAK"
        ]
      },
      {
        "name": "keyCertificateSelectionPolicy",
        "label": "Key Certificate Selection Policy",
        "description": "Selection policy for Key certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "keyCertificate",
        "label": "Key Certificate",
        "description": "",
        "type": "array",
        "required": false
      },
      {
        "name": "CACertSelectionPolicy",
        "label": "C A Cert Selection Policy",
        "description": "Selection Policy for CA Certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "caCertificate",
        "label": "Ca Certificate",
        "description": "",
        "type": "array",
        "required": false
      },
      {
        "name": "payloadType",
        "label": "Payload Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "3",
          "0",
          "1",
          "4"
        ]
      },
      {
        "name": "mimeType",
        "label": "Mime Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "Application",
          "Audio",
          "Image",
          "Message",
          "Text",
          "Video"
        ]
      },
      {
        "name": "mimeSubType",
        "label": "Mime Sub Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "EDI-Consent",
          "EDI-X12",
          "EDIFACT",
          "Octet-stream",
          "Plain",
          "XML"
        ]
      },
      {
        "name": "compressData",
        "label": "Compress Data",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "default",
          "high",
          "low",
          "medium",
          "none"
        ]
      },
      {
        "name": "exchangeCertSelectionPolicy",
        "label": "Exchange Cert Selection Policy",
        "description": "Selection policy for exchange certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "exchangeCertificate",
        "label": "Exchange Certificate",
        "description": "",
        "type": "array",
        "required": false
      },
      {
        "name": "signingCertSelectionPolicy",
        "label": "Signing Cert Selection Policy",
        "description": "Selection policy for Signing certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "signingCertificate",
        "label": "Signing Certificate",
        "description": "",
        "type": "array",
        "required": true
      },
      {
        "name": "encryptionAlgorithm",
        "label": "Encryption Algorithm",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "6",
          "2",
          "8",
          "4",
          "1",
          "0"
        ]
      },
      {
        "name": "signingAlgorithm",
        "label": "Signing Algorithm",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "5",
          "6",
          "7",
          "8",
          "1",
          "2",
          "3",
          "4"
        ]
      },
      {
        "name": "mdnReceipt",
        "label": "Mdn Receipt",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "receiptSignatureType",
        "label": "Receipt Signature Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "1",
          "0",
          "6",
          "7",
          "8",
          "9",
          "2",
          "3",
          "4",
          "5"
        ]
      },
      {
        "name": "receiptTimeout",
        "label": "Receipt Timeout",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "deliveryMode",
        "label": "Delivery Mode",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "1",
          "3",
          "2",
          "0"
        ]
      },
      {
        "name": "receiptToAddress",
        "label": "Receipt To Address",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "setUpAdditionalServerCommunication",
        "label": "Set Up Additional Server Communication",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "additionalHttpCommunication",
        "label": "Additional Http Communication",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      }
    ],
    "create": [
      {
        "name": "useExistingIdentity",
        "label": "Use Existing Identity",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "selectNewIdentity",
        "label": "Select New Identity",
        "description": "",
        "type": "enum",
        "required": true,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "identityName",
        "label": "Identity Name",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "as2Identifier",
        "label": "As2 Identifier",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "profileName",
        "label": "Profile Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "httpClientAdapter",
        "label": "Http Client Adapter",
        "description": "",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "endPoint",
        "label": "End Point",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "userId",
        "label": "User Id",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "password",
        "label": "Password",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "responseTimeout",
        "label": "Response Timeout",
        "description": "",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "firewallProxy",
        "label": "Firewall Proxy",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "firewallConnectCount",
        "label": "Firewall Connect Count",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "socketTimeout",
        "label": "Socket Timeout",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "ssl",
        "label": "Ssl",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "SSL_MUST",
          "SSL_NONE",
          "SSL_OPTIONAL"
        ]
      },
      {
        "name": "keyCertificatePassphrase",
        "label": "Key Certificate Passphrase",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "cipherStrength",
        "label": "Cipher Strength",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "ALL",
          "STRONG",
          "WEAK"
        ]
      },
      {
        "name": "CACertSelectionPolicy",
        "label": "C A Cert Selection Policy",
        "description": "Selection Policy for CA Certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "caCertificate",
        "label": "Ca Certificate",
        "description": "",
        "type": "array",
        "required": false
      },
      {
        "name": "keyCertificateSelectionPolicy",
        "label": "Key Certificate Selection Policy",
        "description": "Selection policy for Key certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "keyCertificate",
        "label": "Key Certificate",
        "description": "",
        "type": "array",
        "required": false
      },
      {
        "name": "payloadType",
        "label": "Payload Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "3",
          "0",
          "1",
          "4"
        ]
      },
      {
        "name": "mimeType",
        "label": "Mime Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "Application",
          "Audio",
          "Image",
          "Message",
          "Text",
          "Video"
        ]
      },
      {
        "name": "mimeSubType",
        "label": "Mime Sub Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "EDI-Consent",
          "EDI-X12",
          "EDIFACT",
          "Octet-stream",
          "Plain",
          "XML"
        ]
      },
      {
        "name": "compressData",
        "label": "Compress Data",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "default",
          "high",
          "low",
          "medium",
          "none"
        ]
      },
      {
        "name": "exchangeCertSelectionPolicy",
        "label": "Exchange Cert Selection Policy",
        "description": "Selection policy for exchange certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "exchangeCertificate",
        "label": "Exchange Certificate",
        "description": "",
        "type": "array",
        "required": false
      },
      {
        "name": "signingCertSelectionPolicy",
        "label": "Signing Cert Selection Policy",
        "description": "Selection policy for Signing certificate.",
        "type": "enum",
        "required": false,
        "options": [
          "1"
        ]
      },
      {
        "name": "signingCertificate",
        "label": "Signing Certificate",
        "description": "",
        "type": "array",
        "required": true
      },
      {
        "name": "encryptionAlgorithm",
        "label": "Encryption Algorithm",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "6",
          "2",
          "8",
          "4",
          "1",
          "0"
        ]
      },
      {
        "name": "signingAlgorithm",
        "label": "Signing Algorithm",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "5",
          "6",
          "7",
          "8",
          "1",
          "2",
          "3",
          "4"
        ]
      },
      {
        "name": "mdnReceipt",
        "label": "Mdn Receipt",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "receiptSignatureType",
        "label": "Receipt Signature Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "1",
          "0",
          "6",
          "7",
          "8",
          "9",
          "2",
          "3",
          "4",
          "5"
        ]
      },
      {
        "name": "receiptTimeout",
        "label": "Receipt Timeout",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "deliveryMode",
        "label": "Delivery Mode",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "1",
          "3",
          "2",
          "0"
        ]
      },
      {
        "name": "receiptToAddress",
        "label": "Receipt To Address",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "setUpAdditionalServerCommunication",
        "label": "Set Up Additional Server Communication",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "additionalHttpCommunication",
        "label": "Additional Http Communication",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      }
    ]
  },
  "/as2tradingrelationships": {
    "update": [
      {
        "name": "AS2TradingPartner",
        "label": "A S2 Trading Partner",
        "description": "Name of the AS2TradingPartner profile.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "AS2Organisation",
        "label": "A S2 Organisation",
        "description": "Name of the AS2Organization profile.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "retryInterval",
        "label": "Retry Interval",
        "description": "Retry Interval",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "maxRetries",
        "label": "Max Retries",
        "description": "Maximum retries.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "notifyOnIntermediateFailures",
        "label": "Notify On Intermediate Failures",
        "description": "Notifies on intermediate failure for the transfer.",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "notifyOnFinalFailure",
        "label": "Notify On Final Failure",
        "description": "Notifies on final failure for the transfer.",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "waitForSynchronousMDNProcessToCompleteBeforeExtractingData",
        "label": "Wait For Synchronous M D N Process To Complete Before Extracting Data",
        "description": "Wait for synchronous MDN to complete before data extraction.",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "storeOrInvokeBP",
        "label": "Store Or Invoke B P",
        "description": "Option to select the message storage type or to invoke a BP",
        "type": "enum",
        "required": false,
        "options": [
          "directprocess",
          "filesystem",
          "globalmailbox",
          "mailbox"
        ]
      },
      {
        "name": "collectionFolder",
        "label": "Collection Folder",
        "description": "File location to pick up file for transfer.",
        "type": "text",
        "required": false
      },
      {
        "name": "extractionFolder",
        "label": "Extraction Folder",
        "description": "Extraction location of the file after the transfer.",
        "type": "text",
        "required": false
      },
      {
        "name": "errorLogFolder",
        "label": "Error Log Folder",
        "description": "Folder location to log errors during file transfer.",
        "type": "text",
        "required": false
      },
      {
        "name": "maxFilestoCollect",
        "label": "Max Filesto Collect",
        "description": "Maximum number of files to collect during transfer.",
        "type": "text",
        "required": false
      },
      {
        "name": "runServiceBasedOnTimerEvery",
        "label": "Run Service Based On Timer Every",
        "description": "Scheduler time to run the service.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "useMessageFileNametoSaveFile",
        "label": "Use Message File Nameto Save File",
        "description": "Save File with message name.",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "includeFileNameInMessage",
        "label": "Include File Name In Message",
        "description": "Value cannot be Full Path. If we select Store Or Invoke Bp as Invoke Business Process Directly.",
        "type": "enum",
        "required": false,
        "options": [
          "file_name",
          "full_path",
          "none"
        ]
      },
      {
        "name": "useDefaultInboundOrOutboundMailbox",
        "label": "Use Default Inbound Or Outbound Mailbox",
        "description": "Option to select the default Inbound/outbound Mailbox",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "selectExistingParentMailbox",
        "label": "Select Existing Parent Mailbox",
        "description": "Existing Parent Mailbox",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "inboundSuccessBusinessProcess",
        "label": "Inbound Success Business Process",
        "description": "Inbound success business process of profile.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "inboundErrorBusinessProcess",
        "label": "Inbound Error Business Process",
        "description": "Inbound ErrorBP of the profile.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "setMessageFileNameinProcessData",
        "label": "Set Message File Namein Process Data",
        "description": "To set Message File Namein Process Data",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      }
    ],
    "create": [
      {
        "name": "AS2Organisation",
        "label": "A S2 Organisation",
        "description": "Name of the AS2Organization profile.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "AS2TradingPartner",
        "label": "A S2 Trading Partner",
        "description": "Name of the AS2TradingPartner profile.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "retryInterval",
        "label": "Retry Interval",
        "description": "Retry Interval",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "maxRetries",
        "label": "Max Retries",
        "description": "Maximum retries.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "notifyOnIntermediateFailures",
        "label": "Notify On Intermediate Failures",
        "description": "Notifies on intermediate failure for the transfer.",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "notifyOnFinalFailure",
        "label": "Notify On Final Failure",
        "description": "Notifies on final failure for the transfer.",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "waitForSynchronousMDNProcessToCompleteBeforeExtractingData",
        "label": "Wait For Synchronous M D N Process To Complete Before Extracting Data",
        "description": "Wait for synchronous MDN to complete before data extraction.",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "storeOrInvokeBP",
        "label": "Store Or Invoke B P",
        "description": "Option to select the message storage type or to invoke a BP",
        "type": "enum",
        "required": false,
        "options": [
          "directprocess",
          "filesystem",
          "globalmailbox",
          "mailbox"
        ]
      },
      {
        "name": "collectionFolder",
        "label": "Collection Folder",
        "description": "File location to pick up file for transfer.",
        "type": "text",
        "required": false
      },
      {
        "name": "extractionFolder",
        "label": "Extraction Folder",
        "description": "Extraction location of the file after the transfer.",
        "type": "text",
        "required": false
      },
      {
        "name": "errorLogFolder",
        "label": "Error Log Folder",
        "description": "Folder location to log errors during file transfer.",
        "type": "text",
        "required": false
      },
      {
        "name": "maxFilestoCollect",
        "label": "Max Filesto Collect",
        "description": "Maximum number of files to collect during transfer.",
        "type": "text",
        "required": false
      },
      {
        "name": "runServiceBasedOnTimerEvery",
        "label": "Run Service Based On Timer Every",
        "description": "Scheduler time to run the service.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "useMessageFileNametoSaveFile",
        "label": "Use Message File Nameto Save File",
        "description": "Save File with message name.",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "includeFileNameInMessage",
        "label": "Include File Name In Message",
        "description": "Value cannot be Full Path. If we select Store Or Invoke Bp as Invoke Business Process Directly.",
        "type": "enum",
        "required": false,
        "options": [
          "file_name",
          "full_path",
          "none"
        ]
      },
      {
        "name": "useDefaultInboundOrOutboundMailbox",
        "label": "Use Default Inbound Or Outbound Mailbox",
        "description": "Option to select the default Inbound/outbound Mailbox",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      },
      {
        "name": "selectExistingParentMailbox",
        "label": "Select Existing Parent Mailbox",
        "description": "Existing Parent Mailbox",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "inboundSuccessBusinessProcess",
        "label": "Inbound Success Business Process",
        "description": "Inbound success business process of profile.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "inboundErrorBusinessProcess",
        "label": "Inbound Error Business Process",
        "description": "Inbound ErrorBP of the profile.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "setMessageFileNameinProcessData",
        "label": "Set Message File Namein Process Data",
        "description": "To set Message File Namein Process Data",
        "type": "enum",
        "required": false,
        "options": [
          "false",
          "true"
        ]
      }
    ]
  },
  "/cadigitalcertificates": {
    "update": [
      {
        "name": "certName",
        "label": "Cert Name",
        "description": "Name of the CA certificate.",
        "type": "text",
        "required": true
      },
      {
        "name": "verifyValidity",
        "label": "Verify Validity",
        "description": "Flag to turn on verification of certificate validity.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "verifyAuthChain",
        "label": "Verify Auth Chain",
        "description": "Flag to enable verification of the authentication chain before using.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "certGroups",
        "label": "Cert Groups",
        "description": "Set of groups to assign to this certificate. If the group does not exist, it is created. This is presented as a list of Cert Group entities with one f",
        "type": "array",
        "required": false
      }
    ],
    "create": [
      {
        "name": "certName",
        "label": "Cert Name",
        "description": "Name of the CA certificate.",
        "type": "text",
        "required": true
      },
      {
        "name": "certData",
        "label": "Cert Data",
        "description": "Base64-encoded string certificate data.",
        "type": "text",
        "required": true
      },
      {
        "name": "verifyValidity",
        "label": "Verify Validity",
        "description": "Flag to turn on verification of certificate validity.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "verifyAuthChain",
        "label": "Verify Auth Chain",
        "description": "Flag to enable verification of the authentication chain before using.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "certGroups",
        "label": "Cert Groups",
        "description": "Set of groups to assign to this certificate. If the group does not exist, it is created. This is presented as a list of Cert Group entities with one f",
        "type": "array",
        "required": false
      }
    ]
  },
  "/codelists": {
    "create": [
      {
        "name": "codeListName",
        "label": "Code List Name",
        "description": "Name of the code list.",
        "type": "text",
        "required": true
      },
      {
        "name": "senderIdentity",
        "label": "Sender Identity",
        "description": "Name of the sender, from the list of identity records.",
        "type": "text",
        "required": false
      },
      {
        "name": "receiverIdentity",
        "label": "Receiver Identity",
        "description": "Name of the receiver, from the list of identity record.",
        "type": "text",
        "required": false
      },
      {
        "name": "comments",
        "label": "Comments",
        "description": "Comments related to the code list.",
        "type": "text",
        "required": false
      },
      {
        "name": "codes",
        "label": "Codes",
        "description": "Codes in the code list.",
        "type": "array",
        "required": true
      },
      {
        "name": "createNewVersion",
        "label": "Create New Version",
        "description": "",
        "type": "boolean",
        "required": false
      },
      {
        "name": "makeDefault",
        "label": "Make Default",
        "description": "",
        "type": "boolean",
        "required": false
      },
      {
        "name": "listStatus",
        "label": "List Status",
        "description": "Status of the code list: 1 (Active) or 2 (Inactive).",
        "type": "enum",
        "required": false,
        "options": [
          "1",
          "2"
        ],
        "format": "int32"
      }
    ],
    "update": [
      {
        "name": "setAsDefaultVersion",
        "label": "Set As Default Version",
        "description": "",
        "type": "boolean",
        "required": false
      },
      {
        "name": "comments",
        "label": "Comments",
        "description": "Comments related to the code list.",
        "type": "text",
        "required": false
      },
      {
        "name": "listStatus",
        "label": "List Status",
        "description": "Status of the code list: 1 (Active) or 2 (Inactive).",
        "type": "enum",
        "required": false,
        "options": [
          "1",
          "2"
        ],
        "format": "int32"
      },
      {
        "name": "codes",
        "label": "Codes",
        "description": "Codes in the code list.",
        "type": "array",
        "required": false
      }
    ]
  },
  "/codelistcodes": {
    "update": [
      {
        "name": "senderId",
        "label": "Sender Id",
        "description": "Sender ID.",
        "type": "text",
        "required": false
      },
      {
        "name": "receiverId",
        "label": "Receiver Id",
        "description": "Receiver ID.",
        "type": "text",
        "required": false
      },
      {
        "name": "senderCode",
        "label": "Sender Code",
        "description": "Code value of the sender that is cross-referenced to the code value of the receiver. Do not use reserved special character - '|' - pipe.",
        "type": "text",
        "required": true
      },
      {
        "name": "receiverCode",
        "label": "Receiver Code",
        "description": "Code value of the receiver that is cross-referenced to the code value of the sender. Do not use reserved special character - '|' - pipe.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Description of what the code value of the sender and receiver refers to.",
        "type": "text",
        "required": false
      },
      {
        "name": "text1",
        "label": "Text1",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      },
      {
        "name": "text2",
        "label": "Text2",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      },
      {
        "name": "text3",
        "label": "Text3",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      },
      {
        "name": "text4",
        "label": "Text4",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      },
      {
        "name": "text5",
        "label": "Text5",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      },
      {
        "name": "text6",
        "label": "Text6",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      },
      {
        "name": "text7",
        "label": "Text7",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      },
      {
        "name": "text8",
        "label": "Text8",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      },
      {
        "name": "text9",
        "label": "Text9",
        "description": "Description or data relating to the sender and receiver code.",
        "type": "text",
        "required": false
      }
    ],
    "create": [
      {
        "name": "CodeList",
        "label": "Code List",
        "description": "",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "codeSet",
        "label": "Code Set",
        "description": "Set of code pairs to be added to the code list.",
        "type": "array",
        "required": true
      }
    ]
  },
  "/communities": {
    "update": [
      {
        "name": "ftpListening",
        "label": "Ftp Listening",
        "description": "Whether trading partners in this community should listen for FTP/FTPS connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "partnersInitiateConnections",
        "label": "Partners Initiate Connections",
        "description": "Whether partners in this community will initiate connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "partnersListenForConnections",
        "label": "Partners Listen For Connections",
        "description": "Whether partners in this community will listen for connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "sshListening",
        "label": "Ssh Listening",
        "description": "Whether trading partners in this community should listen for SSH/SFTP connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "wsListening",
        "label": "Ws Listening",
        "description": "Whether trading partners in this community should listen for WebSphere MQ FTE connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "partnerNotificationsEnabled",
        "label": "Partner Notifications Enabled",
        "description": "Whether partners will receive notifications to which they have subscribed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "cdListening",
        "label": "Cd Listening",
        "description": "Whether trading partners in this community should listen for Connect:Direct connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "customProtocols",
        "label": "Custom Protocols",
        "description": "List of custom protocols supported by the community. Protocol names should be seperated by comma",
        "type": "text",
        "required": false
      }
    ],
    "create": [
      {
        "name": "name",
        "label": "Name",
        "description": "The name of the community.",
        "type": "text",
        "required": true
      },
      {
        "name": "partnersInitiateConnections",
        "label": "Partners Initiate Connections",
        "description": "Whether partners in this community will initiate connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "partnersListenForConnections",
        "label": "Partners Listen For Connections",
        "description": "Whether partners in this community will listen for connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "ftpListening",
        "label": "Ftp Listening",
        "description": "Whether trading partners in this community should listen for FTP/FTPS connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "cdListening",
        "label": "Cd Listening",
        "description": "Whether trading partners in this community should listen for Connect:Direct connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "sshListening",
        "label": "Ssh Listening",
        "description": "Whether trading partners in this community should listen for SSH/SFTP connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "wsListening",
        "label": "Ws Listening",
        "description": "Whether trading partners in this community should listen for WebSphere MQ FTE connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "partnerNotificationsEnabled",
        "label": "Partner Notifications Enabled",
        "description": "Whether partners will receive notifications to which they have subscribed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "customProtocols",
        "label": "Custom Protocols",
        "description": "List of custom protocols supported by the community. Protocol names should be seperated by comma",
        "type": "text",
        "required": false
      }
    ]
  },
  "/customjars": {
    "create": [
      {
        "name": "vendorName",
        "label": "Vendor Name",
        "description": "Name of the vendor for the library.",
        "type": "text",
        "required": true
      },
      {
        "name": "vendorVersion",
        "label": "Vendor Version",
        "description": "Version for the vendor's library.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Description for the custom jar.",
        "type": "text",
        "required": false
      },
      {
        "name": "nodeList",
        "label": "Node List",
        "description": "List of available nodes.",
        "type": "text",
        "required": false
      },
      {
        "name": "jarType",
        "label": "Jar Type",
        "description": "Type of file - DATABASE LIBRARY for database jar or zip files/ LIBRARY for jar or zip files/ SHARED LIBRARY for shared OS native libraries/ PROPERTY F",
        "type": "enum",
        "required": true,
        "options": [
          "DATABASE",
          "LIBRARY",
          "PROPERTYFILE",
          "SHAREDLIBRARY"
        ]
      },
      {
        "name": "targetPath",
        "label": "Target Path",
        "description": "Target application or agent classpath - EVERY to add the jar to all dynamic classpath files/ NOWHERE to not add the jar to any dynamic classpath file/",
        "type": "enum",
        "required": false,
        "options": [
          "AGENT",
          "APP",
          "DCL",
          "EVERY",
          "NOWHERE"
        ]
      },
      {
        "name": "storageLocation",
        "label": "Storage Location",
        "description": "Location for the storage of files.",
        "type": "enum",
        "required": false,
        "options": [
          "DATABASE"
        ]
      },
      {
        "name": "fileName",
        "label": "File Name",
        "description": "Name for the custom jar file.",
        "type": "text",
        "required": false
      },
      {
        "name": "fileContents",
        "label": "File Contents",
        "description": "File contents for the custom jar file.",
        "type": "text",
        "required": true
      }
    ],
    "update": [
      {
        "name": "vendorVersion",
        "label": "Vendor Version",
        "description": "Version for the vendor's library.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Description for the custom jar.",
        "type": "text",
        "required": false
      },
      {
        "name": "nodeList",
        "label": "Node List",
        "description": "List of available nodes.",
        "type": "text",
        "required": false
      },
      {
        "name": "fileName",
        "label": "File Name",
        "description": "Name for the custom jar file.",
        "type": "text",
        "required": false
      },
      {
        "name": "fileContents",
        "label": "File Contents",
        "description": "File contents for the custom jar file.",
        "type": "text",
        "required": true
      }
    ]
  },
  "/customservices": {
    "update": [
      {
        "name": "applicableNodes",
        "label": "Applicable Nodes",
        "description": "List of available nodes.",
        "type": "text",
        "required": false
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Brief description of the custom service.",
        "type": "text",
        "required": false
      },
      {
        "name": "forcePackage",
        "label": "Force Package",
        "description": "Indicates whether the package for the custom service should be forced.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "skipFactorySetup",
        "label": "Skip Factory Setup",
        "description": "Indicates whether factory setup should be skipped during installation.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "skipJavaDocs",
        "label": "Skip Java Docs",
        "description": "Indicates whether to skip installing the javadocs for the custom service package.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "skipXapi",
        "label": "Skip Xapi",
        "description": "Indicates whether the XAPIs for the custom service should be selected or not.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "testDeploy",
        "label": "Test Deploy",
        "description": "Indicates whether the custom service should be tested for deployment.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "compWarn",
        "label": "Comp Warn",
        "description": "Indicates whether the warning for the given service should be compressed",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "fileName",
        "label": "File Name",
        "description": "Name of the file.",
        "type": "text",
        "required": false
      },
      {
        "name": "fileContent",
        "label": "File Content",
        "description": "",
        "type": "text",
        "required": false
      }
    ],
    "create": [
      {
        "name": "serviceName",
        "label": "Service Name",
        "description": "Unique name for the custom service.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Brief description of the custom service.",
        "type": "text",
        "required": false
      },
      {
        "name": "applicableNodes",
        "label": "Applicable Nodes",
        "description": "List of available nodes.",
        "type": "text",
        "required": false
      },
      {
        "name": "storageLocation",
        "label": "Storage Location",
        "description": "Location for the storage of files.",
        "type": "enum",
        "required": false,
        "options": [
          "DATABASE"
        ]
      },
      {
        "name": "fileName",
        "label": "File Name",
        "description": "Name of the file.",
        "type": "text",
        "required": true
      },
      {
        "name": "fileContent",
        "label": "File Content",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "forcePackage",
        "label": "Force Package",
        "description": "Indicates whether the package for the custom service should be forced.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "skipFactorySetup",
        "label": "Skip Factory Setup",
        "description": "Indicates whether factory setup should be skipped during installation.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "skipJavaDocs",
        "label": "Skip Java Docs",
        "description": "Indicates whether to skip installing the javadocs for the custom service package.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "skipXapi",
        "label": "Skip Xapi",
        "description": "Indicates whether the XAPIs for the custom service should be selected or not.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "testDeploy",
        "label": "Test Deploy",
        "description": "Indicates whether the custom service should be tested for deployment.",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      },
      {
        "name": "compWarn",
        "label": "Comp Warn",
        "description": "Indicates whether the warning for the given service should be compressed",
        "type": "enum",
        "required": false,
        "options": [
          "F",
          "T"
        ]
      }
    ]
  },
  "/customsfgextensions": {
    "update": [
      {
        "name": "aftExtensionsFileContents",
        "label": "Aft Extensions File Contents",
        "description": "Base64 encoded file content for AFTExtensionsCustomer.xml file",
        "type": "text",
        "required": false
      },
      {
        "name": "aftPropertiesFileContents",
        "label": "Aft Properties File Contents",
        "description": "Base64 encoded file contents for AFTExtensionsCustomer.properties file",
        "type": "text",
        "required": false
      }
    ]
  },
  "/documents": {
    "create": [
      {
        "name": "payload",
        "label": "Payload",
        "description": "Base64-encoded payload content data for the document.",
        "type": "text",
        "required": true
      },
      {
        "name": "documentName",
        "label": "Document Name",
        "description": "Name of the document.",
        "type": "text",
        "required": false
      },
      {
        "name": "bodyName",
        "label": "Body Name",
        "description": "Name of the body of the document.",
        "type": "text",
        "required": false
      },
      {
        "name": "lifeSpan",
        "label": "Life Span",
        "description": "Lifespan of the document (in minutes) before it can be purged.",
        "type": "number",
        "required": false,
        "format": "int64"
      },
      {
        "name": "characterEncoding",
        "label": "Character Encoding",
        "description": "Type of character encoding used in the document.",
        "type": "text",
        "required": false
      },
      {
        "name": "contentSubtype",
        "label": "Content Subtype",
        "description": "Content subtype of the document.",
        "type": "text",
        "required": false
      },
      {
        "name": "contentType",
        "label": "Content Type",
        "description": "Primary content type of the document.",
        "type": "text",
        "required": false
      },
      {
        "name": "subject",
        "label": "Subject",
        "description": "Subject of the document.",
        "type": "text",
        "required": false
      },
      {
        "name": "storageType",
        "label": "Storage Type",
        "description": "Storage type used for the document. Storage type can be either 'FS' or 'DB'.",
        "type": "text",
        "required": false
      },
      {
        "name": "isPlainText",
        "label": "Is Plain Text",
        "description": "Payload will be passed as B-64 encoded form if not checked",
        "type": "boolean",
        "required": false
      }
    ]
  },
  "/externalusers": {
    "create": [
      {
        "name": "name",
        "label": "Name",
        "description": "The name of the external user, corresponding to the \"cn\" or \"common name\" attribute in LDAP.",
        "type": "text",
        "required": true
      },
      {
        "name": "password",
        "label": "Password",
        "description": "The user's password. When creating, provide the password in plain text. When reading, the password is displayed in an encrypted format.",
        "type": "text",
        "required": true
      }
    ],
    "update": [
      {
        "name": "password",
        "label": "Password",
        "description": "The user's password. When creating, provide the password in plain text. When reading, the password is displayed in an encrypted format.",
        "type": "text",
        "required": true
      }
    ]
  },
  "/fgarrivedfiles": {
    "update": [
      {
        "name": "reviewUpdate",
        "label": "Review Update",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "notReviewed",
          "reviewed"
        ]
      }
    ]
  },
  "/jdbcservicetrackings": {
    "update": [
      {
        "name": "trackingLevel",
        "label": "Tracking Level",
        "description": "",
        "type": "enum",
        "required": true,
        "options": [
          "FULL",
          "LIGHTWEIGHT",
          "NONE"
        ]
      }
    ]
  },
  "/mailboxes": {
    "create": [
      {
        "name": "description",
        "label": "Description",
        "description": "Short description of the mailbox.",
        "type": "text",
        "required": true
      },
      {
        "name": "path",
        "label": "Path",
        "description": "Full path to the mailbox. Begin the path with a forward slash (/) and specify all parent mailboxes, for example: /topmailbox/middlemailbox/mailbox",
        "type": "text",
        "required": true
      },
      {
        "name": "createParentMailbox",
        "label": "Create Parent Mailbox",
        "description": "Specifies whether to create a parent Mailbox in which the mailbox you are creating will be embedded.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "mailboxType",
        "label": "Mailbox Type",
        "description": "By default, the mailbox is of regular mailbox type. It can be of shared or linked mailbox type if the functionality is enabled.",
        "type": "enum",
        "required": false,
        "options": [
          "L",
          "R",
          "S"
        ]
      },
      {
        "name": "linkedToMailbox",
        "label": "Linked To Mailbox",
        "description": "The shared mailbox to which this mailbox is to be linked. This attribute is available only if the mailbox that you are creating or viewing is of linke",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "users",
        "label": "Users",
        "description": "Users that have permissions on the mailbox.",
        "type": "text",
        "required": false
      },
      {
        "name": "groups",
        "label": "Groups",
        "description": "Groups that have permissions on the mailbox",
        "type": "text",
        "required": false
      }
    ],
    "update": [
      {
        "name": "description",
        "label": "Description",
        "description": "Short description of the mailbox.",
        "type": "text",
        "required": true
      },
      {
        "name": "users",
        "label": "Users",
        "description": "Users that have permissions on the mailbox.",
        "type": "text",
        "required": false
      },
      {
        "name": "groups",
        "label": "Groups",
        "description": "Groups that have permissions on the mailbox",
        "type": "text",
        "required": false
      }
    ]
  },
  "/mailboxmessages": {
    "create": [
      {
        "name": "documentId",
        "label": "Document Id",
        "description": "Document ID of the document in the message.",
        "type": "text",
        "required": true
      },
      {
        "name": "mailboxPath",
        "label": "Mailbox Path",
        "description": "Full path to the mailbox. Begin the path with a forward slash (/) and specify all parent mailboxes, for example: /topmailbox/middlemailbox/mailbox",
        "type": "text",
        "required": true
      },
      {
        "name": "extractableAlways",
        "label": "Extractable Always",
        "description": "Indicates whether the message can be extracted. Valid values are Yes and No.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "extractableCount",
        "label": "Extractable Count",
        "description": "Number of times the message may be accessed. Valid values are greater than or equal to 0.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "extractableUntil",
        "label": "Extractable Until",
        "description": "Last date and time that the message may be extracted. Valid values are dates and times in yyyyMMddThhmm format.",
        "type": "text",
        "required": false,
        "format": "date-time"
      },
      {
        "name": "name",
        "label": "Name",
        "description": "Mailbox message Name.",
        "type": "text",
        "required": true
      }
    ],
    "update": [
      {
        "name": "extractableAlways",
        "label": "Extractable Always",
        "description": "Indicates whether the message can be extracted. Valid values are Yes and No.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "extractableCount",
        "label": "Extractable Count",
        "description": "Number of times the message may be accessed. Valid values are greater than or equal to 0.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "extractableUntil",
        "label": "Extractable Until",
        "description": "Last date and time that the message may be extracted. Valid values are dates and times in yyyyMMddThhmm format.",
        "type": "text",
        "required": false,
        "format": "date-time"
      },
      {
        "name": "resubmitMessage",
        "label": "Resubmit Message",
        "description": "Resubmit the specified message to the routing queue so the message will be routed",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ]
  },
  "/messagebatches": {
    "create": [
      {
        "name": "mailboxName",
        "label": "Mailbox Name",
        "description": "Name of the mailbox.",
        "type": "text",
        "required": true
      }
    ]
  },
  "/partnergroups": {
    "create": [
      {
        "name": "groupName",
        "label": "Group Name",
        "description": "Name of the group",
        "type": "text",
        "required": true
      },
      {
        "name": "groupMembers",
        "label": "Group Members",
        "description": "Trading Partners who are members of the group, in a comma-delimited list.",
        "type": "text",
        "required": false
      }
    ],
    "update": [
      {
        "name": "addOrRemove",
        "label": "Add Or Remove",
        "description": "Add or remove partners by specifying \"add\" or \"remove\" for this parameter.",
        "type": "text",
        "required": true
      },
      {
        "name": "partners",
        "label": "Partners",
        "description": "List of partners, comma delimited, to add or remove from the group.",
        "type": "text",
        "required": true
      }
    ]
  },
  "/permissions": {
    "create": [
      {
        "name": "permissionId",
        "label": "Permission Id",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "permissionName",
        "label": "Permission Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "permissionType",
        "label": "Permission Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "3",
          "5",
          "1000",
          "2000",
          "1",
          "99",
          "7",
          "2",
          "4",
          "0",
          "6"
        ]
      }
    ],
    "update": [
      {
        "name": "permissionName",
        "label": "Permission Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "permissionType",
        "label": "Permission Type",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "3",
          "5",
          "1000",
          "2000",
          "1",
          "99",
          "7",
          "2",
          "4",
          "0",
          "6"
        ]
      }
    ]
  },
  "/pgpkeys": {
    "create": [
      {
        "name": "keyData",
        "label": "Key Data",
        "description": "The key file, Base 64 encoded.",
        "type": "text",
        "required": true
      }
    ]
  },
  "/pgpserverprofiles": {
    "create": [
      {
        "name": "conventionalKeyMaps",
        "label": "Conventional Key Maps",
        "description": "The PGP server profile's conventional key mappings.",
        "type": "array",
        "required": false
      },
      {
        "name": "pgpExec",
        "label": "Pgp Exec",
        "description": "The command to execute PGP.This is mandatory input if PGP Key type is not NATIVE.",
        "type": "text",
        "required": false
      },
      {
        "name": "pgpPath",
        "label": "Pgp Path",
        "description": "The directory where the PGP configuration file (pgp.cfg or PGPprefs.xml) is located.This is mandatory input if PGP Key type is not NATIVE.",
        "type": "text",
        "required": false
      },
      {
        "name": "pgpRandomNoSeed",
        "label": "Pgp Random No Seed",
        "description": "The path and name of the PGP random number seed.This is mandatory input if PGP Key type is not NATIVE.. For example: C:\\Program Files\\SDS\\SDS E-Busine",
        "type": "text",
        "required": false
      },
      {
        "name": "pgpSecretKeyRing",
        "label": "Pgp Secret Key Ring",
        "description": "The path and name of the PGP secret key ring.This is mandatory input if PGP Key type is not NATIVE.. For example: C:\\Program Files\\SDS\\SDS E-Business ",
        "type": "text",
        "required": false
      },
      {
        "name": "pgpType",
        "label": "Pgp Type",
        "description": "The code representing the PGP software you have installed. Valid values are: CORP - Symantec PGP Command Line, NAI - SDS E-Business Server, GPG - GNU ",
        "type": "text",
        "required": true
      },
      {
        "name": "profileName",
        "label": "Profile Name",
        "description": "The name of the profile.",
        "type": "text",
        "required": true
      },
      {
        "name": "secretKeyMaps",
        "label": "Secret Key Maps",
        "description": "The PGP server profile's secret key mappings.Secret Key Name should be unique. Duplicate Secret Key Name's are ignored.",
        "type": "array",
        "required": false
      },
      {
        "name": "pgpPublicKeyRing",
        "label": "Pgp Public Key Ring",
        "description": "The path and name of the PGP public key ring.This is mandatory input if PGP Key type is not NATIVE.. For example: C:\\Program Files\\SDS\\SDS E-Business ",
        "type": "text",
        "required": false
      }
    ],
    "update": [
      {
        "name": "conventionalKeyMaps",
        "label": "Conventional Key Maps",
        "description": "The PGP server profile's conventional key mappings.",
        "type": "array",
        "required": false
      },
      {
        "name": "pgpExec",
        "label": "Pgp Exec",
        "description": "The command to execute PGP.This is mandatory input if PGP Key type is not NATIVE.",
        "type": "text",
        "required": false
      },
      {
        "name": "pgpPath",
        "label": "Pgp Path",
        "description": "The directory where the PGP configuration file (pgp.cfg or PGPprefs.xml) is located.This is mandatory input if PGP Key type is not NATIVE.",
        "type": "text",
        "required": false
      },
      {
        "name": "pgpRandomNoSeed",
        "label": "Pgp Random No Seed",
        "description": "The path and name of the PGP random number seed.This is mandatory input if PGP Key type is not NATIVE.. For example: C:\\Program Files\\SDS\\SDS E-Busine",
        "type": "text",
        "required": false
      },
      {
        "name": "pgpSecretKeyRing",
        "label": "Pgp Secret Key Ring",
        "description": "The path and name of the PGP secret key ring.This is mandatory input if PGP Key type is not NATIVE.. For example: C:\\Program Files\\SDS\\SDS E-Business ",
        "type": "text",
        "required": false
      },
      {
        "name": "pgpType",
        "label": "Pgp Type",
        "description": "The code representing the PGP software you have installed. Valid values are: CORP - Symantec PGP Command Line, NAI - SDS E-Business Server, GPG - GNU ",
        "type": "text",
        "required": true
      },
      {
        "name": "profileName",
        "label": "Profile Name",
        "description": "The name of the profile.",
        "type": "text",
        "required": true
      },
      {
        "name": "secretKeyMaps",
        "label": "Secret Key Maps",
        "description": "The PGP server profile's secret key mappings.Secret Key Name should be unique. Duplicate Secret Key Name's are ignored.",
        "type": "array",
        "required": false
      },
      {
        "name": "pgpPublicKeyRing",
        "label": "Pgp Public Key Ring",
        "description": "The path and name of the PGP public key ring.This is mandatory input if PGP Key type is not NATIVE.. For example: C:\\Program Files\\SDS\\SDS E-Business ",
        "type": "text",
        "required": false
      }
    ]
  },
  "/properties": {
    "update": [
      {
        "name": "propertyValue",
        "label": "Property Value",
        "description": "Value for the custom property applicable to all nodes in a Sterling B2B Integrator cluster.",
        "type": "text",
        "required": false
      },
      {
        "name": "propertyNodeValue",
        "label": "Property Node Value",
        "description": "Value for the custom property in a specific Sterling B2B Integrator node.",
        "type": "array",
        "required": false
      }
    ],
    "create": [
      {
        "name": "propertyKey",
        "label": "Property Key",
        "description": "Unique property key used to identify a custom property in the property file.",
        "type": "text",
        "required": true
      },
      {
        "name": "propertyFile",
        "label": "Property File",
        "description": "Base 64 encoded property file.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "propertyValue",
        "label": "Property Value",
        "description": "Value for the custom property applicable to all nodes in a Sterling B2B Integrator cluster.",
        "type": "text",
        "required": false
      },
      {
        "name": "propertyNodeValue",
        "label": "Property Node Value",
        "description": "Value for the custom property in a specific Sterling B2B Integrator node.",
        "type": "array",
        "required": false
      }
    ]
  },
  "/propertyfiles": {
    "update": [
      {
        "name": "replaceExistingPropertySet",
        "label": "Replace Existing Property Set",
        "description": "Whether or not to completely replace the existing property set with the new set.",
        "type": "boolean",
        "required": false
      },
      {
        "name": "propertyFileContent",
        "label": "Property File Content",
        "description": "Base64-encoded property file content",
        "type": "text",
        "required": false
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Description for the property file.",
        "type": "text",
        "required": false
      }
    ],
    "create": [
      {
        "name": "propertyFilePrefix",
        "label": "Property File Prefix",
        "description": "Unique name for the set of properties. Only alphabets, underscores (_), dots (.) and hyphens are permitted.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Description for the property file.",
        "type": "text",
        "required": false
      },
      {
        "name": "propertyFileContent",
        "label": "Property File Content",
        "description": "Base64-encoded property file content",
        "type": "text",
        "required": false
      }
    ]
  },
  "/propertynodevalues": {
    "create": [
      {
        "name": "property",
        "label": "Property",
        "description": "Name of the custom property for which you want to provide a specific value in a specific Sterling B2B Integrator node. You can specify the property ke",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "nodeName",
        "label": "Node Name",
        "description": "Sterling B2B Integrator node in which you want to specify the value for the custom property.",
        "type": "text",
        "required": true
      },
      {
        "name": "propertyValue",
        "label": "Property Value",
        "description": "Value for the custom property for a specific node.",
        "type": "text",
        "required": false
      }
    ],
    "update": [
      {
        "name": "propertyValue",
        "label": "Property Value",
        "description": "Value for the custom property for a specific node.",
        "type": "text",
        "required": false
      }
    ]
  },
  "/routingchannels": {
    "create": [
      {
        "name": "templateName",
        "label": "Template Name",
        "description": "The name of the routing channel template to use.",
        "type": "text",
        "required": true
      },
      {
        "name": "producer",
        "label": "Producer",
        "description": "The trading partner that is to be the producer. Must belong to the partner group defined in the template.",
        "type": "text",
        "required": true
      },
      {
        "name": "consumer",
        "label": "Consumer",
        "description": "The trading partner that is to be the consumer. Must belong to the partner group defined in the template.",
        "type": "text",
        "required": false
      },
      {
        "name": "provisioningFacts",
        "label": "Provisioning Facts",
        "description": "The list of provisioning facts. The number specified here must match the number specified in the template. For each provisioning fact, you must specif",
        "type": "array",
        "required": false
      }
    ]
  },
  "/routingrules": {
    "update": [
      {
        "name": "action",
        "label": "Action",
        "description": "The name of the business process or contract to specify as the \"action\". Maximum length for this attribute is 100 characters if specifying a business ",
        "type": "text",
        "required": true
      },
      {
        "name": "actionType",
        "label": "Action Type",
        "description": "Whether to use the business logic of a business process or a contract. Valid values are \"bp\" and \"contract\"",
        "type": "enum",
        "required": true,
        "options": [
          "bp",
          "contract"
        ]
      },
      {
        "name": "evaluationMode",
        "label": "Evaluation Mode",
        "description": "The routing rule evaluation mode. Valid values are \"manual\" and \"automatic'.",
        "type": "enum",
        "required": true,
        "options": [
          "automatic",
          "manual"
        ]
      },
      {
        "name": "mailboxes",
        "label": "Mailboxes",
        "description": "The names of the mailboxes to which this rule should apply. If none are provided, the rule will apply to all mailboxes.",
        "type": "array",
        "required": false
      },
      {
        "name": "messageNamePattern",
        "label": "Message Name Pattern",
        "description": "The pattern that the rule should look for in message names to evaluate whether or not to apply the rule.",
        "type": "text",
        "required": false
      },
      {
        "name": "name",
        "label": "Name",
        "description": "The name of the routing rule.",
        "type": "text",
        "required": true
      },
      {
        "name": "runRuleAs",
        "label": "Run Rule As",
        "description": "The username that should be used to run the rule.",
        "type": "text",
        "required": true
      }
    ],
    "create": [
      {
        "name": "action",
        "label": "Action",
        "description": "The name of the business process or contract to specify as the \"action\". Maximum length for this attribute is 100 characters if specifying a business ",
        "type": "text",
        "required": true
      },
      {
        "name": "actionType",
        "label": "Action Type",
        "description": "Whether to use the business logic of a business process or a contract. Valid values are \"bp\" and \"contract\"",
        "type": "enum",
        "required": true,
        "options": [
          "bp",
          "contract"
        ]
      },
      {
        "name": "evaluationMode",
        "label": "Evaluation Mode",
        "description": "The routing rule evaluation mode. Valid values are \"manual\" and \"automatic'.",
        "type": "enum",
        "required": true,
        "options": [
          "automatic",
          "manual"
        ]
      },
      {
        "name": "mailboxes",
        "label": "Mailboxes",
        "description": "The names of the mailboxes to which this rule should apply. If none are provided, the rule will apply to all mailboxes.",
        "type": "array",
        "required": false
      },
      {
        "name": "messageNamePattern",
        "label": "Message Name Pattern",
        "description": "The pattern that the rule should look for in message names to evaluate whether or not to apply the rule.",
        "type": "text",
        "required": false
      },
      {
        "name": "name",
        "label": "Name",
        "description": "The name of the routing rule.",
        "type": "text",
        "required": true
      },
      {
        "name": "runRuleAs",
        "label": "Run Rule As",
        "description": "The username that should be used to run the rule.",
        "type": "text",
        "required": true
      }
    ]
  },
  "/schedules": {
    "update": [
      {
        "name": "runAsUser",
        "label": "Run As User",
        "description": "The schedule runs as this user.",
        "type": "text",
        "required": false
      },
      {
        "name": "timerSchedule",
        "label": "Timer Schedule",
        "description": "Schedules based on a timer run the scheduled activity at a certain time or time interval, such as every 2 hours 4 minutes etc.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "dailySchedule",
        "label": "Daily Schedule",
        "description": "Daily schedules run the scheduled activity one or more times a day, either at a specified hour or at a time interval. Use this schedule type when you ",
        "type": "array",
        "required": false
      },
      {
        "name": "weeklySchedule",
        "label": "Weekly Schedule",
        "description": "Weekly schedules run the scheduled activity on certain days of the week, such as every Monday. Use this schedule type when you run the scheduled activ",
        "type": "array",
        "required": false
      },
      {
        "name": "monthlySchedule",
        "label": "Monthly Schedule",
        "description": "Weekly schedules run the scheduled activity on certain days of the month, such as the 1st or 15th of every month. Use this schedule type when you run ",
        "type": "array",
        "required": false
      },
      {
        "name": "runAtStartUp",
        "label": "Run At Start Up",
        "description": "The schedule runs at start up.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "scheduleExclusions",
        "label": "Schedule Exclusions",
        "description": "Indicate the times when the usual interval is skipped and the scheduled activity is not run.",
        "type": "array",
        "required": false
      },
      {
        "name": "dateExclusions",
        "label": "Date Exclusions",
        "description": "Indicate the days of the month when the usual interval is skipped and the scheduled activity is not run.",
        "type": "array",
        "required": false
      },
      {
        "name": "bpNameValuePairs",
        "label": "Bp Name Value Pairs",
        "description": "",
        "type": "array",
        "required": false
      },
      {
        "name": "scheduleStatusEnabled",
        "label": "Schedule Status Enabled",
        "description": "Enabling a schedule makes the schedule active and causes the associated activity to run according to the schedule settings. A schedule must be enabled",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ],
    "create": [
      {
        "name": "runAsUser",
        "label": "Run As User",
        "description": "The schedule runs as this user.",
        "type": "text",
        "required": false
      },
      {
        "name": "timerSchedule",
        "label": "Timer Schedule",
        "description": "Schedules based on a timer run the scheduled activity at a certain time or time interval, such as every 2 hours 4 minutes etc.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "dailySchedule",
        "label": "Daily Schedule",
        "description": "Daily schedules run the scheduled activity one or more times a day, either at a specified hour or at a time interval. Use this schedule type when you ",
        "type": "array",
        "required": false
      },
      {
        "name": "weeklySchedule",
        "label": "Weekly Schedule",
        "description": "Weekly schedules run the scheduled activity on certain days of the week, such as every Monday. Use this schedule type when you run the scheduled activ",
        "type": "array",
        "required": false
      },
      {
        "name": "monthlySchedule",
        "label": "Monthly Schedule",
        "description": "Weekly schedules run the scheduled activity on certain days of the month, such as the 1st or 15th of every month. Use this schedule type when you run ",
        "type": "array",
        "required": false
      },
      {
        "name": "runAtStartUp",
        "label": "Run At Start Up",
        "description": "The schedule runs at start up.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "scheduleExclusions",
        "label": "Schedule Exclusions",
        "description": "Indicate the times when the usual interval is skipped and the scheduled activity is not run.",
        "type": "array",
        "required": false
      },
      {
        "name": "dateExclusions",
        "label": "Date Exclusions",
        "description": "Indicate the days of the month when the usual interval is skipped and the scheduled activity is not run.",
        "type": "array",
        "required": false
      },
      {
        "name": "businessProcess",
        "label": "Business Process",
        "description": "Name of a business process so that it can runs automatically on hourly, daily, weekly, or monthly intervals.",
        "type": "text",
        "required": true
      },
      {
        "name": "bpNameValuePairs",
        "label": "Bp Name Value Pairs",
        "description": "",
        "type": "array",
        "required": false
      }
    ]
  },
  "/serviceinstances": {
    "create": [
      {
        "name": "definitionName",
        "label": "Definition Name",
        "description": "",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "serviceName",
        "label": "Service Name",
        "description": "Name of the service.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Brief description of the service.",
        "type": "text",
        "required": true
      },
      {
        "name": "serviceGroupName",
        "label": "Service Group Name",
        "description": "Name of the group to which the service belongs.",
        "type": "text",
        "required": false
      },
      {
        "name": "targetEnv",
        "label": "Target Env",
        "description": "Target environment selected while creating the service.",
        "type": "text",
        "required": false
      },
      {
        "name": "instParms",
        "label": "Inst Parms",
        "description": "The instParms of the service instance.",
        "type": "text",
        "required": false
      },
      {
        "name": "Status",
        "label": "Status",
        "description": "",
        "type": "boolean",
        "required": false
      }
    ],
    "update": [
      {
        "name": "serviceName",
        "label": "Service Name",
        "description": "Name of the service.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Brief description of the service.",
        "type": "text",
        "required": true
      },
      {
        "name": "targetEnv",
        "label": "Target Env",
        "description": "Target environment selected while creating the service.",
        "type": "text",
        "required": false
      },
      {
        "name": "serviceGroupName",
        "label": "Service Group Name",
        "description": "Name of the group to which the service belongs.",
        "type": "text",
        "required": false
      },
      {
        "name": "instParms",
        "label": "Inst Parms",
        "description": "The instParms of the service instance.",
        "type": "text",
        "required": false
      },
      {
        "name": "Enable",
        "label": "Enable",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ]
  },
  "/sshauthorizeduserkeys": {
    "update": [
      {
        "name": "keyStatusEnabled",
        "label": "Key Status Enabled",
        "description": "Status of key. Set to false for disabled or true for enabled.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ],
    "create": [
      {
        "name": "keyName",
        "label": "Key Name",
        "description": "Key name. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). This is a required field for API operation.",
        "type": "text",
        "required": true
      },
      {
        "name": "keyData",
        "label": "Key Data",
        "description": "Base64-encoded string key file data. This is a required field for API operation.",
        "type": "text",
        "required": true
      },
      {
        "name": "keyStatusEnabled",
        "label": "Key Status Enabled",
        "description": "Status of key. Set to false for disabled or true for enabled.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ]
  },
  "/sshknownhostkeys": {
    "update": [
      {
        "name": "keyStatusEnabled",
        "label": "Key Status Enabled",
        "description": "Key status. Set to false for disabled or true for enabled.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ],
    "create": [
      {
        "name": "keyName",
        "label": "Key Name",
        "description": "Key name. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). This is a required field for API operation.",
        "type": "text",
        "required": true
      },
      {
        "name": "keyData",
        "label": "Key Data",
        "description": "Base64-encoded string key file. This is a required field for API operation.",
        "type": "text",
        "required": true
      },
      {
        "name": "keyStatusEnabled",
        "label": "Key Status Enabled",
        "description": "Key status. Set to false for disabled or true for enabled.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ]
  },
  "/sshremoteprofiles": {
    "create": [
      {
        "name": "profileName",
        "label": "Profile Name",
        "description": "SSH remote profile name. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). This is a required field for API oper",
        "type": "text",
        "required": true
      },
      {
        "name": "remoteHost",
        "label": "Remote Host",
        "description": "SSH remote host details. Enter either host name or host IP. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). Th",
        "type": "text",
        "required": true
      },
      {
        "name": "remotePort",
        "label": "Remote Port",
        "description": "SSH remote profile port number. Enter an integer value greater than 0. This is a required field for API operation.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "knownHostKeys",
        "label": "Known Host Keys",
        "description": "Provide the existing known host key names in Sterling B2B Integrator. To find out about the existing keys in Sterling B2B Integrator, please check the",
        "type": "array",
        "required": false
      },
      {
        "name": "remoteUser",
        "label": "Remote User",
        "description": "SSH remote user name. Do not use spaces or special characters ( ! # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). This is a required field for API operation",
        "type": "text",
        "required": true
      },
      {
        "name": "preferredAuthenticationType",
        "label": "Preferred Authentication Type",
        "description": "Default set to PASSWORD",
        "type": "enum",
        "required": false,
        "options": [
          "PASSWORD",
          "PUBLIC_KEY"
        ]
      },
      {
        "name": "sshPassword",
        "label": "Ssh Password",
        "description": "Provide the remote profile password.",
        "type": "text",
        "required": false
      },
      {
        "name": "userIdentityKey",
        "label": "User Identity Key",
        "description": "Provide the existing user identity key name in Sterling B2B Integrator. To find out about the existing keys in Sterling B2B Integrator, please check t",
        "type": "text",
        "required": false
      },
      {
        "name": "directory",
        "label": "Directory",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "characterEncoding",
        "label": "Character Encoding",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "compression",
        "label": "Compression",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "NONE",
          "ZLIB"
        ]
      },
      {
        "name": "connectionRetryCount",
        "label": "Connection Retry Count",
        "description": "Connection retry count. Enter an integer value greater than 0.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "retryDelay",
        "label": "Retry Delay",
        "description": "Retry delay. Enter an integer value greater than 0.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "responseTimeOut",
        "label": "Response Time Out",
        "description": "Response timeout. Enter an integer value greater than 0.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "preferredCipher",
        "label": "Preferred Cipher",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "3DES-CBC",
          "AES128-CBC",
          "AES128-CTR",
          "AES192-CBC",
          "AES192-CTR",
          "AES256-CBC",
          "AES256-CTR",
          "BLOWFISH-CBC",
          "CAST128-CBC",
          "TWOFISH128-CBC",
          "TWOFISH192-CBC",
          "TWOFISH256-CBC"
        ]
      },
      {
        "name": "preferredMacAlgorithm",
        "label": "Preferred Mac Algorithm",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "HMAC-MD5",
          "HMAC-SHA1",
          "HMAC-SHA2-256"
        ]
      },
      {
        "name": "localPortRange",
        "label": "Local Port Range",
        "description": "SSH local port details. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ).",
        "type": "text",
        "required": false
      }
    ],
    "update": [
      {
        "name": "profileName",
        "label": "Profile Name",
        "description": "SSH remote profile name. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). This is a required field for API oper",
        "type": "text",
        "required": true
      },
      {
        "name": "remoteHost",
        "label": "Remote Host",
        "description": "SSH remote host details. Enter either host name or host IP. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). Th",
        "type": "text",
        "required": true
      },
      {
        "name": "remotePort",
        "label": "Remote Port",
        "description": "SSH remote profile port number. Enter an integer value greater than 0. This is a required field for API operation.",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "remoteUser",
        "label": "Remote User",
        "description": "SSH remote user name. Do not use spaces or special characters ( ! # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). This is a required field for API operation",
        "type": "text",
        "required": true
      },
      {
        "name": "knownHostKeys",
        "label": "Known Host Keys",
        "description": "Provide the existing known host key names in Sterling B2B Integrator. To find out about the existing keys in Sterling B2B Integrator, please check the",
        "type": "array",
        "required": false
      },
      {
        "name": "preferredAuthenticationType",
        "label": "Preferred Authentication Type",
        "description": "Default set to PASSWORD",
        "type": "enum",
        "required": false,
        "options": [
          "PASSWORD",
          "PUBLIC_KEY"
        ]
      },
      {
        "name": "sshPassword",
        "label": "Ssh Password",
        "description": "Provide the remote profile password.",
        "type": "text",
        "required": false
      },
      {
        "name": "userIdentityKey",
        "label": "User Identity Key",
        "description": "Provide the existing user identity key name in Sterling B2B Integrator. To find out about the existing keys in Sterling B2B Integrator, please check t",
        "type": "text",
        "required": false
      },
      {
        "name": "directory",
        "label": "Directory",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "characterEncoding",
        "label": "Character Encoding",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "compression",
        "label": "Compression",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "NONE",
          "ZLIB"
        ]
      },
      {
        "name": "connectionRetryCount",
        "label": "Connection Retry Count",
        "description": "Connection retry count. Enter an integer value greater than 0.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "retryDelay",
        "label": "Retry Delay",
        "description": "Retry delay. Enter an integer value greater than 0.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "responseTimeOut",
        "label": "Response Time Out",
        "description": "Response timeout. Enter an integer value greater than 0.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "preferredCipher",
        "label": "Preferred Cipher",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "3DES-CBC",
          "AES128-CBC",
          "AES128-CTR",
          "AES192-CBC",
          "AES192-CTR",
          "AES256-CBC",
          "AES256-CTR",
          "BLOWFISH-CBC",
          "CAST128-CBC",
          "TWOFISH128-CBC",
          "TWOFISH192-CBC",
          "TWOFISH256-CBC"
        ]
      },
      {
        "name": "preferredMacAlgorithm",
        "label": "Preferred Mac Algorithm",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "HMAC-MD5",
          "HMAC-SHA1",
          "HMAC-SHA2-256"
        ]
      },
      {
        "name": "localPortRange",
        "label": "Local Port Range",
        "description": "SSH local port details. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ).",
        "type": "text",
        "required": false
      }
    ]
  },
  "/sshuseridentitykeys": {
    "create": [
      {
        "name": "keyName",
        "label": "Key Name",
        "description": "Key name. Do not use spaces or special characters ( ! @ # % ^ * ( ) + ? , < > { } [ ] | ; \\\" ' ). This is a required field for API operation.",
        "type": "text",
        "required": true
      },
      {
        "name": "passPhrase",
        "label": "Pass Phrase",
        "description": "A passphrase is a string of characters longer than the usual password.",
        "type": "text",
        "required": false
      },
      {
        "name": "keyStatusEnabled",
        "label": "Key Status Enabled",
        "description": "Key Status. Set to false for disabled or true for enabled.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "privateKeyData",
        "label": "Private Key Data",
        "description": "A Base 64-encoded string representation of the private key. This is a required field for API operation.",
        "type": "text",
        "required": true
      }
    ],
    "update": [
      {
        "name": "keyStatusEnabled",
        "label": "Key Status Enabled",
        "description": "Key Status. Set to false for disabled or true for enabled.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ]
  },
  "/sterlingconnectdirectnetmaps": {
    "create": [
      {
        "name": "name",
        "label": "Name",
        "description": "Netmap names consist of alphanumeric, dollar ($), dot (.), underscore (_), and dash (–) characters. The maximum length is 64 characters.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Description about netmap",
        "type": "text",
        "required": true
      }
    ],
    "update": [
      {
        "name": "description",
        "label": "Description",
        "description": "Description about netmap",
        "type": "text",
        "required": true
      }
    ]
  },
  "/sterlingconnectdirectnetmapxrefs": {
    "create": [
      {
        "name": "netMapName",
        "label": "Net Map Name",
        "description": "Enter the already exisiting Connect:Direct netmap name.",
        "type": "text",
        "required": false
      },
      {
        "name": "nodes",
        "label": "Nodes",
        "description": "Provide a set of existing nodes to the cross reference.",
        "type": "array",
        "required": true
      }
    ]
  },
  "/sterlingconnectdirectnodes": {
    "update": [
      {
        "name": "serverHost",
        "label": "Server Host",
        "description": "Host name or IP address for the Sterling Connect:Direct server.",
        "type": "text",
        "required": true
      },
      {
        "name": "serverPort",
        "label": "Server Port",
        "description": "Host port number for the Sterling Connect:Direct server. Enter the value between 1-32767",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "maxLocallyInitiatedPnodeSessionsAllowed",
        "label": "Max Locally Initiated Pnode Sessions Allowed",
        "description": "Enter the value between 1-99999",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "maxRemotelyInitiatedSnodeSessionsAllowed",
        "label": "Max Remotely Initiated Snode Sessions Allowed",
        "description": "Enter the value between 1-99999",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "alternateCommInfo",
        "label": "Alternate Comm Info",
        "description": "Leave this blank unless the inbound Sterling Connect:Direct node has more than one outgoing IP address. If the inbound Sterling Connect:Direct node ha",
        "type": "text",
        "required": false
      },
      {
        "name": "securePlusOption",
        "label": "Secure Plus Option",
        "description": "To disable or enable encryption.",
        "type": "enum",
        "required": true,
        "options": [
          "DISABLED",
          "ENABLED"
        ]
      },
      {
        "name": "securityProtocol",
        "label": "Security Protocol",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1",
          "2"
        ],
        "format": "int32"
      },
      {
        "name": "caCertificates",
        "label": "Ca Certificates",
        "description": "Set of valid CA certificate name.",
        "type": "array",
        "required": false
      },
      {
        "name": "systemCertificate",
        "label": "System Certificate",
        "description": "Valid System certificate name.",
        "type": "text",
        "required": false
      },
      {
        "name": "certificateCommonName",
        "label": "Certificate Common Name",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "cipherSuites",
        "label": "Cipher Suites",
        "description": "Set of valid Cipher Suite name.",
        "type": "array",
        "required": false
      },
      {
        "name": "requireClientAuthentication",
        "label": "Require Client Authentication",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "NO",
          "YES"
        ]
      }
    ],
    "create": [
      {
        "name": "serverNodeName",
        "label": "Server Node Name",
        "description": "Node name for the Sterling Connect:Direct server.",
        "type": "text",
        "required": true
      },
      {
        "name": "serverHost",
        "label": "Server Host",
        "description": "Host name or IP address for the Sterling Connect:Direct server.",
        "type": "text",
        "required": true
      },
      {
        "name": "serverPort",
        "label": "Server Port",
        "description": "Host port number for the Sterling Connect:Direct server. Enter the value between 1-32767",
        "type": "number",
        "required": true,
        "format": "int32"
      },
      {
        "name": "maxLocallyInitiatedPnodeSessionsAllowed",
        "label": "Max Locally Initiated Pnode Sessions Allowed",
        "description": "Enter the value between 1-99999",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "maxRemotelyInitiatedSnodeSessionsAllowed",
        "label": "Max Remotely Initiated Snode Sessions Allowed",
        "description": "Enter the value between 1-99999",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "alternateCommInfo",
        "label": "Alternate Comm Info",
        "description": "Leave this blank unless the inbound Sterling Connect:Direct node has more than one outgoing IP address. If the inbound Sterling Connect:Direct node ha",
        "type": "text",
        "required": false
      },
      {
        "name": "securePlusOption",
        "label": "Secure Plus Option",
        "description": "To disable or enable encryption.",
        "type": "enum",
        "required": true,
        "options": [
          "DISABLED",
          "ENABLED"
        ]
      },
      {
        "name": "securityProtocol",
        "label": "Security Protocol",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1",
          "2"
        ],
        "format": "int32"
      },
      {
        "name": "caCertificates",
        "label": "Ca Certificates",
        "description": "Set of valid CA certificate name.",
        "type": "array",
        "required": false
      },
      {
        "name": "systemCertificate",
        "label": "System Certificate",
        "description": "Valid System certificate name.",
        "type": "text",
        "required": false
      },
      {
        "name": "certificateCommonName",
        "label": "Certificate Common Name",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "cipherSuites",
        "label": "Cipher Suites",
        "description": "Set of valid Cipher Suite name.",
        "type": "array",
        "required": false
      },
      {
        "name": "requireClientAuthentication",
        "label": "Require Client Authentication",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "NO",
          "YES"
        ]
      }
    ]
  },
  "/systemdigitalcertificates": {
    "update": [
      {
        "name": "certName",
        "label": "Cert Name",
        "description": "Name of the certificate.",
        "type": "text",
        "required": true
      },
      {
        "name": "verifyValidity",
        "label": "Verify Validity",
        "description": "Flag to turn on verification of validity.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "verifyAuthChain",
        "label": "Verify Auth Chain",
        "description": "Flag to turn on verification of authentication chain.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "crlCache",
        "label": "Crl Cache",
        "description": "The crlCache field is an optional field needed for a PKCS12 certificate. (Ignored if it is provided for key certificate).",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ],
    "create": [
      {
        "name": "certType",
        "label": "Cert Type",
        "description": "The type of the certificate. Valid values are pcks12 and keyCert.",
        "type": "enum",
        "required": true,
        "options": [
          "keyCert",
          "pkcs12"
        ]
      },
      {
        "name": "certName",
        "label": "Cert Name",
        "description": "Name of the certificate.",
        "type": "text",
        "required": true
      },
      {
        "name": "certData",
        "label": "Cert Data",
        "description": "Base64-encoded string certificate data.",
        "type": "text",
        "required": true
      },
      {
        "name": "privateKeyPassword",
        "label": "Private Key Password",
        "description": "Private key password is needed for both PKCS12 and key certificates.",
        "type": "text",
        "required": true
      },
      {
        "name": "keyStorePassword",
        "label": "Key Store Password",
        "description": "Key store password is required for the PKCS12 certificate. Not needed for key certificate (ignored if mentioned).",
        "type": "text",
        "required": false
      },
      {
        "name": "verifyValidity",
        "label": "Verify Validity",
        "description": "Flag to turn on verification of validity.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "verifyAuthChain",
        "label": "Verify Auth Chain",
        "description": "Flag to turn on verification of authentication chain.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "crlCache",
        "label": "Crl Cache",
        "description": "The crlCache field is an optional field needed for a PKCS12 certificate. (Ignored if it is provided for key certificate).",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ]
  },
  "/tradingpartners": {
    "create": [
      {
        "name": "asciiArmor",
        "label": "Ascii Armor",
        "description": "Whether the \"ASCII Armor\" feature of PGP encryption technology should be used.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "addressLine1",
        "label": "Address Line1",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "addressLine2",
        "label": "Address Line2",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "authenticationType",
        "label": "Authentication Type",
        "description": "If this is set to \"Local\", you must specify a password for the trading partner. If this is set to \"External\", you must choose an authentication host f",
        "type": "enum",
        "required": true,
        "options": [
          "External",
          "Local"
        ]
      },
      {
        "name": "city",
        "label": "City",
        "description": "Warning: This will be truncated to a length of 35",
        "type": "text",
        "required": false
      },
      {
        "name": "countryOrRegion",
        "label": "Country Or Region",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "AF",
          "AX",
          "AL",
          "DZ",
          "AS",
          "AD",
          "AO",
          "AI",
          "AQ",
          "AG",
          "AR",
          "AM",
          "AW",
          "AU",
          "AT",
          "AZ",
          "BS",
          "BH",
          "BD",
          "BB",
          "BY",
          "BE",
          "BZ",
          "BJ",
          "BM",
          "BT",
          "BO",
          "BQ",
          "BA",
          "BW",
          "BV",
          "BR",
          "IO",
          "BN",
          "BG",
          "BF",
          "BI",
          "KH",
          "CM",
          "CA",
          "CV",
          "KY",
          "CF",
          "TD",
          "CL",
          "CN",
          "CX",
          "CC",
          "CO",
          "KM",
          "CG",
          "CD",
          "CK",
          "CR",
          "CI",
          "HR",
          "CU",
          "CW",
          "CY",
          "CZ",
          "CS",
          "DK",
          "DJ",
          "DM",
          "DO",
          "TP",
          "EC",
          "EG",
          "SV",
          "GQ",
          "ER",
          "EE",
          "ET",
          "FK",
          "FO",
          "FJ",
          "FI",
          "FR",
          "GF",
          "PF",
          "TF",
          "GA",
          "GM",
          "GE",
          "DE",
          "GH",
          "GI",
          "GR",
          "GL",
          "GD",
          "GP",
          "GU",
          "GT",
          "GG",
          "GN",
          "GW",
          "GY",
          "HT",
          "HM",
          "HN",
          "HK",
          "HU",
          "IS",
          "IN",
          "ID",
          "IR",
          "IQ",
          "IE",
          "IM",
          "IL",
          "IT",
          "JM",
          "JP",
          "JE",
          "JO",
          "KZ",
          "KE",
          "KI",
          "KP",
          "KR",
          "KW",
          "KG",
          "LA",
          "LV",
          "LB",
          "LS",
          "LR",
          "LY",
          "LI",
          "LT",
          "LU",
          "MO",
          "MK",
          "MG",
          "MW",
          "MY",
          "MV",
          "ML",
          "MT",
          "MH",
          "MQ",
          "MR",
          "MU",
          "YT",
          "MX",
          "FM",
          "MD",
          "MC",
          "MN",
          "ME",
          "MS",
          "MA",
          "MZ",
          "MM",
          "NA",
          "NR",
          "NP",
          "NL",
          "AN",
          "NT",
          "NC",
          "NZ",
          "NI",
          "NE",
          "NG",
          "NU",
          "NF",
          "MP",
          "NO",
          "OM",
          "PK",
          "PW",
          "PS",
          "PA",
          "PG",
          "PY",
          "PE",
          "PH",
          "PN",
          "PL",
          "PT",
          "PR",
          "QA",
          "RE",
          "RO",
          "RU",
          "RW",
          "BL",
          "KN",
          "LC",
          "MF",
          "VC",
          "WS",
          "SM",
          "ST",
          "SA",
          "SN",
          "RS",
          "SC",
          "SL",
          "SG",
          "SX",
          "SK",
          "SI",
          "SB",
          "SO",
          "ZA",
          "GS",
          "SS",
          "SP",
          "LK",
          "SH",
          "PM",
          "SD",
          "SR",
          "SJ",
          "SZ",
          "SE",
          "CH",
          "SY",
          "TW",
          "TJ",
          "TZ",
          "TH",
          "TL",
          "TG",
          "TK",
          "TO",
          "TT",
          "TN",
          "TR",
          "TM",
          "TC",
          "TV",
          "UG",
          "UA",
          "AE",
          "GB",
          "US",
          "UM",
          "UY",
          "UZ",
          "VU",
          "VA",
          "VE",
          "VN",
          "VG",
          "VI",
          "WF",
          "EH",
          "YE",
          "YU",
          "ZM",
          "ZW"
        ]
      },
      {
        "name": "doesRequireCompressedData",
        "label": "Does Require Compressed Data",
        "description": "Whether the trading partner requires data to be compressed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "doesRequireEncryptedData",
        "label": "Does Require Encrypted Data",
        "description": "Whether the trading partner requires data to be encrypted.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "doesRequireSignedData",
        "label": "Does Require Signed Data",
        "description": "Whether the trading partner requires data to be signed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "doesUseSSH",
        "label": "Does Use S S H",
        "description": "Whether the partner uses SSH/SFTP or SSH/SCP protocol to initiate connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "emailAddress",
        "label": "Email Address",
        "description": "The trading partner's email address.",
        "type": "text",
        "required": true
      },
      {
        "name": "useGlobalMailbox",
        "label": "Use Global Mailbox",
        "description": "When \"Global Mailbox\" is selected, partner mailboxes and related objects are created in the Global Mailbox realm.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "givenName",
        "label": "Given Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "keyEnabled",
        "label": "Key Enabled",
        "description": "Whether the trading partner's authorized user key should be enabled.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "password",
        "label": "Password",
        "description": "The password the trading partner uses to log in. Password length should be between 6 and 128 characters.",
        "type": "text",
        "required": false
      },
      {
        "name": "passwordPolicy",
        "label": "Password Policy",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "postalCode",
        "label": "Postal Code",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "sessionTimeout",
        "label": "Session Timeout",
        "description": "The amount of time before the session expires and the partner is required to log in again(in minutes).",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "stateOrProvince",
        "label": "State Or Province",
        "description": "Warning: This will be truncated to a length of 35",
        "type": "text",
        "required": false
      },
      {
        "name": "surname",
        "label": "Surname",
        "description": "The surname or family name for the contact on file for this trading partner.",
        "type": "text",
        "required": true
      },
      {
        "name": "textMode",
        "label": "Text Mode",
        "description": "Whether FTP connections should use \"text mode\" instead of binary.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "username",
        "label": "Username",
        "description": "The username the trading partner uses to log in. Username length should be between 5 and 36 characters.",
        "type": "text",
        "required": true
      },
      {
        "name": "community",
        "label": "Community",
        "description": "The community to which this trading partner belongs.",
        "type": "text",
        "required": true
      },
      {
        "name": "authenticationHost",
        "label": "Authentication Host",
        "description": "Specify a valid external authentication host here, or leave this field blank to default to the first host in the list.",
        "type": "text",
        "required": false
      },
      {
        "name": "publicKeyID",
        "label": "Public Key I D",
        "description": "The key ID of the public key to be used for encryption. A corresponding key must already exist in the public key ring in order to use this parameter.",
        "type": "text",
        "required": false
      },
      {
        "name": "timeZone",
        "label": "Time Zone",
        "description": "Please select the appropriate time zone.",
        "type": "enum",
        "required": false,
        "options": [
          "-01",
          "-011",
          "-02",
          "-031",
          "-032",
          "-033",
          "-03",
          "-04",
          "-041",
          "-042",
          "-051",
          "-05",
          "-052",
          "-061",
          "-06",
          "-062",
          "-063",
          "-07",
          "-08",
          "-09",
          "-10",
          "-11",
          "-12",
          "0",
          "01",
          "+01",
          "+011",
          "+012",
          "+013",
          "+014",
          "+02",
          "+021",
          "+022",
          "+03",
          "+031",
          "+032",
          "+04",
          "+041",
          "+05",
          "+051",
          "+0530",
          "+054",
          "+06",
          "+061",
          "+063",
          "+07",
          "+071",
          "+08",
          "+081",
          "+082",
          "+083",
          "+09",
          "+091",
          "+093",
          "+10",
          "+101",
          "+11",
          "+12"
        ]
      },
      {
        "name": "code",
        "label": "Code",
        "description": "The partner code field is optional. If not specified, a partner code is generated based on the partner name, up to the first 24 alphanumeric character",
        "type": "text",
        "required": false
      },
      {
        "name": "phone",
        "label": "Phone",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "partnerName",
        "label": "Partner Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "producerFtpConfiguration",
        "label": "Producer Ftp Configuration",
        "description": "Fields for a Listening Producer using FTP",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "remoteFilePattern",
        "label": "Remote File Pattern",
        "description": "The name or pattern of the remote file(s) a Listening Producer should pull from the remote server. This field is required for C:D and must be a full p",
        "type": "text",
        "required": false
      },
      {
        "name": "mailbox",
        "label": "Mailbox",
        "description": "SFG mailbox for a Listening Producer to put file(s) into from the remote server. If none is provided it is defaulted to /TpName",
        "type": "text",
        "required": false
      },
      {
        "name": "pollingInterval",
        "label": "Polling Interval",
        "description": "How often (in minutes) a Listening Producer should check the remote server for file(s)",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerCdConfiguration",
        "label": "Consumer Cd Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerFtpConfiguration",
        "label": "Consumer Ftp Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerFtpsConfiguration",
        "label": "Consumer Ftps Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerSshConfiguration",
        "label": "Consumer Ssh Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerWsConfiguration",
        "label": "Consumer Ws Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "isInitiatingConsumer",
        "label": "Is Initiating Consumer",
        "description": "Whether the Trading Partner is an Initiating Consumer",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "isInitiatingProducer",
        "label": "Is Initiating Producer",
        "description": "Whether the Trading Partner is an Initiating Producer",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "isListeningConsumer",
        "label": "Is Listening Consumer",
        "description": "Whether the Trading Partner is a Listening Consumer",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "isListeningProducer",
        "label": "Is Listening Producer",
        "description": "Whether the Trading Partner is a Listening Producer",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "producerFtpsConfiguration",
        "label": "Producer Ftps Configuration",
        "description": "Fields for a Listening Producer using FTPS",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "producerSshConfiguration",
        "label": "Producer Ssh Configuration",
        "description": "Fields for a Listening Producer using SSH",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "producerCdConfiguration",
        "label": "Producer Cd Configuration",
        "description": "Fields for a Listening Producer using a remote Connect:Direct node",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "appendSuffixToUsername",
        "label": "Append Suffix To Username",
        "description": "If true, will ensure uniqueness of the username by appending a numbered suffix. The default is false.",
        "type": "enum",
        "required": false,
        "options": [
          "False",
          "True"
        ]
      },
      {
        "name": "authorizedUserKeyName",
        "label": "Authorized User Key Name",
        "description": "The name for this authorized user key.",
        "type": "text",
        "required": false
      },
      {
        "name": "customProtocolName",
        "label": "Custom Protocol Name",
        "description": "The protocol name as mentioned in the AFTExtensionsCustomer file.",
        "type": "text",
        "required": false
      },
      {
        "name": "customProtocolExtensions",
        "label": "Custom Protocol Extensions",
        "description": "A set of valid custom protocol extensions used for the custom protocol. This field should contain sets of extensions separated by commas. Each set of ",
        "type": "text",
        "required": false
      },
      {
        "name": "targetFileEncoding",
        "label": "Target File Encoding",
        "description": "Consumer Partner target File Encoding",
        "type": "text",
        "required": false
      }
    ],
    "update": [
      {
        "name": "asciiArmor",
        "label": "Ascii Armor",
        "description": "Whether the \"ASCII Armor\" feature of PGP encryption technology should be used.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "addressLine1",
        "label": "Address Line1",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "addressLine2",
        "label": "Address Line2",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "authenticationHost",
        "label": "Authentication Host",
        "description": "Specify a valid external authentication host here, or leave this field blank to default to the first host in the list.",
        "type": "text",
        "required": false
      },
      {
        "name": "authenticationType",
        "label": "Authentication Type",
        "description": "If this is set to \"Local\", you must specify a password for the trading partner. If this is set to \"External\", you must choose an authentication host f",
        "type": "enum",
        "required": true,
        "options": [
          "External",
          "Local"
        ]
      },
      {
        "name": "city",
        "label": "City",
        "description": "Warning: This will be truncated to a length of 35",
        "type": "text",
        "required": false
      },
      {
        "name": "community",
        "label": "Community",
        "description": "The community to which this trading partner belongs.",
        "type": "text",
        "required": true
      },
      {
        "name": "countryOrRegion",
        "label": "Country Or Region",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "AF",
          "AX",
          "AL",
          "DZ",
          "AS",
          "AD",
          "AO",
          "AI",
          "AQ",
          "AG",
          "AR",
          "AM",
          "AW",
          "AU",
          "AT",
          "AZ",
          "BS",
          "BH",
          "BD",
          "BB",
          "BY",
          "BE",
          "BZ",
          "BJ",
          "BM",
          "BT",
          "BO",
          "BQ",
          "BA",
          "BW",
          "BV",
          "BR",
          "IO",
          "BN",
          "BG",
          "BF",
          "BI",
          "KH",
          "CM",
          "CA",
          "CV",
          "KY",
          "CF",
          "TD",
          "CL",
          "CN",
          "CX",
          "CC",
          "CO",
          "KM",
          "CG",
          "CD",
          "CK",
          "CR",
          "CI",
          "HR",
          "CU",
          "CW",
          "CY",
          "CZ",
          "CS",
          "DK",
          "DJ",
          "DM",
          "DO",
          "TP",
          "EC",
          "EG",
          "SV",
          "GQ",
          "ER",
          "EE",
          "ET",
          "FK",
          "FO",
          "FJ",
          "FI",
          "FR",
          "GF",
          "PF",
          "TF",
          "GA",
          "GM",
          "GE",
          "DE",
          "GH",
          "GI",
          "GR",
          "GL",
          "GD",
          "GP",
          "GU",
          "GT",
          "GG",
          "GN",
          "GW",
          "GY",
          "HT",
          "HM",
          "HN",
          "HK",
          "HU",
          "IS",
          "IN",
          "ID",
          "IR",
          "IQ",
          "IE",
          "IM",
          "IL",
          "IT",
          "JM",
          "JP",
          "JE",
          "JO",
          "KZ",
          "KE",
          "KI",
          "KP",
          "KR",
          "KW",
          "KG",
          "LA",
          "LV",
          "LB",
          "LS",
          "LR",
          "LY",
          "LI",
          "LT",
          "LU",
          "MO",
          "MK",
          "MG",
          "MW",
          "MY",
          "MV",
          "ML",
          "MT",
          "MH",
          "MQ",
          "MR",
          "MU",
          "YT",
          "MX",
          "FM",
          "MD",
          "MC",
          "MN",
          "ME",
          "MS",
          "MA",
          "MZ",
          "MM",
          "NA",
          "NR",
          "NP",
          "NL",
          "AN",
          "NT",
          "NC",
          "NZ",
          "NI",
          "NE",
          "NG",
          "NU",
          "NF",
          "MP",
          "NO",
          "OM",
          "PK",
          "PW",
          "PS",
          "PA",
          "PG",
          "PY",
          "PE",
          "PH",
          "PN",
          "PL",
          "PT",
          "PR",
          "QA",
          "RE",
          "RO",
          "RU",
          "RW",
          "BL",
          "KN",
          "LC",
          "MF",
          "VC",
          "WS",
          "SM",
          "ST",
          "SA",
          "SN",
          "RS",
          "SC",
          "SL",
          "SG",
          "SX",
          "SK",
          "SI",
          "SB",
          "SO",
          "ZA",
          "GS",
          "SS",
          "SP",
          "LK",
          "SH",
          "PM",
          "SD",
          "SR",
          "SJ",
          "SZ",
          "SE",
          "CH",
          "SY",
          "TW",
          "TJ",
          "TZ",
          "TH",
          "TL",
          "TG",
          "TK",
          "TO",
          "TT",
          "TN",
          "TR",
          "TM",
          "TC",
          "TV",
          "UG",
          "UA",
          "AE",
          "GB",
          "US",
          "UM",
          "UY",
          "UZ",
          "VU",
          "VA",
          "VE",
          "VN",
          "VG",
          "VI",
          "WF",
          "EH",
          "YE",
          "YU",
          "ZM",
          "ZW"
        ]
      },
      {
        "name": "doesRequireCompressedData",
        "label": "Does Require Compressed Data",
        "description": "Whether the trading partner requires data to be compressed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "doesRequireEncryptedData",
        "label": "Does Require Encrypted Data",
        "description": "Whether the trading partner requires data to be encrypted.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "doesRequireSignedData",
        "label": "Does Require Signed Data",
        "description": "Whether the trading partner requires data to be signed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "doesUseSSH",
        "label": "Does Use S S H",
        "description": "Whether the partner uses SSH/SFTP or SSH/SCP protocol to initiate connections.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "emailAddress",
        "label": "Email Address",
        "description": "The trading partner's email address.",
        "type": "text",
        "required": true
      },
      {
        "name": "useGlobalMailbox",
        "label": "Use Global Mailbox",
        "description": "When \"Global Mailbox\" is selected, partner mailboxes and related objects are created in the Global Mailbox realm.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "password",
        "label": "Password",
        "description": "The password the trading partner uses to log in. Password length should be between 6 and 128 characters.",
        "type": "text",
        "required": false
      },
      {
        "name": "passwordPolicy",
        "label": "Password Policy",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "postalCode",
        "label": "Postal Code",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "sessionTimeout",
        "label": "Session Timeout",
        "description": "The amount of time before the session expires and the partner is required to log in again(in minutes).",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "stateOrProvince",
        "label": "State Or Province",
        "description": "Warning: This will be truncated to a length of 35",
        "type": "text",
        "required": false
      },
      {
        "name": "textMode",
        "label": "Text Mode",
        "description": "Whether FTP connections should use \"text mode\" instead of binary.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "timeZone",
        "label": "Time Zone",
        "description": "Please select the appropriate time zone.",
        "type": "enum",
        "required": false,
        "options": [
          "-01",
          "-011",
          "-02",
          "-031",
          "-032",
          "-033",
          "-03",
          "-04",
          "-041",
          "-042",
          "-051",
          "-05",
          "-052",
          "-061",
          "-06",
          "-062",
          "-063",
          "-07",
          "-08",
          "-09",
          "-10",
          "-11",
          "-12",
          "0",
          "01",
          "+01",
          "+011",
          "+012",
          "+013",
          "+014",
          "+02",
          "+021",
          "+022",
          "+03",
          "+031",
          "+032",
          "+04",
          "+041",
          "+05",
          "+051",
          "+0530",
          "+054",
          "+06",
          "+061",
          "+063",
          "+07",
          "+071",
          "+08",
          "+081",
          "+082",
          "+083",
          "+09",
          "+091",
          "+093",
          "+10",
          "+101",
          "+11",
          "+12"
        ]
      },
      {
        "name": "givenName",
        "label": "Given Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "surname",
        "label": "Surname",
        "description": "The surname or family name for the contact on file for this trading partner.",
        "type": "text",
        "required": true
      },
      {
        "name": "publicKeyID",
        "label": "Public Key I D",
        "description": "The key ID of the public key to be used for encryption. A corresponding key must already exist in the public key ring in order to use this parameter.",
        "type": "text",
        "required": false
      },
      {
        "name": "phone",
        "label": "Phone",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "consumerSshConfiguration",
        "label": "Consumer Ssh Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerFtpsConfiguration",
        "label": "Consumer Ftps Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerFtpConfiguration",
        "label": "Consumer Ftp Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerCdConfiguration",
        "label": "Consumer Cd Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "consumerWsConfiguration",
        "label": "Consumer Ws Configuration",
        "description": "",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "isInitiatingConsumer",
        "label": "Is Initiating Consumer",
        "description": "Whether the Trading Partner is an Initiating Consumer",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "isInitiatingProducer",
        "label": "Is Initiating Producer",
        "description": "Whether the Trading Partner is an Initiating Producer",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "isListeningConsumer",
        "label": "Is Listening Consumer",
        "description": "Whether the Trading Partner is a Listening Consumer",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "isListeningProducer",
        "label": "Is Listening Producer",
        "description": "Whether the Trading Partner is a Listening Producer",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "producerFtpConfiguration",
        "label": "Producer Ftp Configuration",
        "description": "Fields for a Listening Producer using FTP",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "producerCdConfiguration",
        "label": "Producer Cd Configuration",
        "description": "Fields for a Listening Producer using a remote Connect:Direct node",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "producerFtpsConfiguration",
        "label": "Producer Ftps Configuration",
        "description": "Fields for a Listening Producer using FTPS",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "producerSshConfiguration",
        "label": "Producer Ssh Configuration",
        "description": "Fields for a Listening Producer using SSH",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "mailbox",
        "label": "Mailbox",
        "description": "SFG mailbox for a Listening Producer to put file(s) into from the remote server. If none is provided it is defaulted to /TpName",
        "type": "text",
        "required": false
      },
      {
        "name": "pollingInterval",
        "label": "Polling Interval",
        "description": "How often (in minutes) a Listening Producer should check the remote server for file(s)",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "remoteFilePattern",
        "label": "Remote File Pattern",
        "description": "The name or pattern of the remote file(s) a Listening Producer should pull from the remote server. This field is required for C:D and must be a full p",
        "type": "text",
        "required": false
      },
      {
        "name": "authorizedUserKeyName",
        "label": "Authorized User Key Name",
        "description": "The name for this authorized user key.",
        "type": "text",
        "required": false
      },
      {
        "name": "customProtocolName",
        "label": "Custom Protocol Name",
        "description": "The protocol name as mentioned in the AFTExtensionsCustomer file.",
        "type": "text",
        "required": false
      },
      {
        "name": "customProtocolExtensions",
        "label": "Custom Protocol Extensions",
        "description": "A set of valid custom protocol extensions used for the custom protocol. This field should contain sets of extensions separated by commas. Each set of ",
        "type": "text",
        "required": false
      },
      {
        "name": "targetFileEncoding",
        "label": "Target File Encoding",
        "description": "Consumer Partner target File Encoding",
        "type": "text",
        "required": false
      }
    ]
  },
  "/trusteddigitalcertificates": {
    "update": [
      {
        "name": "certName",
        "label": "Cert Name",
        "description": "Name of the certificate.",
        "type": "text",
        "required": true
      },
      {
        "name": "verifyValidity",
        "label": "Verify Validity",
        "description": "Flag to turn on verification of validity.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "verifyAuthChain",
        "label": "Verify Auth Chain",
        "description": "Flag to turn on verification of the authentication chain.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ],
    "create": [
      {
        "name": "certName",
        "label": "Cert Name",
        "description": "Name of the certificate.",
        "type": "text",
        "required": true
      },
      {
        "name": "certData",
        "label": "Cert Data",
        "description": "Base64-encoded string certificate data.",
        "type": "text",
        "required": true
      },
      {
        "name": "verifyValidity",
        "label": "Verify Validity",
        "description": "Flag to turn on verification of validity.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "verifyAuthChain",
        "label": "Verify Auth Chain",
        "description": "Flag to turn on verification of the authentication chain.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ]
  },
  "/uibrandings": {
    "update": [
      {
        "name": "fileContents",
        "label": "File Contents",
        "description": "File contents of the UI Branding.",
        "type": "text",
        "required": true
      }
    ]
  },
  "/useraccounts": {
    "create": [
      {
        "name": "authenticationType",
        "label": "Authentication Type",
        "description": "How the user should be authenticated (internally, with a password, or externally, with an authentication host).",
        "type": "enum",
        "required": true,
        "options": [
          "Both",
          "External",
          "Local"
        ]
      },
      {
        "name": "email",
        "label": "Email",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "givenName",
        "label": "Given Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "managerId",
        "label": "Manager Id",
        "description": "The user ID of another valid user who could be considered this user's manager.",
        "type": "text",
        "required": false
      },
      {
        "name": "pager",
        "label": "Pager",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "password",
        "label": "Password",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "policy",
        "label": "Policy",
        "description": "The policy to use when deciding what constitutes a valid password for this user.",
        "type": "text",
        "required": false
      },
      {
        "name": "preferredLanguage",
        "label": "Preferred Language",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "zh",
          "zh-tw",
          "nl",
          "en",
          "fr",
          "de",
          "it",
          "ja",
          "ko",
          "pt-br",
          "es",
          "xx"
        ]
      },
      {
        "name": "sessionTimeout",
        "label": "Session Timeout",
        "description": "How long before the user's session times out and they're required to log in again (in minutes).",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "surname",
        "label": "Surname",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "userId",
        "label": "User Id",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "userIdentity",
        "label": "User Identity",
        "description": "The organization or trading partner to associate with this user.",
        "type": "text",
        "required": false
      },
      {
        "name": "authenticationHost",
        "label": "Authentication Host",
        "description": "The authentication host for use with external authentication.",
        "type": "text",
        "required": false
      },
      {
        "name": "authorizedUserKeys",
        "label": "Authorized User Keys",
        "description": "A set of valid authorized user keys to associate with the user.",
        "type": "array",
        "required": false
      },
      {
        "name": "groups",
        "label": "Groups",
        "description": "Valid groups in which this user should be placed.",
        "type": "array",
        "required": false
      },
      {
        "name": "permissions",
        "label": "Permissions",
        "description": "A set of valid permissions to grant this user.",
        "type": "array",
        "required": false
      }
    ],
    "update": [
      {
        "name": "authenticationType",
        "label": "Authentication Type",
        "description": "How the user should be authenticated (internally, with a password, or externally, with an authentication host).",
        "type": "enum",
        "required": true,
        "options": [
          "Both",
          "External",
          "Local"
        ]
      },
      {
        "name": "email",
        "label": "Email",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "givenName",
        "label": "Given Name",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "managerId",
        "label": "Manager Id",
        "description": "The user ID of another valid user who could be considered this user's manager.",
        "type": "text",
        "required": false
      },
      {
        "name": "pager",
        "label": "Pager",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "password",
        "label": "Password",
        "description": "",
        "type": "text",
        "required": false
      },
      {
        "name": "policy",
        "label": "Policy",
        "description": "The policy to use when deciding what constitutes a valid password for this user.",
        "type": "text",
        "required": false
      },
      {
        "name": "preferredLanguage",
        "label": "Preferred Language",
        "description": "",
        "type": "enum",
        "required": false,
        "options": [
          "zh",
          "zh-tw",
          "nl",
          "en",
          "fr",
          "de",
          "it",
          "ja",
          "ko",
          "pt-br",
          "es",
          "xx"
        ]
      },
      {
        "name": "sessionTimeout",
        "label": "Session Timeout",
        "description": "How long before the user's session times out and they're required to log in again (in minutes).",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "surname",
        "label": "Surname",
        "description": "",
        "type": "text",
        "required": true
      },
      {
        "name": "userIdentity",
        "label": "User Identity",
        "description": "The organization or trading partner to associate with this user.",
        "type": "text",
        "required": false
      },
      {
        "name": "authorizedUserKeys",
        "label": "Authorized User Keys",
        "description": "A set of valid authorized user keys to associate with the user.",
        "type": "array",
        "required": false
      },
      {
        "name": "groups",
        "label": "Groups",
        "description": "Valid groups in which this user should be placed.",
        "type": "array",
        "required": false
      },
      {
        "name": "permissions",
        "label": "Permissions",
        "description": "A set of valid permissions to grant this user.",
        "type": "array",
        "required": false
      },
      {
        "name": "authenticationHost",
        "label": "Authentication Host",
        "description": "The authentication host for use with external authentication.",
        "type": "text",
        "required": false
      }
    ]
  },
  "/userexits": {
    "update": [
      {
        "name": "vendorVersion",
        "label": "Vendor Version",
        "description": "Vendor version of the user exit file.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Description for the user exit.",
        "type": "text",
        "required": false
      },
      {
        "name": "nodeList",
        "label": "Node List",
        "description": "List of available Sterling B2B Integrator nodes.",
        "type": "text",
        "required": false
      },
      {
        "name": "generalAttributes",
        "label": "General Attributes",
        "description": "General properties of the user exit.",
        "type": "array",
        "required": false
      },
      {
        "name": "implementations",
        "label": "Implementations",
        "description": "Names of the user exit Java classes that implement the specified user exit interface.",
        "type": "array",
        "required": false
      },
      {
        "name": "fileContents",
        "label": "File Contents",
        "description": "Details of the content of file, being uploaded.",
        "type": "text",
        "required": false
      },
      {
        "name": "fileName",
        "label": "File Name",
        "description": "Unique name for the user exit file.",
        "type": "text",
        "required": false
      }
    ],
    "create": [
      {
        "name": "vendorName",
        "label": "Vendor Name",
        "description": "Vendor name of the user exit file.",
        "type": "text",
        "required": true
      },
      {
        "name": "vendorVersion",
        "label": "Vendor Version",
        "description": "Vendor version of the user exit file.",
        "type": "text",
        "required": true
      },
      {
        "name": "nodeList",
        "label": "Node List",
        "description": "List of available nodes.",
        "type": "text",
        "required": false
      },
      {
        "name": "description",
        "label": "Description",
        "description": "Description for the user exit.",
        "type": "text",
        "required": false
      },
      {
        "name": "userExitType",
        "label": "User Exit Type",
        "description": "Type of user exit.",
        "type": "enum",
        "required": true,
        "options": [
          "ftp_server",
          "mailbox",
          "sftp_server",
          "user_login",
          "user_logout"
        ]
      },
      {
        "name": "subType",
        "label": "Sub Type",
        "description": "Sub type of the user exit.",
        "type": "enum",
        "required": true,
        "options": [
          "IUserLogoutUserExit_beforeSessionDestroyed",
          "IFtpServerUserExit_OnCwdCommandBeforeExecute",
          "IFtpServerUserExit_OnFileReceiveBeforeCommit",
          "IFtpServerUserExit_OnGetFileAfterExecute",
          "IFtpServerUserExit_OnGetFileBeforeExecute",
          "IMailboxUserExit_OnMailboxCreate",
          "IMailboxUserExit_OnMailboxDeleteSet",
          "IMailboxUserExit_OnMailboxUpdate",
          "IMailboxUserExit_OnMessageAdd",
          "IMailboxUserExit_OnMessageDelete",
          "IMailboxUserExit_OnMessageExtract",
          "IMailboxUserExit_OnMessageExtractBegin",
          "IFtpServerUserExit_OnPutFileAfterExecute",
          "IFtpServerUserExit_OnPutFileBeforeExecute",
          "IFtpServerUserExit_OnUnknownSiteSubCommand",
          "IUserLoginUserExit_postAuthenticateFail",
          "IUserLoginUserExit_postAuthenticateSuccess",
          "IUserLoginUserExit_preAuthenticate",
          "ISftpServerUserExit_OnGetFileAfterExecute",
          "ISftpServerUserExit_OnGetFileBeforeExecute",
          "ISftpServerUserExit_OnPutFileAfterExecute",
          "ISftpServerUserExit_OnPutFileBeforeExecute"
        ]
      },
      {
        "name": "fileName",
        "label": "File Name",
        "description": "Unique name for the user exit file.",
        "type": "text",
        "required": false
      },
      {
        "name": "fileContents",
        "label": "File Contents",
        "description": "Details of the content of file, being uploaded.",
        "type": "text",
        "required": true
      },
      {
        "name": "generalAttributes",
        "label": "General Attributes",
        "description": "General properties of the user exit.",
        "type": "array",
        "required": false
      },
      {
        "name": "implementations",
        "label": "Implementations",
        "description": "Names of the user exit Java classes that implement the specified user exit interface.",
        "type": "array",
        "required": true
      }
    ]
  },
  "/usergroups": {
    "create": [
      {
        "name": "groupName",
        "label": "Group Name",
        "description": "Group name for the group. Must be unique among other group names.",
        "type": "text",
        "required": true
      },
      {
        "name": "groupID",
        "label": "Group I D",
        "description": "Group ID for the group. Must be unique among other group IDs.",
        "type": "text",
        "required": true
      },
      {
        "name": "owner",
        "label": "Owner",
        "description": "Name of the owner of the group.",
        "type": "text",
        "required": false
      },
      {
        "name": "subgroups",
        "label": "Subgroups",
        "description": "Subgroups of this group. The parent group inherits the permissions of the subgroups. Subgroups are marked with the group name only, but refer to the f",
        "type": "array",
        "required": false
      },
      {
        "name": "permissions",
        "label": "Permissions",
        "description": "Permissions associated with this group. These are indicated by the permission name only, but refer to full permission objects.",
        "type": "array",
        "required": false
      },
      {
        "name": "entityId",
        "label": "Entity Id",
        "description": "ID of the trading partner to associate with the group. Only one trading partner can be associated with a group, but a user account can be associated w",
        "type": "text",
        "required": false
      }
    ],
    "update": [
      {
        "name": "groupName",
        "label": "Group Name",
        "description": "Group name for the group. Must be unique among other group names.",
        "type": "text",
        "required": false
      },
      {
        "name": "owner",
        "label": "Owner",
        "description": "Name of the owner of the group.",
        "type": "text",
        "required": false
      },
      {
        "name": "permissions",
        "label": "Permissions",
        "description": "Permissions associated with this group. These are indicated by the permission name only, but refer to full permission objects.",
        "type": "array",
        "required": false
      },
      {
        "name": "subgroups",
        "label": "Subgroups",
        "description": "Subgroups of this group. The parent group inherits the permissions of the subgroups. Subgroups are marked with the group name only, but refer to the f",
        "type": "array",
        "required": false
      },
      {
        "name": "entityId",
        "label": "Entity Id",
        "description": "ID of the trading partner to associate with the group. Only one trading partner can be associated with a group, but a user account can be associated w",
        "type": "text",
        "required": false
      }
    ]
  },
  "/uservirtualroots": {
    "create": [
      {
        "name": "userName",
        "label": "User Name",
        "description": "The user ID that is assigned to the specific virtual root mailbox.",
        "type": "text",
        "required": true
      },
      {
        "name": "mailboxPath",
        "label": "Mailbox Path",
        "description": "Full directory path of the virtual root mailbox assigned to the user ID.",
        "type": "text",
        "required": true
      }
    ],
    "update": [
      {
        "name": "mailboxPath",
        "label": "Mailbox Path",
        "description": "Full directory path of the virtual root mailbox assigned to the user ID.",
        "type": "text",
        "required": true
      }
    ]
  },
  "/workflows": {
    "create": [
      {
        "name": "name",
        "label": "Name",
        "description": "The name of the workflow. Cannot contain spaces.",
        "type": "text",
        "required": true
      },
      {
        "name": "description",
        "label": "Description",
        "description": "The description of the workflow. Can be different for each version.",
        "type": "text",
        "required": true
      },
      {
        "name": "businessProcess",
        "label": "Business Process",
        "description": "Business Process XML.",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category",
        "description": "Optional category name that creates the category. Does not affect processing.",
        "type": "text",
        "required": false
      },
      {
        "name": "commitStepsUponError",
        "label": "Commit Steps Upon Error",
        "description": "Only used when the Enable Transaction field is set. If true, all steps up to an error are committed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "deadlineHours",
        "label": "Deadline Hours",
        "description": "The number of hours by which the business process must complete once it is put in a queue, in combination with the number of minutes.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "deadlineMinutes",
        "label": "Deadline Minutes",
        "description": "The number of minutes by which the business process must complete once it is put in a queue, in combination with the number of hours.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "documentStorage",
        "label": "Document Storage",
        "description": "Allows for the selection of the document storage type for the document payload data.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1",
          "3",
          "4"
        ],
        "format": "int32"
      },
      {
        "name": "documentTracking",
        "label": "Document Tracking",
        "description": "If true, documents in this process model are trackable according to your document tracking settings.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "enableTransaction",
        "label": "Enable Transaction",
        "description": "Treats the entire process as a single transaction if true. Thus, either all steps complete, or none of them do.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "eventReportingLevel",
        "label": "Event Reporting Level",
        "description": "Determines the level of events to generate for this process.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1",
          "2"
        ],
        "format": "int32"
      },
      {
        "name": "firstNotificationHours",
        "label": "First Notification Hours",
        "description": "Enables you to specify whether to receive notification before a business process deadline (as long as business process remains in a queue), in combina",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "firstNotificationMinutes",
        "label": "First Notification Minutes",
        "description": "Enables you to specify whether to receive notification before a business process deadline (as long as business process remains in a queue), in combina",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "lifespanHours",
        "label": "Lifespan Hours",
        "description": "Number of hours in the lifespan of the workflow. If not set, uses system default (2 days).",
        "type": "number",
        "required": false,
        "format": "int64"
      },
      {
        "name": "lifespanDays",
        "label": "Lifespan Days",
        "description": "Number of days in the lifespan of the workflow. If not set, uses system default (2 days).",
        "type": "number",
        "required": false,
        "format": "int64"
      },
      {
        "name": "node",
        "label": "Node",
        "description": "Only valid in a cluster: Select the node on which you want the process to run.",
        "type": "text",
        "required": false
      },
      {
        "name": "nodePreference",
        "label": "Node Preference",
        "description": "Only valid in a cluster: Specify whether the process must run on the selected node or can use others.",
        "type": "enum",
        "required": false,
        "options": [
          "2",
          "0",
          "1"
        ],
        "format": "int32"
      },
      {
        "name": "onfaultProcessing",
        "label": "Onfault Processing",
        "description": "If true, on-fault activity specified in the business process executes immediately in the event of a system error.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "persistenceLevel",
        "label": "Persistence Level",
        "description": "Enables you to specify, at the business process level, the types of data to retain in the database.",
        "type": "enum",
        "required": false,
        "options": [
          "4",
          "8",
          "6",
          "10",
          "1",
          "7",
          "3",
          "5",
          "0",
          "9"
        ],
        "format": "int32"
      },
      {
        "name": "queue",
        "label": "Queue",
        "description": "Defines the queue level the system uses to allocate resources for performance optimizations.",
        "type": "enum",
        "required": false,
        "options": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ],
        "format": "int32"
      },
      {
        "name": "recoveryLevel",
        "label": "Recovery Level",
        "description": "Allows the selection of the level of recovery for this business process if it is interrupted during execution.",
        "type": "enum",
        "required": false,
        "options": [
          "2",
          "1",
          "5",
          "3",
          "4"
        ],
        "format": "int32"
      },
      {
        "name": "removalMethod",
        "label": "Removal Method",
        "description": "Determines if expired data is archived or purged. Archived data is stored in your file system.It is necessary to select one of the value, otherwise ma",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ],
        "format": "int32"
      },
      {
        "name": "secondNotificationHours",
        "label": "Second Notification Hours",
        "description": "Enables you to specify whether to receive another notification before a business process deadline (as long as business process remains in a queue), in",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "secondNotificationMinutes",
        "label": "Second Notification Minutes",
        "description": "Enables you to specify whether to receive another notification before a business process deadline (as long as business process remains in a queue), in",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "softstopRecoveryLevel",
        "label": "Softstop Recovery Level",
        "description": "In the event of a softstop, determines how the business process should resume.",
        "type": "enum",
        "required": false,
        "options": [
          "102",
          "101",
          "105",
          "103",
          "104"
        ],
        "format": "int32"
      },
      {
        "name": "useBPQueuing",
        "label": "Use B P Queuing",
        "description": "If true, the business process is placed in a queue for processing. This is the recommended value.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "enableBusinessProcess",
        "label": "Enable Business Process",
        "description": "Allows the business process to be executed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ],
    "update": [
      {
        "name": "description",
        "label": "Description",
        "description": "The description of the workflow. Can be different for each version.",
        "type": "text",
        "required": true
      },
      {
        "name": "businessProcess",
        "label": "Business Process",
        "description": "Business Process XML.",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category",
        "description": "Optional category name that creates the category. Does not affect processing.",
        "type": "text",
        "required": false
      },
      {
        "name": "commitStepsUponError",
        "label": "Commit Steps Upon Error",
        "description": "Only used when the Enable Transaction field is set. If true, all steps up to an error are committed.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "deadlineHours",
        "label": "Deadline Hours",
        "description": "The number of hours by which the business process must complete once it is put in a queue, in combination with the number of minutes.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "deadlineMinutes",
        "label": "Deadline Minutes",
        "description": "The number of minutes by which the business process must complete once it is put in a queue, in combination with the number of hours.",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "documentStorage",
        "label": "Document Storage",
        "description": "Allows for the selection of the document storage type for the document payload data.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1",
          "3",
          "4"
        ],
        "format": "int32"
      },
      {
        "name": "documentTracking",
        "label": "Document Tracking",
        "description": "If true, documents in this process model are trackable according to your document tracking settings.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "enableTransaction",
        "label": "Enable Transaction",
        "description": "Treats the entire process as a single transaction if true. Thus, either all steps complete, or none of them do.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "eventReportingLevel",
        "label": "Event Reporting Level",
        "description": "Determines the level of events to generate for this process.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1",
          "2"
        ],
        "format": "int32"
      },
      {
        "name": "firstNotificationHours",
        "label": "First Notification Hours",
        "description": "Enables you to specify whether to receive notification before a business process deadline (as long as business process remains in a queue), in combina",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "firstNotificationMinutes",
        "label": "First Notification Minutes",
        "description": "Enables you to specify whether to receive notification before a business process deadline (as long as business process remains in a queue), in combina",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "lifespanHours",
        "label": "Lifespan Hours",
        "description": "Number of hours in the lifespan of the workflow. If not set, uses system default (2 days).",
        "type": "number",
        "required": false,
        "format": "int64"
      },
      {
        "name": "lifespanDays",
        "label": "Lifespan Days",
        "description": "Number of days in the lifespan of the workflow. If not set, uses system default (2 days).",
        "type": "number",
        "required": false,
        "format": "int64"
      },
      {
        "name": "node",
        "label": "Node",
        "description": "Only valid in a cluster: Select the node on which you want the process to run.",
        "type": "text",
        "required": false
      },
      {
        "name": "nodePreference",
        "label": "Node Preference",
        "description": "Only valid in a cluster: Specify whether the process must run on the selected node or can use others.",
        "type": "enum",
        "required": false,
        "options": [
          "2",
          "0",
          "1"
        ],
        "format": "int32"
      },
      {
        "name": "onfaultProcessing",
        "label": "Onfault Processing",
        "description": "If true, on-fault activity specified in the business process executes immediately in the event of a system error.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "persistenceLevel",
        "label": "Persistence Level",
        "description": "Enables you to specify, at the business process level, the types of data to retain in the database.",
        "type": "enum",
        "required": false,
        "options": [
          "4",
          "8",
          "6",
          "10",
          "1",
          "7",
          "3",
          "5",
          "0",
          "9"
        ],
        "format": "int32"
      },
      {
        "name": "queue",
        "label": "Queue",
        "description": "Defines the queue level the system uses to allocate resources for performance optimizations.",
        "type": "enum",
        "required": false,
        "options": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ],
        "format": "int32"
      },
      {
        "name": "recoveryLevel",
        "label": "Recovery Level",
        "description": "Allows the selection of the level of recovery for this business process if it is interrupted during execution.",
        "type": "enum",
        "required": false,
        "options": [
          "2",
          "1",
          "5",
          "3",
          "4"
        ],
        "format": "int32"
      },
      {
        "name": "removalMethod",
        "label": "Removal Method",
        "description": "Determines if expired data is archived or purged. Archived data is stored in your file system.It is necessary to select one of the value, otherwise ma",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ],
        "format": "int32"
      },
      {
        "name": "secondNotificationHours",
        "label": "Second Notification Hours",
        "description": "Enables you to specify whether to receive another notification before a business process deadline (as long as business process remains in a queue), in",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "secondNotificationMinutes",
        "label": "Second Notification Minutes",
        "description": "Enables you to specify whether to receive another notification before a business process deadline (as long as business process remains in a queue), in",
        "type": "number",
        "required": false,
        "format": "int32"
      },
      {
        "name": "softstopRecoveryLevel",
        "label": "Softstop Recovery Level",
        "description": "In the event of a softstop, determines how the business process should resume.",
        "type": "enum",
        "required": false,
        "options": [
          "102",
          "101",
          "105",
          "103",
          "104"
        ],
        "format": "int32"
      },
      {
        "name": "useBPQueuing",
        "label": "Use B P Queuing",
        "description": "If true, the business process is placed in a queue for processing. This is the recommended value.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      },
      {
        "name": "setThisVersionAsDefault",
        "label": "Set This Version As Default",
        "description": "If true, sets this version as the default version.",
        "type": "enum",
        "required": false,
        "options": [
          "0",
          "1"
        ]
      }
    ]
  },
  "/workflowmonitors": {
    "create": [
      {
        "name": "workFlowId",
        "label": "Work Flow Id",
        "description": "",
        "type": "number",
        "required": true,
        "format": "int64"
      }
    ]
  }
};

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
