const NEW_DRAWING = "drawings/NEW_DRAWING";
const GET_ONE_DRAWING = "drawings/GET_ONE_DRAWING";
const GET_USER_DRAWINGS = "drawings/GET_USER_DRAWINGS";

export const newDrawing = drawing => {
  return {
    type: NEW_DRAWING,
    payload: drawing,
  };
};

export const getDrawing = drawing => {
  return {
    type: GET_ONE_DRAWING,
    payload: drawing,
  };
};

export const getUserDrawings = drawings => {
  return {
    type: GET_USER_DRAWINGS,
    payload: drawings,
  };
};

export const createNewDrawing = drawing => async dispatch => {
  const { id, caption, dataUrl, username } = drawing;

  const res = await fetch(`/api/drawings/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: id,
      caption,
      username,
      data_url: dataUrl,
    }),
  });

  const data = await res.json();

  dispatch(newDrawing(data));
};

export const getOneDrawing = drawingId => async dispatch => {
  const res = await fetch(`/api/drawings/${drawingId}`);

  const data = await res.json();

  dispatch(getDrawing(data));
};

export const getAllDrawingsForUser = username => async dispatch => {
  const res = await fetch(`/api/drawings/user/${username}`);
  const data = await res.json();

  dispatch(getUserDrawings(data));
};

export const likeOneDrawing = likeObj => async dispatch => {
  const { userId, drawingId } = likeObj;

  const res = await fetch(`/api/drawings/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      drawing_id: drawingId,
    }),
  });

  const data = await res.json();
  dispatch(getDrawing(data));
};

export const unlikeOneDrawing = unlikeObj => async dispatch => {
  const { userId, drawingId } = unlikeObj;

  const res = await fetch(`/api/drawings/unlike`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      drawing_id: drawingId,
    }),
  });

  const data = await res.json();
  dispatch(getDrawing(data));
};

export const deleteOneDrawing = deleteObj => async dispatch => {
  const { userId, drawingId } = deleteObj;

  const res = await fetch(`/api/drawings/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      drawing_id: drawingId,
    }),
  });

  const data = await res.json();
  dispatch(getUserDrawings(data));
};

const initialState = { currentDrawing: null, userDrawings: null, userViewing: null };

export default function drawingReducer(state = initialState, action) {
  const updateState = { ...state };
  switch (action.type) {
    case NEW_DRAWING:
      updateState.currentDrawing = action.payload;
      return updateState;
    case GET_ONE_DRAWING:
      updateState.currentDrawing = action.payload;
      return updateState;
    case GET_USER_DRAWINGS:
      updateState.userDrawings = action.payload;
      return updateState;
    default:
      return state;
  }
}
