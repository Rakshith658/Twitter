import moment from 'moment'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ProfilePicture from '../ProfilePicture'

const FleetView = ({user,fleet}) => {
    // console.log(user);
    // console.log(fleet);
    return (
        <View style={styles.container}>
           {fleet.image && <Image style={styles.image} source={{uri:fleet.image}}/>}
            <Text style={styles.text}>{fleet.text}</Text>
            <View style={styles.userHeaderContainer}>
                <ProfilePicture image={user.image} size={70}/>
                <View style={styles.userinfo}>
                    <Text style={styles.name}>{user.name}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.username}>{user.username}</Text>
                        <Text style={styles.time}>{moment(fleet.createdAt).fromNow()}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default FleetView

const styles = StyleSheet.create({
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:"center",
       backgroundColor: '#152d48',
    },
    text:{
        color: '#eaeaea',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    image:{
        width:'100%',
        height:'113%',
        resizeMode:'cover'
    },
    userHeaderContainer:{
        flexDirection:"row",
        justifyContent:'flex-start',
        width:'100%',
        alignItems:"center",
        position:'absolute',
        top:40,
        padding:10
    },
    userinfo:{
        padding:10
    },
    name:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold',
        marginVertical:5
    },
    username:{
        color:"#fff",
        fontSize:18
    },
    time:{
        color:"#fff",
        fontSize:18,
        marginLeft:10
    }
})
