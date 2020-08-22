import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import ImageContainer from '../components/ImageContainer';
import { fetchBusinesses, selectOneBusiness } from '../redux/actions/businessActions'
import { connect } from 'react-redux'
import { url } from '../api/url'

const BusinessScreen = (props) => {
    const { fetchBusinesses, user, business, navigation, selectOneBusiness } = props

    useEffect(() => {
        fetchBusinesses()
    }, [])

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => {
                selectOneBusiness(item)
                navigation.navigate('Reservation', { businessId: item._id, businessName: item.name })
            }}>
                <Text style={styles.businessName}>{item.name}</Text>
                <Image style={styles.image} source={{ uri: `${url}/photo/${item.images[0].thumb}` }} />
                <Text style={styles.businessLocation}>Adress: {item.location}</Text>
            </TouchableOpacity>

        </View>
    );

    return (
        <ImageContainer>
            <Text>
                Welcome to BUSINESSATOR {user.email}
            </Text>
            <View style={styles.container}>
                <FlatList
                    data={business}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>
        </ImageContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
    image: {
        height: 200,
        width: '100%',
    },
    businessName: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    businessLocation: {
        fontSize: 15,
        color: '#fff',
        marginTop: 10
    }
})

const mapStateToProps = state => ({
    user: state.auth.user,
    business: state.business.business
})

export default connect(mapStateToProps, { fetchBusinesses, selectOneBusiness })(BusinessScreen);