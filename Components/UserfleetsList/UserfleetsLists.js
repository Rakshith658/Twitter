import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import UserFleetPreview from '../userFleet/UserFleetPreview'
// import data from "../../data/userFleets"
import { API ,graphqlOperation,Auth} from 'aws-amplify'
import { listUsers}from './queries'
import { useNavigation } from '@react-navigation/core'
import ProfilePicture from '../ProfilePicture'
import { getUser } from '../../src/graphql/queries'

const UserfleetsLists = () => {

    
    const [users, setUsers] = useState([]);
    
    const [User, setUser] = useState(null)

    const navigation = useNavigation()



    useEffect(() => {
        const fetchUser=async()=>{
            const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
            if (!userInfo) {
                return;
            }
            try{
                const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
                if (userData) {
                setUser(userData.data.getUser);
                }
            }catch(e){
                console.log(e);
            }
        }
        fetchUser();
    }, [])


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

    const Add =()=>{
        return(
            <TouchableOpacity style={{padding:10}} onPress={()=>navigation.navigate('NewFleet')}>
                <ProfilePicture image={User?.image} size={70}/>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <FlatList
                data={users}
                renderItem={({item})=><UserFleetPreview user={item}/>}
                keyExtractor={(item)=>item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={Add()}
            />
        </View>
    )
}

export default UserfleetsLists

const styles = StyleSheet.create({})
