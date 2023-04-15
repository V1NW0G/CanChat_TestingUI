import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';

const CardDetail = ({ route }) => {
  const { cardTitle, cardDetails, cardDate , cardImage , linkTo, linkButton} = route.params;

  
    const handlePress = () => {
      Linking.openURL(linkTo);
    }

  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.cardtitle}>{cardTitle}</Text>
      <Image source={{ uri: cardImage}} style={styles.cardImage} />
      <Text style={styles.cardContent}>{cardDetails}</Text>
      <Text>{cardDate}</Text>

      {linkTo && linkTo.trim() !== '' && (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={{fontWeight: 'bold', color: '#212121', fontSize: 18}}>{linkButton}</Text>
        </TouchableOpacity>
      )}

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: '#fff',
        },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    height: "90%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardImage: {
    width: '100%',
    height: '30%',
    marginTop: 0,
    opacity : 0.9,
    borderRadius: 10

  },

  cardtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 7,
  },

  cardContent: {
    fontSize: 20,
    marginBottom: 10,
    textAlign:"left",
  },

  button: {
    backgroundColor: '#FFF',
    borderColor: "#212121",
    borderWidth: 2, 
    width: "70%",
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    marginTop: 40,
  },

});

export default CardDetail;
