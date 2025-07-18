import { Box, Card, CardContent, Typography, Fade } from "@mui/material";
import { useState, useEffect } from "react";

type Post = {
    id: number;
    date: string;
    userId: string; // Changed from number to string
    userName: string;
    content: string;
}

export default function AIFeelings({ posts }: { posts: Post[] }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (posts.length > 0) {
            setShow(true);
        }
    }, [posts]);

    return (
        <Fade in={show} timeout={1500}>
            <Box sx={{ 
                marginTop: '30px',
                marginRight: '50px',
                maxWidth: '400px'
            }}>
                <Card sx={{ 
                    backgroundColor: 'primary.light',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <CardContent sx={{ padding: '20px' }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: 'text.primary',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                textAlign: 'center'
                            }}
                        >
                            AI Feelings
                        </Typography>
                        
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'text.secondary',
                                lineHeight: '1.6',
                                textAlign: 'center'
                            }}
                        >
                            This is where AI-generated insights and feelings about your writing will appear. 
                            The AI will analyze your thoughts and provide gentle feedback and observations.
                        </Typography>
                        
                        {/* Placeholder for future AI content */}
                        <Box sx={{ 
                            marginTop: '15px',
                            padding: '10px',
                            backgroundColor: 'background.default',
                            borderRadius: '8px',
                            border: '1px dashed',
                            borderColor: 'text.secondary'
                        }}>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: 'text.secondary',
                                    fontStyle: 'italic'
                                }}
                            >
                                AI analysis will appear here...
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Fade>
    );
}