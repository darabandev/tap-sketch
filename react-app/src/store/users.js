const GET_ONE_USER = "otherUsers/GET_ONE_USER";
const GET_MANY_USERS = "otherUsers/GET_MANY_USERS";

export const getUser = user => {
  return {
    type: GET_ONE_USER,
    payload: user,
  };
};

export const getManyUsers = users => {
  return {
    type: GET_MANY_USERS,
    payload: users,
  };
};

export const getOneUser = username => async dispatch => {
  const res = await fetch(`/api/users/username/${username}`);

  const data = await res.json();
  dispatch(getUser(data));
};

export const getAllFollowedUsers = userId => async dispatch => {
  const res = await fetch(`/api/users/following/${userId}`);

  const data = await res.json();
  dispatch(getManyUsers(data));
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

export const unfollowUser = requestObj => async dispatch => {
  const { userFollowing, userBeingFollowed } = requestObj;

  const res = await fetch(`/api/users/unfollow`, {
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
    case GET_MANY_USERS:
      updateState.manyOtherUsers = action.payload;
    default:
      return state;
  }
}
