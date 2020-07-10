import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import styles from '../styles/Android.style';

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#bbe1fa' style={{marginVertical: 10}}/>
      </View>
    );
  }
}

export default Loading;
