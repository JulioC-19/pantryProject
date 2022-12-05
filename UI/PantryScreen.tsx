/* eslint-disable @typescript-eslint/no-shadow */
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {AuthContext} from '../auth/authContext';
import {colors} from './styles/colors';
import Icon from './styles/icons';

export const PantryScreen = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [ingredient, setIngredient] = useState('');
  const [list, setList] = useState<string[]>([]);

  const {email, token} = useContext(AuthContext);
  const tk: string = token!;
  const URL = 'https://newpantry.herokuapp.com/api/pantry';
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getPantryItem = async () => {
      try {
        const response = await fetch(URL, {
          method: 'POST',
          body: JSON.stringify({email: email}),
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line prettier/prettier
            'Authorization': tk,
          },
        });
        const json = await response.json();
        const jsonIngredients = json.pantryIngredients;
        const newIngredients = jsonIngredients.filter((element: any) => {
          return element !== null && element !== '';
        });
        setList(newIngredients);
      } catch (error) {
        console.log('getPantry error:: ' + error);
      }
    };
    getPantryItem();
  }, [email, tk]);

  const addPantryItem = async (item: string) => {
    if (item === '') {
      setMessage('Cannot add empty items');
      return;
    } else if (list.includes(item)) {
      setMessage('Cannot add repeat items');
      return;
    }
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({email: email, ingredient: item}),
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line prettier/prettier
          'Authorization': tk,
        },
      });
      const json = await response.json();
      const jsonIngredients = json.pantryIngredients;
      //Remove any empty item in the list
      const newIngredients = jsonIngredients.filter((element: any) => {
        return element !== null && element !== '';
      });
      setList(newIngredients);
      setIsModalVisible(() => !isModalVisible);
    } catch (error) {
      console.log('ERROR: add pantry ' + error);
    }
  };

  var row: Array<any> = [];

  function showModal() {
    setMessage('');
    setIngredient('');
    setIsModalVisible(() => !isModalVisible);
  }

  /*
   * swipable function below *
   */
  //herherherherhher

  const renderItem = (
    {item, index}: {item: string; index: number},
    onClick: () => void,
  ) => {
    const closeRow = (index: number) => {
      setTimeout(() => {
        if (row[index]) {
          row[index].close();
        }
      }, 2000);
    };

    const renderRightActions = (
      progress: any,
      dragX: any,
      onClick: () => void,
    ) => {
      return (
        <View style={localStyles.sideButton}>
          <TouchableOpacity onPress={onClick}>
            <Icon.Entypo
              name="circle-with-cross"
              style={localStyles.deleteButton}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          rightThreshold={20}
          overshootRight={false}
          overshootLeft={false}
          ref={ref => (row[index] = ref)}>
          <View style={localStyles.itemBox}>
            <Text style={localStyles.itemText}>{item}</Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  const deleteAlert = ({item}: {item: string}) =>
    Alert.alert('Delete Comfirmation', item, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteItem(item);
        },
      },
    ]);

  const deleteItem = async (item: string) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({email: email, ingredient: item}),
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line prettier/prettier
          'Authorization': tk,
        },
      });
      const json = await response.json();
      const jsonIngredients = json.pantryIngredients;
      const newIngredients = jsonIngredients.filter((element: any) => {
        return element !== null && element !== '';
      });
      setList(newIngredients);
    } catch (error) {
      console.log('getPantry error:: ' + error);
    }
  };

  /*
   * swipable function above*
   */

  return (
    <View style={localStyles.container}>
      <View style={localStyles.pantryBox}>
        <View>
          <TouchableOpacity onPress={showModal} style={localStyles.buttonBox}>
            <Icon.Entypo
              name="circle-with-plus"
              style={localStyles.addButton}
            />
          </TouchableOpacity>
        </View>

        {/* Add ingredient pop window */}
        <Modal animationType="fade" visible={isModalVisible} transparent>
          <View style={localStyles.centeredView}>
            <View style={localStyles.modalView}>
              {/* <Text style={localStyles.text}>Add Pantry Item</Text> */}
              <View style={localStyles.inputContainer}>
                <TextInput
                  placeholder="Pantry Item"
                  value={ingredient}
                  onChangeText={setIngredient}
                  style={{flex: 1}}
                />
              </View>
              <Text style={localStyles.text}>{message}</Text>
              <View style={localStyles.buttonContainer}>
                <Button
                  title="Cancel"
                  color={colors.goldenRod}
                  onPress={() => setIsModalVisible(() => !isModalVisible)}
                />
                <Button
                  title="Save"
                  color={colors.gleeful}
                  onPress={() => addPantryItem(ingredient)}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={localStyles.itemContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={list}
            renderItem={v =>
              renderItem(v, () => {
                deleteAlert(v);
              })
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pantryBox: {
    backgroundColor: colors.gainsBoro,
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },

  buttonBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '3%',
    marginLeft: '82%',
  },

  //round plus button
  addButton: {
    fontSize: 40,
    color: colors.gleeful,
    borderRadius: 40,
  },

  itemContainer: {
    maxHeight: '80%',
    width: '90%',
    alignSelf: 'center',
    color: colors.fullYellow,
  },
  itemBox: {
    marginVertical: 4,
    padding: 9,
    height: 48,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: colors.darkOliveGreen,
  },

  //Side Delete button
  sideButton: {
    backgroundColor: colors.mandarinRed,
    height: 48,
    width: 60,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  deleteButton: {
    fontSize: 30,
    color: colors.white,
  },

  //Modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    width: '70%',
    height: 200,
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 38,
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
    color: colors.mandarinRed,
    marginBottom: 8,
  },
  inputContainer: {
    height: 50,
    width: 200,
    backgroundColor: colors.gainsBoro,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  //save and cancel buttons
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
