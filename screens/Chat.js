import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const handleSend = () => {
    setMessages([...messages, { type: 'user', text: inputText }]);
    setInputText('');
  };

  useEffect(() => {
    scrollViewRef.current.scrollToEnd();
  }, [messages]);

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.chatContainer}>
        {messages.map((item, index) => (
          <View key={index} style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
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
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
  messageText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Chat;
