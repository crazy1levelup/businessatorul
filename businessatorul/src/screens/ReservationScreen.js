import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Modal, TouchableHighlight, TextInput } from 'react-native';
import ImageContainer from '../components/ImageContainer'
import { connect } from 'react-redux'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { addReservation, getReservations, updateReservation } from '../redux/actions/reservationActions'
import Reservations from '../components/Reservations'
import LoadingPage from '../components/LoadingPage'

const ReservationScreen = (props) => {
    const { addReservation, getReservations, route, reservations, loading, updateReservation, oneBusiness } = props
    const [modal, setModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)

    const [reservation, setReservation] = useState({
        username: '',
        phone: '',
        dateTimeShow: moment().format('DD/MM/YYYY - HH:mm'),
        dateTime: moment(),
        persNumber: '',
        businessId: route.params.businessId,
        reservationId: ''
    })

    const clearReservationState = () => {
        setReservation({
            ...reservation,
            username: '',
            phone: '',
            persNumber: '',
            reservationId: '',
            dateTimeShow: moment().format('DD/MM/YYYY - HH:mm'),
            dateTime: moment(),
        }
        )
    }

    useEffect(() => {
        getReservations(route.params.businessId)
    }, [])

    const addReservationModal = () => (
        <Modal
            animationType="slide"
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}
        >
            <View style={styles.container}>
                <Text style={styles.modalText}>Add reservation</Text>
                <View style={{ margin: 10 }}>
                    <Text>Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setReservation({ ...reservation, username: text })}
                        value={reservation.username}
                        autoCapitalize='none'
                    />
                    <Text>Phone number:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setReservation({ ...reservation, phone: text })}
                        value={reservation.phone}
                        autoCapitalize='none'
                        keyboardType='numeric'
                    />
                    <Text>Date & Time:</Text>
                    <TouchableOpacity style={{ ...styles.textInput, flexDirection: 'column', justifyContent: 'center' }} onPress={() => setDateModal(true)}>
                        <Text style={{ marginLeft: 2, color: 'red' }}>{reservation.dateTimeShow}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        style={{ zIndex: 9999 }}
                        isVisible={dateModal}
                        mode="datetime"
                        onConfirm={(date) => {
                            setReservation({ ...reservation, dateTime: date, dateTimeShow: moment(date).format('DD/MM/YYYY - HH:mm') })
                            setDateModal(false)
                        }}
                        onCancel={() => setDateModal(false)}
                    />
                    <Text>Number of pers:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setReservation({ ...reservation, persNumber: text })}
                        value={reservation.persNumber}
                        autoCapitalize='none'
                        keyboardType='numeric'
                    />

                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "red" }}
                            onPress={() => {
                                setModal(!modal);
                            }}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            disabled={!reservation.username || !reservation.phone || !reservation.persNumber}
                            style={!reservation.username || !reservation.phone || !reservation.persNumber ? { ...styles.openButton, backgroundColor: "grey" } : { ...styles.openButton, backgroundColor: "red" }}
                            onPress={() => {
                                if (reservation.reservationId) {
                                    updateReservation(reservation)
                                } else {
                                    addReservation(reservation)
                                }
                                clearReservationState()
                                setModal(!modal);

                            }}
                        >
                            <Text style={styles.textStyle}>{reservation.reservationId ? 'Update' : 'Save'}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    )

    const setReservationEdit = (reserv) => {
        setModal(true)
        setReservation({
            username: reserv.username,
            phone: reserv.phone,
            dateTimeShow: moment(reserv.dateTime).format('DD/MM/YYYY - HH:mm'),
            dateTime: reserv.dateTime,
            persNumber: reserv.persNumber,
            businessId: route.params.businessId,
            reservationId: reserv._id
        }
        )
    }

    return (
        <ImageContainer>
            {addReservationModal()}
            <TouchableOpacity style={styles.reservationButton} onPress={() => { setModal(true) }}>
                <Text style={styles.reservationText}>Make reservation</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                {loading ? <LoadingPage /> : <Reservations getReservations={getReservations} reservations={reservations} business={oneBusiness} setReservationEdit={setReservationEdit} />}
            </View>
        </ImageContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10
    },
    reservationButton: {
        alignSelf: 'center',
        paddingTop: 5
    },
    reservationText: {
        color: 'red',
        fontSize: 16
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalText: {
        fontSize: 25,
        alignSelf: 'center'
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

})

const mapStateToProps = state => ({
    user: state.auth.user,
    reservations: state.reservation.reservations,
    oneBusiness: state.business.oneBusiness,
    loading: state.reservation.loading,
})


export default connect(mapStateToProps, { addReservation, getReservations, updateReservation })(ReservationScreen);