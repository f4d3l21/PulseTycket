import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { supabase } from '../services/supabase';

export default function FormScreen({ route, navigation }) {
    const { eventId } = route.params; 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [places, setPlaces] = useState('1'); 

    const handleReservation = async () => {
        const parsedPlaces = parseInt(places, 10);

        if (!name || !email || isNaN(parsedPlaces) || parsedPlaces <= 0) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs correctement.');
            return;
        }

        try {
            const { data: user, error: userError } = await supabase
                .from('utilisateurs')
                .select('id')
                .eq('email', email)
                .single();

            if (userError || !user) {
                Alert.alert('Erreur', "L'utilisateur avec cet email n'existe pas.");
                console.error('Erreur utilisateur:', userError);
                return;
            }

            const { data: eventData, error: eventError } = await supabase
                .from('evenements')
                .select('places_restantes')
                .eq('id', eventId)
                .single();

            if (eventError || !eventData) {
                Alert.alert('Erreur', 'Impossible de récupérer les informations de l’événement.');
                console.error('Erreur événement:', eventError);
                return;
            }

            if (eventData.places_restantes < parsedPlaces) {
                Alert.alert('Erreur', 'Pas assez de places disponibles.');
                return;
            }

            const { data: reservationData, error: reservationError } = await supabase
                .from('reservations')
                .insert([
                    {
                        utilisateur_id: user.id, 
                        evenement_id: eventId,
                        nombre_billets: parsedPlaces,
                    },
                ])
                .select();

            if (reservationError || !reservationData) {
                Alert.alert('Erreur', 'Impossible de créer la réservation.');
                console.error('Erreur réservation:', reservationError);
                return;
            }

            const { error: updateError } = await supabase
                .from('evenements')
                .update({ places_restantes: eventData.places_restantes - parsedPlaces })
                .eq('id', eventId);

            if (updateError) {
                Alert.alert(
                    'Erreur',
                    'La réservation a été créée, mais les places restantes n’ont pas été mises à jour.'
                );
                console.error('Erreur mise à jour des places:', updateError);
                return;
            }

            Alert.alert('Succès', 'Votre réservation a été créée avec succès !');
            navigation.replace('TicketScreen', {
                reservationId: reservationData[0].id, 
            });
        } catch (error) {
            console.error('Erreur inattendue:', error.message);
            Alert.alert('Erreur', 'Une erreur inattendue est survenue.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={styles.title}>Réservation</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre de places"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={places}
                onChangeText={(value) => setPlaces(value.replace(/[^0-9]/g, ''))}
            />
            <TouchableOpacity style={styles.button} onPress={handleReservation}>
                <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#2E1E1E',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#3E2E2E',
        borderRadius: 8,
        padding: 16,
        color: '#fff',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#FF5C5C',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
