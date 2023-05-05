import { View, Text, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import bg from '../../assets/images/BG.png';
import Message from '../components/Message';
import messages from '../../assets/data/messages.json'
import { FlatList } from 'react-native-gesture-handler';
import InputBox from '../components/InputBox';

const ChatScreen= () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.bg}>
            <ImageBackground source={bg} style={StyleSheet.bg}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => <Message message={item} />}
                    style={styles.list }
                    inverted 
                />
                <InputBox/>
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
    }
});

export default ChatScreen;