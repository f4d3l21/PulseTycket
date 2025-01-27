import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function ReservationDetailsScreen({ route }) {
    const { reservationId, eventName, ticketCount, eventDate } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Détails de la Réservation</Text>
            <View style={styles.ticketDetails}>
                <Text style={styles.detail}>Événement : {eventName}</Text>
                <Text style={styles.detail}>Date : {new Date(eventDate).toLocaleDateString()}</Text>
                <Text style={styles.detail}>Nombre de billets : {ticketCount}</Text>
            </View>
            <QRCode
                value={`ReservationID:${reservationId}`}
                size={200}
                color="#000"
                backgroundColor="#fff"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E1E1E',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: '#FF5C5C',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    ticketDetails: {
        backgroundColor: '#3E2E2E',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
    },
    detail: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 8,
    },
});
