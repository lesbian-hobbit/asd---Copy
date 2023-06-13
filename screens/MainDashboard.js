import { View, Text, FlatList, StyleSheet, Pressable, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, firebase } from '../firebase';
import { collection, setDoc, doc, getDoc, Firestore } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { Ionicons } from "@expo/vector-icons"
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, signOut } from "firebase/auth";

const MainDashboard = () => {
  const [userInfo, setUserInfo] = useState([]);
    const navigation = useNavigation()
 const onPress = () =>{
    navigation.navigate("Send")
 }
 const onPress1 = () =>{
  auth
    .signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
}
const onPress2 = () => {
  navigation.navigate("Profile")
}
const onPress3 = () => {
  navigation.navigate("Recieve")
}




  const [balance, setBalance] = useState(5000); // Initial balance
  const [email, setEmail] = useState();
  const [uids, setUid] = useState();
 

  const [uid2, setUid2] = useState();
  const [amount, setAmount] = useState();

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




  return (
    <View style={styles.container}>

      <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', }]}>
        <View>
          <Text style={styles.titleText}>
            Balance
          </Text>
          <Text style={styles.regularText}>{userInfo.wallet}</Text>
        </View>
        <TouchableOpacity
          onPress={() => { console.log('Balance refreshed') }} >
          <Ionicons name="reload-outline" size={15} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderBottomColor: 'lightgray',
          borderBottomWidth: StyleSheet.hairlineWidth,
          margin: 20,
        }}
      />

      <View style={styles.buttonsContainer}  >

        <TouchableOpacity style={styles.mediumButtonContainer} onPress={onPress}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Ionicons name="send" size={20} color="white" />
            </View>
          </View>
          <Text style={[styles.titleText, { color: 'black' }]}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mediumButtonContainer} onPress={onPress3}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Ionicons name="cash-outline" size={20} color="white" />
            </View>
          </View>
          <Text style={styles.label}>Receive</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.HeadlineText}>Shortcuts</Text>

      <View style={[styles.buttonsContainer]}>
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress2}>
            <View style={styles.smallButtonContainer}>
              <Ionicons name="person-outline" size={22} color="white" />
            </View>
            <Text style={[styles.titleText, { color: 'black', marginTop: 5 }]}>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginRight: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress1}>
            <View style={styles.smallButtonContainer}>
              <Ionicons name="log-out-outline" size={22} color="white" />
            </View>
            <Text style={[styles.titleText, { color: 'black', marginTop: 5 }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainDashboard

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