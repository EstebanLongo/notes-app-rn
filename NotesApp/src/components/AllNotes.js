import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  console.log('notes: ', notes)
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

  const renderItem = ({ item, index }) => (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate("Note", {
            singleNote: item,
          });
        }}
      >
        <Text style={styles.note}>{item}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.allnotescontainer}>
      <FlatList data={notes?.reverse()} renderItem={renderItem} />
      <Pressable
        onPress={() => navigation.navigate("Nueva nota")}
        style={styles.btn}
      >
        <MaterialIcons name="add" size={26} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  allnotescontainer: {
    backgroundColor: "#27374D",
    paddingTop: 50,
    height: "100%",
  },
  btn: {
    height: 65,
    width: 65,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    margin: 20,
    backgroundColor: "#F2DAB6",
  },
  note: {
    borderBottomWidth: 2,
    color: "#FFFAFA",
    borderBottomColor: "#20232a",
    // borderColor: "#20232a",
    padding: 5,
    margin: 10,
    fontSize: 16,
    // backgroundColor: "#61dafb",
  },
});
