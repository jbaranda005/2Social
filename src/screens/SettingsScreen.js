import { View, Button, TextInput, StyleSheet} from 'react-native';
import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { updateUser } from '../graphql/mutations';  
import { getUser } from '../graphql/queries';

const SettingsScreen = () => {

    useEffect(() => {
        getCurrentUser(); 
    }, [])

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const isValid = () => {
        return name && status;
    };

    const getCurrentUser = async() => {
        const authUser = await Auth.currentAuthenticatedUser();
        const response = await API.graphql(
            graphqlOperation(getUser, { id: authUser.attributes.sub,
            })
        );
        setName(response.data.getUser.name);
        setStatus(response.data.getUser.status);
        return response;
    };

    const save = async() => {
        if(!isValid()){
            console.warn('Not valid');
            return;
        }
        currentUser = getCurrentUser();

        await API.graphql(
            graphqlOperation(updateUser, { input: { _version: currentUser.data.getUser._version, id: currentUser.data.getUser.id, name, status },
            })
        );

    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TextInput
                style={styles.input}
                placeholder="Name.."
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Status.."
                multiline
                numberOfLines={3}
                value={status}
                onChangeText={setStatus}
            />
            <Button style={styles.button} onPress={() =>  save()} title="Save" />
            <Button style={styles.button} onPress={() => Auth.signOut()} title="Sign out" />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        margin: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    button: {
        height: 25,
        borderRadius: 20,
        margin: 10,
    }
})

export default SettingsScreen;