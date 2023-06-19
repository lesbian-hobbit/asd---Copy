import { View, Text, FlatList,ActivityIndicator, StyleSheet,Alert, Pressable, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import {collection,query, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot} from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons"

const receiveLogs = () => {
  const [logInfo, setLogs] = useState([]);
  const navigation = useNavigation()
  const onPress = () => {
    navigation.navigate("receiveLogs")
  }
  useEffect(() => {
    const user = auth.currentUser.uid;
    if (user) {
      const uid = user;
      const todoRef = firebase.firestore().collection("users").doc(uid).collection("history").doc("DUgVrFDJhas4wAuX07re").collection("Recieved");

      const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
        const logs = querySnapshot.docs.map((doc) => {
          const { ReceiverUid, Timestamp, transactions, Sender } = doc.data();
          let formattedTimestamp = "";
          if (Timestamp && Timestamp.toDate) {
            formattedTimestamp = Timestamp.toDate().toLocaleString();
          }
          return {
            id: doc.id,
            ReceiverUid,
            Timestamp: formattedTimestamp,
            transactions,
            Sender
            
          };
        });
        setLogs(logs);
        console.log(logs);
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <View>
     
      {logInfo.map((item, index) => (
        <Text key={index}>
          received ${item.transactions} from {item.Sender} in {item.Timestamp}
        </Text>
      ))}
      <TouchableOpacity style={styles.mediumButtonContainer} onPress={onPress}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Ionicons name="send" size={20} color="white" />
            </View>
          </View>
          <Text style={[styles.titleText, { color: 'black' }]}>Recieved history</Text>
        </TouchableOpacity>
    </View>
    
    
  );
  
};

export default receiveLogs;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: 'white',
    },
    header: {
      height: 120,
      padding: 20,
      borderRadius: 25,
      alignItems: 'center',
      backgroundColor: 'royalblue',
    },
    titleText: {
      fontSize: 12,
      color: 'white',
    },
    HeadlineText: {
      fontSize: 12,
      marginBottom: 10,
      color: 'gray'
    },
    regularText: {
      fontSize: 30,
      color: "white",
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      justifyContent: 'space-evenly',
    },
    mediumButtonContainer: {
      height: 90,
      width: 90,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 20,
      alignContent: 'center',
      flexWrap: 'wrap',
      backgroundColor: 'white'
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 100,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    smallButtonContainer: {
      height: 50,
      width: 50,
      padding: 10,
      marginBottom10: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      alignContent: 'center',
      flexWrap: 'wrap',
      backgroundColor: 'black'
    },
  });