/**
 * Authenticated user state
 */
export interface AuthState {
  /**
   * The uid of the authenticated user
   */
  localId?: string;

  /**
   * The email for the authenticated user
   */
  email?: string;

  /**
   * A Firebase Auth ID token for the authenticated user
   */
  idToken?: string;

  /**
   * The number of seconds in which the ID token expires
   */
  expiresIn?: string;

  /**
   * Token issued date
   */
  issued?: number;
}
