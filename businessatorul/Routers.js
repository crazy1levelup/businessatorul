import AuthScreen from './src/screens/AuthScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ReservationScreen from './src/screens/ReservationScreen';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import BusinessScreen from './src/screens/BusinessScreen';
import { connect } from 'react-redux'
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { tryLocalSignin, logout } from './src/redux/actions/authActions'

const Stack = createStackNavigator();

const Routers = (props) => {
    const { token, loading, tryLocalSignin, logout } = props

    useEffect(() => {
        tryLocalSignin()
    }, [])

    return (
        <Stack.Navigator>
            {
                loading ? (<Stack.Screen name="Splash" component={ResolveAuthScreen} options={{
                    headerShown: false
                }} />) :
                    token == null ? (
                        <>
                            <Stack.Screen name="AuthScreen" component={AuthScreen} options={{
                                headerShown: false
                            }} />
                            <Stack.Screen name="Login" component={SigninScreen} options={{
                                headerShown: false
                            }} />
                            <Stack.Screen name="Register" component={SignupScreen} options={{
                                headerShown: false
                            }} />
                        </>
                    ) :
                        <>
                            <Stack.Screen name="Business" component={BusinessScreen} options={{
                                headerRight: () => (
                                    <Button
                                        onPress={() => logout()}
                                        title="Logout"
                                        color="#fff"
                                    />
                                ),
                            }} />
                            <Stack.Screen name="Reservation" component={ReservationScreen} options={({ route }) => ({
                                headerRight: () => (
                                    <Button
                                        onPress={() => logout()}
                                        title="Logout"
                                        color="#fff"
                                    />
                                ),
                                title: route.params.businessName,
                                headerTintColor: '#fff',
                            })} />
                        </>
            }
        </Stack.Navigator>
    )
}
const mapStateToProps = state => ({
    token: state.auth.token,
    loading: state.auth.loading,
})

export default connect(mapStateToProps, { tryLocalSignin, logout })(Routers)