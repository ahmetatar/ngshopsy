import { dateUtils } from "@core/utils";
import { isAuthenticated } from "./auth.selectors";

describe('Auth Selector Tests', () => {
  it('should calculate token expiration', () => {
    dateUtils.now = jest.fn(() => 1699421416);
    const authState = { expiresIn: '3600', issued: 1699417816 };

    const isAuth = isAuthenticated.projector(authState);
    expect(isAuth).toBe(false);
  });
});