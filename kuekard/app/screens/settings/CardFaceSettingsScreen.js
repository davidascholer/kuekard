import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Dimensions } from 'react-native';

import CardAnimation from '../../components/animations/CardAnimation';
import BackNavButton from '../../components/icons/BackNavButton';
import ScreenContainer from '../../components/ScreenContainer';
import AppContext from '../../context/context';
import cache from '../../utility/cache';

export default function CardFaceSettingsScreen({ navigation }) {

    const [cardSide, setCardSide] = useState(0);

    const appContext = useContext(AppContext);

    useEffect(() => {
        navigation.setOptions({ headerLeft: () => <BackNavButton goBack={goBack}>back</BackNavButton> });
        getInitialCardSide();
    }, [])

    const goBack = () => {
        navigation.goBack();
    }

    //0 is english, 1 is non-english
    const updateCardSide = async () => {
        let oldCardSide = await getCardSide();
        if (!oldCardSide)
            oldCardSide = cardSide;
        const newCardSide = Math.abs(oldCardSide - 1);
        await setCardSideToStorage(newCardSide);
        await appContext.saveSettings(appContext.CACHE_ID_SETTINGS.CARD_FACE, newCardSide);
    }

    const setCardSideToStorage = async newCardSide => {
        const newCardSideString = JSON.stringify(newCardSide);
        try {
            await cache.storeStringValue(appContext.CACHE_ID_SETTINGS.CARD_FACE, newCardSideString);
        } catch (error) {
            console.log(error);
        }
    }

    const getCardSide = async () => {
        try {
            const cachedCardSideObject = await cache.readStringValue(appContext.CACHE_ID_SETTINGS.CARD_FACE);
            const cachedCardSide = JSON.parse(cachedCardSideObject);
            if (cachedCardSideObject) {
                return cachedCardSide;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getInitialCardSide = async () => {
        const initialCardSide = await getCardSide();
        if (initialCardSide)
            setCardSide(initialCardSide);
    }

    return (
        <ScreenContainer styleSheet={styles.container}>
            <StatusBar
                hidden={true} />
            {cardSide === 0 &&
                <CardAnimation styleSheet={styles.card}
                    updateCardSide={updateCardSide}
                    cardState={{
                        frontText: "english",
                        backText: "french",
                    }}
                    cardColorTheme="light"
                />
            }
            {cardSide === 1 &&
                <CardAnimation styleSheet={styles.card}
                    updateCardSide={updateCardSide}
                    cardState={{
                        frontText: "french",
                        backText: "english",
                    }}
                    cardColorTheme="dark"
                />
            }
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        maxHeight: Dimensions.get('window').width * .9 * 5 / 3,
        minHeight: Dimensions.get('window').width * .9,
        width: Dimensions.get('window').width * .9,

    },
    text: {
        color: '#50767b',
        fontSize: 16,
    },
});
