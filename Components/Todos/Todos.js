import React from 'react';
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';

const Todos = ({item,ManagePartOfCrud}) => {


    return (
        <TouchableOpacity onPress={()=>ManagePartOfCrud(item) }>
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
