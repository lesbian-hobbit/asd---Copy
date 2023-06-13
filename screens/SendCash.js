import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {
  collection,
  query,
  where,
  onSnapshot,
  writeBatch,
  runTransaction ,
  doc,
  getDoc
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Dashboard = ({ route, navigation }) => {
  const [balance, setBalance] = useState(5000); // Initial balance
  const [email, setEmail] = useState();
  const [uids, setUid] = useState();
  const [userInfo, setUserInfo] = useState([]);

  const [uid2, setUid2] = useState();
  const [amount, setAmount] = useState();
  // Get a new write batch
  
  const transferFunds = async () => {
    const sfDocRef = doc(db, "users", uid2);
    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        const newWallet = sfDoc.data().wallet + Number(amount);
        transaction.update(sfDocRef, { wallet: newWallet });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

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
  const handleTransferFunds = () => {
    // Implement your logic for transferring funds here
    // This is just a placeholder example
    setBalance(balance - 100);
  };

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {email}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Balance</Text>
        <Text style={styles.amountText}>$ {userInfo.wallet}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="uid"
        value={uid2}
        onChangeText={setUid2}
      />
      <TextInput
        style={styles.input}
        placeholder="amount"
        value={amount}
        onChangeText={setAmount}
      />
      
      <TouchableOpacity
        style={styles.transferButton}
        onPress={transferFunds}
      >
        <Text style={styles.transferButtonText}>Send Funds</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.transferButton}
        onPress={() => handleSignOut()}
      >
        <Text style={styles.transferButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  balanceContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  amountText: {
    fontSize: 18,
  },
  transferButton: {
    backgroundColor: "#00aeef",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  transferButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dashboard;
