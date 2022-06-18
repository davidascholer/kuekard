/*
CardAnimation:
A wrapper to animate the card effects.
A variation of CardFlip and CardSwipe.
We need to combine both animations on the same animated component.
Creating it's own component for brevity and cleaner code.
*/
import React, { useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback, Easing, Dimensions, StyleSheet } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';

import Card from '../Card';
import { settings } from '../../hooks/useSettings';

const CardAnimation = ({ cardState, setNextCard, setPrevCard, styleSheet, ...props }) => {

    //Animation variables
    const slideAnim = useRef(new Animated.Value(0)).current;
    const flipAnim = useRef(new Animated.Value(0)).current;
    const growAnim = useRef(new Animated.Value(0)).current;
    const animationTime = 400;
    const globalTimingValues = {
        duration: animationTime / 2,
        easing: Easing.linear,
        useNativeDriver: true
    }
    //Local variables
    const [cardSide, setCardSide] = useState(settings.cardSide);
    const windowWidth = Dimensions.get('window').width;


    /*
    Translate the view to the left so it's out of sight, update the Card configurations, then translate the view back in sight from the right. 
    */
    const handleSwipeLeft = () => {
        if (setNextCard) {
            Animated.timing(slideAnim, {
                toValue: -1,
                ...globalTimingValues
            }).start(() => {

                //Update the configuration
                setNextCard();
                setCardSide(settings.cardSide);
                slideAnim.setValue(1);

                Animated.timing(slideAnim, {
                    toValue: 0,
                    ...globalTimingValues
                }).start();
            })
        }
    }

    /*
    Same as handleSwipeLeft but translate in opposite directions.
    */
    const handleSwipeRight = () => {
        if (setPrevCard) {
            Animated.timing(slideAnim, {
                toValue: 1,
                ...globalTimingValues
            }).start(() => {

                //Update the configuration
                setPrevCard();
                setCardSide(settings.cardSide);
                slideAnim.setValue(-1);

                Animated.timing(slideAnim, {
                    toValue: 0,
                    ...globalTimingValues
                }).start();
            });
        }
    }

    /*
    Scale the view and rotate it 90° so it's invisible, update the Card configuration, then translate the view another 90° and scale back. 
    */
    const flip = () => {
        if(props.updateCardSide)
            props.updateCardSide();

        //Rotates 90°
        Animated.parallel([
            Animated.timing(flipAnim, {
                toValue: 1,
                ...globalTimingValues
            }),
            //Scales
            Animated.timing(growAnim, {
                toValue: 1,
                ...globalTimingValues
            })
        ]).start(() => {

            //Update the configuration
            flipAnim.setValue(-1);
            if (cardSide === "front")
                setCardSide("back");
            else
                setCardSide("front");

            Animated.parallel([
                //Rotates the view back 90°
                Animated.timing(flipAnim, {
                    toValue: 0,
                    ...globalTimingValues
                }),
                //Scales back
                Animated.timing(growAnim, {
                    toValue: 0,
                    ...globalTimingValues
                })
            ]).start();
        })
    };

    return (
        <GestureRecognizer
            style={[styles.fill, styleSheet]}
            onSwipeLeft={() => handleSwipeLeft()}
            onSwipeRight={() => handleSwipeRight()}
        >
            <TouchableWithoutFeedback onPress={() => flip()} style={styles.fill}>
                <Animated.View
                    style={[
                        styles.fill,
                        {
                            transform: [
                                {
                                    rotateY: flipAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ["0deg", "90deg"]
                                    })
                                },
                                {
                                    scale: growAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 1.08]
                                    })
                                },
                                {
                                    translateX: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, windowWidth]
                                    })
                                }
                            ],
                            backfaceVisibility: 'true'
                        }
                    ]}
                >
                    {cardSide === "front" && <Card cardFace={cardSide} cardContent={cardState.frontText} cardColorTheme={props.cardColorTheme}></Card>}
                    {cardSide === "back" && <Card cardFace={cardSide} cardContent={cardState.backText} cardColorTheme={props.cardColorTheme}></Card>}
                </Animated.View>
            </TouchableWithoutFeedback>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    fill: {
        alignContent: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
})
export default CardAnimation;