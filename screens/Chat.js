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

  // const toggleModal = () => {
  //   setIsModalVisible(!isModalVisible);
  // };
  

  // const handleSend = async() => {
  //   try{
  //       if (inputText !== '') {
  //         const messagesloader = inputText;
  //         setInputText('');
  //         setIsLoading(true);
  //         setMessages([...messages, { type: 'user', text:messagesloader },{ type: 'bot', text: "loading" }]);
  //         const response = await fetch(`http://127.0.0.1:5000/chat/${messagesloader}`);
  //         const text = await response.json();
  //         setMessages([...messages, { type: 'user', text: messagesloader },{ type: 'bot', text: text.response }]);
  //         setMessageCache([...messagesCache,{ type: 'user', text: messagesloader },{type: 'bot', text: text.response}])
  //         setIsLoading(false);
  //         console.log(messages)
  //       } else {
  //         Alert.alert('Empty input');
  //       }
  //   }
  //   catch (error) {
  //         console.error(error);
  //       }    
  //   }

    const handleSend = async() => {
      
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
            console.log(messages)
          } else {
            Alert.alert('Empty input');
          }   
      }

    const saveChat = async () => {
      try {
        const jsonValue = JSON.stringify(messages)
        await AsyncStorage.setItem('savedChat', jsonValue)
        console.log("saved\n",jsonValue)
      } catch (e) {
        console.log(e)
      }
    }

  const getChat = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem('savedChat')
      if(jsonValue !== null) {
          chat = JSON.parse(jsonValue)
          setMessages(chat)
          console.log("get message\n",chat)
      }
  } catch(e) {
      console.log(e)
  }
  }

  const delChat = async () => {
      await AsyncStorage.removeItem('savedChat')
    } 

  useEffect(() => {
      getChat();
  },[]);

  useEffect(() => {
      saveChat();
},[messages]);


    const handleRemove = async() => {
      if (messagesCache != '') {
        setMessageCache([]);
      }
  }

  const checking = async() => {
    console.log("real")
    console.log(messages)
}

  const handleSendAndRemove = async() => {
    await handleRemove();
    await handleSend();
    await checking();
  }

    const [imagePosition, setImagePosition] = useState({
      x: Math.floor(Math.random() * 200),
      y: Math.floor(Math.random() * 200),
    });
  
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setImagePosition({
    //       x: Math.floor(Math.random() * -100),
    //       y: Math.floor(Math.random() * 200),
    //     });
    //   }, 3000);
    //   return () => clearInterval(interval);
    // }, []);
  

    // useEffect(() => {
    //   if (scrollViewRef.current) {
    //     scrollViewRef.current.scrollToEnd({ animated: true });
    //   }
    // }, [messages]);

    useEffect(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);
  

  return (
    <View style={styles.container}>
      <Image 
          source={backImage}
          style={[styles.image, { left: imagePosition.x, right: imagePosition.y }]}
      
      />

      {/* {isFocused == (false) &&(<ScrollView ref={scrollViewRef} style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        {messages.map((item, index) => (
          <View key={index} style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
            <Text style={item.type ==='user'? styles.userMessageText:styles.botMessageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>)}

      {isFocused == (true) &&(<ScrollView ref={scrollViewRef} style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        {messagesCache.map((item, index) => (
          <View key={index} style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
            <Text style={item.type ==='user'? styles.userMessageText:styles.botMessageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>)} */}
{/* contentContainerStyle={{ paddingBottom: 100 }} */}
      <ScrollView ref={scrollViewRef} style={styles.chatContainer} >
        {messages.map((item, index) => (
          <View key={index} style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
            <Text style={item.type ==='user'? styles.userMessageText:styles.botMessageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
        <Text style={styles.buttonText}><FontAwesome name="chevron-up" size={21} color="white" /></Text>
      </TouchableOpacity> */}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >  
        <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalButtonOpen} onPress={toggleModal}>
            <Text style={styles.buttonText}><FontAwesome name="chevron-down" size={21} color="white" /></Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTittle}>Chat History</Text>
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.buttonText}>Copy?</Text>
            </TouchableOpacity>
          </View>
            <ScrollView ref={scrollViewRef} style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 100 }}>
              {messages.map((item, index) => (
                <View key={index} style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
                  <Text style={item.type ==='user'? styles.userMessageText:styles.botMessageText}>{item.text}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal> */}


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
      <TouchableOpacity  style={styles.sendButton} onPress={checking}>
          <Text style={styles.buttonText}>Check</Text>
      </TouchableOpacity>

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
    height: "50%"

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

  // modalTittle: { 
  //   textAlign: 'center', 
  //   paddingTop: 10,
  //   paddingLeft: 90,
  //   color: 'black',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // modalHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },

  // modalContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  // },
  
  // modalContent: {
  //   backgroundColor: 'white',
  //   padding: 5,
  //   borderRadius: 20,
  //   width: '93%',
  //   height: '86%',
  // },
  // closeButton: {
  //   backgroundColor: '#2196F3',
  //   width: '30%',
  //   padding: 10,
  //   borderRadius: 5,
  //   marginTop: 20,
  // },
});


export default Chat;
