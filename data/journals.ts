export interface Journal {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  aiSummary?: string;
}

// In-memory storage for journals (in production this would be a database)
export const journals: Journal[] = [
  {
    id: 1,
    title: "Morning Focus Session",
    content: "Started my day with a 25-minute focus session working on the React components. I found myself getting distracted by notifications, but managed to stay focused for most of the session. Completed the user authentication flow and fixed two small bugs. The morning coffee definitely helped with concentration.",
    userId: "user_demo",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z"
  },
  {
    id: 2,
    title: "Afternoon Deep Work",
    content: "Spent 45 minutes in deep work mode on the database schema design. This was really productive - I was able to map out the entire user journey and identify three key optimization opportunities. No interruptions during this session, which was great. I think the longer session worked better for this type of analytical work.",
    userId: "user_demo",
    createdAt: "2024-01-15T14:30:00Z",
    updatedAt: "2024-01-15T14:30:00Z"
  }
];

// Helper function to add new journal entries
export function addJournal(journal: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>): Journal {
  const newJournal: Journal = {
    ...journal,
    id: Math.max(0, ...journals.map(j => j.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  journals.push(newJournal);
  return newJournal;
}

// Helper function to update journal with AI summary
export function updateJournalSummary(id: number, aiSummary: string): Journal | null {
  const journal = journals.find(j => j.id === id);
  if (journal) {
    journal.aiSummary = aiSummary;
    journal.updatedAt = new Date().toISOString();
    return journal;
  }
  return null;
}