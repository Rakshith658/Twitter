import 'react-native-get-random-values';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    SafeAreaView, 
    TextInput ,
    Platform,
    Image
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ProfilePicture from '../Components/ProfilePicture'

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

import { API,graphqlOperation,Auth,Storage}from 'aws-amplify'
import {createFleet}from '../src/graphql/mutations'
import { getUser} from '../src/graphql/queries'

import { useNavigation } from '@react-navigation/core';

// import { TouchableOpacity } from 'react-native-gesture-handler';

const color ='#1DA1F2'

const NewFleetScreen = () => {

    const [text, settext] = useState("")
    const [imageUrl, setimageUrl] = useState("")
    const [User, setUser] = useState(null)


    const navigation = useNavigation();

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    useEffect(() => {
        getPermissionAsync();
    }, [])

    const pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            setimageUrl(result.uri);
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };

    const uploadImage = async () => {
        try {
          const response = await fetch(imageUrl);
    
          const blob = await response.blob();
    
          const urlParts = imageUrl.split('.');
          const extension = urlParts[urlParts.length - 1];
    
          const key = `${uuidv4()}.${extension}`;
          console.log(key);
    
          await Storage.put(key, blob);
    
          return key;
    
        } catch (e) {
          console.log(e);
        }
        return '';
    }

    const onPostFleet =async()=>{

        let image;
        if (!!imageUrl) {
            image = await uploadImage();
        }

        try{
            const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });

            const newFleet = {
                type:image?"IMAGE":"TEXT",
                text: text,
                image,
                userID: currentUser.attributes.sub,
            }
            await API.graphql(graphqlOperation(createFleet, { input: newFleet }));
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
                <TouchableOpacity style={styles.button} onPress={onPostFleet}>
                    <Text style={styles.buttontext}>Post</Text>
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
                        value={text}
                        onChangeText={(value)=>settext(value)}
                    />
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.pickImage}>Pick a image</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                </View>
            </View>
        </SafeAreaView>
    )
}


export default NewFleetScreen

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
    pickImage: {
        fontSize: 18,
        color: color,
        marginVertical: 10,
    },
    image: {
        width: 150,
        height: 150,
    }
})
