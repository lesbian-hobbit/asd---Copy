import { View, Text, FlatList,ActivityIndicator, StyleSheet,Alert, Pressable, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import {collection, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot, updateDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, signOut } from "firebase/auth";

const RecieveCash = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [email, setEmail] = useState();
    const [uids, setUid] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [fullname, setName] = useState();
    const [contact, setContact] = useState("");
    
    
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



  
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    

    //   const saveProfile = async () => {
       
    //     const user = auth.currentUser.uid

    //     if (user) {
    //     const uid  = user.uid;
    //     setDoc(doc(db, "users", uid),{

    //       fullname:fullname
    //     })
    //     .then(() => {
    //       // Data saved successfully!
    //     })
    //     .catch((error) => {
    //       // The write failed...
    //     });

    //   }
    
    // }    
   
      // if (isLoading) {
      //   return <ActivityIndicator size="large" />;
      // }

      
      
       
      const editProfile = async () => {
        const user = auth.currentUser.uid
       
          if (user) {
            const uid = user;
           try {
             const updatedData = {
              fullname: fullname,
             
              contact: contact
            
          };
    
          const userRef = firebase.firestore().collection('users').doc(uid);//.collection("fullname");
    
          await userRef.update(updatedData);
          console.log('Profile updated successfully');
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      };
    
    }
    
   
     

    return(
        <View style={styles.container}>
            <View style={styles.userInfo}>
            <Text style={styles.userId }>
                id: {uids}
            </Text>
            <Text style={styles.balance}>
            Current Balance: {userInfo.wallet}
            </Text>
            
            <Text style={styles.balance}>IGN: 
            {userInfo.fullname}
            
            </Text>
            <Text style={styles.balance}>Phone number: 
            {userInfo.contact}

            <View>
      <TextInput
        placeholder="Name"
        value={fullname}
        onChangeText={setName}
      />
      <TextInput
        placeholder="contact"
        value={contact}
        onChangeText={setContact}
      />
      <Button title="Save" onPress={editProfile} />
    </View>
    
            
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