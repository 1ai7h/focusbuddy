"use client"

import { Box, Button, Card, CardContent, Fade, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Dropdown from "../components/dropdown";

export default function FeelingsAI() {
    const [inputText, setInputText] = useState('');

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
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '45px',
                }}>
                <TextField id="outlined-basic" label="Start by telling me about your day" variant="outlined" sx={{
                    width: '50%',
                     '& .MuiOutlinedInput-root':{
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
                     }
                }} 
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                                                {inputText && (
                        <Fade in={inputText} timeout={500}>
                                        <Button variant="contained" color="primary" sx={{
                                            marginLeft: '10px',
                                        }}>
                        <SendIcon />
                    </Button>
                    </Fade>
                    )}
                        </InputAdornment>
                    )
                }}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                />
                </Box>
            </Box>
    )
}           