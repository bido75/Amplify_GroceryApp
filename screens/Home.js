import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { handleAuthentificateUser } from "../src/redux/actions/user";
import {
  handleDeleteGroceryList,
  handleLoadGroceryLists,
} from "../src/redux/actions/groceryList";
import RoundButton from "../components/RoundButton";
import { blue } from "../utils/helpers";
import ModalWithNavButton from "../components/ModalWithNavButton";
import { Provider } from "react-native-paper";

const initialState = {
  plusButtonModal: false,
};

const Home = (props) => {
  const dispatch = useDispatch();
  const { groceryLists } = props;
  const [modalVisible, setModalVisible] = React.useState(initialState);
  const showModal = (key) => setModalVisible({ ...modalVisible, [key]: true });
  const resetModals = () => setModalVisible(initialState);
  useEffect(() => {
    dispatch(handleAuthentificateUser()).then(() =>
      dispatch(handleLoadGroceryLists())
    );
  }, []);

  function removeGroceryList(groceryListID) {
    dispatch(handleDeleteGroceryList(groceryListID));
  }

  function showGroceryListID(groceryListID) {
    return props.navigation.push("ShareGroceryList", { groceryListID });
  }

  const navigationOptions = [{
    onPress: () => {
      resetModals();
      return props.navigation.push("NewList");
    },
    title:"New Grocery List"
  },{
    onPress: () => {
      resetModals();
      return props.navigation.push("JoinGroceryList");
    },
    title:"Join Grocery List"
  },
]
  return (
    <Provider>
      <View style={styles.container}>
        {groceryLists.length === 0
          ? displayInstructions()
          : displayUserGroceryLists()}

        <ModalWithNavButton
          navigationOptions={navigationOptions}
          visible={modalVisible.plusButtonModal}
          hideModal={resetModals}
        />

        <RoundButton
          onPress={() => showModal("plusButtonModal")}
          name="plus-circle"
          color={blue}
          size={40}
          style={styles.bottom}
        />
      </View>
    </Provider>
  );

  function goToList(groceryList) {
    return props.navigation.push("ProductCategory", { groceryList });
  }
  function displayInstructions() {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>
          Create your first grocery list by clicking on the + icon or browse
          existing lists by pressing the Search icon !
        </Text>
      </View>
    );
  }

  function displayUserGroceryLists() {
    return (
      <View style={styles.container}>
        {groceryLists.map((glist, index) => (
          <View style={styles.glist} key={glist.id ? glist.id : index}>
            <TouchableOpacity
              style={styles.product}
              onPress={() => goToList(glist)}
            >
              <View style={styles.subContainer}>
                <Text style={styles.glistName}>{glist.name}</Text>
              </View>
            </TouchableOpacity>
            <RoundButton
              onPress={() => showGroceryListID(glist.id)}
              name="share-variant"
              color="black"
            />
            <RoundButton
              onPress={() => removeGroceryList(glist.id)}
              name="delete-outline"
              color="black"
            />
          </View>
        ))}
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  groceryLists: state.groceryLists,
  user: state.user,
});

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  bottom2: {
    alignItems: "flex-end",
    marginBottom: 46,
  },
  bottom: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 46,
  },
  glist: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  glistName: { fontSize: 18 },
});

{
  /* <RoundButton
        onPress={() => goToAllGroceryList()}
        name="feature-search-outline"
        color={blue}
        style={styles.bottom}
        size={40}
      /> */
}
