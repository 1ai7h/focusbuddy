'use client'

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Box, Button, Fade } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
     setShow(true);
  }, []) 

  return (
    <div>
      <Fade in={show} timeout={500}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'primary.light',
        color: 'text.primary',
      }}>
        <h1>FocusBuddy</h1>
        <h2>Simple focus tool, no bloat and distraction free</h2>
        <p>
          Focus Buddy is a simple focus tool that helps you stay focused on your
          work. It is a distraction free tool that helps you stay focused on your
          work.
        </p>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}> 
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
          }}>
            <SignInButton forceRedirectUrl="/homepage">
              <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                Get Started
              </Button>
            </SignInButton>
            <SignUpButton forceRedirectUrl="/homepage">
              <Button variant="contained" color="secondary" sx={{ marginTop: '20px' }}>
                Sign In
              </Button>
            </SignUpButton>
          </Box>
        </Box>  
      </Box>
      </Fade>
    </div>
  );
}
