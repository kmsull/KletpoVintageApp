import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Platform, Modal, TouchableOpacity, FlatList, TextInput, Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../db/firebaseConfig";

const EventMap = () => {
    const [location, setLocation] = useState(null); // Store the user's location
    const [errorMsg, setErrorMsg] = useState(null); // Store any error messages
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [searchQuery, setSearchQuery] = useState(""); // Store the search query
    const [mapRegion, setMapRegion] = useState(null); // Store the map region
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility
    const [showEvents, setShowEvents] = useState(false); // Control events modal visibility
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Track keyboard visibility
    const [events, setEvents] = useState([]); // Store events from the database

    // Fetch events from Firestore and geocode their addresses
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Events"));
                const eventsList = [];

                for (const doc of querySnapshot.docs) {
                    const eventData = doc.data();
                    // Geocode the address to get coordinates
                    const geocodedLocations = await Location.geocodeAsync(eventData.address);
                    if (geocodedLocations.length > 0) {
                        const { latitude, longitude } = geocodedLocations[0];
                        eventsList.push({
                            id: doc.id,
                            ...eventData,
                            location: { latitude, longitude }, // Add geocoded coordinates
                        });
                    }
                }

                setEvents(eventsList); // Update the events state
            } catch (error) {
                console.error("Error fetching or geocoding events:", error);
                setErrorMsg("Failed to load events");
                setShowPopup(true); // Show error popup
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        // Fetch the user's location when the component mounts
        (async () => {
            // Request permission to access location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                setIsLoading(false);
                return;
            }

            // Get the user's current location
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords); // Save the coordinates
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            setIsLoading(false); // Stop loading
        })();
    }, []);

    // Listen for keyboard visibility changes
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true); // Keyboard is visible
        });

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false); // Keyboard is hidden
        });

        // Clean up listeners
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Handle search query changes
    const handleSearch = async () => {
        if (searchQuery.trim() === "") return;

        // Use native geocoding to convert the address to coordinates
        try {
            const geocodedLocations = await Location.geocodeAsync(searchQuery);

            if (geocodedLocations.length > 0) {
                const { latitude, longitude } = geocodedLocations[0];
                setMapRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                setLocation({ latitude, longitude });
            } else {
                setErrorMsg("Location not found");
                setShowPopup(true); // Show the popup
            }
        } catch (error) {
            console.error("Geocoding error:", error);
            setErrorMsg("Failed to fetch location");
            setShowPopup(true); // Show the popup
        }
    };

    // Close the popup
    const closePopup = () => {
        setShowPopup(false);
    };

    // Open the events modal
    const openEventsModal = () => {
        setShowEvents(true);
    };

    // Close the events modal
    const closeEventsModal = () => {
        setShowEvents(false);
    };

    // Dismiss the keyboard
    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Dismiss the keyboard
    };

    // If the location is still loading, show a loading indicator
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // If the location is available, render the map
    return (
        <View style={styles.container}>
            {/* Map */}
            <MapView
                style={styles.map}
                region={mapRegion}
                onRegionChangeComplete={setMapRegion}
                showsUserLocation={true} // Show the user's location on the map
            >
                {/* Add markers for upcoming events */}
                {events.map((event) => (
                    <Marker key={event.id} coordinate={event.location} title={event.title} description={`Address: ${event.address}\nDate: ${event.date}\nTime: ${event.time}`} />
                ))}

                {/* Add a marker at the user's location */}
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="Your Location"
                        description="You are here!"
                    />
                )}
            </MapView>

            {/* Custom Search Bar Overlay */}
            <View style={styles.searchBarOverlay}>
                <View style={styles.customSearchBar}>
                    <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
                    <TextInput placeholder="Search for a location..." value={searchQuery} onChangeText={setSearchQuery} onSubmitEditing={handleSearch} style={styles.searchInput} />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearIcon}>
                            <Ionicons name="close-circle" size={20} color="#000" />
                        </TouchableOpacity>
                    )}
                    {/* Cancel Button (only visible when keyboard is visible) */}
                    {isKeyboardVisible && (
                        <TouchableOpacity onPress={dismissKeyboard} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Tan Button for Upcoming Events */}
            <TouchableOpacity style={styles.eventsButton} onPress={openEventsModal}>
                <Text style={styles.eventsButtonText}>Upcoming Events</Text>
            </TouchableOpacity>

            {/* Popup for Location Not Found */}
            <Modal visible={showPopup} transparent={true} animationType="fade" onRequestClose={closePopup}>
                <View style={styles.popupContainer}>
                    <View style={styles.popupContent}>
                        <Text style={styles.popupText}>{errorMsg}</Text>
                        <TouchableOpacity onPress={closePopup} style={styles.popupButton}>
                            <Text style={styles.popupButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for Upcoming Events */}
            <Modal visible={showEvents} transparent={true} animationType="slide" onRequestClose={closeEventsModal}>
                <View style={styles.eventsModalContainer}>
                    <View style={styles.eventsModalContent}>
                        <Text style={styles.eventsModalTitle}>Upcoming Events</Text>
                        <FlatList
                            data={events}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.eventItem}>
                                    <Text style={styles.eventName}>{item.title}</Text>
                                    <Text style={styles.eventDate}>{item.date}</Text>
                                    <Text style={styles.eventTime}>{item.time}</Text>
                                    <Text style={styles.eventAddress}>{item.address}</Text>
                                </View>
                            )}
                        />
                        <TouchableOpacity onPress={closeEventsModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    searchBarOverlay: {
        position: "absolute", // Position the search bar absolutely
        top: 80, // Adjust the top position as needed
        width: "80%",
        zIndex: 1, // Ensure the search bar is above the map
    },
    customSearchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    clearIcon: {
        marginLeft: 10,
    },
    cancelButton: {
        marginLeft: 10,
    },
    cancelButtonText: {
        color: "#007bff",
        fontSize: 16,
    },
    eventsButton: {
        position: "absolute", // Position the button absolutely
        bottom: 140, // Adjust the bottom position as needed
        width: "50%",
        backgroundColor: "tan", // Tan color
        padding: 15,
        borderRadius: 32,
        alignItems: "center",
        zIndex: 1, // Ensure the button is above the map
    },
    eventsButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ba0d0d",
    },
    popupContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    popupContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    popupText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    popupButton: {
        backgroundColor: "#007bff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    popupButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    eventsModalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    eventsModalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        maxHeight: "80%", // Limit the height of the modal
    },
    eventsModalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    eventItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    eventName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    eventDate: {
        fontSize: 14,
        color: "#666",
    },
    eventTime: {
        fontSize: 14,
        color: "#666",
    },
    eventAddress: {
        fontSize: 14,
        color: "#666",
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default EventMap;
