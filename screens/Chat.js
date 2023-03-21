import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai';
import Constants from 'expo-constants'
import axios from 'axios';

const Chat = () => {
    const [data, setData] = useState([{"type": "user", "text": "What is your name"}, {"type": "bot","text": "My name is Sarah."}]);
    const apiKey = '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' 
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'
    // const apiKey = Constants.manifest.extra.openaiKey
    // const apiUrl = Constants.manifest.extra.openaiUrl
    const [textInput , setTextInput ] = useState('');

    // const handleSend = async (textInput) => {
    //     const url = "https://api.openai.com/v1/chat/completions";
    //     const payload = {
    //         model: "gpt-3.5-turbo",
    //         messages: [
    //         { role: "system", content: "You are a helpful assistant." },
    //         { role: "user", content: textInput },
    //         ],
    //         temperature: 0.4,
    //         max_tokens: 50,
    //     };

    //     const options = {
    //         contentType: "application/json",
    //         headers: { Authorization: "Bearer " + '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'},
    //         payload: JSON.stringify(payload),
    //       };

    //     const text = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
    //     return text.choices[0].message.content.trim();

    //     console.log(textInput)
    //     console.log(text)
    // };
      
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

          setTextInput('');
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
            <View style={styles.list}>
                <FlatList 
                    data = {data}
                    keyExtractor = {(item, index) => index.toString()}
                    style = {styles.body}
                    renderItem = {({item}) => (
                        <View style = {{flexDirection:'row', padding:10}}>
                            <Text style = {{fontWeight:'bold',color: item.type === 'user' ? 'green' : 'red'}}>{item.type === 'user' ? 'DickHead: ' : 'Bot: '}</Text>
                            <Text style = {styles.bot}> {item.text} </Text>
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
                    onPress = {handleSend}

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
        width: '102%',
        margin: 10
    },

    bot:{
        fontSize: 16
    },
    
    list:{
        flex:1,
        width: '100%'
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
        height: 60, 
        borderRadius: 10,   
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: 10
    },

    buttonText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue'
    }


});

