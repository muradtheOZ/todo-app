import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const AddTodos = ({submitHandler}) => {
    const [text, setText] = useState('')
    const changeHandler = (value) => {
        setText(value);
    }
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Add todo..."
                onChangeText={changeHandler}
            />
            <Button onPress={() =>submitHandler(text)} title='Add todo' color='#3450A1' />
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    }
})

export default AddTodos;
