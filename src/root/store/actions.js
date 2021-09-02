import API from "../js/Api";

const WEBAPI = new API();

export const getGraphData = (word) => async dispatch => {
  console.log("get graph data");
  try {
    const res = await WEBAPI.getSummaryByCountry({ word: word });
    // console.log("res", res);
    dispatch(getGraph(res));
  } catch {
    dispatch(getGraph(null));
  }
};

export const getGraph = (graph) => {
  console.log("get summary");
  return { type: "GET_GRAPH", payload: graph };
};

export const getWord = (word) => {
  console.log("get summary");
  return { type: "GET_WORD", payload: word };
};
