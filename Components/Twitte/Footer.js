import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather,EvilIcons,AntDesign,Ionicons } from '@expo/vector-icons';

const Footer = ({twitte}) => {
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
            <View style={styles.iconContainer}>
                <AntDesign name="hearto" size={18} color="grey" />
                <Text style={styles.number}>{twitte.numberOfLikes}</Text>
            </View>
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
