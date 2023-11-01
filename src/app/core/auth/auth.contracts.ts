/**
 * Authentication request informations
 */
export interface SignInRequest {
  /**
   * The email the user is signing in with
   */
  email: string;

  /**
   * The password for the account
   */
  password: string;

  /**
   * Whether or not to return an ID and refresh token. Should always be true
   */
  returnSecureToken: boolean;
}

export interface SignInResult {
  /**
   * A Firebase Auth ID token for the authenticated user
   */
  idToken: string;

  /**
   * The email for the authenticated user
   */
  email: string;

  /**
   * A Firebase Auth refresh token for the authenticated user
   */
  refreshToken: string;

  /**
   * The number of seconds in which the ID token expires
   */
  expiresIn: string;

  /**
   * The uid of the authenticated user
   */
  localId: string;

  /**
   * Whether the email is for an existing account
   */
  registered: boolean;
}

export interface SignInFailureResult {
  /**
   * EMAIL_NOT_FOUND: There is no user record corresponding to this identifier. The user may have been deleted.
   * INVALID_PASSWORD: The password is invalid or the user does not have a password.
   * USER_DISABLED: The user account has been disabled by an administraton
   */
  code: string;

  /**
   * Error description
   */
  message: string;

  /**
   * Nested error object
   */
  error: Record<string, never>;
}
