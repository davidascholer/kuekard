import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Dimensions } from 'react-native';

import CardAnimation from '../components/animations/CardAnimation';
import ScreenContainer from '../components/ScreenContainer';
import AppContext from '../context/context';
import cache from '../utility/cache';

export default function CardScreen({ navigation, route }) {
  const [deckSet, setDeckSet] = useState(route.params.set);
  const [deckIndex, setDeckIndex] = useState(0);
  const [deckLength, setDeckLength] = useState(route.params.set.length);
  const [cardSide, setCardSide] = useState(0);

  useEffect(() => {
    initDeckState();
  }, []);

  const appContext = useContext(AppContext);

  const initDeckState = async () => {
    const initialCardSide = await getInitialCardSide();
    setCardSide(initialCardSide);
  };

  const setNextCard = () => {
    let nextIndex = deckIndex + 1;
    if (nextIndex >= deckLength)
      nextIndex = 0;
    setDeckIndex(nextIndex);
  }

  const setPrevCard = () => {
    let nextIndex = deckIndex - 1;
    if (nextIndex < 0)
      nextIndex = deckLength - 1;
    setDeckIndex(nextIndex);
  }

  const getInitialCardSide = async () => {
    try {
      const cachedCardSideObject = await cache.readStringValue("@cardFace");
      if (cachedCardSideObject) {
        return JSON.parse(cachedCardSideObject);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <ScreenContainer styleSheet={styles.container}>
      <StatusBar
        hidden={true} />
      {deckSet && cardSide === 0 &&
        <CardAnimation styleSheet={styles.card}
          cardState={{
            frontText: deckSet[deckIndex].english,
            backText: deckSet[deckIndex][appContext.language],
            index: deckIndex
          }}
          setNextCard={setNextCard}
          setPrevCard={setPrevCard}
          cardColorTheme={"light"}
        >
        </CardAnimation>
      }
      {deckSet && cardSide === 1 &&
        <CardAnimation styleSheet={styles.card}
          cardState={{
            frontText: deckSet[deckIndex][appContext.language],
            backText: deckSet[deckIndex].english,
            index: deckIndex
          }}
          setNextCard={setNextCard}
          setPrevCard={setPrevCard}
          cardColorTheme={"dark"}
        >
        </CardAnimation>
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
});
