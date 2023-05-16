import { Text, View, Image, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';
import { getCommonChatRoomWithUser } from '../services/chatRoomService';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime); //This is to have the date like 2 days ago, 1 week ago...

const ContactListItem = ({ user }) => {
    const navigation = useNavigation();

    const onPress = async () => {
        console.warn("Pressed")
        //Check if we have a chatroom with user
        const existingChatRoom = await getCommonChatRoomWithUser(user.id);
        if(existingChatRoom) {
            navigation.navigate("Chat", { id: existingChatRoom.id });
            return;
        }

        // Create a new chatroom
        const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, { input: {} })
        );

        console.log(newChatRoomData);
        if (!newChatRoomData.data?.createChatRoom) {
            console.log("Error creating chat error");
        }

        const newChatRoom = newChatRoomData.data?.createChatRoom;

        //Add the clicked user to the chatroom

        await API.graphql(
            graphqlOperation(createUserChatRoom, {
                input: { chatRoomId: newChatRoom.id, userId: user.id},
            })
        );

        //Add the auth user to the chatroom
        const authUser = await Auth.currentAuthenticatedUser();
        await API.graphql(
            graphqlOperation(createUserChatRoom, {
                input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
            })
        );

        //navigate to the newly created chatroom
        navigation.navigate("Chat", { id: newChatRoom.id });
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={{ uri: user.image }} style={styles.image}/>
            <View style={styles.content}>
                <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
                <Text numberOfLines={2} style={styles.subTitle}>{user.status}</Text>
            </View>
        </Pressable>
    );
};


const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
        alignItems: "center"
    
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },

    content: {
        flex: 1,
    },

    name: {
        fontWeight: 'bold',
    },
    subTitle: {
        color: 'gray',
        
    },
});

export default ContactListItem;