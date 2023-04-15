import {View,Image, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai';
import Constants from 'expo-constants'
import axios from 'axios';
const backImage = require("../assets/200.gif");

const Chat = () => {
    const [data, setData] = useState([{ type: 'user', text: "testing" }, { type: 'bot', text: "testing res " },{ type: 'user', text: "testing" }, { type: 'bot', text: "testing res " },{ type: 'user', text: "testing" }, { type: 'bot', text: "testing res " },{ type: 'user', text: "testing" }, { type: 'bot', text: "testing res " },{ type: 'user', text: "testing" }, { type: 'bot', text: "testing res " },{ type: 'user', text: "testing" }, { type: 'bot', text: "testing res " },{ type: 'user', text: "testing" }, { type: 'bot', text: "testing res " },{ type: 'user', text: "testing" }, { type: 'bot', text: "testing res " }]);
    const apiKey = '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' 
    // const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'
    const apiUrl = 'https://api.openai.com/v1/chat/completions'
    // const apiKey = Constants.manifest.extra.openaiKey
    // const apiUrl = Constants.manifest.extra.openaiUrl
    const [textInput , setTextInput ] = useState('');

    const handleSend2 = async () => {
        try{
        if (textInput !== '') {
          const response = await fetch(`http://127.0.0.1:5000/chat/${textInput}`);
          const text = await response.json();
          setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text.response }]);
          setTextInput('');
        } else {
          Alert.alert('Empty input');
        }
    }
    catch (error) {
          console.error(error);
        }    
    }
    
    
      
    const handleSend = async () => {
        // try {
        if (textInput !== ''){
          const prompt = textInput;
          const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: 10,
            temperature: 0.5,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            }
          });
          const text = response.data.choices[0].text;
          setData([...data, {type: 'user', 'text':textInput},{ type: 'bot', 'text':text}]);
          console.log(data)
          console.log(text)

          setTextInput('  ');
        }
        else { 
            Alert.alert("Empty input");
        }
    } 
        // catch (error) {
        //   console.error(error);
        // }
    // }
      

    return (
        <View style={styles.container}>
            <Text>Fuck</Text>

            <Image 
                source={backImage}
                style={styles.image}
            />
            <Text style={styles.emotion}>Your Text Here</Text>
            
            <View style={styles.list}>
                <FlatList 
                    data = {data}
                    keyExtractor = {(item, index) => index.toString()}
                    style = {styles.body}
                    renderItem = {({item}) => (
                        <View style={{flexDirection: item.type === 'user' ? 'row-reverse' : 'row', padding: 10}}>
                          <View style={{backgroundColor: item.type === 'user' ? 'lightblue' : 'lightgray', borderRadius: 10, padding: 8}}>
                            <Text style={{fontWeight: 'bold', color: item.type === 'user' ? 'white' : 'black'}}>
                              {item.type === 'user' ? 'DickHead: ' : 'Bot: '}
                            </Text>
                            <Text style={styles.bot}>{item.text}</Text>
                          </View>
                        </View>
                    )}
                      
                    contentContainerStyle={{
                        flexGrow: 1,
                        }}
                />
            </View>
                <TextInput 
                    style = {styles.input}
                    value = {textInput}
                    onChangeText = {text => setTextInput(text)}
                    placeholder = "  Ask me anything"
 
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress = {handleSend2}

                >
                    <Text style={styles.buttonText}>send</Text>
                </TouchableOpacity>

        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },

    body:{
        backgroundColor: "white",
        width: '98%',
        height: '70%',
        margin: 10,
        marginBottom: 40
    
    },

    bot:{
        fontSize: 16
    },
    
    list:{
        flex:1,
        width: '100%'
    },


    userBubble: {
        backgroundColor: 'green',
        alignSelf: 'flex-end',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        maxWidth: '70%',
      },
    botBubble: {
        backgroundColor: 'lightgray',
        alignSelf: 'flex-start',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        maxWidth: '70%',
      },

    image: {
        width: "100%",
        height: 200,
        top: 0,
        left: 0,
    },

    input:{
        borderWidth: 1,
        borderColor : 'black',
        width : '90%',
        height : 60,
        marginBottom: 10,
        borderRadius: 10       
    },

    button:{
        backgroundColor: '#fff',
        width: '80%',
        height: 50, 
        borderRadius: 10,   
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: 10
    },

    buttonText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue'
    },

    emotion: {
        position: 'absolute',
        top: "22%",
        // Add any other text styles you want here
      },


});

