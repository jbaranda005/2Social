import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import bg from '../../assets/images/BG.png';
import Message from '../components/Message';
import messages from '../../assets/data/messages.json'
import InputBox from '../components/InputBox';
import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom, listMessagesByChatRoom } from '../graphql/queries';
import { onCreateMessage, onUpdateChatRoom } from '../graphql/subscriptions';

const ChatScreen = () => {
  const [chatRoom, setChatRoom ] = useState(null);
  const[messages, setMessages] = useState([]);


  const route = useRoute();
  const navigation = useNavigation();

  const chatroomID = route.params.id;

  //fetch Chat Room
  useEffect (() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
    (result) => setChatRoom(result.data?.getChatRoom)
    );

    const subscription = API.graphql(graphqlOperation(onUpdateChatRoom, {filter: {id: { eq: chatroomID }}})
    ).subscribe({
      next: ({value}) => {
        setChatRoom(cr => ({ ...(cr || {}), ...value.data.onUpdateChatRoom}))
      },
      error: (err) => console.warn(err),
    });
      return () => subscription.unsubscribe();
  }, [chatroomID]);

  //fetch Messages
  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
      chatroomID,
      sortDirection: "DESC",
    })
  ).then((result) => {
    setMessages(result.data?.listMessagesByChatRoom?.items);
  });

  //subscribe to new messages
  const subscription = API.graphql(
    graphqlOperation(onCreateMessage, {
      filter: {chatroomID: {eq: chatroomID }},
    })
    ).subscribe({
    next: ({value}) => {
      setMessages((m) => [value.data.onCreateMessage, ...m]);
    },
    error: (err) => console.warn(err),
  });
    return () => subscription.unsubscribe();
  }, [chatroomID]);
  
  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox chatroom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
  
  const styles = StyleSheet.create({
    bg: {
      flex: 1,
    },
    list: {
      padding: 10,
    },
  });
  
  export default ChatScreen;