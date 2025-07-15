import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_HAIKU_BY_ID = gql`
    query GetHaiku($id: Int!) {
        haiku(id: $id) {
            id
            lines
        }
    }
`;

export default function Haiku() {
    const [randomId, setRandomId] = useState<number>(1);

    // Generate random ID between 1 and 14 (based on your haikus data)
    useEffect(() => {
        const generateRandomId = () => Math.floor(Math.random() * 15) + 1;
        setRandomId(generateRandomId());
    }, []);

    const { data, loading, error } = useQuery(GET_HAIKU_BY_ID, {
        variables: { id: randomId },
        skip: !randomId, // Skip query until we have a random ID
    });

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    Error loading haiku: {error.message}
                </Alert>
            </Box>
        );
    }

    if (!data?.haiku) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="warning">
                    No haiku found
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
        }}> 
            <Box>
                <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.8, fontSize: '1.1rem' }}>
                    {data.haiku.lines.map((line: string, index: number) => (
                        <div key={index}>{line}</div>
                    ))}
                </Typography>
            </Box>
        </Box>
    );
}