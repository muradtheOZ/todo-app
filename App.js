import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header/Header';
import Todos from './Components/Todos/Todos';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Make the Basic UI', key: '1' },
    { text: 'Add CRUD operation', key: '2' },
    { text: 'Add Local storage', key: '3' }
  ]);
  const doneHandler = (key) =>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.key != key);
    })
  }
  return (
    <View style={styles.container}>
      <Header/>

      <View style={styles.mainContent}>

        <View style={styles.listContent}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Todos item ={item} doneHandler={doneHandler} />
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
