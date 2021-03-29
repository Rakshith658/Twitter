import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Stack = createStackNavigator();

const HomeScreen = () => {
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

const HomeStackScreen = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    )
}

export default HomeStackScreen

const styles = StyleSheet.create({})
