import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Alert, View } from 'react-native';
import AddTodos from './Components/AddTodos/AddTodos';
import Header from './Components/Header/Header';
import Todos from './Components/Todos/Todos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";

export default function App() {
  const [ready, setReady] = useState(false);
  const initialTodos = []
  const [todos, setTodos] = useState(initialTodos);

  const doneHandler = (key) => {
    const newTodos = todos.filter(todo=>todo.key != key)
    const jsonValue = JSON.stringify(newTodos)
    AsyncStorage.setItem('storedToDos', jsonValue)
    .then(()=>{
      setTodos(newTodos);
    })
    
    // setTodos((prevTodos) => {
    //   return prevTodos.filter(todo => todo.key != key);
    // });
  };
  const submitHandler = (text) => {
    if(text.length > 4){
      const newTodos = [{
        text: text,
        key: Date.now().toString(36) + Math.random().toString(36).substr(2)
      }
      ]
      const finalTodos =[...newTodos,...todos];
      const jsonValue = JSON.stringify(finalTodos)
      AsyncStorage.setItem('storedToDos', jsonValue)
      .then(()=>{
        setTodos(finalTodos);
      })
    }
    else{
      Alert.alert(
        "Sorry!",
        "Todo must have more than 4 character",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }

  };

  //loading data 
  const loadTodos = () => {
    AsyncStorage.getItem('storedToDos')
      .then(data => {
        if (data !== null) {
          setTodos(JSON.parse(data))
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (!ready) {
    return (
      <AppLoading
        startAsync={loadTodos}
        onFinish={() => setReady(true)}
        onError={console.warn}

      />
    )
  }


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <AddTodos submitHandler={submitHandler} />

        <View style={styles.listContent}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Todos item={item} setTodos={setTodos} doneHandler={doneHandler} />
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
