/*
Plugin. Docs at: https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
*/
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ListPicker({ open, setOpen, onChangeValue, listItems, placeholder, styleSheet, backgroundColor, textColor }) {
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(listItems);

    return (
        <DropDownPicker
            autoScroll={true}
            open={open}
            value={value}
            items={items}
            maxHeight={300}
            placeholder={placeholder}
            placeholderStyle={{color:textColor}}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            labelStyle={{color:textColor}}
            onChangeValue={onChangeValue}
            style={[styleSheet.style,{backgroundColor:backgroundColor,borderColor:textColor,color:textColor}]}
            dropDownContainerStyle={[styleSheet.style,{backgroundColor:backgroundColor},{borderColor:textColor}]}
            listItemLabelStyle={{color:textColor}}
            selectedItemContainerStyle={{color:textColor}}
        // disabledStyle={}
        // textStyle={}
        // labelStyle={}
        // placeholderStyle={}
        />
    );
}
