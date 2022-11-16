/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
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
  ListRenderItemInfo,
  GestureResponderEvent,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {NavigationProps} from './navigation/screenTypes';
import {colors} from './styles/colors';
import Icon from './styles/icons';

const tempDateToDelete = [
  {
    id: 1,
    title: 'toast',
  },
  {
    id: 2,
    title: 'egg',
  },
  {
    id: 3,
    title: 'bacon',
  },
  {
    id: 4,
    title: 'cheese',
  },
  {
    id: 5,
    title: 'lettuce',
  },
  {
    id: 6,
    title: 'mayo',
  },
  {
    id: 7,
    title: 'tomato',
  },
  {
    id: 8,
    title: 'toast',
  },
  {
    id: 9,
    title: 'egg',
  },
  {
    id: 10,
    title: 'bacon',
  },
  {
    id: 11,
    title: 'cheese',
  },
];

export const PantryScreen = ({navigation}: NavigationProps) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isEditVisible, setIsEditVisible] = React.useState(false);
  const [Ingredient, setIngredient] = useState('');
  const [listData, setListData] = useState(tempDateToDelete);

  let row: Array<any> = [];
  let prevOpenedRow: any;

  function showModal() {
    setIsModalVisible(() => !isModalVisible);
    setIngredient('');
  }
  function addPantryItem() {
    if (!Ingredient) {
      console.log('no user input for addPantryItem');
    } else {
      console.log(Ingredient + ' is added.');
      setIsModalVisible(() => !isModalVisible);
    }
  }
  function showEdit() {
    setIsEditVisible(() => !isEditVisible);
  }
  function editPantryItem() {
    if (!Ingredient) {
      console.log('no user input for addPantryItem');
    } else {
      console.log('Ingredient edit: ' + Ingredient);
      setIsEditVisible(() => !isEditVisible);
    }
  }

  /*
   * swipable function below *
   */

  const renderItem = (
    {item, index}: ListRenderItemInfo<{id: number; title: string}>,
    onClick: () => void,
  ) => {
    const closeRow = (index: number) => {
      console.log('close row');
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (
      progress: any,
      dragX: any,
      onClick: ((event: GestureResponderEvent) => void) | undefined,
    ) => {
      return (
        <View style={localStyles.sideButton}>
          <Button color={colors.mandarinRed} onPress={onClick} title="DELETE" />
        </View>
      );
    };
    const renderLeftActions = () => {
      return (
        <View style={localStyles.sideButton}>
          <Button color={colors.mountainIris} onPress={showEdit} title="EDIT" />
        </View>
      );
    };

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          renderLeftActions={() => renderLeftActions()}
          onSwipeableOpen={() => closeRow(index)}
          rightThreshold={10}
          overshootRight={false}
          overshootLeft={false}
          ref={ref => (row[index] = ref)}>
          <View style={localStyles.itemBox}>
            <Text style={localStyles.itemText}>{item.title}</Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  const deleteItem = ({
    item,
    index,
  }: ListRenderItemInfo<{id: number; title: string}>) => {
    console.log(item, index);
    let a = listData;
    a.splice(index, 1);
    console.log(a);
    setListData([...a]);
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
              <Text style={localStyles.text}>Add Ingredient</Text>
              <View style={localStyles.inputContainer}>
                <TextInput
                  value={Ingredient}
                  onChangeText={ingredient => setIngredient(ingredient)}
                />
              </View>
              <View style={localStyles.buttonContainer}>
                <Button
                  title="Add"
                  color={colors.fullYellow}
                  onPress={addPantryItem}
                />
                <Button
                  title="Cancel"
                  color={colors.gainsBoro}
                  onPress={() => setIsModalVisible(() => !isModalVisible)}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Edit ingredient pop window */}
        <Modal animationType="fade" visible={isEditVisible} transparent>
          <View style={localStyles.centeredView}>
            <View style={localStyles.modalView}>
              <Text style={localStyles.text}>Edit Ingredient</Text>
              <View style={localStyles.inputContainer}>
                <TextInput
                  value={Ingredient}
                  onChangeText={ingredient => setIngredient(ingredient)}
                />
              </View>
              <View style={localStyles.buttonContainer}>
                <Button
                  title="Edit"
                  color={colors.fullYellow}
                  onPress={editPantryItem}
                />
                <Button
                  title="Cancel"
                  color={colors.gainsBoro}
                  onPress={() => setIsEditVisible(() => !isEditVisible)}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={localStyles.itemContainer}>
          <FlatList
            data={listData}
            renderItem={v =>
              renderItem(v, () => {
                console.log('Pressed', v);
                deleteItem(v);
              })
            }
            keyExtractor={item => item.id.toString()}
          />
        </View>
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
    backgroundColor: colors.gainsBoro,
    borderRadius: 20,
    width: '100%',
    height: 440,
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
    backgroundColor: colors.white,
    borderRadius: 40,
  },

  //add and cancel buttons
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemContainer: {
    maxHeight: '80%',
    width: 320,
    maxWidth: '100%',
    alignSelf: 'center',
    color: colors.fullYellow,
  },
  itemBox: {
    marginVertical: 2,
    padding: 4,
    alignItems: 'center',
    height: 38,
    backgroundColor: colors.white,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkOliveGreen,
  },

  //Side Delete/Edit button
  sideButton: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 70,
  },

  //Modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '70%',
    height: 200,
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
    marginBottom: 10,
  },
  inputContainer: {
    height: 50,
    width: 200,
    backgroundColor: colors.gainsBoro,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
});
