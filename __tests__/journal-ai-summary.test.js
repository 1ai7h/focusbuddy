import { journals, addJournal, updateJournalSummary } from '../data/journals';
import { generateJournalSummary } from '../src/lib/openai';

describe('Journal AI Summary Functionality', () => {
  beforeEach(() => {
    // Reset journals to initial state
    journals.length = 0;
    journals.push(
      {
        id: 1,
        title: "Test Focus Session",
        content: "This is a test journal entry about a focus session.",
        userId: "test_user",
        createdAt: "2024-01-15T08:00:00Z",
        updatedAt: "2024-01-15T08:00:00Z"
      }
    );
  });

  test('should create a new journal entry', () => {
    const newJournal = addJournal({
      title: "New Test Entry",
      content: "This is a new test journal entry.",
      userId: "test_user"
    });

    expect(newJournal.id).toBe(2);
    expect(newJournal.title).toBe("New Test Entry");
    expect(newJournal.content).toBe("This is a new test journal entry.");
    expect(newJournal.userId).toBe("test_user");
    expect(newJournal.createdAt).toBeDefined();
    expect(newJournal.updatedAt).toBeDefined();
  });

  test('should update journal with AI summary', () => {
    const updated = updateJournalSummary(1, "AI generated summary for test.");
    
    expect(updated).toBeTruthy();
    expect(updated?.aiSummary).toBe("AI generated summary for test.");
    expect(updated?.updatedAt).toBeDefined();
  });

  test('should generate AI summary for journal content', async () => {
    const testContent = "Had a productive 30-minute session working on React components.";
    const summary = await generateJournalSummary(testContent);
    
    expect(summary).toBeDefined();
    expect(summary).toContain("Demo Summary");
    expect(summary.length).toBeGreaterThan(0);
  });

  test('should return null when updating non-existent journal', () => {
    const updated = updateJournalSummary(999, "Summary for non-existent journal");
    expect(updated).toBeNull();
  });
});