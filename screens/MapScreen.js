import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { supabase } from '../services/supabase';

const OPEN_CAGE_API_KEY = '3a44492fa8384b0d83a39416bee13611';

export default function MapScreen({ navigation }) {
    const [events, setEvents] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [region, setRegion] = useState({
        latitude: 48.8566, 
        longitude: 2.3522,
        latitudeDelta: 5,
        longitudeDelta: 5,
    });
    const [selectedEvent, setSelectedEvent] = useState(null); 

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('evenements')
                    .select('id, titre, lieu, date, description'); 

                if (error) {
                    console.error('Erreur lors de la récupération des événements :', error);
                    Alert.alert('Erreur', 'Impossible de récupérer les événements.');
                    return;
                }

                const geocodedMarkers = await Promise.all(
                    data.map(async (event) => {
                        const coordinates = await getCoordinates(event.lieu);
                        return {
                            id: event.id,
                            titre: event.titre,
                            lieu: event.lieu,
                            date: event.date,
                            description: event.description,
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                        };
                    })
                );

                setEvents(data);
                setMarkers(geocodedMarkers);
            } catch (err) {
                console.error('Erreur inattendue :', err);
                Alert.alert('Erreur', 'Une erreur inattendue est survenue.');
            }
        };

        fetchEvents();
    }, []);

    const getCoordinates = async (city) => {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: city,
                    key: OPEN_CAGE_API_KEY,
                    limit: 1,
                },
            });

            if (response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry;
                return { latitude: lat, longitude: lng };
            } else {
                throw new Error(`Impossible de géocoder la ville : ${city}`);
            }
        } catch (err) {
            console.error('Erreur lors du géocodage :', err);
            return { latitude: 0, longitude: 0 };
        }
    };

    const handleMarkerPress = (event) => {
        setSelectedEvent(event); 
    };

    const handleCardPress = () => {
        navigation.navigate('Home', {
            screen: 'EventDetails',
            params: { eventId: selectedEvent.id },
        });
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.titre}
                        description={marker.lieu}
                        onPress={() => handleMarkerPress(marker)}
                    />
                ))}
            </MapView>

            {selectedEvent && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{selectedEvent.titre}</Text>
                    <Text style={styles.cardDate}>
                        📅 {new Date(selectedEvent.date).toLocaleDateString()} à{' '}
                        {new Date(selectedEvent.date).toLocaleTimeString()}
                    </Text>
                    <Text style={styles.cardLocation}>📍 {selectedEvent.lieu}</Text>
                    <Text style={styles.cardDescription}>{selectedEvent.description}</Text>
                    <TouchableOpacity style={styles.cardButton} onPress={handleCardPress}>
                        <Text style={styles.cardButtonText}>Voir les détails</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    card: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    cardLocation: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10,
    },
    cardButton: {
        backgroundColor: '#FF5C5C',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cardButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
