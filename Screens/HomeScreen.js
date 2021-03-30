import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import ProfilePicture from '../Components/ProfilePicture';
import Twitte from '../Components/Twitte/Twitte';
import tweets from '../data/data';
import Feed from '../Components/Feed/Feed';
import TweetButton from '../Components/NewTweetButton/TweetButton';

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
                    <ProfilePicture image={'https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'} size={40}/>
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
