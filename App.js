import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header/Header';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Make the Basic UI', key: '1' },
    { text: 'Add CRUD operation', key: '2' },
    { text: 'Add Local storage', key: '3' }
  ]);
  return (
    <View style={styles.container}>
      <Header/>

      <View style={styles.mainContent}>

        <View style={styles.listContent}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Text>{item.text}</Text>
            )}
          />

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  mainContent: {
    padding: 40,
  },
  listContent: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
