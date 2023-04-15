import React, { useEffect,useState} from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView,FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
const catImageUrl = "https://media.tenor.com/C2LaofiqgU0AAAAM/bug-cat.gif";

const Home = () => {

    const navigation = useNavigation();

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/data?type=')
        .then(response => setData(response.data))
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        navigation.setOptions({
            // headerLeft: () => (
            //     <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
            // ),
            headerRight: () => (
                <Image
                    source={{ uri: catImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.cardtitle}>AI 推薦呢d俾你:</Text>
            <FlatList
                horizontal                
                showsHorizontalScrollIndicator={false}
                data={data}
                style={{maxHeight:250}}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate("CardDetail", { 
                        cardTitle: item.title,
                        cardDetails: item.details,
                        cardDate: item.date,
                        cardImage: item.imageSource,
                        linkTo: item.hyperlink,
                        linkButton: item.hyperButton,
                    })}> 
                <View style={styles.card}>  
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardInfo}>{item.info}</Text>
                    <Image source={{ uri: item.imageSource }} style={styles.cardImage} />
                </View>
                </TouchableOpacity>
                
                )}
            />

            
            <Text style={styles.cardtitle}>唔鳩知整咩:</Text>
      
            
            
            <View style={styles.chatcontainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Chat")}
                    style={styles.chatButton}
                >
                    <Entypo name="chat" size={24} color={colors.lightGray} />
                </TouchableOpacity>
            </View>
        </View>
    );
    
    };

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },

        chatcontainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: colors.gray,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#7a7979',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        },
        cardtitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: "gray",
            paddingBottom: 5,
            marginLeft: 20, 
            marginTop: 7,
          },

        card: {
            backgroundColor: "#fff",
            width: 300,
            height:230,
            borderRadius: 10,
            margin: 10,
            padding: 20,
            shadowColor: '#cccccc',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
          },
          cardTitle: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,

          },
          cardInfo: {
            fontSize: 16,
            marginBottom: 10,
          },
          
          cardDetails: {
            fontSize: 14,
          },
          cardImage: {
            width: '100%',
            height: '70%',
            marginTop: 0,
            opacity : 0.9,
            borderRadius: 10

          },
          
          
    });