const SET_COMMENTS = "comments/SET_COMMENTS";

export const setComments = comments => {
  return {
    type: SET_COMMENTS,
    payload: comments,
  };
};

export const postNewComment = comment => async dispatch => {
  const { userId, drawingId, commentText } = comment;

  const res = await fetch(`/api/comments/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      drawing_id: drawingId,
      comment_text: commentText,
    }),
  });

  const data = await res.json();

  dispatch(setComments(data));
};

export const getCommentsForDrawing = drawingId => async dispatch => {
  const res = await fetch(`/api/comments/${drawingId}`);
  const data = await res.json();

  dispatch(setComments(data));
};

export const deleteComment = (drawingId, commentId) => async dispatch => {
  const res = await fetch(`/api/comments/delete/${drawingId}/${commentId}`, {
    method: "DELETE",
  });
  const data = await res.json();

  dispatch(setComments(data));
};

const initialState = [];

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default commentReducer;
