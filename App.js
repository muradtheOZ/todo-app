import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Alert, View, Text,TextInput } from 'react-native';
import AddTodos from './Components/AddTodos/AddTodos';
import Header from './Components/Header/Header';
import Todos from './Components/Todos/Todos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";
import Completed from './Components/Completed/Completed';
import Dialog from "react-native-dialog";

export default function App() {
  //declaring all of the state
  
  //Check for data load
  const [ready, setReady] = useState(false);

  //Main Todo list state 
  const initialTodos = []
  const [todos, setTodos] = useState(initialTodos);

  //Completed Todo list state
  const [completed, setCompleted] = useState([]);

  // set info for update todo
  const[text,setText] = useState("");
  const[clickedKey, setClickedKey] = useState("")

  // updated modal state
  const [visible, setVisible] = useState(false);


  //update Modal functionalities for update a todo
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdate = () => {
    //added updated todo in a object
    const editedToDos = {
      text: text,
      key: clickedKey
    }
  
    //finding the updated todo index and insert the updated value in normal stage and local storage
    const newTodos = [...todos]
    const todoIndex = todos.findIndex((todo) => todo.key === clickedKey)
    newTodos.splice(todoIndex, 1,editedToDos);
    setTodos(newTodos);
    const jsonValue = JSON.stringify(newTodos)
            AsyncStorage.setItem('storedToDos', jsonValue)
              .then(() => {
                setTodos(newTodos);
              })
    setVisible(false);
  };

  // Implemented delete handler by filtering with key value
  const deleteHandler = (key) => {
    const newComplete = completed.filter(todo => todo.key != key)
    const completeJasonValue = JSON.stringify(newComplete)
    AsyncStorage.setItem('completedToDos', completeJasonValue)
      .then(() => {
        setCompleted(newComplete);
      })
  }


//Here with alert button selection delete, complete and, update implemented
  const ManagePartOfCrud = (item) => {
    Alert.alert(
      "Chose Option",
      "Mark Done delete or Update.You have to chose one",
      [
        {
          text: "Delete",
          onPress: () => {
            const newTodos = todos.filter(todo => todo.key != item.key)
            const jsonValue = JSON.stringify(newTodos)
            AsyncStorage.setItem('storedToDos', jsonValue)
              .then(() => {
                setTodos(newTodos);
              })
          }
        },
        {
          text: "Completed",
          onPress: () => {
            const newComplete = todos.filter(todo => todo.key == item.key)
            const ToatlCompleted = [...newComplete, ...completed]
            const completeJasonValue = JSON.stringify(ToatlCompleted)
            AsyncStorage.setItem('completedToDos', completeJasonValue)
              .then(() => {
                setCompleted(ToatlCompleted);
              })

            const newTodos = todos.filter(todo => todo.key != item.key)
            const jsonValue = JSON.stringify(newTodos)
            AsyncStorage.setItem('storedToDos', jsonValue)
              .then(() => {
                setTodos(newTodos);
              })
          }
        },
        { text: "update", onPress: () =>{
          setText(item.text);
          setClickedKey(item.key);
          

          showDialog();

        } 
      }
      ]
    );

  };

  //Todo added with length check
  const submitHandler = (text) => {
    if (text.length > 4) {
      const newTodos = [{
        text: text,
        key: Date.now().toString(36) + Math.random().toString(36).substr(2)
      }
      ]
      const finalTodos = [...newTodos, ...todos];
      const jsonValue = JSON.stringify(finalTodos)
      AsyncStorage.setItem('storedToDos', jsonValue)
        .then(() => {
          setTodos(finalTodos);
        })
    }
    else {
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
          <Dialog.Container visible={visible}>
            <Dialog.Title>Update Todo</Dialog.Title>
            <TextInput
              onChangeText={setText}
              value ={text}
            ></TextInput>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Update" onPress={handleUpdate} />
          </Dialog.Container>

        <View style={styles.listContent}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Todos item={item} ManagePartOfCrud={ManagePartOfCrud} />
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
  completeList: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    backgroundColor: '#3450A1',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    fontSize: 20
  }
});
