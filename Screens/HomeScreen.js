import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import ProfilePicture from '../Components/ProfilePicture';
import Twitte from '../Components/Twitte/Twitte';
import tweets from '../data/data';

import Feed from '../Components/Feed/Feed';
import TweetButton from '../Components/NewTweetButton/TweetButton';

import{ API,graphqlOperation,Auth}from "aws-amplify"
import { getUser} from '../src/graphql/queries'


const Stack = createStackNavigator();

const HomeScreen = () => {
    return (
        <View style={styles.container} >
            <Feed/>
            <TweetButton/>
        </View>
    )
}

const HomeStackScreen = ()=>{

    const [User, setUser] = useState(null)


    useEffect(() => {
        const fetchUser=async()=>{
            const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
            if (!userInfo) {
                return;
            }
            try{
                const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
                if (userData) {
                setUser(userData.data.getUser);
                }
            }catch(e){
                console.log(e);
            }
        }
        fetchUser();
    }, [])


    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerRightContainerStyle:{
                    marginRight:13
                },
                headerTitle:()=>(
                    <AntDesign name="twitter" size={30} color='#1DA1F2' />
                ),
                headerTitleAlign:"center",
                headerRight:()=>(
                    <MaterialCommunityIcons name="star-four-points-outline" size={30} color='#1DA1F2' />
                ),
                headerLeft:()=>(
                    <ProfilePicture image={User?.image} size={40}/>
                ),
                headerLeftContainerStyle:{
                    marginLeft:13
                }
            }}/>
        </Stack.Navigator>
    )
}

export default HomeStackScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
