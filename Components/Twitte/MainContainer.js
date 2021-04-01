import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { S3Image } from 'aws-amplify-react-native';
import { AntDesign } from '@expo/vector-icons';
import Footer from './Footer';
import moment from "moment"


const MainContainer = ({twitte}) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.tweetHeaderContainer}>
                <View style={styles.tweetHeaderName}>
                    <Text style={styles.name}>{twitte.user.name}</Text>
                    <Text style={styles.username}>@{twitte.user.username}</Text>
                    <Text style={styles.time}>{moment(twitte.createdAt).fromNow()}</Text>
                </View>
                <AntDesign name="down" size={16} color="grey" />
            </View>
            <View >
                <Text style={styles.content}>{twitte.content}</Text>
                {!!twitte.image && <S3Image style={styles.image} imgKey={twitte.image} />}
            </View>
            <Footer twitte={twitte}/>
        </View>
    )
}

export default MainContainer

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    tweetHeaderContainer:{
        // flex:1,
        flexDirection:"row",
        justifyContent:'space-between'
    },
    tweetHeaderName:{
        flexDirection:"row"
    },
    name:{
        marginHorizontal:5,
        fontWeight:"bold"
    },
    username:{
        marginHorizontal:5,
        color:'grey'
    },
    time:{
        marginHorizontal:5,
        color:'grey'
    },
    content:{
        marginHorizontal:5,
        marginVertical: 5,
        lineHeight: 18,
    },
    image: {
        marginVertical: 10,
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
    }

})
