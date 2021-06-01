const getAuthUrl = (service) =>
  process.env.REACT_APP_AUTHN_SIGNIN_PROTOCOL +
  "://" +
  process.env.REACT_APP_AUTHN_SIGNIN_URL +
  service;

const getTokenUrl = (service) =>
  process.env.REACT_APP_TOKEN_SERVICE_PROTOCOL +
  "://" +
  process.env.REACT_APP_TOKEN_SERVICE_URL +
  service;

const getAlphaProcUrl = (service) =>
  process.env.REACT_APP_YOGI_ALPHA_PROCESSOR_PROTOCOL +
  "://" +
  process.env.REACT_APP__YOGI_ALPHA_PROCESSOR_URL +
  service;

const getDocMgmtUrl = (service) =>
  process.env.REACT_APP_DOC_MGMT_SRVC_PROTOCOL +
  "://" +
  process.env.REACT_APP_DOC_MGMT_SRVC_URL +
  service;

const getNeonSrvcUrl = (service) =>
  process.env.REACT_APP_NEON_SERVICE_PROTOCOL +
  "://" +
  process.env.REACT_APP_NEON_SERVICE_URL +
  service;

const getDmsUrl = (service) =>
  process.env.REACT_APP_DMS_SEARCH_PROTOCOL +
  "://" +
  process.env.REACT_APP_DMS_SEARCH_URL +
  service;

const getDmsTopiqUrl = (service) =>
  process.env.REACT_APP_DMS_SEARCH_TOPIQ_PROTOCOL +
  "://" +
  process.env.REACT_APP_DMS_SEARCH_TOPIQ_URL +
  service;

const getTokenPolicyUrl = (service) =>
  process.env.REACT_APP_TOKEN_POLICY_SERVICE_PROTOCOL +
  "://" +
  process.env.REACT_APP_TOKEN_POLICY_SERVICE_URL +
  service;

const getElasticSearchUrl = (service) =>
  process.env.REACT_APP_ELASTIC_SEARCH_PROTOCOL +
  "://" +
  process.env.REACT_APP_ELASTIC_SEARCH_URL +
  service;

const getEndpointRegistryUrl = (service) =>
  process.env.REACT_APP_END_POINT_REGISTRY_PROTOCOL +
  "://" +
  process.env.REACT_APP_END_POINT_REGISTRY_URL +
  service;

const getProcessUrl = (service) =>
  process.env.REACT_APP_PROCESS_BOT_PROTOCOL +
  "://" +
  process.env.REACT_APP_PROCESS_BOT_URL +
  service;

const getIdentifyUrl = (service) =>
  process.env.REACT_APP_IDENTIFY_ID_PROTOCOL +
  "://" +
  process.env.REACT_APP_IDENTIFY_ID_URL +
  service;

const getOnboardingUrl = (service) =>
  process.env.REACT_APP_INITIATE_ONBOARDING_PROTOCOL +
  "://" +
  process.env.REACT_APP_INITIATE_ONBOARDING_URL +
  service;

const getKibanaUrl = (service) =>
  process.env.REACT_APP_KIBANA_PROTOCOL +
  "://" +
  process.env.REACT_APP_KIBANA_URL +
  service;

const getTokiV3Url = (service) =>
  process.env.REACT_APP_TOKI_V3_PROTOCOL +
  "://" +
  process.env.REACT_APP_TOKI_V3_URL +
  service;

const getAssetVaultUrl = (service) =>
  process.env.REACT_APP_ASSET_VAULT_PROTOCOL +
  "://" +
  process.env.REACT_APP_ASSET_VAULT_URL +
  service;

const getDashboardSrvcUrl = (service) =>
  process.env.REACT_APP_DASHBOARD_SERVICE_PROTOCOL +
  "://" +
  process.env.REACT_APP_DASHBOARD_SERVICE_URL +
  service;

const getBillingSrvcUrl = (service) =>
  process.env.REACT_APP_BILLING_SERVICE_PROTOCOL +
  "://" +
  process.env.REACT_APP_BILLING_SERVICE_URL +
  service;

const getGlobalDataSrvcUrl = (service) =>
  process.env.REACT_APP_GLOBAL_DATA_SERVICE_PROTOCOL +
  "://" +
  process.env.REACT_APP_GLOBAL_DATA_SERVICE_URL +
  service;

