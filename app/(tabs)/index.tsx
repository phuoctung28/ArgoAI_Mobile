import React, {useRef, useState} from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

type Message = {
    text: string;
    sender: string;
};

const mockMessages: Message[] = [
    {text: 'Hello, how can I help you?', sender: 'bot'},
    {text: 'I need help with my order.', sender: 'user'},
    {text: 'Sure, could you please provide your order number?', sender: 'bot'},
    {text: 'My order number is 12345.', sender: 'user'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {
        text: 'Thank you, let me check thatzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz for you.',
        sender: 'bot'
    },
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
    {text: 'Thank you, let me check that for you.', sender: 'bot'},
];

export default function ChatBotScreen() {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [input, setInput] = useState('');
    const flatListRef = useRef<FlatList>(null); // Create a reference to the FlatList

    const sendMessage = () => {
        if (input.trim() !== '') {
            setMessages(prevMessages => {
                const newMessages = [...prevMessages, {text: input, sender: 'user'}];
                setInput('');
                setTimeout(() => flatListRef.current?.scrollToEnd({animated: true}), 0); // Scroll to the end of the FlatList
                return newMessages;
            });
        }
    };

    const renderMessage = ({item}: { item: Message }) => (
        <Text style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {item.text}
        </Text>
    );


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatListRef} // Assign the reference to the FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
                style={styles.chatContainer}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({animated: true})} // Scroll to the end whenever the content size changes
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={sendMessage} // Call sendMessage when the Enter key is pressed
                    placeholder="Type your message here..."
                />
                <TouchableOpacity style={styles.button} onPress={sendMessage}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    chatContainer: {
        flex: 1,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#0a84ff',
        color: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        maxWidth: '80%',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#30d158',
        color: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        maxWidth: '80%',
    },
    button: {
        backgroundColor: '#0a84ff',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});