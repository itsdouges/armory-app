export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export function clearUserData () {
  return {
    type: CLEAR_USER_DATA,
  };
}

export function authenticateUser (user) {
  return {
    type: AUTHENTICATE_USER,
    payload: user,
  };
}
