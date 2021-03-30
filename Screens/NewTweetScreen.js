import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    SafeAreaView, 
    TextInput 
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ProfilePicture from '../Components/ProfilePicture'

import { API,graphqlOperation,Auth}from 'aws-amplify'
import {createTweet}from '../src/graphql/mutations'
import { getUser} from '../src/graphql/queries'

import { useNavigation } from '@react-navigation/core';

// import { TouchableOpacity } from 'react-native-gesture-handler';

const color ='#1DA1F2'

const NewTweetScreen = () => {

    const [tweet, settweet] = useState("")
    const [imageUrl, setimageUrl] = useState("")
    const [User, setUser] = useState(null)


    const navigation = useNavigation();

    const onPostTweet =async()=>{
        try{
            const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });

            const newTweet = {
                content: tweet,
                image:imageUrl,
                userID: currentUser.attributes.sub,
            }
            await API.graphql(graphqlOperation(createTweet, { input: newTweet }));
            navigation.goBack();
        }catch(e){
            console.log(e);
        }
    }

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
                console.log(userData.data.getUser);
                }
            }catch(e){
                console.log(e);
            }
        }
        fetchUser();
        // console.log(User);
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <AntDesign name="close" size={24} color={color} onPress={()=>navigation.goBack()}/>
                <TouchableOpacity style={styles.button} onPress={onPostTweet}>
                    <Text style={styles.buttontext}>Tweet</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.newTweetContainer}>
                <ProfilePicture image={User?.image}/>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="what's happening...."
                        style={styles.tweetInput}
                        numberOfLines={3}
                        multiline={true}
                        value={tweet}
                        onChangeText={(value)=>settweet(value)}
                    />
                    <TextInput
                        placeholder="Image Url (optional)"
                        style={styles.imageInput}
                        value={imageUrl}
                        onChangeText={(value)=>setimageUrl(value)}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


export default NewTweetScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // alignItems: 'center',
        marginTop:10,
        backgroundColor:"white"
        // justifyContent: 'center',
    },
    button:{
        backgroundColor:color,
        borderRadius:30
    },
    buttontext:{
        paddingHorizontal:20,
        paddingVertical:10,
        color:'white',
        fontWeight:'bold',
        fontSize:16
    },
    headerContainer:{
        flexDirection:"row",
        width:'100%',
        justifyContent:"space-between",
        padding:15
    },
    tweetInput:{
        height:100,
        maxHeight:300,
        fontSize:20,
        borderBottomWidth:1,
        // width:'100%'
        
    },
    imageInput:{},
    inputContainer:{
        marginLeft:10
    },
    newTweetContainer:{
        flexDirection:'row',
        padding:15
    },
})
