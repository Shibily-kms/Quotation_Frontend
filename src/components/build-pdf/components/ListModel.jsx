import React from 'react';
import {  StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 9,
    position: 'relative'
  },
  bullet: {
    width: 7,
    fontSize: 22,
    position:'absolute',
    left: '-15px',
    top:'-5px'
  },
  text: {
    fontSize: 12,
    textAlign:'justify'
  },
});

const MyComponent = ({ listArray }) => {

  return (

    <View style={styles.container}>
      {listArray.map((item, index) => (
        <View style={styles.listItem} key={index}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>

  );
};

export default MyComponent;
