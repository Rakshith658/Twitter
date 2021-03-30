import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LeftContainer from './LeftContainer'
import MainContainer from './MainContainer'

const Twitte = ({tweets}) => {
    // console.log(tweets);
    return (
        <View style={styles.container}>
            <LeftContainer user={tweets.user} />
            <MainContainer twitte={tweets}/>
        </View>
    )
}

export default Twitte

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
    }
})
