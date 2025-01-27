import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { supabase } from '../services/supabase';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EventDetails({ route, navigation }) {
    const { eventId } = route.params;
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const { data, error } = await supabase.from('evenements').select('*').eq('id', eventId).single();
            if (error) {
                console.error(error);
            } else {
                setEvent(data);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (!event) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Chargement...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: event.image || 'https://via.placeholder.com/300x200' }}
                style={styles.image}
            >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-outline" size={28} color="#fff" />
                </TouchableOpacity>
                {/* 
                <View style={styles.titleContainer}>
                    <Text style={styles.imageTitle}>{event.titre}</Text>
                </View>
                 */}
            </ImageBackground>

            <ScrollView style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.imageTitle}>{event.titre}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Icon name="location-outline" size={18} color="#fff" />
                        <Text style={styles.detailText}>{event.lieu}</Text>
                        <Text style={styles.price}>{event.prix}$</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Icon name="calendar-outline" size={18} color="#fff" />
                        <Text style={styles.detailText}>
                            {new Date(event.date).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                            })}
                        </Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Icon name="time-outline" size={18} color="#fff" />
                        <Text style={styles.detailText}>
                            {new Date(event.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                    </View>
                </View>

                <View style={styles.extraInfo}>
                    <Text style={styles.extraText}>
                        <Text style={styles.label}>Capacité totale :</Text> {event.capacite || 'Non spécifiée'}
                    </Text>
                    <Text style={styles.extraText}>
                        <Text style={styles.label}>Places restantes :</Text> {event.places_restantes || 'Non spécifiées'}
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>À propos :</Text>
                <Text style={styles.description}>{event.description}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('FormScreen', { eventId: event.id })}
                >
                    <Text style={styles.buttonText}>Get a Ticket</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E1E1E',
    },
    image: {
        height: 300,
        justifyContent: 'flex-end',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 50,
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
    },
    imageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        padding: 16,
        backgroundColor: '#2E1E1E',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    detailsContainer: {
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    detailText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 8,
        flex: 1,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF5C5C',
        marginLeft: 8,
    },
    extraInfo: {
        marginBottom: 16,
    },
    extraText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
        color: '#FF5C5C',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#ddd',
        marginBottom: 7,
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#FF5C5C',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: 'center',
        marginTop: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E1E1E',
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
    },
});
