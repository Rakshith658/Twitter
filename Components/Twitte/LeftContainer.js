import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProfilePicture from '../ProfilePicture'

const LeftContainer = ({user}) => {
    return (
        <View>
            <ProfilePicture image={user.image} size={60}/>
        </View>
    )
}

export default LeftContainer

const styles = StyleSheet.create({})