const getSimulatorSrvcUrl = (service) =>
  process.env.REACT_APP_SIMULATOR_SERVICE_PROTOCOL +
  "://" +
  process.env.REACT_APP_SIMULATOR_SERVICE_URL +
  service;

export const env = {
  AUTHN_SIGNIN_URL: getAuthUrl("/authn/signin"),

  AUTHN_LOGOUT_URL: getAuthUrl("/authn/logout"),

  AUTHN_SESSIONS_LIST: getAuthUrl("/authn/monitor/sessions/list"),

  AUTHN_SETTINGS: getAuthUrl("/authn/settings"),

  DATA_TYPE_META_URL: getTokenUrl("/tokensvc/meta/datatype/search"),

  TOKEN_TYPE_META_URL: getTokenUrl("/tokensvc/meta/tokentype/search"),

  TOP_METRICS_URL: getTokenUrl("/tokensvc/token/metrics"),

  TOKEN_DATA_URL: getTokenUrl("/tokensvc/token/data"),

  TOKEN_SEARCH_URL: getTokenUrl("/tokensvc/token/search"),

  TOKEN_RETRIEVE_URL: getTokenUrl("/tokensvc/token/retrieve"),

  TOKEN_EVENTS_SEARCH_URL: getTokenUrl("/token/events/search"),

  SUBTOKEN_RETRIEVE_URL: getTokenUrl("/tokensvc/subtoken/retrieve"),

  SUBTOKEN_DATA_RETRIEVE_URL: getTokenUrl("/tokensvc/subtoken/data/retrieve"),

  TOKEN_ASSOCIATIONS_URL: getAlphaProcUrl("/alphaproc/token/associations"),

  TOKEN_ATTACH_LOGO_URL: getAlphaProcUrl("/alphaproc/token/avatar/logo"),

  TOKEN_DLT_INFO_URL: getAlphaProcUrl("/alphaproc/token/dltdetails"),

  SEARCH_AV_URL: getAlphaProcUrl("/alphaproc/topverse/search"),

  TOKEN_REMINDERS_SEARCH_URL: getAlphaProcUrl(
    "/alphaproc/topverse/alerts/search"
  ),

  INGESTED_DATA_RETRIEVE: getAlphaProcUrl("/token/ingesteddata/retrieve"),

  INGESTED_INPUT_RETRIEVE: getAlphaProcUrl("/token/ingestedinput/retrieve"),

  ONBOARD: getAlphaProcUrl("/onboard_TTS_AV"),

  DOC_MGMT_SRVC_DOC_UPLOAD_URL: getDocMgmtUrl("/doc/store"),

  DOC_MGMT_SRVC_DOC_RETRIEVE_URL: getDocMgmtUrl("/doc/"),

  LIST_FOLDER_CONTENTS: getDocMgmtUrl("/doc/folder/list"),

  NETWORK_INFO: getNeonSrvcUrl(
    `/neon/network/info/${process.env.REACT_APP_NETWORK_ID}`
  ),

  NETWORK_INFO_TREE: getNeonSrvcUrl(
    `/neon/network/infotree/${process.env.REACT_APP_NETWORK_ID}`
  ),

  NEON_SERVICE_SAVE_NETWORK_SETTINGS: getNeonSrvcUrl("/neon/network/settings"),

  NEON_SERVICE_SEARCH_NETWORK_SETTINGS: getNeonSrvcUrl(
    "/neon/network/settings/search"
  ),

  NEON_SERVICE_SAVE_STARFLEET_SETTINGS: getNeonSrvcUrl(
    "/neon/starfleet/settings"
  ),

  NEON_SERVICE_SEARCH_STARFLEET_SETTINGS: getNeonSrvcUrl(
    "/neon/starfleet/settings/search"
  ),

  NEON_SERVICE_SAVE_TENANT_SETTINGS: getNeonSrvcUrl("/neon/tenant/settings"),

  NEON_SERVICE_SEARCH_TENANT_SETTINGS: getNeonSrvcUrl(
    "/neon/tenant/settings/search"
  ),

  NEON_SERVICE_SAVE_ANCHOR_SETTINGS: getNeonSrvcUrl("/neon/anchor/settings"),

  NEON_SERVICE_SEARCH_ANCHOR_SETTINGS: getNeonSrvcUrl(
    "/neon/anchor/settings/search"
  ),

  NEON_SERVICE_SAVE_USER_SETTINGS: getNeonSrvcUrl("/neon/user/settings"),

  NEON_SERVICE_SEARCH_USER_SETTINGS: getNeonSrvcUrl(
    "/neon/user/settings/search"
  ),

  NEON_SERVICE_USERS_FOR_STARFLEET: getNeonSrvcUrl("/neon/sfuser/list"),

  NEON_SERVICE_ANCHORS_FOR_STARFLEET: getNeonSrvcUrl("/neon/sfanchor/list"),

  USER_AVATAR_ASSOCIATION: getNeonSrvcUrl("/neon/useravatar/list"),

  USER_STARFLEET_ASSOCIATION: getNeonSrvcUrl("/neon/usersf/list"),

  ANCHOR_AVATAR_ASSOCIATION: getNeonSrvcUrl("/neon/anchoravt/list"),

  DMS_SEARCH_TOP_TOKEN: getDmsUrl("/dms/platform/entity/TopToken/search"),

  DMS_SEARCH_TOP_USER: getDmsUrl("/dms/platform/entity/TopUser/search"),

  DMS_SEARCH_TOP_FAAS: getDmsUrl("/dms/platform/entity/TopFaaS/search"),

  DMS_SAVE_TOP_FAAS: getDmsUrl("/dms/platform/entity/TopFaaS"),

  DMS_SEARCH_TOP_EVENT_SOURCE: getDmsUrl(
    "/dms/platform/entity/TopEventSource/search"
  ),

  DMS_SEARCH_TOP_EVENT: getDmsUrl("/dms/platform/entity/TopEvents/search"),

  DMS_EXECUTE: getDmsUrl("/dms/fsc/query/execute"),

  DMS_SEARCH_TOPIQ_LOG: getDmsUrl("/dms/system/entity/TopiqLog/search"),

  DMS_SEARCH_USER_AUDIT_LOG: getDmsUrl(
    "/dms/platform/entity/UserAuditLog/search"
  ),

  DMS_SEARCH_TOPIQ_LOG_DETAIL: getDmsUrl(
    "/dms/system/entity/TopiqLogDetail/search"
  ),

  DOCUMENT_DEFINITIONS: getDmsUrl(
    "/dms/yogi/entity/TopDocumentDefinition/search"
  ),

  DOCUMENT_SEGMENTS: getDmsUrl("/dms/yogi/entity/TopDocumentSegment/search"),

  DOCUMENT_FIELDS: getDmsUrl("/dms/yogi/entity/TopDocumentFields/search"),

  ENTITY_DEFINITION_SEARCH: getDmsUrl(
    "/dms/yogi/entity/TopEntityDefinition/search"
  ),

  ENTITY_FIELD_SEARCH: getDmsUrl("/dms/yogi/entity/TopEntityFields/search"),

  SAVE_ENTITY_DEFINITION: getDmsUrl("/dms/yogi/entity/TopEntityDefinition"),

  SAVE_ENTITY_FIELD: getDmsUrl("/dms/yogi/entity/TopEntityFields"),

  KEYWORD_DOMAIN_SEARCH: getDmsUrl("/dms/yogi/entity/TopKeywordDomain/search"),

  KEYWORD_SEARCH: getDmsUrl("/dms/yogi/entity/TopKeyword/search"),

  SAVE_DOCUMENT_DEFINITIONS: getDmsUrl(
    "/dms/yogi/entity/TopDocumentDefinition"
  ),

  SAVE_DOCUMENT_SEGMENTS: getDmsUrl("/dms/yogi/entity/TopDocumentSegment"),

  SAVE_DOCUMENT_FIELDS: getDmsUrl("/dms/yogi/entity/TopDocumentFields"),

  PROCESS_META_SEARCH: getDmsUrl("/dms/system/entity/ProcessMeta/search"),

  PROCESS_INSTANCE_META_SEARCH: getDmsUrl(
    "/dms/system/entity/ProcessInstanceMeta/search"
  ),

  PROCESS_INSTANCE_FLOW_STATE_SEARCH: getDmsUrl(
    "/dms/system/entity/ProcessInstanceFlowState/search"
  ),

  DMS_SEARCH_COUNTRY_CODE: getDmsUrl(
    "/dms/platform/entity/CountryLocale/search"
  ),

  DMS_SEARCH_INDUSTRY_TYPE: getDmsUrl(
    "/dms/platform/entity/IndustryType/search"
  ),

  DMS_SEARCH_TIME_ZONE: getDmsUrl("/dms/platform/entity/TimeZone/search"),

  DMS_SEARCH_TOPIQ: getDmsTopiqUrl("/topiq/search"),

  DMS_SAVE_TOPIQ: getDmsTopiqUrl("/topiq"),

  DMS_RECOVER_LOG: getDmsTopiqUrl("/topiq/recover/log"),

  DMS_RECOVER_LOG_DETAIL: getDmsTopiqUrl("/topiq/recover/detail"),

  TOKEN_POLICY_SEARCH: getTokenPolicyUrl("/policy/search"),

  TOKEN_POLICY_CRITERIA_SEARCH: getTokenPolicyUrl("/policy/criteria/search"),

  TOKEN_POLICY_SAVE: getTokenPolicyUrl("/policy"),

  TOKEN_POLICY_CRITERIA_SAVE: getTokenPolicyUrl("/policy/criteria"),

  ELASTIC_SEARCH: getElasticSearchUrl("/es/data/search"),

  ELASTIC_SEARCH_GET_INDEX_LIST: getElasticSearchUrl("/es/admin/index/search"),

  TENANTS_FOR_NETWORK: getNeonSrvcUrl("/neon/nwtenant/list/"),

  STARFLEETS_FOR_TENANT: getNeonSrvcUrl("/neon/tenantsf/list/"),

  ANCHORS_FOR_STARFLEET: getNeonSrvcUrl("/neon/sfanchor/list/"),

  AVATARS_FOR_ANCHOR: getNeonSrvcUrl("/neon/anchoravt/list/"),

  USERS_FOR_AVATAR: getNeonSrvcUrl("/neon/avataruser/list/"),

  TOP_FOLDER_REGISTRY: getEndpointRegistryUrl("/endpointregistry/search"),

  SAVE_TOP_FOLDER_REGISTRY: getEndpointRegistryUrl("/endpointregistry"),

  GET_ENDPOINT_TYPES_SUBTYPES_LIST: getEndpointRegistryUrl(
    "/endpointregistry/types/list"
  ),

  PROCESS_STEP_META_SEARCH: getProcessUrl(
    "/processbot/admin/metadata/retrieve"
  ),

  PROCESS_STEP_META_UPDATE: getProcessUrl("/processbot/admin/metadata"),

  PROCESS_INSTANCE_RECOVER: getProcessUrl("/processbot/recover"),

  IDENTIFY_ID: getIdentifyUrl("/identify_id"),

  INITIATE_CIN_ONBOARDING: getOnboardingUrl("/tob/initiate"),

  INITIATE_CNAME_ONBOARDING: getOnboardingUrl("/tob/corporate/initiate"),

  KIBANA: getKibanaUrl(""),

  TRIGGER_TOKI_EVENTS: getTokiV3Url("/toki/events/trigger"),

  AV_LIST_DEFINITIONS: getAssetVaultUrl("/av/definitions"),

  AV_LIST_KEYWORDS: getAssetVaultUrl("/av/keywords"),

  AV_SEARCH_DATA: getAssetVaultUrl("/av/search"),

  DASHBOARD_SERVICE_EP_DASHBOARD: getDashboardSrvcUrl("/dashb/get"),

  DASHBOARD_SERVICE_FILTERS: getDashboardSrvcUrl("/dashb/filters"),

  SEARCH_TOP_BILLING_PROJECTS: getBillingSrvcUrl(
    "/billing/admin/TopBillingProject/search"
  ),

  TOP_BILLING_PROJECTS: getBillingSrvcUrl("/billing/admin/TopBillingProject"),

  SEARCH_TOP_PRICE_BOOKS: getBillingSrvcUrl(
    "/billing/admin/TopPriceBook/search"
  ),

  TOP_PRICE_BOOKS: getBillingSrvcUrl("/billing/admin/TopPriceBook"),

  CLONE_TOP_PRICE_BOOK: getBillingSrvcUrl("/billing/admin/TopPriceBook/clone"),

  SEARCH_TOP_PRICING_MODEL: getBillingSrvcUrl(
    "/billing/admin/TopPricingModel/search"
  ),

  TOP_PRICING_MODEL: getBillingSrvcUrl("/billing/admin/TopPricingModel"),

  BILLING_PROJECT_SUMMARY: getBillingSrvcUrl("/billing/project/summary"),

  BILLING_PROJECT_PENDING_APPROVAL_SUMMARY: getBillingSrvcUrl(
    "/billing/project/summary/approvalcustomers"
  ),

  BILLING_PROJECT_PAST_DUE_SUMMARY: getBillingSrvcUrl(
    "/billing/project/summary/pastduecustomers"
  ),

  BILLING_PROJECT_SUMMARY_DETAIL: getBillingSrvcUrl(
    "/billing/project/summary/detail"
  ),

  BILLING_PROJECT_PERFORMANCE: getBillingSrvcUrl(
    "/billing/project/performance"
  ),

  BILLING_PROJECT_UPDATE_FAVOURITE: getBillingSrvcUrl(
    "/billing/project/updatefavourite"
  ),

  SEARCH_BILLING_FEE: getBillingSrvcUrl("/billing/fee/search"),

  EXCLUDE_BILLING_ACTIVITY: getBillingSrvcUrl("/billing/fee/exclude"),

  INCLUDE_BILLING_ACTIVITY: getBillingSrvcUrl("/billing/fee/include"),

  CALCULATE_FEE: getBillingSrvcUrl("/billing/fee/calculate"),

  RECALCULATE_FEE: getBillingSrvcUrl("/billing/fee/recalculate"),

  UPDATE_FEE_AMOUNT: getBillingSrvcUrl("/billing/fee/updateFeeAmount"),

  LOG_PAYMENT_BATCH: getBillingSrvcUrl("/billing/statement/logpayment/batch"),

  BILLING_FEE_SUMMARY_BY_TXN_TYPE: getBillingSrvcUrl("/billing/fee/summary"),

  BILLING_ACTIVITY_NOTES: getBillingSrvcUrl("/billing/fee/notes"),

  SEARCH_BILLING_STATEMENT: getBillingSrvcUrl("/billing/statement/search"),

  SEARCH_BILLING_STATEMENT_PAST_DUE: getBillingSrvcUrl(
    "/billing/statement/list/pastdue"
  ),

  CREATE_BILLING_STATEMENT: getBillingSrvcUrl("/billing/statement/create"),

  BILLING_STATEMENT: getBillingSrvcUrl("/billing/statement"),

  BILLING_STATEMENT_LOOK_UP: getBillingSrvcUrl("/billing/statement/lookup"),

  APPROVE_BILLING_STATEMENT: getBillingSrvcUrl("/billing/statement/approve"),

  MARK_PAST_DUE_BILLING_STATEMENT: getBillingSrvcUrl(
    "/billing/statement/markPastDue"
  ),

  UPDATE_INVOICE_DETAILS: getBillingSrvcUrl(
    "/billing/statement/invoiceDetails"
  ),

  UPDATE_PAYMENT_DETAILS: getBillingSrvcUrl(
    "/billing/statement/paymentDetails"
  ),

  BILLING_STATEMENT_NOTES: getBillingSrvcUrl("/billing/statement/notes"),

  BILLING_PROJECT_REMINDERS: getBillingSrvcUrl("/billing/project/reminders"),

  SEARCH_BANKS: getGlobalDataSrvcUrl("/globaldata/bank/search"),

  CREATE_BANK: getGlobalDataSrvcUrl("/globaldata/bank/create"),

  UPDATE_BANK: getGlobalDataSrvcUrl("/globaldata/bank/update"),

  DELETE_BANK: getGlobalDataSrvcUrl("/globaldata/bank/delete"),

  SEARCH_ACCOUNT_SPEC: getGlobalDataSrvcUrl(
    "/globaldata/dataspec/bank/account/search"
  ),

  GENERATE_EP_DASHBOARD_DATA: getSimulatorSrvcUrl("/simulate/start/ddoffer"),

  ONBOARD_AVATAR: getSimulatorSrvcUrl("/simulate/onboard/avatar"),

  GENERATE_INVOICE: getSimulatorSrvcUrl("/simulate/generate/invoice"),

  CREATE_TOKI: getSimulatorSrvcUrl("/simulate/generate/toki"),
};
