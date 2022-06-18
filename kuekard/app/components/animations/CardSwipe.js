/*
Translate the view out of sight, updates the Card configurations, then translate the view back in sight from the other direction. 
*/
import React, { useRef, useState } from "react";
import { Animated, Easing, Dimensions } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';

const CardSwipe = ({ componentOne, componentTwo  }) => {

    //Animation variables
    const slideAnim = useRef(new Animated.Value(0)).current;
    const animationTime = 400;
    const globalTimingValues = {
        duration: animationTime / 2,
        easing: Easing.linear,
        useNativeDriver: true
    }
    //Local variables
    const [component, setComponent] = useState("compA");
    const windowWidth = Dimensions.get('window').width;


    /*
    Translate the view out to the left, updates the Card configurations, then in from the right. 
    */
    const handleSwipeLeft = () => {

        Animated.timing(slideAnim, {
            toValue: -1,
            ...globalTimingValues
        }).start(() => {

            //Update the configuration
            if (component === "compA")
                setComponent("compB");
            else
                setComponent("compA");
            slideAnim.setValue(1);

            Animated.timing(slideAnim, {
                toValue: 0,
                ...globalTimingValues
            }).start();
        })
    }

        /*
    Translate the view out to the right, updates the Card configurations, then in from the left. 
    */
    const handleSwipeRight = () => {

        Animated.timing(slideAnim, {
            toValue: 1,
            ...globalTimingValues
        }).start(() => {

            //Update the configuration
            if (component === "compA")
                setComponent("compB");
            else
                setComponent("compA");
            slideAnim.setValue(-1);

            Animated.timing(slideAnim, {
                toValue: 0,
                ...globalTimingValues
            }).start();
        });
    }

    return (
        <GestureRecognizer
            onSwipeLeft={() => handleSwipeLeft()}
            onSwipeRight={() => handleSwipeRight()}
        >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    translateX: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, windowWidth]
                                    })
                                }
                            ],
                        }
                    ]}
                >
                {component === "compA" && componentOne}
                {component === "compB" && componentTwo}
                </Animated.View>
        </GestureRecognizer>
    );
}

export default CardSwipe;