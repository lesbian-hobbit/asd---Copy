import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,onAuthStateChanged 
} from "firebase/auth";
import { collection, setDoc, doc, addDoc } from "firebase/firestore";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createNewUser = async (email) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid  = user.uid;
        console.log(uid);
        try {
          const newUser = async() =>{
            await setDoc(doc(db, "users", uid), {
              email: email,
              wallet: 0
            });
          }
          newUser();
        }catch (err){
          console.error(err);
        }
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
     
  };

  const handleRegister = (e, p) => {
    // Implement your login logic here
    createUserWithEmailAndPassword(auth, e, p)
      .then(() => {
        createNewUser(e)
          .then(() => {
            navigation.navigate("Main");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
    // You can replace the console.log statements with your actual login implementation
  };
  const handleLogin = (e, p) => {
    // Implement your login logic here
    signInWithEmailAndPassword(auth, e, p)
      .then(() => {
        navigation.navigate("Main", {
          email: e,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
    // You can replace the console.log statements with your actual login implementation
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRegister(email, password)}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin(email, password)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    margin: 10,
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;
