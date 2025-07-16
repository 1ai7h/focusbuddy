import { Box, Button, Fade, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function BeginWriting() {
    const [showInput, setShowInput] = useState(false);
    const [showBeginButton, setShowBeginButton] = useState(true);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [input, setInput] = useState("");

    const handleClick = () => {
        setShowInput(true);
        setShowBeginButton(false);
        setShowCloseButton(true);
        if (!showInput) {
            setInput("");
        }
    }

    const handleClose = () => {
        setShowInput(false);
        setShowBeginButton(true);
        setShowCloseButton(false);
    }

    return (
        <Box sx={{ display: 'flex', marginRight: '50px', marginTop: '70px', justifyContent: 'center', alignItems: 'center' }}>
            {showBeginButton && (   
                <Fade in={showBeginButton} timeout={1000}>
                    <Button variant="outlined" color="error" onClick={handleClick}>Begin Writing</Button>
                </Fade>
            )}
            {showInput && (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 1,
                    width: '100%',
                    maxWidth: '450px'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                        maxWidth: '400px'
                    }}>
                        <Fade in={showInput} timeout={1000}>
                        <TextField 
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            placeholder="Write your haiku here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            label="Your Thoughts"
                        />
                        </Fade>
                        <Fade in={showInput} timeout={2000}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            disabled={!input.trim()}
                        >
                            Save Thoughts
                        </Button>
                        </Fade>
                    </Box>
                    {showCloseButton && (
                        <Box sx={{ 
                        }}>
                            <Fade in={showCloseButton} timeout={2000}>
                            <IconButton 
                                aria-label="close" 
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                            </Fade>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    )
}