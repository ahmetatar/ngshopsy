import {INIT_STORE_ACTION, syncState} from './sync-adapter';

describe('Sync adapter tests', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'sessionStorage', {
      value: {getItem: jest.fn(() => '{ "id": "1" }'), setItem: jest.fn()},
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should rehydrate state if browser refreshed or first time loaded', () => {
    const key = 'auth';
    const nextState = {email: 'test@test.com'};
    const action = {type: INIT_STORE_ACTION};
    const expected = {email: 'test@test.com', id: '1'};

    const state = syncState(key, nextState, action);

    expect(state).toEqual(expect.objectContaining(expected));
    expect(sessionStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should set state to session storage', () => {
    const key = 'auth';
    const nextState = {id: '1'};
    const action = {type: '[Auth] SignIn Success'};

    const state = syncState(key, nextState, action);

    expect(state).toEqual(expect.objectContaining(nextState));
    expect(sessionStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(nextState));
  });

  it('should not store if any of the allowed actions are not', () => {
    const key = 'auth';
    const nextState = {id: '1'};
    const action = {type: '[UI Messages] Push Message'};
    const allowedActions = [{type: '[Auth] SignIn'}, {type: '[Auth] SignIn Success'}];

    const state = syncState(key, nextState, action, allowedActions);

    expect(state).toEqual(expect.objectContaining(nextState));
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
  });

  it('should store if any of the allowed actions', () => {
    const key = 'auth';
    const nextState = {id: '1'};
    const action = {type: '[Auth] SignIn'};
    const allowedActions = [{type: '[Auth] SignIn'}, {type: '[Auth] SignIn Success'}];

    const state = syncState(key, nextState, action, allowedActions);

    expect(state).toEqual(expect.objectContaining(nextState));
    expect(sessionStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(nextState));
  });
});
