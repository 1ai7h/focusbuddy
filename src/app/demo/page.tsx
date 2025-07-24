"use client"

import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from "@mui/material";

const GET_JOURNALS = gql`
  query GetJournals($userId: String!) {
    journals(userId: $userId) {
      id
      title
      content
      createdAt
      aiSummary
    }
  }
`;

const CREATE_JOURNAL = gql`
  mutation CreateJournal($input: CreateJournalInput!) {
    createJournal(input: $input) {
      id
      title
      content
      createdAt
    }
  }
`;

const GENERATE_SUMMARY = gql`
  mutation GenerateJournalSummary($id: Int!) {
    generateJournalSummary(id: $id) {
      id
      aiSummary
    }
  }
`;

export default function JournalsDemoPage() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summaryLoading, setSummaryLoading] = useState<number | null>(null);

  const userId = 'user_demo';

  const { data, loading, error, refetch } = useQuery(GET_JOURNALS, {
    variables: { userId },
  });

  const [createJournal, { loading: creating }] = useMutation(CREATE_JOURNAL, {
    onCompleted: () => {
      setOpen(false);
      setTitle('');
      setContent('');
      refetch();
    }
  });

  const [generateSummary] = useMutation(GENERATE_SUMMARY, {
    onCompleted: () => {
      setSummaryLoading(null);
      refetch();
    },
    onError: () => {
      setSummaryLoading(null);
    }
  });

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    
    createJournal({
      variables: {
        input: {
          title: title.trim(),
          content: content.trim(),
          userId: userId
        }
      }
    });
  };

  const handleGenerateSummary = (journalId: number) => {
    setSummaryLoading(journalId);
    generateSummary({
      variables: { id: journalId }
    });
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>Error loading journals: {error.message}</Alert>;

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Focus Journals
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Journal Entry
        </Button>
      </Box>

      {data?.journals?.map((journal: any) => (
        <Card key={journal.id} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
              <Typography variant="h6" component="h2">
                {journal.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(journal.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              {journal.content}
            </Typography>

            {journal.aiSummary ? (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  🧠 AI Summary:
                </Typography>
                <Typography variant="body2">
                  {journal.aiSummary}
                </Typography>
              </Box>
            ) : (
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => handleGenerateSummary(journal.id)}
                disabled={summaryLoading === journal.id}
                sx={{ mt: 1 }}
              >
                {summaryLoading === journal.id ? (
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                ) : null}
                Generate AI Summary
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      {data?.journals?.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No journal entries yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by creating your first focus session journal entry
            </Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Create First Entry
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>New Journal Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Reflect on your focus session..."
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What went well? What was challenging? What did you accomplish?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={creating || !title.trim() || !content.trim()}
          >
            {creating ? <CircularProgress size={20} /> : 'Save Entry'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}