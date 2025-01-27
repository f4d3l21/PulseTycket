import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { supabase } from '../services/supabase';
import BackButton from '../components/BackButton';

export default function ProfileScreen({ route, navigation }) {
    const { email: initialEmail } = route.params || {};
    const [email, setEmail] = useState(initialEmail || '');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!email) {
            Alert.alert('Erreur', 'Email utilisateur introuvable.');
            console.error('Email utilisateur manquant dans les paramètres.');
        }
    }, [email]);

    const handleUpdate = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('utilisateurs')
                .update({ mot_de_passe: password }) 
                .eq('email', email); 

            if (error) {
                console.error('Erreur Supabase :', error);
                Alert.alert('Erreur', 'Impossible de mettre à jour vos informations.');
            } else {
                Alert.alert('Succès', 'Vos informations ont été mises à jour.');
                console.log('Mise à jour réussie :', data);
            }
        } catch (err) {
            console.error('Erreur inattendue lors de la mise à jour :', err);
            Alert.alert('Erreur', 'Une erreur inattendue est survenue.');
        }
    };

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Text style={styles.title}>Profil</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        value={email}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nouveau mot de passe"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Modifier</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
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
