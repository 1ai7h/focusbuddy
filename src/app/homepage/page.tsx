"use client"

import { useUser } from "@clerk/nextjs"
import { Box, Fade } from "@mui/material";
import Haiku from "../components/haiku";

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
                <Fade in={true} timeout={1000}>
                    <div>
                        <h1>Welcome {user?.firstName}</h1>
                    </div>
                </Fade>
                <Fade in={true} timeout={2000}>
                    <div>
                        <Haiku />
                    </div>
                </Fade>
            </Box>
        </div>
    )
}
