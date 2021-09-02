const initialState = {
  word: "",
  graph: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WORD":
      return {
        ...state,
        word: action.payload,
      };
    case "GET_GRAPH":
      return {
        ...state,
        graph: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
