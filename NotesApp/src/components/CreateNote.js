import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function CreateNote() {
  const [note, setNote] = useState("");

  // const [notes, setNotes] = useState([])
  // const [description, setDescription] = useState("");
  // const [title, setTitle] = useState("");
  const navigation = useNavigation();

  const saveNote = async () => {
    const value = await AsyncStorage.getItem("NOTES");
    // console.log("ASDFvalue: ", value);
    const notes = value ? JSON.parse(value) : [];
    notes.push(note);
    await AsyncStorage.setItem("NOTES", JSON.stringify(notes)).then(() =>
      navigation.navigate("Mis notas")
    );
    // console.log("ASDFnotes: ", notes);
    // setTitle("");
    setNote("");
  };

  // const handleOnChangeText = (text, valueFor) => {
  //   if (valueFor === "title") setTitle(text);
  //   if (valueFor === "description") setDescription(text);
  // };

  // const handleOnSubmit = async (title, description) => {
  //   const note = {id: Date.now(), title, description}
  //   const updatedNotes = [...notes, note]
  //   setNotes(updatedNotes)
  //   await AsyncStorage.setItem('NOTES', JSON.stringify(updatedNotes))
  // }

  return (
    <View style={styles.createcontainer}>
      <Pressable
        style={styles.btnvolver}
        onPress={() => navigation.navigate("Mis notas")}
        title="Mis notas"
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="#FFFAFA" />
      </Pressable>
      {/* <TextInput
        placeholder="Titulo"
        value={title}
        onChangeText={(text) => handleOnChangeText(text, "title")}
        style={{ color: "black", fontSize: 22 }}
        // style={styles.input}
        multiline={true}
        autoFocus
        selectionColor="#fff"
      /> */}
      <TextInput
        // value={description}
        value={note}
        onChangeText={setNote}
        placeholder="Notas"
        // onChangeText={(text) => handleOnChangeText(text, "description")}
        // style={{ color: "black", fontSize: 22 }}
        style={styles.input}
        multiline={true}
        autoFocus
        selectionColor="#FFFAFA"
      />

      <Pressable style={styles.button} onPress={saveNote}>
        <Text style={styles.btntext}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  createcontainer: {
    backgroundColor: "#27374D",
    height: "100%",
    paddingTop: 40,
  },
  input: {
    height: 68,
    width: "100%",
    // backgroundColor: "none",
    color: "#FFFAFA",
    fontSize: 24,
    paddingLeft: 26,
  },
  btnvolver: {
    margin: 10,
  },
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "flex-end",
    position: 'absolute',
    bottom: 0,
    backgroundColor: "#3E4756",
  },
  btntext: {
    color: "#FFFAFA",
  },
});



