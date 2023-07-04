import { StyleSheet, Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Note({ route }) {
  const [notes, setNotes] = useState([]);
  const { singleNote } = route.params;
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getNotes();
    }, [])
  );

  const getNotes = () => {
    AsyncStorage.getItem("NOTES").then((notes) => {
      setNotes(JSON.parse(notes));
    });
  };

  const deleteNote = async () => {
    const newNotes = notes.filter((note) => note !== singleNote);
    await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes)).then(() =>
      navigation.navigate("Mis notas")
    );
  };

  return (
    <View style={styles.notecontainer}>
      <View style={styles.viewbtns}>
        <Pressable
          style={styles.btnvolver}
          onPress={() => navigation.navigate("Mis notas")}
          title="Mis notas"
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#FFFAFA" />
        </Pressable>
        <Pressable onPress={() => deleteNote()} style={styles.btndelete}>
          <AntDesign name="delete" size={24} color="#FFFAFA" />
        </Pressable>
      </View>
      {/* <Text style={{ fontSize: 22, margin: 20, color: "#FFFAFA" }}>
        {singleNote.title}
      </Text> */}
      <Text style={{ fontSize: 22, marginLeft: 26, marginTop: 20, color: "#FFFAFA" }}>
        {singleNote}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#27374D",
    alignItems: "center",
    justifyContent: "center",
  },
  notecontainer: {
    backgroundColor: "#27374D",
    paddingTop: 40,
    height: "100%",
  },
  viewbtns: {
    flexDirection: "row",
  },
  btnvolver: {
    flex: 1,
    margin: 10,
  },
  btndelete: {
    alignSelf: "flex-end",
    margin: 10,
  },
});
