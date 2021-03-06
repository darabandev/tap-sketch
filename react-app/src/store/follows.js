const NEW_FOLLOW = "follows/NEW_FOLLOW";

const newFollow = follow => {
  return {
    type: NEW_FOLLOW,
    payload: follow,
  };
};

export const followNewUser = follow => async dispatch => {
  const { userFollowing, userBeingFollowed } = follow;

  const res = await fetch(`/api/follows/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      user_following: userFollowing,
      user_being_followed: userBeingFollowed,
    },
  });

  const data = await res.json();

  dispatch(newFollow(data));
};

const initialState = { follows: null };

const followReducer = (state = initialState, action) => {
  const updateState = { ...state };

  switch (action.type) {
    case NEW_FOLLOW:
      updateState.follows = action.payload;
      return updateState;
    default:
      return state;
  }
};

export default followReducer;
