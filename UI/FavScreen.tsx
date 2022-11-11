import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {NavigationProps} from './navigation/screenTypes';
import {colors} from './styles/colors';
import Icon from './styles/icons';

export const FavScreen = ({navigation}: NavigationProps) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [Ingredient, setIngredient] = useState('');
  function handleModal() {
    setIsModalVisible(() => !isModalVisible);
    setIngredient('');
  }

  return (
    <View style={localStyles.container}>
      <View style={localStyles.switch}>
        <Text>Favorite/Pantry switch button</Text>
      </View>

      <View style={localStyles.pantryBox}>
        <View>
          <TouchableOpacity onPress={handleModal} style={localStyles.buttonBox}>
            <Icon.Entypo
              name="circle-with-plus"
              style={localStyles.addButton}
            />
          </TouchableOpacity>
        </View>

        <Modal animationType="fade" visible={isModalVisible} transparent>
          <View style={localStyles.centeredView}>
            <View style={localStyles.modalView}>
              <Text style={localStyles.text}>Ingredient</Text>
              <View style={localStyles.inputContainer}>
                <TextInput
                  value={Ingredient}
                  onChangeText={ingredient => setIngredient(ingredient)}
                />
              </View>
              <Button title="Add" onPress={handleModal} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  switch: {
    width: 250,
    height: 50,
    marginTop: '15%',
    marginBottom: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gleeful,
    borderRadius: 50,
  },

  pantryBox: {
    backgroundColor: '#E3E3E3',
    borderRadius: 20,
    width: '100%',
    height: 440,
  },

  buttonBox: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4%',
    marginLeft: '82%',
    borderRadius: 50,
  },

  addButton: {
    fontSize: 50,
    color: colors.gleeful,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    width: '70%',
    height: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },

  text: {
    fontSize: 18,
    fontFamile: 'Barlow',
    marginBottom: 10,
  },

  parentView: {
    width: '85%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    height: 50,
    width: 200,
    backgroundColor: '#E3E3E3',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
});
