{/***
  Commented out code w 3 asterisks (***) is how we filtered screens from the drawers in react < 6.0
  React 6.0+ has a new way as shown in ListingsNavigator.
*/}
import React, { useContext } from 'react';
import { Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AppContext from '../context/context';

const CustomDrawerContent = (props) => {
  const { GENERIC_USER, removeUser, user } = useContext(AppContext);

  {/***
  //Filter the screens printed on the drawer menu.
  const { state, ...rest } = props;
  const newState = { ...state }  //copy from state before applying any filter. do not change original state  
  newState.routes = newState.routes.filter(item => item.name !== "ListScreen");
*/}

  const logOut = () => {
    if (user !== GENERIC_USER)
      alert("signing out will reset all of your settings. proceed?")
    removeUser();
    props.navigation.closeDrawer();
  }
  const navigateToSettings = () => {
    props.navigation.navigate("SettingsNavigator");
    props.navigation.closeDrawer();
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/*** <DrawerItemList state={newState} {...rest} /> */}
      <DrawerItem
        label="Settings"
        onPress={() => navigateToSettings()}
        icon={({ tintColor }) => (
          <Image
            source={require("../assets/images/logo/kuekard-u.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: tintColor }}
          />
        )
        }
      />
      {(user !== "no-user") &&

        // Custom Drawer items get appended to the end of the list. Put other Drawer item here if we need it below custom drawer items.
        <DrawerItem
          label="Sign Out"
          onPress={() => logOut()}
          icon={({ tintColor }) => (
            <Image
              source={require("../assets/images/logo/kuekard-k.png")}
              resizeMode="contain"
              style={{ width: 20, height: 20, tintColor: tintColor }}
            />
          )
          }
        />

      }

      {(user === "no-user") &&

        <DrawerItem
          label="Sign In"
          onPress={() => logOut()}
          icon={({ tintColor }) => (
            <Image
              source={require("../assets/images/logo/kuekard-k.png")}
              resizeMode="contain"
              style={{ width: 20, height: 20, tintColor: tintColor }}
            />
          )
          }
        />

      }

    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;