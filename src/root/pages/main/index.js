import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import API from "../../js/Api";
import { prettyNumber } from "../../js/utils";

import Loading from "../../components/Loading";
import Search from "../../components/Search";
import Card from "../../components/Card";

import styles from "./index.module.scss";

const WEBAPI = new API();

const Main = ({ mainState, updateMainState }) => {
  const dispatch = useDispatch();
  const graph = useSelector((state) => state.graph);
  const [state, setState] = useState({
    isLoading: false,
    lastUpdate: null,
    newConfirmed: null,
    newRecovered: null,
    newDeaths: null,
    totalConfirmed: null,
    totalDeaths: null,
    totalRecovered: null,
    summary: null,
  });

  const updateState = (attr, value) => {
    setState((prev) => ({ ...prev, [attr]: value }));
  };

  useEffect(() => {
    WEBAPI.getSummary().then((res) => {
      updateMainState("isLoading", true);
      updateState("lastUpdate", new Date(res.Date).toLocaleString());

      updateState("totalConfirmed", prettyNumber(res.Global.TotalConfirmed));
      updateState("totalDeaths", prettyNumber(res.Global.TotalDeaths));
      updateState("totalRecovered", prettyNumber(res.Global.TotalRecovered));

      updateState("newConfirmed", prettyNumber(res.Global.NewConfirmed));
      updateState("newDeaths", prettyNumber(res.Global.NewDeaths));
      updateState("newRecovered", prettyNumber(res.Global.NewRecovered));

      console.log(res);
    });
    // dispatch({ type: "GET_SUMMARY" });
  }, []);

  const findCountry = async (word) => {
    dispatch({ type: "GET_WORD", payload: word });
    try {
      const response = await WEBAPI.getSummaryByCountry({ word: word });
      dispatch({ type: "GET_GRAPH", payload: response });
    } catch (e) {
      dispatch({ type: "GET_GRAPH", payload: null });
    }
  };

  return (
    <>
      {!mainState.isLoading ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.wrapperDate}>
            <p>
              ???? ?????????????????? ???? <span>{state.lastUpdate}</span>
            </p>
          </div>
          <div className={styles.wrapperSearch}>
            <Search onSumbit={(word) => findCountry(word)} />
          </div>
          {graph ? (
            <div className={styles.graphContainer}>
              <h4>???????????????????? ???? ???????? ????????????</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={graph.map((item) => ({
                    date: item.Date,
                    confirmed: item.Confirmed,
                    deaths: item.Deaths,
                    recovered: item.Recovered,
                  }))}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="deaths"
                    stroke="#cd0712"
                    activeDot={{ r: 8 }}
                    name="????????????"
                  />
                  <Line type="basis" dataKey="confirmed" stroke="#3662ff" name="??????????????????????????????????" />
                  <Line type="basis" dataKey="recovered" stroke="#03c8a4" name="????????????????????" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className={styles.wrapperBlock}>
              <Card>
                <h3>???? ?????????????????? ??????????:</h3>
                <h4>{state.newConfirmed} ???????????????? ??????????????</h4>
                <h4>{state.newRecovered} ?????????????? ??????????????????????</h4>
                <h4>{state.newDeaths} ?????????????? ????????????</h4>
              </Card>
              <Card>
                <h3>?????????? ????????????????????:</h3>
                <h4>{state.totalConfirmed} ????????????????????????????</h4>
                <h4>{state.totalRecovered} ?????????????? ??????????????????????</h4>
                <h4>{state.totalDeaths} ?????????????? ????????????</h4>
              </Card>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Main;
