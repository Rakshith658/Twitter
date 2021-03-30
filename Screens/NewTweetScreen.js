import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react'
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
// import { TouchableOpacity } from 'react-native-gesture-handler';

const color ='#1DA1F2'

const NewTweetScreen = () => {

    const [tweet, settweet] = useState("")
    const [imageUrl, setimageUrl] = useState("")

    const onPostTweet =()=>{
        console.log(tweet);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <AntDesign name="close" size={24} color={color} />
                <TouchableOpacity style={styles.button} onPress={onPostTweet}>
                    <Text style={styles.buttontext}>Tweet</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.newTweetContainer}>
                <ProfilePicture image={'https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}/>
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
