import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather,EvilIcons,AntDesign,Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API,graphqlOperation,Auth} from "aws-amplify"
import { createLike , deleteLike }from  "../../src/graphql/mutations"
// import { set } from 'react-native-reanimated';

const Footer = ({twitte}) => {

    

    const [user, setuser] = useState(null)
    const [myLike, setmyLike] = useState(null)
    const [likesCount, setlikesCount] = useState(twitte.likes.items.length)


    useEffect(() => {
        const fetchUser = async()=>{
            const currentuser =await Auth.currentAuthenticatedUser();
            setuser(currentuser)
            const searchedLike = twitte.likes.items.find(
                (like) => like.userID === currentuser.attributes.sub
            );
            setmyLike(searchedLike);
        }
        fetchUser();
    }, [])

    const submitLike = async()=>{
        const like = {
            userID: user.attributes.sub,
            tweetID: twitte.id,
        }
        try{
            const res = await API.graphql(graphqlOperation(createLike, { input: like }))
            setmyLike(res.data.createLike)
            // setlikesCount(likesCount + 1);
            setlikesCount(likesCount+1)
            // console.log(res);
        }catch(e){
            console.log(e);
        }
    }

    const removeLike = async()=>{
        try {
            await API.graphql(graphqlOperation(deleteLike, { input: { id: myLike.id } }))
            setlikesCount(likesCount - 1);
            setmyLike(null);
        } catch (e) {
            console.log(e);
        }
    }

    const onLike=async()=>{
        if (!user) {
            return
        }

        if (!myLike) {
            await submitLike()
        } else {
            await removeLike();
        }   
    }


    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name="message-circle" size={18} color="grey" />
                <Text style={styles.number}>{twitte.numberOfComments}</Text>
            </View>
            <View style={styles.iconContainer}>
                <EvilIcons name="retweet" size={24} color="grey" />
                <Text style={styles.number}>{twitte.numberOfRetweets}</Text>
            </View>
            <TouchableOpacity onPress={onLike}>
                <View style={styles.iconContainer}>
                    <AntDesign name={!myLike ? "hearto" : "heart"} size={18} color={!myLike ? 'grey' : '#1DA1F2'} />
                    <Text style={styles.number}>{likesCount}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <Ionicons name="share-social-outline"  size={19} color="grey" />
            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    number:{
        color:"grey",
        marginLeft:5
    },
    iconContainer:{
        flexDirection:'row',
        alignItems:'center'
    }
})
