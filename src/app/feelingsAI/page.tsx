"use client"

import { Box, Button, Card, CardContent, Fade, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Dropdown from "../components/dropdown";

export default function FeelingsAI() {
    const [inputText, setInputText] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'ai'}>>([]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        
        // Add user message
        setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);
        setInputText('');
        setShowChat(true);
        
        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                text: "Thank you for sharing that with me. I'm here to listen and help you explore your feelings further.", 
                sender: 'ai' 
            }]);
        }, 1000);
    };

    return (
        <Box sx={{
            marginTop: '50px',
        }}>
            <Dropdown />
            <Box sx= {{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: '100px',
                flexDirection: 'column',   
                gap: '10px',
            }}>
                <Typography variant="h1">Zenith Companion</Typography>
                <Typography variant="h5">Zenith is your AI companion to help you explore your feelings and understand yourself better.</Typography>
            </Box>
            <Fade in={true} timeout={800}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '45px',
            }}>
                    <Box sx={{
                        width: '50%', // Keep width the same
                        height: showChat ? '60vh' : 'auto',
                        transition: 'all 0.8s ease-in-out',
                        backgroundColor: showChat ? 'primary.light' : 'transparent',
                        border: showChat ? '1px solid' : 'none',
                        borderColor: showChat ? 'primary.main' : 'transparent',
                        borderRadius: showChat ? '12px' : '0',
                        boxShadow: showChat ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}>
                        {showChat && (
                            <>
                                {/* Messages Area */}
                                <Box sx={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}>
                                    {messages.map((message, index) => (
                                        <Fade in={true} timeout={800}>
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                            }}
                                        >
                                            <Box sx={{
                                                maxWidth: '70%',
                                                padding: '12px 16px',
                                                backgroundColor: message.sender === 'user' ? 'primary.main' : 'background.default',
                                                color: message.sender === 'user' ? 'white' : 'text.primary',
                                                borderRadius: '18px',
                                                wordWrap: 'break-word',
                                            }}>
                                                <Typography variant="body1">
                                                    {message.text}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        </Fade>
                                    ))}
                                </Box>
                            </>
                        )}
                        
                        {/* Input Area - Same TextField that expands */}
                        <Box sx={{
                            padding: showChat ? '20px' : '0',
                            borderTop: showChat ? '1px solid' : 'none',
                            borderColor: showChat ? 'divider' : 'transparent',
                            backgroundColor: showChat ? 'background.default' : 'transparent',
                            borderRadius: showChat ? '0 0 12px 12px' : '0',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                            }}>
                                <TextField 
                                    id="outlined-basic" 
                                    label={showChat ? "Continue the conversation..." : "Start by telling me about your day"}
                                    variant="outlined" 
                                    sx={{
                                        width: '100%',
                                        '& .MuiOutlinedInput-root':{
                                            borderRadius: showChat ? '24px' : '10px',
                                            boxShadow: showChat ? 'none' : '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
                                            transition: 'all 0.8s ease-in-out',
                                        }
                                    }} 
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {inputText && (
                                                    <Fade in={inputText} timeout={500}>
                                                        <Button 
                                                            variant="contained" 
                                                            color="primary" 
                                                            onClick={handleSendMessage}
                                                            sx={{
                                                                marginLeft: '10px',
                                                                borderRadius: showChat ? '50%' : '4px',
                                                                minWidth: showChat ? '48px' : 'auto',
                                                                height: showChat ? '48px' : 'auto',
                                                                padding: showChat ? 0 : '6px 16px',
                                                                transition: 'all 0.8s ease-in-out',
                                                            }}
                                                        >
                                                            <SendIcon />
                                                        </Button>
                                                    </Fade>
                                                )}
                                            </InputAdornment>
                                        )
                                    }}
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Box>
    )
}           