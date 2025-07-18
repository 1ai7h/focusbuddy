import { Box, Typography } from "@mui/material";
import { Fade } from "@mui/material";     

type Post = {
    id: number;
    date: string;
    userId: string; // Changed from number to string
    userName: string;
    content: string;
}

export default function UserPosts({ posts }: { posts: Post[] }) {
    return (
        <Box sx={{ 
            width: '100%', 
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
        }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                Your Posts
            </Typography>
            {posts.map((post, index) => (
                <Fade in={true} timeout={500 + (index * 200)} key={post.id}>
                    <Box sx={{  
                        width: '100%',
                        padding: 2,
                    }}>
                        <Typography variant="body1" sx={{ mb: 1, fontStyle: 'italic' }}>
                            "{post.content}"
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2
                        }}>
                            <Typography variant="caption" color="text.secondary">
                                {post.id}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(post.date).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            ))}
        </Box>
    )
}