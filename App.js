import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AddTodos from './Components/AddTodos/AddTodos';
import Header from './Components/Header/Header';
import Todos from './Components/Todos/Todos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";

export default function App() {
  const [ready,setReady] = useState(false);
  const initialTodos = [
    { text: 'Make the Basic UI', key: '1' },
    { text: 'Add CRUD operation', key: '2' },
    { text: 'Add Local storage', key: '3' }
  ]
  const [todos, setTodos] = useState(initialTodos);
  const doneHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };
  const submitHandler = (text) => {
    setTodos((prevTodos) => {
      return  [
        {
          text: text,
          key: Date.now().toString(36) + Math.random().toString(36).substr(2)
        },

        ...prevTodos
      ];
      

    });

  };
return (
  <View style={styles.container}>
    <Header />

    <View style={styles.mainContent}>
      <AddTodos submitHandler={submitHandler} />

      <View style={styles.listContent}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Todos item={item} doneHandler={doneHandler} />
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
    flex: 1
  },
  listContent: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
