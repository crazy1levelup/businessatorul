import React from 'react'
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

const CustomButton = (props) => {
    const { buttonText, onPress, color, isLoading } = props

    return (
        <TouchableOpacity
            style={color === 'red' ? styles.redButton : styles.blackButton}
            onPress={() => onPress()}
        >
            {isLoading ? <ActivityIndicator style={styles.loading} color='black' size='large' /> : <Text> {buttonText} </Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    redButton: {
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'red',
        marginHorizontal: 40,
        marginVertical: 40,
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        padding: 12
    },
    blackButton: {
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'black',
        marginHorizontal: 40,
        borderColor: 'red',
        borderWidth: 1,
        height: 50,
        padding: 12
    },
    loading: {
        flex:1,
    }
})

export default CustomButton