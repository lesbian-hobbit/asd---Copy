import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import MainDashboard from './screens/MainDashboard';
import SendCash from './screens/SendCash';
import Profile from './screens/Profile';
import RecieveCash from './screens/RecieveCash';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options = {{headerShown: false}}name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Main" component={MainDashboard}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Send" component={SendCash}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Recieve" component={RecieveCash}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
