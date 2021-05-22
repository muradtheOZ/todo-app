import React from 'react';
import { Text,StyleSheet, View } from 'react-native';

const Header = () => {

    return (
        <View style={styles.header}>
            <Text style ={styles.title}>My To-dos</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    header:{
        paddingLeft:10,
        height:70,
        paddingTop: 35,
        backgroundColor: '#3450A1'
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      }

});


export default Header;
