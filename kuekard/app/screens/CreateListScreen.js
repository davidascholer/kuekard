import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

import AppContext from '../context/context';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ListPicker from '../components/ListPicker';
import Checkbox from '../components/Checkbox';
import KeyboardHidden from '../components/KeyboardHidden';
import ScreenContainer from '../components/ScreenContainer';
import CardList from '../components/CardList';
import {
    AppForm,
    AppFormField,
    AppFormSubmitButton,
    ErrorMessage
} from "../components/forms";
import sets from '../assets/files/vocabList';


function CreateListScreen({ navigation }) {
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);
    const [selectedList, setSelectedList] = useState();
    const [selectedSet, setSelectedSet] = useState();
    const [wordToTranslate, setWordToTranslate] = useState("");
    const [listEditable, setListEditable] = useState(false);
    const [listPickerOpen, setListPickerOpen] = useState(false);

    useEffect(() => {
        // if (selectedList) {
        //     const userSet = appContext.data.sets[appContext.language].find(set => Object.keys(set)[0] === selectedList);
        // const set = Object.values(userSet)[0];
        // setSelectedSet(set);
        // }
    }, []);

    const appContext = useContext(AppContext);

    const validationSchema = {
        english: Yup.string().required().min(1).label("this textbox").matches(/^[aA-zZ\s]+$/, "Only characters allowed in english."),
        [appContext.language]: Yup.string().required().min(1).label("this textbox")
    };
    const createValidationSchema = {
        create_list: Yup.string().required().min(1).label("this textbox")
    };

    const errorMessage = "whoops";

    const handleSubmit = values => {

        addCard(values)
    }

    const addCard = data => {
        // console.log(appContext.data.sets[appContext.language][selectedList])

        const newArray = [...appContext.data.sets[appContext.language][selectedList], data]
        console.log(newArray);
        appContext.data.sets[appContext.language][selectedSet] = newArray;
        setSelectedSet(newArray);
        appContext.saveData(appContext.data);
    }

    const deleteCard = index => {
        const newArray = [...selectedSet];
        newArray.splice(index, 1);
        appContext.data.sets[appContext.language][selectedSet] = newArray;
        setSelectedSet(newArray);
        appContext.saveData(appContext.data);
    }

    const handleTranslate = () => {
        alert(wordToTranslate);
    }

    const createList = () => {
        alert('create list');
    }

    const handleListPickerOnChangeValue = (value) => {
        if (value === "createList") {
            setSelectedList(null);
        } else {
            setSelectedList(value); 
            const lll = appContext.data.sets[appContext.language][value];
            setSelectedSet(lll);
        }
    }

    const objectList = Object.keys(appContext.data.sets[appContext.language]).map((set, index) => ({ label: set, value: set }));
    const myLists = [{ label: "Create a List", value: 'createList' }, ...objectList];

    return (
        <ScreenContainer style={styles.parentContainer}>
            <KeyboardHidden handleKeyboardShown={() => setListPickerOpen(false)}>
                <ListPicker
                    open={listPickerOpen}
                    setOpen={setListPickerOpen}
                    listItems={myLists}
                    onChangeValue={handleListPickerOnChangeValue}
                    placeholder={"Pick a Set"}
                    styleSheet={listPickerStyles}
                    backgroundColor={appContext.colorTheme.medDark}
                    textColor={appContext.colorTheme.medLight}
                ></ListPicker>
            </KeyboardHidden>
            {selectedList &&
                <View style={{ flex: 1 }}>
                    <KeyboardHidden handleKeyboardShown={() => setListPickerOpen(false)}>
                        <View style={styles.checkboxContainer}>
                            {!listEditable &&
                                <Text style={[styles.checkboxSibling, { color: appContext.colorTheme.dark }]}>{selectedList}</Text>
                            }
                            {listEditable &&
                                <AppTextInput style={styles.checkboxSibling} value={selectedList} />
                            }
                            <Checkbox isChecked={listEditable} setIsChecked={setListEditable} size={40} color={appContext.colorTheme.medDark} style={styles.checkbox}>
                                <Text style={[styles.checkboxText, { color: appContext.colorTheme.medDark }]}>{listEditable ? "Save" : "Edit"}</Text>
                            </Checkbox>
                        </View>
                    </KeyboardHidden>
                    <View style={styles.container}>
                        <AppForm
                            initialValues={{ english: "", [appContext.language]: "", }}
                            onSubmit={values => handleSubmit(values)}
                            validationSchema={Yup.object().shape(validationSchema)}
                        >
                            <ErrorMessage error={errorMessage} visible={errorMessageVisible} />
                            <AppFormField
                                style={styles.field}
                                maxLength={20}
                                name="english"
                                numberOfLines={1}
                                placeholder="english"
                                type="text"
                                onBlur={word => setWordToTranslate(word.nativeEvent.text)}
                            />
                            <AppButton
                                onPress={handleTranslate}
                                title={"Translate"}
                                buttonStyles={[styles.buttonStyles, { backgroundColor: appContext.colorTheme.medDark }]}
                                buttonTextStyles={[styles.buttonTextStyles, { color: appContext.colorTheme.medLight }]}
                            />
                            <AppFormField
                                style={styles.field}
                                maxLength={20}
                                name={appContext.language}
                                numberOfLines={1}
                                placeholder={appContext.language}
                                type="text"
                            />
                            <AppFormSubmitButton
                                type="submit"
                                title={"+"}
                                buttonStyles={[styles.buttonStyles, { backgroundColor: appContext.colorTheme.medDark }]}
                                buttonTextStyles={[styles.buttonTextStyles, { color: appContext.colorTheme.medLight }]}
                            />
                        </AppForm>
                    </View>
                    <KeyboardHidden handleKeyboardShown={() => setListPickerOpen(false)}>
                        <CardList
                            set={selectedSet}
                            colorText={appContext.colorTheme.medLight}
                            deleteCard={deleteCard}
                            list={selectedList}
                            style={[styles.cardListContainer, { backgroundColor: appContext.colorTheme.medDark }]}
                        />
                    </KeyboardHidden>
                </View>
            }
            {!selectedList &&
                <View style={styles.container}>
                    <AppForm
                        initialValues={{ create_list: "" }}
                        onSubmit={value => createList(value)}
                        validationSchema={Yup.object().shape(createValidationSchema)}
                    >
                        <ErrorMessage error={errorMessage} visible={errorMessageVisible} />
                        <AppFormField
                            style={styles.field}
                            maxLength={20}
                            name="create_list"
                            numberOfLines={1}
                            placeholder="create a set"
                            type="text"
                        />
                        <AppFormSubmitButton
                            type="submit"
                            title={"Create Set"}
                            buttonStyles={[styles.buttonStyles, { backgroundColor: appContext.colorTheme.medDark }]}
                            buttonTextStyles={[styles.buttonTextStyles, { color: appContext.colorTheme.medLight }]}
                        />
                    </AppForm>
                </View>
            }
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    buttonStyles: {
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        minWidth: "20%",
        maxWidth: "50%",
        marginVertical: 10,
    },
    buttonTextStyles: {
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    cardListContainer: {
        borderRadius: 15,
        flex: 3,
        marginHorizontal: '5%',
        marginVertical: 5,
        width: '90%',
    },
    checkbox: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
    },
    checkboxContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        paddingHorizontal: 20,
    },
    checkboxSibling: {
        flex: 3,
        fontSize: 20,
        fontWeight: '400',
        justifyContent: "center",
        textAlign: 'center',
        width: '100%',
    },
    checkboxText: {
        marginRight: 1,
    },
    container: {
        alignItems: 'center',
        flex: 6,
        padding: 10,
        justifyContent: 'center',
    },
    field: {
        width: '100%'
    },
    parentContainer: {
        justifyContent: 'center',
    }
});


const listPickerStyles = StyleSheet.create({
    style: {
        marginHorizontal: 20,
        marginVertical: 5,
        paddingHorizontal: '5%',
        width: '90%',
    },
    containerStyle: {

    },
    disabledStyle: {
        opacity: 0.5
    },
    textStyle: {
        fontSize: 15
    },
    labelStyle: {
        fontWeight: "bold"
    },
    placeholderStyle: {

    }
})

export default CreateListScreen;