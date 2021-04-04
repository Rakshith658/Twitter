import { useRoute } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FleetView from '../../Components/FleetView/FleetView'
import userFleets from '../../data/userFleets'

const FleetsScreen = () => {

    const route = useRoute()

    const { userId } = route.params;

    console.log(userId);

    const user = userFleets.find(u=>u.id===userId)
    const fleet = user?.fleets?.items[0]
    return (
        <FleetView user={user} fleet={fleet}/>
    )
}

export default FleetsScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
