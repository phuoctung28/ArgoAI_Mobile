import {FlatList, TouchableOpacity, Text} from "react-native";
import React, {useEffect, useState} from "react";
import { NavigationProp } from '@react-navigation/native';

interface ConversationsScreenProps {
    navigation: NavigationProp<any>;
}
interface Conversation {
    id: string;
    title: string;
}

export function ConversationsScreen({ navigation }: ConversationsScreenProps) {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        // Fetch the list of conversations from your backend here
        // and update the state with setConversations.
    }, []);

    return (
        <FlatList
            data={conversations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('ChatBotScreen', { conversationId: item.id })}>
                    <Text>{item.title}</Text>
                </TouchableOpacity>
            )}
        />
    );
}