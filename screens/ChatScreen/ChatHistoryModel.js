import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ChatHistoryModal = ({ isModalVisible, toggleModal, messages }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTittle}>Chat History</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Close</Text>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    height: '80%',
    borderRadius: 10,
    padding: 20,
    paddingTop: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  modalTittle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
  },
  userBubble: {
    backgroundColor: '#e6f2ff',
    alignSelf: 'flex-start',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  botBubble: {
    backgroundColor: '#cce6ff',
    alignSelf: 'flex-end',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  userMessageText: {
    fontSize: 16,
    color: '#000',
  },
  botMessageText: {
    fontSize: 16,
    color: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatHistoryModal;
