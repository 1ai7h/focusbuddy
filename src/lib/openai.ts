import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-dev',
});

export async function generateJournalSummary(content: string): Promise<string> {
  try {
    // If no API key is provided, return a mock summary for development
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key-for-dev') {
      return `[Demo Summary] This journal entry shows good focus patterns with ${content.split(' ').length} words of reflection. Key themes: productivity, focus management, and self-awareness.`;
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that helps analyze focus and productivity journal entries. Provide concise, insightful summaries that highlight patterns, achievements, and areas for improvement. Keep summaries under 100 words and focus on actionable insights.'
        },
        {
          role: 'user',
          content: `Please analyze this focus session journal entry and provide a helpful summary:\n\n${content}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'Unable to generate summary.';
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return 'Error generating summary. Please try again later.';
  }
}