"use client"

import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Dropdown from "../components/dropdown";

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
};

export default function FeelingsAI() {
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello, how are you?",
            sender: 'ai',
            timestamp: new Date()
        },
    ]);    

    function handleSendMessage(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setMessages([...messages, {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        }]);
        setInputText('');
    }

    function handleKeyPress(event: KeyboardEvent<HTMLDivElement>): void {
        throw new Error("Function not implemented.");
    }   

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginRight: '100px', marginTop: '100px' }}>
                <Dropdown />    
            </Box>
            <Box>
            <Typography variant="h1" sx={{ textAlign: 'center', marginTop: '100px', color: 'text.primary' }}>
                Speak to Zenith
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px', color: 'text.secondary' }}>
                Zenith is a AI assistant that can help you with your feelings.
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px', color: 'text.secondary' }}>
                Zenith will slowly learn about you and your feelings. It will be able to help you with your feelings and help you understand yourself better.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: 'primary.light',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: '12px',
                overflow: 'hidden',
                width: '1500px',
                height: '700px',
                margin: 'auto',
                marginTop: '100px'
            }}>
                {/* Messages Area */}
                <Box sx={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minHeight: '500px' // This gives the chat area more height
                }}>
                    {messages.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                display: 'flex',
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: 1
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1,
                                maxWidth: '70%'
                            }}>
                                {message.sender === 'ai' && (
                                    <Typography sx={{ 
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: 32,
                                        height: 32,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.875rem'
                                    }}>
                                        
                                    </Typography>
                                )}
                                <Box
                                    sx={{
                                        padding: '12px 16px',
                                        backgroundColor: message.sender === 'user' ? 'primary.main' : 'background.default',
                                        color: message.sender === 'user' ? 'white' : 'text.primary',
                                        borderRadius: '18px',
                                        maxWidth: '100%',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    <Typography variant="body1">
                                        {message.text}
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            display: 'block', 
                                            marginTop: '4px',
                                            opacity: 0.7
                                        }}
                                    >
                                        {message.timestamp.toLocaleTimeString([], { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </Typography>
                                </Box>
                                {message.sender === 'user' && (
                                    <Typography sx={{ 
                                        bgcolor: 'secondary.main',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: 32,
                                        height: 32,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.875rem'
                                    }}>
                                        You
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    ))}
                    
                    {isTyping && (
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Typography sx={{ 
                                bgcolor: 'primary.main',
                                color: 'white',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.875rem'
                            }}>
                                Z
                            </Typography>
                            <Box sx={{
                                padding: '12px 16px',
                                backgroundColor: 'background.default',
                                borderRadius: '18px'
                            }}>
                                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                    Zenith is typing...
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Input Area */}
                <Box sx={{ 
                    padding: '20px',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        alignItems: 'flex-end'
                    }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Share your thoughts with Zenith..."
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '24px',
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isTyping}
                            sx={{
                                borderRadius: '50%',
                                minWidth: '48px',
                                height: '48px',
                                padding: 0
                            }}
                        >
                            <SendIcon />
                        </Button>
                    </Box>
                </Box>
            </Card>
            </Box>
        <Box>
        </Box>
        </Box>
        </Box>
    )
}           