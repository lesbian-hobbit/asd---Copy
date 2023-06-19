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
  getDoc,
  setDoc,
  addDoc,
  Timestamp,
  deducttran
} from "firebase/firestore";
import { auth, db, firebase } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Dashboard = ({ route, navigation }) => {
  const [balance, setBalance] = useState(5000); // Initial balance
  const [email, setEmail] = useState();
  const [uids, setUid] = useState();
  const [userInfo, setUserInfo] = useState([]);
  const [transactions, setTransactions] = useState();
  const [fullname, setName] = useState();
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
      console.log("Transaction successfully committed!: " + Number(amount) +" "+ uid2 );
    } catch (e) {
      console.log("Transaction failed: ", e);
    }

    const deduct = async () => {
      const user = auth.currentUser.uid;
      if (user) {
        const uid = user;
        try {
          await runTransaction(db, async (transaction) => {
            const userRef = firebase.firestore().collection("users").doc(uid);
            const sf = await transaction.get(userRef);
            if (!sf.exists) {
              throw "Document does not exist!";
            }
            const deductedWallet = sf.data().wallet - Number(amount);
            transaction.update(userRef, {
              wallet: deductedWallet
            });
            console.log("Wallet updated successfully");
          });
        } catch (error) {
          console.error("Error updating wallet:", error);
        }
      }
    };
    deduct();

    const user = auth.currentUser.uid;
    if(user){

      const uid = user;
    const newTransactions = async () => {
      await addDoc(collection(db, "users", uid, "history","DUgVrFDJhas4wAuX07re", "Sent"), {
        transactions: amount,
        Timestamp: new Date(),
        ReceiverUid: uid2
      });
    };
    newTransactions();
    
    const recievedHis = async () => {
      await addDoc(collection(db, "users", uid2, "history","DUgVrFDJhas4wAuX07re", "Recieved"), {
        transactions: amount,
        Timestamp: new Date(),
        Sender: uid
      });
    };
    recievedHis();
  };

  
  
}
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
          const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              const data = docSnap.data();
              setUserInfo(data);
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
          });

          return unsubscribe; // Cleanup function to unsubscribe from the snapshot
        }
        const unsubscribe = getWallet();

        return () => {
          // Clean up the snapshot subscription when the component unmounts
          unsubscribe();
        };
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

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
    margin:10,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  amountText: {
    fontSize: 18,
  },
  transferButton: {
    margin:10,
    backgroundColor: "black",
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