export interface LoginInfo {
  /** User name of logging in user */
  email: string;
  /** Password of logging in user */
  password: string;
  /** Remember info for next login */
  isRemember: boolean;
}
