import { Box, Button, Fade, IconButton, TextField, Typography, Card, CardContent } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from "@clerk/nextjs"
import AIFeelings from "./aiFeelings";
import UserPosts from "./userPosts";

export default function BeginWriting() {
    const [showInput, setShowInput] = useState(false);
    const [showBeginButton, setShowBeginButton] = useState(true);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [postId, setPostId] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { user } = useUser();
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
        setPostId(null);
    }


    type Post = {
        id: number;
        date: string;
        userId: string; // Changed from number to string
        userName: string;
        content: string;
    }

    const handleSave = async () => {
        if (!input.trim()) return;
        
        setIsSaving(true);
        try {
            const userId = user?.id
            const userName = user?.firstName + " " + user?.lastName; 
            
            const mutation = `
                mutation CreatePost($userId: String!, $userName: String!, $content: String!) {
                    createPost(userId: $userId, userName: $userName, content: $content) {
                        id
                        date
                        userId
                        userName
                        content
                    }
                }
            `;
            
            const response = await fetch('/api/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: mutation,
                    variables: { 
                        userId, 
                        userName, 
                        content: input.trim() 
                    }
                }),
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.data?.createPost) {
                    setPosts([...posts, data.data.createPost]);
                    setPostId(data.data.createPost.id);
                    setInput("");
                }
            } else {
                console.error('Failed to save post');
            }
        } catch (error) {
            console.error('Error saving post:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            marginRight: '50px', 
            marginTop: '70px', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 3
        }}>
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
                            disabled={!input.trim() || isSaving}
                            onClick={handleSave}
                        >
                            {isSaving ? 'Saving...' : 'Save Thoughts'}
                        </Button>
                        </Fade>
                        {postId && (
                            <Fade in={!!postId} timeout={1000}>
                                <Typography sx={{ color: 'success.main', fontSize: '0.875rem' }}>
                                    Post saved with ID: {postId}
                                </Typography>
                            </Fade>
                        )}
                    </Box>
                    {showCloseButton && (
                        <Box>
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
            {posts.length > 0 && (
                <UserPosts posts={posts} />
            )}
            <AIFeelings posts={posts} />
        </Box>
    )
}