import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../services/supabase';

export default function HomeScreen({ navigation }) {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [userEmail, setUserEmail] = useState('');


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
    
    const filteredEvents = events.filter((event) =>
        event.titre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>Événements</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { email: 'user@example.com' })}>

                    <Icon name="person-circle-outline" size={28} color="#fff" />
                </TouchableOpacity>

            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search all events..."
                    placeholderTextColor="#aaa"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
                <TouchableOpacity>
                    <Icon name="options-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SeeAllEvents')}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
                    >
                        <ImageBackground
                            source={{ uri: item.image || 'https://via.placeholder.com/300x200' }}
                            style={styles.image}
                            imageStyle={styles.imageStyle}
                        >
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {new Date(item.date).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                    })}
                                </Text>
                            </View>

                            <View style={styles.infoOverlay}>
                                <Text style={styles.cardTitle}>{item.titre}</Text>
                                <Text style={styles.details}>
                                    {item.lieu} -{' '}
                                    {new Date(item.date).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </Text>
                                <Text style={styles.price}>{item.prix}$</Text>
                            </View>
                        </ImageBackground>
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
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#3E2E2E',
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 40,
    },
    searchBar: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeAll: {
        color: '#FF5C5C',
        fontSize: 14,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        height: 200,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: 12,
    },
    badge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#FF5C5C',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    infoOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    details: {
        fontSize: 14,
        color: '#ddd',
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5C5C',
        marginTop: 8,
    },
});
