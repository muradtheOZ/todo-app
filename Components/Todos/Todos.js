import React from 'react';
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';

const Todos = ({item,doneHandler,setTodos}) => {
    console.log(item.key);

    return (
        <TouchableOpacity onPress={()=>doneHandler(item.key) }>
            <Text style = {styles.list}>{item.text}</Text>
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create({
    list: {
      padding: 16,
      marginTop: 16,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: "dashed",
      borderRadius: 10
    }
});


export default Todos;
