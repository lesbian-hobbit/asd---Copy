import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Button, Touchable, TouchableOpacity } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import {collection, setDoc, doc, getDoc} from 'firebase/firestore'
import { db } from '../firebase'
const Dashboard = () => {
    
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('UsersX');

    const [id , setId] = useState('')
    const [email, setEmail] = useState('');
    const [ availableAmount, setAvailableAmount] = useState('')
    const [ newavailableAmount, setNewAvailableAmount] = useState('')
    const asd = 'Ceua2O9PgXnDDSFMGGFD'
   

    
    useEffect( () => {
      
      todoRef
      .onSnapshot(
        querySnapshot => {
          const users = []
          querySnapshot.forEach((doc) => {
            const {id, availableAmount, email} = doc.data()
              users.push({
                id: doc.id,
                 availableAmount,
                email,
              }) 
          }) 
          setUsers(users)
        }
      )
    },[])

    const updateData = () => {
      todoRef
      .doc(asd)
      .update({
        availableAmount:+Number(availableAmount),
      })
      .then (() =>{
        console.log(availableAmount);
      })
    };
      
  return (
    <View style= {{ flex:1, marginTop:100}}>
      <FlatList
          style={{height:'100%' }}
          data={users}
          numColumns={1}
          renderItem={({item}) => (
            <Pressable
                style={styles.container}
            >
                <View style={styles.innerContainer}>
                  <Text style={styles.itemHeading}>{item.email}</Text>
                  <Text style={styles.itemText}>Available Money: {parseInt(item.availableAmount) }</Text>
                  <Text style={styles.itemText}>{item.id}</Text>
                </View>
                <View>
                  <TextInput 
                  value={email} 
                  onChange={setEmail} 
                  placeholder="Enter User Email: ">

                  </TextInput>
                  <TextInput 
                  value={availableAmount} 
                  onChangeText={setAvailableAmount} 
                  placeholder="How much do you wish to send: ">

                  </TextInput>
                </View>
            
            </Pressable>
            
          )}
      />
      <TouchableOpacity  onPress={updateData}>
            <Text>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#e5e5e5',
      padding:15,
      borderRadius:15,
      margin:5,
      marginHorizontal: 10,
    },
    innerContainer:{
      alignItems: 'center',
      flexDirection: 'column',

    },
    itemHeading:{
      fontWeight:'bold'
    },
    itemText:{
      fontWeight: '300'
    }
})