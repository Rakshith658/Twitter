import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const TweetButton = () => {

    const navigation=useNavigation()

    const onPress =()=>{
        navigation.navigate("NewTweet")
    }
    return(
        <View style={styles.button}>
        <TouchableOpacity onPress={onPress} activeOpacit={0.8}>
            <MaterialCommunityIcons name="feather" size={24} color="white" />
        </TouchableOpacity>
        </View>
    )
}

export default TweetButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1DA1F2',
        position: 'absolute',
        bottom:30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // top:0
    }
})
