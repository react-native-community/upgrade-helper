import React from "react";
import { View } from "react-native-web";
import ReactGA from "react-ga";

import styles from "./styles";
import Text from "../Text";

const Link = props => {
  const { margins } = props;
  return (
    <View style={[margins && styles.margins]}>
      <ReactGA.OutboundLink style={styles.link} {...props}>
        <Text link>{props.children}</Text>
      </ReactGA.OutboundLink>
    </View>
  );
};

export default Link;
