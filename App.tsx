import React from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from '@react-native-material/core';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Hello World!, this is the large project mobile!
        </Text>
        <Button title="Click Me" onPress={() => Alert.alert('🎉🎉🎉')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
