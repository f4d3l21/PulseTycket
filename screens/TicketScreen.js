import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { supabase } from '../services/supabase';

export default function TicketScreen({ route }) {
  const { reservationId } = route.params;
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select(
          `
          id,
          nombre_billets,
          evenements!fk_evenement (titre, date)
        `
        )
        .eq('id', reservationId)
        .single();

      if (error) {
        console.error('Erreur lors de la récupération du billet :', error);
        Alert.alert('Erreur', 'Impossible de récupérer les détails du billet.');
      } else {
        setTicketDetails(data);
      }
    };

    fetchTicketDetails();
  }, [reservationId]);

  if (!ticketDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Chargement des détails...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Billet</Text>
      <View style={styles.ticketDetails}>
        <Text style={styles.detail}>Événement : {ticketDetails.evenements.titre}</Text>
        <Text style={styles.detail}>Date : {new Date(ticketDetails.evenements.date).toLocaleDateString()}</Text>
        <Text style={styles.detail}>Nombre de billets : {ticketDetails.nombre_billets}</Text>
      </View>
      <QRCode
        value={`ReservationID:${ticketDetails.id}`}
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
  message: {
    fontSize: 18,
    color: '#aaa',
  },
});
