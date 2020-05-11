import { AuthActions } from '../actionTypes';

export const userLogin = (data) => ({
    type: AuthActions.USER_LOGIN,
    payload: data
})