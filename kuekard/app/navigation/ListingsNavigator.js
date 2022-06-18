import React, { useContext } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './CustomDrawerContent';
import ListScreen from '../screens/ListScreen';
import AppContext from '../context/context';
import CreateListScreen from '../screens/CreateListScreen';

const Drawer = createDrawerNavigator();

const ListingsNavigator = ({ navigation }) => {
    const initialRoute = "ListScreen";
    const appContext = useContext(AppContext);

    return (
        <Drawer.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: appContext.colorTheme.light,
                },
                headerStyle: {
                    backgroundColor: appContext.colorTheme.medDark,
                    borderColor: appContext.colorTheme.medDark,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTintColor: appContext.colorTheme.medium,
                drawerActiveTintColor: appContext.colorTheme.medium,
            }
            }
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="ListScreen"
                component={ListScreen}
                options={{
                    // *** New way to hide drawer items.
                    drawerItemStyle: {
                        // display: "none",
                    },
                    headerTitleStyle: {
                        color: appContext.colorTheme.medium,
                    },
                    title: "My Sets",
                }}

            />
            <Drawer.Screen
                name="CreateListScreen"
                component={CreateListScreen}
                options={{
                    headerTitleStyle: {
                        color: appContext.colorTheme.medium,
                    },
                    title: "Edit Sets",
                }}

            />
            {/* <Drawer.Screen 
            name="About" 
            component={About}
            options={{
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require("../assets/images/logo/kuekard-a.png")}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: tintColor }}
                    />
                ),
            }}
            /> */}

        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    listContainer: {
        height: '100%',
    }
});

export default ListingsNavigator;