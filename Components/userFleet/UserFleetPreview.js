import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ProfilePicture from '../ProfilePicture'

const UserFleetPreview = ({user}) => {


    const navigation=useNavigation()

    const onPress=()=>{
        navigation.navigate("Fleets",{userId:user.id})
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.image}>
                    <ProfilePicture image={user.image} size={70}/>
                </View>
                <Text style={styles.username}>{user.username}</Text>
            </TouchableOpacity>
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
