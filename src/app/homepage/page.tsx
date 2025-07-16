"use client"

import { useUser } from "@clerk/nextjs"
import { Box, Button, Fade } from "@mui/material";
import Haiku from "../components/haiku";
import Dropdown from "../components/dropdown";
import BeginWriting from "../components/beginwritting";

export default function Homepage() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'left',
                height: '100vh',
                marginLeft: '100px',
                marginTop: '50px',
            }}>
                {/* Header row with welcome message and hamburger menu */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Fade in={true} timeout={1000}>
                        <div>
                            <h1>Welcome {user?.firstName}</h1>
                        </div>
                    </Fade>
                    <Dropdown />
                </Box>
                <Fade in={true} timeout={2000}>
                    <div>
                        <Haiku />
                    </div>
                </Fade>
                <BeginWriting />    
            </Box>
        </div>
    )
}