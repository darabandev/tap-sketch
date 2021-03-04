export const SET_USER = "session/SET_USER";
export const USER_LOGOUT = "USER_LOGOUT";

export const userLogout = () => {
  return { type: USER_LOGOUT };
};

export const setUser = user => {
  return { type: SET_USER, user };
};

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  const updateState = { ...state };
  switch (action.type) {
    case SET_USER:
      updateState.user = action.user;
      return updateState;
    default:
      return state;
  }
}
