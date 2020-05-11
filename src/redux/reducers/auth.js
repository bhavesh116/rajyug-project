import { AuthActions } from '../actionTypes'

const initialState = {
  userType: ''
};

function auth(state = initialState, { type, payload }) {
  switch (type) {
  case AuthActions.USER_LOGIN :
    return { ...state, userType: payload.userType };

  default:
    return state;
  }
}

export default auth;
