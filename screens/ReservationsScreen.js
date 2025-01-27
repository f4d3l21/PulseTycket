import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import { supabase } from '../services/supabase';

export default function ReservationsScreen({ navigation }) {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const { data, error } = await supabase
                    .from('reservations')
                    .select(`
                        id,
                        nombre_billets,
                        evenements!fk_evenement (id, titre, date)
                    `);

                if (error) {
                    console.error('Erreur lors de la récupération des réservations :', error);
                    Alert.alert('Erreur', 'Impossible de récupérer vos réservations.');
                    return;
                }

                setReservations(data || []);
            } catch (error) {
                console.error('Erreur inattendue :', error.message);
                Alert.alert('Erreur', 'Une erreur inattendue est survenue.');
            }
        };

        fetchReservations();
    }, []);

    const renderReservation = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate('ReservationDetailsScreen', {
                    reservationId: item.id,
                    eventName: item.evenements.titre,
                    ticketCount: item.nombre_billets,
                    eventDate: item.evenements.date,
                })
            }
        >
            <Text style={styles.eventTitle}>{item.evenements.titre}</Text>
            <Text style={styles.ticketCount}>
                {item.nombre_billets} billet(s)
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Réservations</Text>
            {reservations.length > 0 ? (
                <FlatList
                    data={reservations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderReservation}
                />
            ) : (
                <Text style={styles.noReservations}>
                    Vous n'avez aucune réservation.
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#2E1E1E',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#3E2E2E',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    ticketCount: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 8,
    },
    noReservations: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});
