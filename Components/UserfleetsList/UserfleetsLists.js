import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import UserFleetPreview from '../userFleet/UserFleetPreview'
// import data from "../../data/userFleets"
import { API ,graphqlOperation} from 'aws-amplify'
import { listUsers}from './queries'

const UserfleetsLists = () => {

    
    const [users, setUsers] = useState([]);

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
    }, [])

    return (
        <View>
            <FlatList
                data={users}
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
