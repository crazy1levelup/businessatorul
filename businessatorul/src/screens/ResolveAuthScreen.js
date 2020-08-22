import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ImageContainer from '../components/ImageContainer'

const ResolveAuthScreen = () => {

    return (
        <ImageContainer>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="red" />
            </View>
        </ImageContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})


const mapStateToProps = state => ({
    user: state.auth.user,
})


export default ResolveAuthScreen;