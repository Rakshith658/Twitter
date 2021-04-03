import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import UserFleetPreview from '../userFleet/UserFleetPreview'
import data from "../../data/userFleets"

const UserfleetsLists = () => {
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({item})=><UserFleetPreview user={item}/>}
                keyExtractor={(item)=>item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default UserfleetsLists

const styles = StyleSheet.create({})
