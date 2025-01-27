import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabase';
import BackButton from '../components/BackButton.js'; 


export default function SeeAllEvents({ navigation }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase.from('evenements').select('*');
            if (error) {
                console.error(error);
            } else {
                setEvents(data);
            }
        };

        fetchEvents();
    }, []);

    return (
        
        <View style={styles.container}>
            <BackButton navigation={navigation} />
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
                    >
                        <Text style={styles.title}>{item.titre}</Text>
                        <Text style={styles.details}>{item.lieu}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E1E1E',
        padding: 16,
    },
    card: {
        backgroundColor: '#3E2E2E',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    details: {
        fontSize: 14,
        color: '#aaa',
    },
});
