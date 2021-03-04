const NEW_DRAWING = "drawings/NEW_DRAWING";

export const newDrawing = drawing => {
  return {
    type: NEW_DRAWING,
    payload: drawing,
  };
};

export const createNewDrawing = drawing => async dispatch => {
  const { userId, caption, dataUri } = drawing;

  const res = await fetch(`/api/drawings/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      caption,
      data_uri: dataUri,
    }),
  });

  const data = await res.json();

  dispatch(newDrawing(data));
};

const initialState = { currentDrawing: null, allDrawings: null };

export default function sessionReducer(state = initialState, action) {
  const updateState = { ...state };
  switch (action.type) {
    case NEW_DRAWING:
      updateState.currentDrawing = action.payload;
      return updateState;
    default:
      return state;
  }
}
