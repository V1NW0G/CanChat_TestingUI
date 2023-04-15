import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Modal} from 'react-native';
const backImage = require("../assets/blue-cat.gif");
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomOverlay from './ChatScreen/CustomOverlay';
import { FontAwesome } from '@expo/vector-icons';

// { type: 'user', text: "test in"}, { type: 'bot', text: "testing" }
const Chat = () => {
  const [messages, setMessages] = useState([{ type: 'bot', text: "同我傾偈啦" }]);
  const [messagesCache, setMessageCache] = useState([{ type: 'user', text: "test in"}, { type: 'bot', text: "testing" }]);
  const [inputText, setInputText] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sendIcon = <Icon name="send" size={19} color="white" />;

  

  const handleSend = async() => {
    try{
        if (inputText !== '') {
          const messagesloader = inputText;
          setInputText('');
          setIsLoading(true);
          setMessages([...messages, { type: 'user', text:messagesloader },{ type: 'bot', text: "loading" }]);
          const response = await fetch(`http://127.0.0.1:5000/chat/${messagesloader}`);
          const text = await response.json();
          setMessages([...messages, { type: 'user', text: messagesloader },{ type: 'bot', text: text.response }]);
          setMessageCache([...messagesCache,{ type: 'user', text: messagesloader },{type: 'bot', text: text.response}])
          setIsLoading(false);
        } else {
          Alert.alert('Empty input');
        }
    }
    catch (error) {
          console.error(error);
        }    
    }

    const saveChat = async () => {
        try {
          await AsyncStorage.setItem('savedChat', messages)
        } catch (e) {
          console.log(e)
        }
      }

    const getChat = async () => {
    try {
        const chat = await AsyncStorage.getItem('savedChat')
        if(chat !== null) {
            setMessages(chat)
        }
    } catch(e) {
        console.log(e)
    }
    }

    const delChat = async () => {
        AsyncStorage.removeItem('savedChat')
      } 

    React.useEffect(() => {
        getChat();
    },[]);

  const handleRemove = async() => {
      if (messagesCache != '') {
        setMessageCache([]);
      }
  }

  const handleSendAndRemove = async() => {
    await handleRemove();
    await handleSend();
    await delChat();
    await saveChat();
  }

    const [imagePosition, setImagePosition] = useState({
      x: Math.floor(Math.random() * 200),
      y: Math.floor(Math.random() * 200),
    });
  
    useEffect(() => {
      const interval = setInterval(() => {
        setImagePosition({
          x: Math.floor(Math.random() * -100),
          y: Math.floor(Math.random() * 200),
        });
      }, 3000);
      return () => clearInterval(interval);
    }, []);
  

    useEffect(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);
  

  return (
    <View style={styles.container}>
      <Image 
          source={backImage}
          style={[styles.image, { left: imagePosition.x, right: imagePosition.y }]}
      
      />

      <ScrollView ref={scrollViewRef} style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        {messages.map((item, index) => (
          <View key={index} style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
            <Text style={item.type ==='user'? styles.userMessageText:styles.botMessageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything"
          onFocus={() => setIsFocused(true)}   
          onBlur={() => setIsFocused(false)}
        />

      {inputText !== '' && isloading == (false) &&(<TouchableOpacity style={styles.sendButton} onPress={handleSendAndRemove} disabled={inputText === ''}>
          <Text style={styles.buttonText}>{sendIcon}</Text>
      </TouchableOpacity>)}
      {inputText !== '' && isloading == (true) &&(<TouchableOpacity style={styles.sendDisButton} disabled>
          <Text style={styles.buttonText} >唔好咁心急啦,我諗緊野😣</Text>
      </TouchableOpacity>)}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: "50%",
    height: 150,
    top: 0,
    left: 0,
    opacity: 0.1,
  },

  chatContainer: {
    flex: 1,
    width: '100%',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },

  input: {
    flex: 1,
    height: 40,
    width: '30%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: '#6666FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  sendDisButton: {
    backgroundColor: '#696880',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userBubble: {
    backgroundColor: 'lightblue',
    alignSelf: 'flex-end',
    padding: 10,
    margin: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: '70%',
  },
  botBubble: {
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
    padding: 10,
    margin: 5,
    // borderRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: '70%',
  },
  botMessageText: {
    color: 'black',
    fontSize: 18,
  },
  userMessageText: {
    color: 'white',
    fontSize: 18,
  }, 
  
  modalButton: {
    backgroundColor: '#6666FF',
    width: '20%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    opacity: 0.5,
  },

  modalButtonOpen: {
    backgroundColor: '#6666FF',
    width: '20%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    opacity: 0.9,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});


export default Chat;
