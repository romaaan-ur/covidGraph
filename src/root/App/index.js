import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getGraph, getWord } from "../store/actions";
import Main from "../pages/main/index";
import styles from "./index.module.scss";
import logo from "../img/logo.png";

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const updateState = (attr, value) => {
    setState((prev) => ({ ...prev, [attr]: value }));
  };
  return (
    <div className={styles.app}>
      <header>
        <h1>COVID 19 Graph</h1>
        {state.isLoading && (
          <img src={logo} className={styles.appLogo} alt="Logo app" />
        )}
      </header>
      <Switch>
        <Route
          path="/"
          render={(props) => (
            <Main mainState={state} updateMainState={updateState} />
          )}
        />
      </Switch>
      <footer>
        <h4>COVID 19 Graph</h4>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appReducers: state,
  };
};

export default connect(mapStateToProps, { getGraph })(App);
