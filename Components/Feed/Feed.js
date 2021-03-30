import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import tweets from '../../data/data'
import Twitte from '../Twitte/Twitte'

const Feed = () => {
    return (
        <View style={{width:"100%"}}>
            <FlatList
                data={tweets} 
                keyExtractor={(item)=>item.id}
                renderItem={({item})=><Twitte tweets={item}/>}
            />
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({})
