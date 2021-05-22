import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Alert, View,Text } from 'react-native';
import AddTodos from './Components/AddTodos/AddTodos';
import Header from './Components/Header/Header';
import Todos from './Components/Todos/Todos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";
import Completed from './Components/Completed/Completed';

export default function App() {
  const [ready, setReady] = useState(false);
  const initialTodos = []
  const [todos, setTodos] = useState(initialTodos);
  const [completed, setCompleted] = useState(null);

  const deleteHandler = (key) =>{
    const newComplete = completed.filter(todo => todo.key != key)
    const completeJasonValue = JSON.stringify(newComplete)
    AsyncStorage.setItem('completedToDos', completeJasonValue)
    .then(()=>{
      setCompleted(newComplete);
    })
  }

  const doneHandler = (key) => {
    Alert.alert(
      "Chose Option",
      "Mark Done delete or Update.You have to chose one",
      [
        {
          text: "Delete",
          onPress: () => {
            const newTodos = todos.filter(todo=>todo.key != key)
            const jsonValue = JSON.stringify(newTodos)
            AsyncStorage.setItem('storedToDos', jsonValue)
            .then(()=>{
              setTodos(newTodos);
            })
          }
        },
        {
          text: "Completed",
          onPress: () => {
            const newComplete = todos.filter(todo => todo.key == key)
            const ToatlCompleted = [...newComplete,...completed]
            const completeJasonValue = JSON.stringify(ToatlCompleted)
            AsyncStorage.setItem('completedToDos', completeJasonValue)
            .then(()=>{
              setCompleted(ToatlCompleted);
            })
            
            const newTodos = todos.filter(todo=>todo.key != key)
            const jsonValue = JSON.stringify(newTodos)
            AsyncStorage.setItem('storedToDos', jsonValue)
            .then(()=>{
              setTodos(newTodos);
            })
          }
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    
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

      AsyncStorage.getItem('completedToDos')
      .then(data => {
        if (data !== null) {
          setCompleted(JSON.parse(data))
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

        <View style={styles.completeList}>
          <Text style={styles.title}> Completed List</Text>
          <FlatList
            data={completed}
            renderItem={({ item }) => (
              <Completed item={item} setTodos={setTodos} deleteHandler={deleteHandler} />
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
  completeList:{
    flex: 1,
    marginTop: 20,
  },
  title:{
    textAlign:'center',
    backgroundColor:'#3450A1',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    fontSize: 20
  }
});
