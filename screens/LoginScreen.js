import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
} from 'react-native';
import { supabase } from '../services/supabase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        const { data, error } = await supabase
            .from('utilisateurs')
            .select('*')
            .eq('email', email)
            .eq('mot_de_passe', password)
            .single();

        if (error || !data) {
            console.error('Erreur lors de la connexion :', error);
            Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
            return;
        }

        Alert.alert('Succès', 'Connexion réussie.');
        navigation.replace('Main', { email: data.email });    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Image source={require('../assets/icone.png')} style={styles.logo} />
            <Text style={styles.title}>Hi!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
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
    logo: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginBottom: 16,
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
    link: {
        color: '#FF5C5C',
        textAlign: 'center',
        marginTop: 16,
    },
});
