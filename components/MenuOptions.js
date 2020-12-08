import * as React from "react";
import { View, Alert } from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import RoundButton from "./RoundButton";

const MenuOptions = ({ actionsMenu, groceryList }) => {
  const [visible, setVisible] = React.useState(false);

  
  const createTwoButtonAlert = (callback, alertTitle) =>
    Alert.alert(
      "Warning:",
      `${alertTitle} ?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => callback() }
      ],
      { cancelable: false }
    );

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <RoundButton
            onPress={openMenu}
            name="dots-vertical"
            style={{ marginRight: 20 }}
          />
        }
      >
        {actionsMenu.map((action, index) => (
          
           <Menu.Item
            key={index}
            icon={action.icon}
            onPress={() => {
              action.validationNeeded
              ? createTwoButtonAlert(() => action.onPress(groceryList), action.title)
              : action.onPress(groceryList)
              closeMenu();
            }}
            title={action.title}
          />
        ))
        }
      </Menu>
    </View>
  );
};

export default MenuOptions;
// action.onPress(groceryList);
// createTwoButtonAlert(() => action.onPress(groceryList))