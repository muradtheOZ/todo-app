import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Make the Basic UI', key: '1' },
    { text: 'Add CRUD operation', key: '2' },
    { text: 'Add Local storage', key: '3' }
  ]);
  return (
    <View style={styles.container}>
      <Text>Hello</Text>

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    padding: 40,
  },
  listContent: {
    marginTop: 20,
  },
});
