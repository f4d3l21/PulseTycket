import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import EventDetails from '../screens/EventDetails';
import SeeAllEvents from '../screens/SeeAllEvents';
import ProfileScreen from '../screens/ProfileScreen';
import FormScreen from '../screens/FormScreen';
import ReservationsScreen from '../screens/ReservationsScreen';
import ReservationDetailsScreen from '../screens/ReservationDetailsScreen';
import TicketScreen from '../screens/TicketScreen';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
}

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen name="SeeAllEvents" component={SeeAllEvents} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="FormScreen" component={FormScreen} />
            <Stack.Screen name="TicketScreen" component={TicketScreen} />
        </Stack.Navigator>
    );
}

function ReservationsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ReservationsScreen" component={ReservationsScreen} />
            <Stack.Screen name="ReservationDetailsScreen" component={ReservationDetailsScreen} />
        </Stack.Navigator>
    );
}

function MainTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Location') {
                        iconName = focused ? 'location' : 'location-outline';
                    } else if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Reservations') {
                        iconName = focused ? 'ticket' : 'ticket-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FF5C5C',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#2E1E1E',
                },
            })}
        >
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: 'Carte',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? 'map' : 'map-outline'} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Reservations" component={ReservationsStack} />

        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="Main" component={MainTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

