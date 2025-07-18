"use client"

import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Dropdown from "../components/dropdown";

export default function FeelingsAI() {

    return (
            <Box>
                <Box sx= {{
                    display: 'flex',
                    justifyContent: 'center',
                    alighItems: 'center',
                    marginTop: '100px',
                }}>
                    <Typography variant="h1" >Zenith Companion</Typography>
                    <Typography variant="h2"></Typography>
                </Box>
            </Box>
    )
}           