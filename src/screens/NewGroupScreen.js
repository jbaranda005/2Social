import React, { useState, useEffect } from "react";
import { FlatList, View, TextInput, StyleSheet, Button } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';
import { useNavigation } from "@react-navigation/native";

const ContactsScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [name, setName] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result.data?.listUsers?.items);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Create" disabled={!name || selectedUserIds.length < 1} onPress={onCreateGroupPress} />
      ),
    });
  }, [name, selectedUserIds]);

  const onCreateGroupPress = async () => {

    // Create a new chatroom
    const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
    );

    console.log(newChatRoomData);
    if (!newChatRoomData.data?.createChatRoom) {
        console.log("Error creating chat error");
    }

    const newChatRoom = newChatRoomData.data?.createChatRoom;

    //Add the selected users to the chatroom

    await Promise.all(
        selectedUserIds.map(userID =>
         API.graphql(
            graphqlOperation(createUserChatRoom, {
                input: { chatRoomId: newChatRoom.id, userID},
        })
    ))); 

    //Add the auth user to the chatroom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
        graphqlOperation(createUserChatRoom, {
            input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
        })
    );

    setSelectedUserIds([]);
    setName("");

    //navigate to the newly created chatroom
    navigation.navigate("Chat", { id: newChatRoom.id });
};

  const onContactPress = (id) => {
    setSelectedUserIds((userIds) => {
        if (userIds.includes(id)) {
            //remove id from sleected
            return [...userIds].filter(uid => uid != id);
        } else {
            //add id from selected
            return [...userIds, id];
        }
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Group name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ContactListItem
          user={item}
          selectable
          onPress={() => onContactPress(item.id)}
          isSelected={selectedUserIds.includes(item.id)}
        />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
    padding: 10,
    margin: 10,
  },
});

export default ContactsScreen;