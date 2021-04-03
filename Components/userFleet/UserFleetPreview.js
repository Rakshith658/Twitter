import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProfilePicture from '../ProfilePicture'

const UserFleetPreview = ({user}) => {
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <ProfilePicture image={user.image} size={70}/>
            </View>
            <Text style={styles.username}>{user.username}</Text>
        </View>
    )
}

export default UserFleetPreview

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        marginHorizontal:4
    },
    image:{
        backgroundColor:'white',
        padding:3,
        borderRadius:50,
        borderWidth:4,
        borderColor:'#1DA1F2'
    },
    username:{
        marginTop:5,
        fontSize:14,
        fontWeight:'bold',
        color:"#606060"
    }
})
