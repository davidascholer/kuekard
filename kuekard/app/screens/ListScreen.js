/*
Data will be formatted as follows:
"sets": {
    "french": {
        "deck one title": [
            {
                "english": "afront1",
                "french": "aback1"
            },
            {
                "english": "bfront1",
                "french": "bback1"
            },
            {
                "english": "cfront1",
                "french": "cback1"
            }
        ],
        "deck two title": [
            {
               "english": "afront2",
                "french": "aback2"
            },
            {
                "english": "bfront2",
                "french": "bback2"
            },
            {
                "english": "cfront2",
                "french": "cback2"
            },
            {
                "english": "dfront2",
                "french": "dback2"
            }
        ]
    }
}
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, StatusBar, View } from 'react-native';
*/
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import ListItem from '../components/ListItem';
import ScreenContainer from '../components/ScreenContainer';
import vocabList from '../assets/files/vocabList'
import AppContext from '../context/context';
import accountsApi from '../api/accountsApi';
import { ScrollView } from 'react-native-gesture-handler';

const ListScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [setExists, setSetExists] = useState();
    const [lang, setLang] = useState();

    const appContext = useContext(AppContext);

    useEffect(() => {
        // setSetExists(('sets' in appContext.data));
        console.log('data: ' + appContext.data)
        console.log('setExists: ' + setExists);
        getLanguage();
    }, [])

    const getLanguage = async () => {
        const lang = await appContext.getLanguageFromDevice();
        return lang;
    }

    
    const getDeckSet = async set => {
        setLoading(true);

        const result = await accountsApi.getData(set);

        if (!result.ok) {
            alert("There was an error retrieving data. Please check your internet connection.");
        }

        setLoading(false);
        return result.data;
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const lang = await getLanguage();
            console.log("lang: "+lang);
            if (!lang)
                navigation.navigate('ChooseLanguageScreen');
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const UserList = ({ item }) => (
        <ListItem
            data={item}
            pressed={async () => {
                const set = appContext.data.sets[appContext.language][item];
                navigation.navigate('CardScreen', { set });
            }}
        />
    );

    const CreateUserList = ({ item }) => (
        <ListItem
            data={item}
            pressed={() => {
                navigation.navigate('CreateListScreen');
            }}
        />
    );

    const CommunityList = ({ item }) => (
        <ListItem
            data={item}
            pressed={async () => {
                const set = await getDeckSet(item);
                navigation.navigate('CardScreen', { set })
            }}
        />
    );

    return (
        <ScreenContainer styleSheet={{ backgroundColor: appContext.colorTheme.medDark }}>
            <Text>My Sets</Text>
            <ScrollView>
                {setExists &&
                    <>
                        {Object.keys(appContext.data.sets[appContext.language]).map((item, index) => (
                            <UserList item={item} key={index} />
                        ))}
                    </>
                }
                <CreateUserList item={"create new set"} />
                <Text>Community Sets</Text>
                {vocabList.map((item, index) => (
                    <CommunityList item={item} key={index} />
                ))}
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        height: '100%',
    }
});

export default ListScreen;