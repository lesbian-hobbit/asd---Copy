import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import {collection, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot} from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, signOut } from "firebase/auth";

const RecieveCash = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [email, setEmail] = useState();
    const [uids, setUid] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            setUid(uid);
            setEmail(user.email);
      
            const getWallet = async() => {
              const docRef = doc(db, "users", uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                const data = docSnap.data();
                setUserInfo(data);
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
            }
            getWallet();
          } else {
            navigation.navigate("Login");
          }
        });
      }, []);



    return(
        <View style={styles.container}>
            <View style={styles.userInfo}>
            <Text style={styles.userId }>
                id: {uids}
            </Text>
            <Text style={styles.balance}>
            Current Balance: {userInfo.wallet}
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
        color: "black",
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F3F6',
      }
})
