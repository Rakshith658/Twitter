import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const ProfilePicture = ({image,size=50}) => {
    return (
        <Image 
            source={{uri:image}} 
            style={{
                width:size,
                height:size,
                borderRadius:size
            }}
        />
    )
}

export default ProfilePicture

const styles = StyleSheet.create({})
