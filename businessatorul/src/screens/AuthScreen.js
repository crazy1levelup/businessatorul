import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ImageContainer from '../components/ImageContainer';
import CustomButton from '../common/customButton'
import ResolveAuthScreen from './ResolveAuthScreen'
import { connect } from 'react-redux'

const AuthScreen = ({ navigation, loading }) => {

    const navigateToLogin = () => {
        return navigation.navigate('Login')
    }

    const navigateToRegister = () => {
        return navigation.navigate('Register')
    }

    if (loading) {
        return <ResolveAuthScreen />
    }

    return (
        <ImageContainer>

            <View style={styles.container}>
                <Text style={styles.title}>
                    BUSINESSATOR
            </Text>
                <CustomButton buttonText={'Sign in'} onPress={navigateToLogin} color={'red'} />
                <CustomButton buttonText={'Register'} onPress={navigateToRegister} color={'black'} />
            </View>
        </ImageContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center'
    }
})

const mapStateToProps = state => ({
    user: state.auth.user,
    errorMessage: state.auth.errorMessage,
    token: state.auth.token,
    loading: state.auth.loading
})

export default connect(mapStateToProps, {})(AuthScreen);