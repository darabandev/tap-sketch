const GET_ONE_USER = "otherUsers/GET_ONE_USER";

export const getUser = user => {
  return {
    type: GET_ONE_USER,
    payload: user,
  };
};

export const getOneUser = username => async dispatch => {
  const res = await fetch(`/api/users/username/${username}`);

  const data = await res.json();
  dispatch(getUser(data));
};

export const followUser = requestObj => async dispatch => {
  const { userFollowing, userBeingFollowed } = requestObj;

  const res = await fetch(`/api/users/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_following: userFollowing,
      user_being_followed: userBeingFollowed,
    }),
  });

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
