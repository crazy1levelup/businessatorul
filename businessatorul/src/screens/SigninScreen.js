import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, Text, TouchableOpacity } from 'react-native';
import ImageContainer from '../components/ImageContainer';
import CustomButton from '../common/customButton'
import { login, clearErrorMessage } from '../redux/actions/authActions'
import { connect } from 'react-redux'

const SigninScreen = (props) => {
    const { navigation, login, errorMessage, buttonLoading, clearErrorMessage } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = () => {
        login(email, password)
    }

    useEffect(() => {
        clearErrorMessage()
        return () => {
            clearErrorMessage()
        }
    }, [])

    return (
        <ImageContainer>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                >
                    <View style={styles.container}>
                        <Text style={styles.textTitle}> Sign in</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            placeholder='Email'
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            placeholder='Password'
                            autoCapitalize='none'
                            secureTextEntry
                        />
                        <CustomButton
                            isLoading={buttonLoading}
                            buttonText={'Login'}
                            color={'red'}
                            onPress={onLogin}
                        />
                        <Text style={{ color: 'red', alignSelf: 'center' }}>{errorMessage}</Text>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <View style={styles.link}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: 'blue' }}> Register</Text>
                </TouchableOpacity>
            </View>
        </ImageContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 80
    },
    link: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20
    },
    textInput: {
        height: 50,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 20,
        color: 'red',
        borderRadius: 5,
    },
    textTitle: {
        fontFamily: 'Cochin',
        fontSize: 40,
        alignSelf: 'center'
    },
})

const mapStateToProps = state => ({
    user: state.auth.user,
    buttonLoading: state.auth.buttonLoading,
    token: state.auth.token,
    errorMessage: state.auth.errorMessage
})


export default connect(mapStateToProps, { login, clearErrorMessage })(SigninScreen);