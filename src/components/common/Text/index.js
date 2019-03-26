import React from "react";
import { Text as RText } from "react-native-web";

import styles from "./styles";

const Text = props => {
  const { h1, h2, bold, link, style, ...rest } = props;

  return (
    <RText
      style={[
        styles.text,
        bold && styles.bold,
        h1 && styles.h1,
        h2 && styles.h2,
        link && styles.link,
        style
      ]}
      {...rest}
    />
  );
};

export default Text;
