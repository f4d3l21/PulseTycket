import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BackButton({ navigation }) {
    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 40, 
        left: 20,
        zIndex: 10,
        backgroundColor: '#FF5C5C',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
    },
});
