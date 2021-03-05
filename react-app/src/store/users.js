const GET_ONE_USER = "otherUsers/GET_ONE_USER";

export const getUser = user => {
  return {
    type: GET_ONE_USER,
    payload: user,
  };
};

export const getOneUser = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}`);

  const data = await res.json();
  dispatch(getUser(data));
};

const initialState = { singleOtherUser: null, manyOtherUsers: null };

export default function otherUserReducer(state = initialState, action) {
  const updateState = { ...state };

  switch (action.type) {
    case GET_ONE_USER:
      updateState.singleOtherUser = action.payload;
      return updateState;
    default:
      return state;
  }
}
