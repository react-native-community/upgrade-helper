import React from "react";
import { Picker, View } from "react-native-web";
import * as R from "ramda";

import styles from "./styles";
import Text from "../Text";

const Dropdown = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Picker {...props}>
        {R.map(item => <Picker.Item key={item} label={item} value={item} />)(
          props.items
        )}
      </Picker>
    </View>
  );
};

export default Dropdown;
