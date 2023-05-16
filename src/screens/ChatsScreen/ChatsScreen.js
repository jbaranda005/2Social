import { FlatList } from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { listChatRooms } from './queries';
import { useEffect, useState } from 'react';

const ChatsScreen = () => {
    const [chatRoom, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            const authUser = await Auth.currentAuthenticatedUser();

            const response = await API.graphql(
                graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
            );

            const rooms = response?.data?.getUser?.ChatRooms?.items || [];
            const sortedRooms = rooms.sort(
                (room1, room2) => 
                    new Date(room1.chatRoom.updatedAt) - new Date(room2.chatRoom.updatedAt)
            );

            setChatRooms(sortedRooms);
        };
        fetchChatRooms();
    }, []);

    return (
        <FlatList
            data={chatRoom}
            renderItem={({item}) => <ChatListItem chat={item.chatRoom}/>} 
            style={{ backgroundcolor: 'white'}}
        /> 
    );
    
};

export default ChatsScreen;