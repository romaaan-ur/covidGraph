import { useState } from "react";
import Button from "../Button";
import Field from "../Field";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import styles from "./index.module.scss";

const Search = ({ onSumbit, ...props }) => {
  const [state, setState] = useState({
    word: "",
  });

  const updateState = (attr, value) => {
    setState((prev) => ({ ...prev, [attr]: value }));
  };

  return (
    <div className={styles.wrapper}>
      <Field
        name="country"
        value={state.word}
        onChange={(e) => updateState("word", e.target.value)}
        placeholder="Узнайте ситуацию с COVID19 в стране..."
      />
      <div className={styles.wrapBtn}>
        <Button
          onClick={((e) => onSumbit(state.word))}
          icon={<SearchOutlinedIcon style={{ color: "#fff" }} />}
        />
      </div>
    </div>
  );
};

export default Search;
