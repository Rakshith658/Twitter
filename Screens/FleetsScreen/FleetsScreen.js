import { useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import FleetView from '../../Components/FleetView/FleetView'
import userFleets from '../../data/userFleets'

import { API,graphqlOperation}from 'aws-amplify'
import {listUsers}from './queries'

const FleetsScreen = () => {

    const route = useRoute()

    const { userId } = route.params;

    const [users, setUsers] = useState([]);
    const [user, setuser] = useState(null)
    const [fleetIndex, setfleetIndex] = useState(-1)
    const [fleet, setfleet] = useState(null)


    // console.log(userId);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await API.graphql(graphqlOperation(listUsers));
            setUsers(data.data.listUsers.items);
          } catch (e) {
            console.log(e)
          }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!users || users.length === 0) {
          return;
        }
        setuser(users.find(u => u.id === userId) || null);
        setfleetIndex(0);
    }, [users])

    useEffect(() => {

        if (!user) {
            return;
        }
      
        let userIndex = -1;
        for(let i = 0; i < users?.length; i++) {
            if (users[i].id === user.id) {
                userIndex = i;
                break;
            }
        }
      
        if (fleetIndex >= user?.fleets?.items.length) {
            if (users.length > userIndex + 1) {
                // go to the next user
                setuser(users[userIndex + 1]);
                setfleetIndex(0);
            } else {
                setfleetIndex(user?.fleets?.items.length);
            }
        } else if (fleetIndex < 0) {
            // go to the prev user
            if(userIndex > 0){
                setuser(users[userIndex - 1]);
                setfleetIndex(users[userIndex - 1].fleets.items.length - 1);
            } else {
                setfleetIndex(0)
            }
        }
        else {
            setfleet(user?.fleets?.items[fleetIndex])
        }
    }, [fleetIndex])

    const goToNextFleet = ()=>{
        setfleetIndex(fleetIndex+1)
    }
    const goToprevFleet = ()=>{
        setfleetIndex(fleetIndex-1)
    }

    if (fleet === null) {
        return <ActivityIndicator />
    }


    return (
        <FleetView 
            user={user} 
            fleet={fleet} 
            goToprevFleet={goToprevFleet} 
            goToNextFleet={goToNextFleet}
        />
    )
}

export default FleetsScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
