import React, { useEffect,useState} from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView,FlatList, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import robo from '../assets/robo.gif';
import axios from 'axios';
// const catImageUrl = "https://media.tenor.com/C2LaofiqgU0AAAAM/bug-cat.gif";

const Home = () => {

    const navigation = useNavigation();
    const [intent, setIntent] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        getIntent();
        fetchData();
    }, [intent]);

    const fetchData = () => {
        // http://192.168.1.4:3000/api/data?type=
        axios.get(`http://192.168.1.4:3000/api/data?type=${intent}`)
        .then(response => setData(response.data))
        .catch(error => console.error(error));
        console.log("fetching",intent)
    }

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            navigation.navigate("Home")
        });
        return focusHandler;
    }, [navigation]);

    handleRefresh=()=>{
        this.setState({});
    }

    const getIntent = async () => {
        try {
            const value = await AsyncStorage.getItem('savedIntent')
            if(value !== null) {
                setIntent(`${value}`)
               
            }
        } catch(e) {
            console.log(e)
        }
     }

     const getBacklog = async()=>{
        Alert.alert("Checking",intent)
     }

     const delIntent = async () => {
        await AsyncStorage.removeItem('savedIntent')
        await AsyncStorage.removeItem('savedChat')
        setIntent("DSE考試")
      } 

      const delChat = async () => {
        await AsyncStorage.removeItem('savedChat')
      } 


    useEffect(() => {
        navigation.setOptions({
            // headerLeft: () => (
            //     <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
            // ),
            // headerRight: () => (
            //     <Image
            //         source={{ uri: catImageUrl }}
            //         style={{
            //             width: 40,
            //             height: 40,
            //             marginRight: 15,
            //         }}
            //     />
            // ),

            headerRight: () =>(
                <TouchableOpacity onPress={getBacklog} onLongPress={delIntent}><View style={styles.demo}><Text>Admin</Text></View></TouchableOpacity> 
                
            ),
        });
    }, [navigation]);

    return (
        
        <View style={styles.container}>
            {intent !== "" && (
            <View>
            <Text style={styles.cardtitle}>資訊站:</Text> 
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
            /></View>)}

            
            <Text style={styles.cardtitle}>唔知整咩:</Text>
            
            <Image source={robo} style={styles.robo}></Image>
            
            <View style={styles.chatcontainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Chat")}
                    style={styles.chatButton}
                >
                    <Text style={styles.normaltitle}>正常傾  <Entypo name="chat" size={24} color={"black"} /></Text>
                    
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("ChatP")}
                    style={styles.settingsButton}
                >
                    <Text style={styles.privatetitle}>靜靜傾  <Entypo name="chat" size={24} color={colors.lightGray} /></Text>
                    
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

        demo: {
            backgroundColor: "#fff",
            width: 80,
            height:40,
            borderRadius: 10,      
            padding: 15,
        },

        chatcontainer: {
            flex: 1,
            position: 'absolute',
            bottom:10,
            left:23,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            // backgroundColor: "#fff",
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'flex-end',
           
        },
        chatButton: {
            backgroundColor: "#ebeded",
            height: 50,
            width: 160,
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

        settingsButton: {
            backgroundColor: "black",
            height: 50,
            width: 160,
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

          normaltitle: {
            fontSize: 20,
            fontWeight: 'bold',
          },

          privatetitle: {
            color: "white",
            fontSize: 20,
            fontWeight: 'bold',
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
            // borderWidth:1,
            // borderColor:colors.gray,
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
          robo: {
            width: '100%',
            height: '60%'
          }
          
          
    });