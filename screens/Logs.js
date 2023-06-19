import { View, Text, FlatList,ActivityIndicator, StyleSheet,Alert, Pressable, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import {collection,query, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot} from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, signOut } from "firebase/auth";

const Logs = () => {
  const [logInfo, setLogs] = useState([]);

  useEffect(() => {
    const todoRef = firebase
      .firestore()
      .collection("users")
      .doc("LlsVwIQz9hMMDtHgQLlT")
      .collection("Logs");

    const unsubscribe = todoRef.onSnapshot((querySnapshot) => {
      const logInfo = [];
      querySnapshot.forEach((doc) => {
        const { ReceiverUid, Timestamp, transactions } = doc.data();
        const formattedTimestamp = Timestamp.toDate().toLocaleString();
        logInfo.push({
          id: doc.id,
          ReceiverUid,
          Timestamp: formattedTimestamp,
          transactions,
        });
      });
      setLogs(logInfo);
      console.log(logInfo);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      {logInfo.map((item, index) => (
        <Text key={index}>
          sent: ${item.transactions} To {item.ReceiverUid} in {item.Timestamp}
        </Text>
      ))}
    </View>
  );
};

export default Logs;