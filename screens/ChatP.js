import React, { useState, useRef, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Modal} from 'react-native';
const backImage = require("../assets/blue-cat.gif");
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import colors from '../colors';
// import CustomOverlay from './ChatScreen/CustomOverlay';


import excitedImage from '../assets/emotion/waku.jpeg';
import joyImage from '../assets/emotion/smile.gif';
import neutralImage from '../assets/emotion/smile.gif';
import sadImage from '../assets/emotion/sad.gif';
import angryImage from '../assets/emotion/angry.gif';
import surprisedImage from '../assets/emotion/shocked.gif';


// { type: 'user', text: "test in"}, { type: 'bot', text: "testing" }
const ChatP = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([{ type: 'bot', text: "有咩想靜雞雞同我講?" }]);
  const [messagesCache, setMessageCache] = useState([{ type: 'user', text: "test in"}, { type: 'bot', text: "testing" }]);
  const [inputText, setInputText] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [emotion, setEmotion] = useState("neutral");
  const [intent, setIntent] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  // icon
  const sendIcon = <MaterialCommunityIcons name="send" size={19} color="white" />;
  const closeIcon = <MaterialCommunityIcons name="close" size={34} color="Black" />;
  const optionIcon = <SimpleLineIcons name="options" size={24} color="black" />;
  const cleanIcon = <MaterialCommunityIcons name="delete-sweep" size={24} color="black" />;
  

const emotionImages = {
  'excite': excitedImage,
  'joy': joyImage,
  'neutral': neutralImage,
  'sad': sadImage,
  'angry': angryImage,
  'surprise': surprisedImage,
};

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

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      // Alert.alert("fuck")
    });
    return focusHandler;
  }, [navigation]);

  const handleSend = async() => {
        try{   
        if (inputText !== '') {
          const messagesloader = inputText;
          setInputText('');
          setIsLoading(true);
          setMessages([...messages, { type: 'user', text:messagesloader },{ type: 'bot', text: "loading" }]);
          const response = await fetch(`http://127.0.0.1:5000/chat/${messagesloader}`);
          const text = await response.json();
          const getEmotion = text.emotion;
          const getIntent = text.intent;
          setIntent(getIntent)
          setEmotion(getEmotion)
          setMessages([...messages, { type: 'user', text: messagesloader },{ type: 'bot', text: text.response }]);
          setMessageCache([...messagesCache,{ type: 'user', text: messagesloader },{type: 'bot', text: text.response}])
          setIsLoading(false);
          console.log(messages)
        } else {
          Alert.alert('Empty input');
        }   
    }
    catch (error) {
      setMessages([...messages, { type: 'user', text:messagesloader },{ type: 'bot', text: "我busy" }]);
        }    
    }

  const saveIntent = async () => {
    try {
      await AsyncStorage.setItem('savedIntent', intent)
      console.log("saved\n",intent)
    } catch (e) {
      console.log(e)
    }
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
  
  
  useEffect(() => {
    setIsLoading(false);
    scrolltoend();
    
      // return () => {
         
      // }
  },[]);

  useEffect(() => {
    getIntent();
 
},[messages]);

useEffect(() => {
  saveIntent();
},[intent]);


    const handleRemove = async() => {
      if (messagesCache != '') {
        setMessageCache([]);
      }
  }



  const handleSendAndRemove = async() => {
    await handleRemove();
    await handleSend();

  }
    // useEffect(() => {
    //   if (scrollViewRef.current) {
    //     scrollViewRef.current.scrollToEnd({ animated: true });
    //   }
    // }, [messages]);

    const scrolltoend = ()=>{
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

    useEffect(() => {
      scrolltoend();
    }, [messages]);

    const handleButtonPress = () => {
      setShowButtons(!showButtons);
    }
  
  
    
  

  return (

    <View style={styles.container}>
      {/* { left: imagePosition.x, right: imagePosition.y } */}
      <Image 
          source={emotionImages[emotion]}
          style={[styles.image]}
      
      />
      {/* {!showButtons && (
      <TouchableOpacity style={styles.togglebutton} onPress={handleButtonPress}>
        <Text>{optionIcon}</Text>
      </TouchableOpacity>)}

      {showButtons && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleButtonPress}>
            <Text>{closeIcon}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton}>
            <Text>清除對話 {cleanIcon}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton} >
            <Text>Fuck</Text>
          </TouchableOpacity>
        </View>
      )} */}

      <Text>{emotion}</Text>
      <Text>{intent}</Text> 

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


<KeyboardAvoidingView
      style={styles.inputContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10} // adjust this value as needed
    >
    
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="👉🏻點擊同我開始對話"
          placeholderTextColor="#949494" 
          onFocus={() => setIsFocused(true)}   
          onBlur={() => setIsFocused(false)}
        />

      {inputText !== '' && isloading == (false) &&(<TouchableOpacity style={styles.sendButton} onPress={handleSendAndRemove} disabled={inputText === ''}>
          <Text style={styles.buttonText}>{sendIcon}</Text>
      </TouchableOpacity>)}
      {inputText !== '' && isloading == (true) &&(<TouchableOpacity style={styles.sendDisButton} disabled>
          <Text style={styles.buttonText} >唔好咁心急啦,我諗緊野😣</Text>
      </TouchableOpacity>)}

      
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.darkBG,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    alignItems: "center",
    width: "100%",
    height: 200,
    top: 0,
    left: 0,
    opacity: 0.7,
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
    // borderTopWidth: 1,
    borderTopColor: '#757575',
  },

  input: {
    fontWeight: "bold",
    color: 'white',
    flex: 1,
    height: 40,
    width: '30%',
    borderWidth: 1,
    borderColor: '#757575',
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
    backgroundColor: colors.darkBG,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#757575',
    padding: 10,
    margin: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: '70%',
  },
  botBubble: {
    backgroundColor: '#61ffd5',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#757575',
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
  
  // modalButton: {
  //   backgroundColor: '#6666FF',
  //   width: '20%',
  //   borderTopLeftRadius: 40,
  //   borderTopRightRadius: 40,
  //   opacity: 0.5,
  // },

  // modalButtonOpen: {
  //   backgroundColor: '#6666FF',
  //   width: '20%',
  //   borderTopLeftRadius: 40,
  //   borderTopRightRadius: 40,
  //   opacity: 0.9,
  // },

  // buttonText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },

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
  togglebutton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    flexDirection: "column",
    alignItems: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,
    marginRight: 10,
    opacity:0.6
  },

  additionalButton: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,
    marginRight: 10,
  },
});


export default ChatP;
