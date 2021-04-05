import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify,{
  Auth,
  API,
  graphqlOperation
} from 'aws-amplify'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyTabs from './Navigation/bottomTab';
import NewTweetStackScreen from './Screens/NewTweetScreen';

import { withAuthenticator } from 'aws-amplify-react-native'
import{ getUser }from "./src/graphql/queries"
import{ createUser }from "./src/graphql/mutations"
import config from './src/aws-exports'
import FleetsScreen from './Screens/FleetsScreen/FleetsScreen';
import NewFleetScreen from './Screens/NewFleetScreen';
Amplify.configure(config)


const Stack = createStackNavigator();

function App() {

  const getRandomImage = () => {
    return 'https://i.insider.com/5d03aa8e6fc9201bc7002b43?width=1136&format=jpeg'
  }

  const saveUserToDB = async (user) => {
    // console.log(user);
    await API.graphql(graphqlOperation(createUser, { input: user }))
  }

  useEffect(() => {
    const updateUser = async () => {
      // Get current authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });

      if(userInfo) {
        // Check if user already exists in database
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }));
        // console.log(userData)
        if(!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),
          }
          await saveUserToDB(user);
        } else {
          console.log('User already exists');
        }
      }
      // If it doesn't, create the user in the database
    }
    updateUser();
  }, [])


  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="NewTweet" component={NewTweetStackScreen} />
        <Stack.Screen name="Fleets" component={FleetsScreen} />
        <Stack.Screen name="NewFleet" component={NewFleetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
