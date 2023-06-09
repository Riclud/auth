export enum ExceptionKeys {
  USER_IS_NOT_FOUND = 'user_is_not_found',
  WRONG_PASSWORD = 'wrong_password',
  PASSWORDS_DO_NOT_MATH = 'passwords_do_not_match',
  USER_ALREADY_REGISTERED = 'user_already_registered',
  PHONE_ALREADY_REGISTERED = 'phone_already_registered',
  REF_CODE_REGISTER_NOT_FOUND = 'ref_code_register_not_found',
  INVALID_COUNTRY = 'invalid_country',
  INVALID_PARAM = 'invalid_param',
  INVALID_DATA = 'invalid_data',
  WRONG_CODE = 'wrong_code',
  TOKEN_IS_NOT_FOUND = 'token_is_not_found',
  INVALID_TOKEN = 'invalid_token',
  SESSIONS_NOT_FOUND = 'session_not_found',
  INVALID_EMAIL = 'invalid_email',
  WAIT_LIST_NOT_FOUND = 'wait_list_not_found',
  WAIT_LIST_LIMIT_SEND_CODE = 'wait_list_limit_send_code',
  WAIT_LIST_CODE_SEND_INTERVAL_LIMIT = 'wait_list_code_send_early',
  WAIT_LIST_INVALID_CODE = 'wait_list_invalid_code',
  WAIT_LIST_TIME_OVER = 'wait_list_time_is_over',

  WAIT_LIST_IS_BANNED = 'wait_list_is_banned',
  WAIT_LIST_STEP_NOT_SEND_CODE = 'wait_list_step_not_send_code',

  ASSETID_NOT_FOUND = 'assetid_not_found',
  INSUFFICIENT_FUNDS = 'insufficient_funds',

  // WALLET
  OUPUT_NOT_AVAILABLE = 'ouput_not_available',
  INPUT_NOT_AVAILABLE = 'input_not_available',
  ASSET_ID_NOT_AVAILABLE = 'asset_id_not_available',
  FIAT_ID_NOT_AVAILABLE = 'fiat_id_not_available',
  WAITLIST_ALREADY_EXISTS = 'wait_list_already_exists',
  WAITLIST_CREATE_INTERVAL_LIMIT = 'waitlist_create_interval_limit',
  WAITLIST_STEP_IS_NOT_SEND_CODE = 'wait_list_step_is_not_send_code',

  WAITLIST_INVALIDE_STEP = 'waitlist_invalide_step'
}
