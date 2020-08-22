import React, { useRef, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native'
import moment from 'moment'
import Carousel from 'react-native-snap-carousel'
import { url } from '../api/url'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const Reservations = (props) => {
    const { reservations, setReservationEdit, business, getReservations } = props
    const carouselRef = useRef('')
    const [search, setSearch] = useState('')

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.businessName}>{item.username}</Text>
            <Text style={styles.businessLocation}>Phone: {item.phone}</Text>
            <Text style={styles.businessLocation}>Persons: {item.persNumber}</Text>
            <Text style={styles.businessLocation}>Reservation: {moment(item.dateTime).format('DD/MM/YYYY-HH:mm')}</Text>
            <View style={{ alignSelf: 'center', marginTop: 10 }}>
                <TouchableOpacity
                    style={styles.editButton}
                    title='Edit'
                    onPress={() => setReservationEdit(item)}
                >
                    <Text>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderCarousel = ({ item, index }) => (
        <View style={styles.imageContainer}>
            <Image
                style={styles.imageContainer}
                source={{ uri: `${url}/photo/${item.thumb}` }}
            />
        </View>
    )

    if (!business) {
        return null
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Carousel
                    ref={carouselRef}
                    data={business.images}
                    layout='stack'
                    layoutCardOffset={50}
                    inactiveSlideOpacity={1}
                    renderItem={renderCarousel}
                    sliderHeight={300}
                    itemHeight={300}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        style={styles.textInput}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        placeholder='Search by username'
                        autoCapitalize='none'
                    />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <TouchableOpacity 
                        style={styles.searchButton}
                        onPress={() => {getReservations(business._id, search)}}
                        >
                            <Text >Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={reservations}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
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
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        width: 100,
        padding: 5
    },
    textInput: {
        height: 50,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 20,
        color: 'red',
        borderRadius: 5,
        width: 230
    },
    searchButton: {
        backgroundColor: 'black',
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: 'red',
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: -18
    }
})
export default Reservations