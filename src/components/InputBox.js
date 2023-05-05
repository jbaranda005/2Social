import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

const InputBox = () => {
    return (
        <View style={styles.container}>
            { /* Icon */ }

            <AntDesign name="plus" size={20} color="royalblue" />

            { /* Text Input */ }
            <TextInput style={styles.input} placeholder="Type your message here...." />
            { /* Icon */ }
            <MaterialIcons style={styles.send} name="send" size={16} color="white" />
        </View>
    );
};

const styles = StyleSheet.create ({
    container: {
        flexDirection: "row",
        backgroundColor: "whitesmoke",
        padding: 5,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 50,
        paddingHorizontal: 10,
        borderColor: 'lightgray',
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 10,
        

    },
    send: {
        backgroundColor: "royalblue",
        padding: 7,
        borderRadius: 15,
        overflow: "hidden",

    },

});

export default InputBox;