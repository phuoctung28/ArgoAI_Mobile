import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

type ChatHeaderProps = {
    name: string;
    status: string;
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChatHeader: React.FC<ChatHeaderProps> = ({name, status}) => (
    <View style={styles.chatHeader}>
        <View style={styles.chatHeaderLeft}>
            <View style={styles.chatHeaderInfo}>
                <Image
                    resizeMode="contain"
                    source={{uri: "assets/chatbot.svg"}}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.chatHeaderName}>{name}</Text>
                    <View style={styles.statusIndicator}>
                        <View style={styles.statusDot}/>
                        <Text style={styles.statusText}>{status}</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
);

type MessageProps = {
    content: string;
    isUser: boolean;
    timestamp?: string;
};

const Message: React.FC<MessageProps> = ({content, isUser, timestamp}) => (
    <View style={styles.messageContainer}>
        {timestamp && (
            <Text style={styles.timestamp}>{timestamp}</Text>
        )}
        <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.botMessage]}>
            {!isUser && (
                <Image
                    resizeMode="contain"
                    source={{uri: "assets/chatbot.svg"}}
                    style={styles.botAvatar}
                />
            )}
            <Text style={styles.messageText}>{content}</Text>
        </View>
    </View>
);

const ChatInput: React.FC<{ onSendMessage: (message: string) => void }> = ({onSendMessage}) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim().length > 0) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#72777A"
                    value={message}
                    onChangeText={setMessage}
                />
            </View>
            <TouchableOpacity onPress={handleSend}>
                <Image
                    resizeMode="contain"
                    source={{uri: "assets/send-button.svg"}}
                    style={styles.sendButton}
                />
            </TouchableOpacity>
        </View>
    );
};

const postMessageToBot = async (message: string) => {
    try {
        const response = await fetch('http://0.0.0.0:8000/api/v1/chat/generateAnswer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br'
            },
            mode: 'no-cors',
            body: JSON.stringify({
                "session_id": '1',
                "sender_message": message
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting message to bot:', error);
        return null;
    }
};

export default function ChatScreen() {
    const [messages, setMessages] = useState<MessageProps[]>([]);

    const handleSendMessage = async (userMessage: string) => {
        const newMessage: MessageProps = {
            content: userMessage,
            isUser: true,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        const botResponse = await postMessageToBot(userMessage);
        if (botResponse && botResponse.message) {
            const botMessage: MessageProps = {
                content: botResponse.message,
                isUser: false,
                timestamp: new Date().toLocaleString(),
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    };
    return (
        <View style={styles.container}>
            <ChatHeader name="ArgoAI+" status="Always active"/>
            <ScrollView style={styles.chatContent}>
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        content={message.content}
                        isUser={message.isUser}
                        timestamp={message.timestamp}
                    />
                ))}
            </ScrollView>
            <ChatInput onSendMessage={handleSendMessage}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        maxWidth: windowWidth,
        width: "100%",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    statusBar: {
        alignItems: 'center',
        paddingVertical: 1,
    },
    statusBarText: {
        fontSize: 17,
        fontWeight: '600',
    },
    statusBarIcon: {
        width: 14,
        aspectRatio: 1,
    },
    logo: {
        width: 122,
        aspectRatio: 3.33,
        alignSelf: 'center',
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 12,
    },
    headerIcon: {
        width: 18,
        aspectRatio: 1.28,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 18,
    },
    chatHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    avatar: {
        width: windowWidth * 0.1, // 10% of screen width
        aspectRatio: 1,
    },
    chatHeaderInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    chatHeaderName: {
        color: "#202325",
        fontFamily: "DM Sans, sans-serif",
        fontSize: 14,
        fontWeight: '700',
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusDot: {
        backgroundColor: "#7DDE86",
        borderRadius: 4,
        width: 8,
        height: 8,
    },
    statusText: {
        color: "#72777A",
        fontFamily: "DM Sans, sans-serif",
        fontSize: 12,
        fontWeight: '500',
    },
    chatHeaderIcon: {
        width: 44,
        aspectRatio: 1,
    },
    chatContent: {
        flex: 1,
        marginTop: 22,
    },
    messageContainer: {
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    timestamp: {
        color: "#72777A",
        fontFamily: "DM Sans, sans-serif",
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 15,
    },
    messageBubble: {
        borderRadius: 24,
        padding: 16,
        maxWidth: windowWidth * 0.8, // 80% of screen width
    },
    userMessage: {
        backgroundColor: "#3C9D78",
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    botMessage: {
        backgroundColor: "#F5F9FD",
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    botAvatar: {
        width: 32,
        aspectRatio: 1,
        marginRight: 8,
    },
    messageText: {
        color: "#fff",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: windowWidth * 0.05, // 5% of screen width
        paddingVertical: windowHeight * 0.04, // 4% of screen height
        borderTopLeftRadius: 48,
        backgroundColor: "#FFF",
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 48,
        borderColor: "rgba(151, 156, 158, 1)",
        borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 16,
    },
    input: {
        flex: 1,
        fontFamily: "DM Sans, sans-serif",
        fontSize: 16,
        color: "#202325",
    },
    inputIcon: {
        width: 24,
        aspectRatio: 1,
    },
    sendButton: {
        width: 44,
        aspectRatio: 1,
    }
});