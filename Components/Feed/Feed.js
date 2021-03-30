import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
// import tweets from '../../data/data'
import Twitte from '../Twitte/Twitte'

import { API, graphqlOperation } from 'aws-amplify';
import {listTweets}from '../../src/graphql/queries'

const Feed = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTweets = async () => {
        setLoading(true);
        try {
        const tweetsData = await API.graphql(graphqlOperation(listTweets));
        setTweets(tweetsData.data.listTweets.items);
        } catch (e) {
        console.log(e);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        fetchTweets();
    }, [])
    return (
        <View style={{width:"100%"}}>
            <FlatList
                data={tweets} 
                keyExtractor={(item)=>item.id}
                renderItem={({item})=><Twitte tweets={item}/>}
                refreshing={loading}
                onRefresh={fetchTweets}
               
            />
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({})
