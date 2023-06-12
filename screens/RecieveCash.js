import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import {collection, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot} from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth';

const RecieveCash = () => {

    const user = auth.currentUser
    const uid = user.uid

    const todoRef = firebase.firestore().collection('Users');

    const [balance , setBalance] = useState('')

    const loadData = () => {
        todoRef
        .doc(uid)
        .get()
        .then(documentSnapshot => {
            if(documentSnapshot.exists){
                console.log('User data: ', documentSnapshot.data() );
                setBalance(documentSnapshot.data());
            }
        })
    }
    useEffect(()=>{
        loadData();
    },[])



    return(
        <View style={styles.container}>
            <View style={styles.userInfo}>
            <Text style={styles.userId }>
                id: {uid}
            </Text>
            <Text style={styles.balance}>
            Current Balance: {balance.availableAmount}
            </Text>
        </View>
        </View>
        
    )

    
}
export default RecieveCash

const styles = StyleSheet.create({
    userInfo: {
        marginBottom: 20,
      },
      userId: {
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
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F3F6',
      }
})
