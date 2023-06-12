import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import {collection, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot} from 'firebase/firestore'


const SendCash = () => {
  
  const user = auth.currentUser
  const ownid = user.uid
  
    const todoRef = firebase.firestore().collection('Users');

    const [ availableAmount1, setAvailableAmount1] = useState('')
    const [uid , setUid] = useState('')
    const [current1 , setCurrent1] = useState('')
   

    const loadData = () => {
      todoRef
            .doc(ownid)
            .get()
            .then(documentSnapshot => {
              if(documentSnapshot.exists){
                console.log('User data: ', documentSnapshot.data());
          setCurrent1(documentSnapshot.data());
              }
            })
    }
    useEffect(()=>{
      loadData();
    },[])

    
    
      
    const updateData = () => {
      
            todoRef
            .doc(uid)
            .update({            
              availableAmount:  Number(availableAmount1) + Number(current1.availableAmount)
            })
            .then (() => {
              console.log('You have sent: ',availableAmount1, "to", uid);
              alert('Succesfull Transacation')
              })
        
      };

  return (
    <KeyboardAvoidingView
    style={styles.container}
      behavior="padding"
    >
  
    <View style= {styles.inputContainer}> 

        <View>
            <Text>Wallet Balance: {current1.availableAmount}</Text>
            <TextInput 
                value={uid} 
                onChangeText={setUid}
                placeholder="Enter User Uid: "
                style={styles.input}/>
                  
            <TextInput 
                value={availableAmount1} 
                onChangeText={setAvailableAmount1} 
                placeholder="How much do you wish to send: "
                style={styles.input}
                alert={'asdasd'}
            />
            
            </View>
            <View>
            
            <TouchableOpacity  onPress={updateData} style={styles.button}>
                <Text style={styles.buttonText} >Send </Text>
            </TouchableOpacity>
            
             </View>
            
            
            
          
      
    </View>
    </KeyboardAvoidingView>
  )
}

export default SendCash

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  })