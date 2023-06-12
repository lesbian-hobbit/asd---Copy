import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const handleLogout = () => {
    console.log('Logout button clicked!');
    // Implement logout logic here
  };

  const handleCardPress = (cardName) => {
    console.log(`Clicked on ${cardName} card!`);
    // Handle the click event for each card
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="exit" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Cash System</Text>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.balance}>Available Balance: $500</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Card 1')}
        >
          <Ionicons name="ios-speedometer" size={60} color="white" />
          <Text style={styles.cardText}>Card 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Card 2')}
        >
          <Ionicons name="ios-alarm" size={60} color="white" />
          <Text style={styles.cardText}>Card 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Card 3')}
        >
          <Ionicons name="ios-wallet" size={60} color="white" />
          <Text style={styles.cardText}>Card 3</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress('Card 4')}
        >
          <Ionicons name="ios-chatbubbles" size={60} color="white" />
          <Text style={styles.cardText}>Card 4</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F6',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  balance: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: '#4F6D7A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
});