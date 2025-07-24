import { createSchema, createYoga } from 'graphql-yoga';
import { haikus } from '../../../../data/haikus';
import { journals, addJournal, updateJournalSummary, Journal } from '../../../../data/journals';
import { generateJournalSummary } from '../../../lib/openai';

const typeDefs = /* GraphQL */ `
  type Haiku {
    id: Int!
    lines: [String!]!
  }

  type Journal {
    id: Int!
    title: String!
    content: String!
    userId: String!
    createdAt: String!
    updatedAt: String!
    aiSummary: String
  }

  input CreateJournalInput {
    title: String!
    content: String!
    userId: String!
  }

  type Query {
    haikus: [Haiku!]!
    haiku(id: Int!): Haiku
    journals(userId: String!): [Journal!]!
    journal(id: Int!): Journal
  }

  type Mutation {
    createJournal(input: CreateJournalInput!): Journal!
    generateJournalSummary(id: Int!): Journal
  }
`;

const resolvers = {
  Query: {
    haikus: () => haikus,
    haiku: (_: any, { id }: { id: number }) =>
      haikus.find(h => h.id === id) || null,
    journals: (_: any, { userId }: { userId: string }) =>
      journals.filter(j => j.userId === userId),
    journal: (_: any, { id }: { id: number }) =>
      journals.find(j => j.id === id) || null,
  },
  Mutation: {
    createJournal: (_: any, { input }: { input: { title: string; content: string; userId: string } }) =>
      addJournal(input),
    generateJournalSummary: async (_: any, { id }: { id: number }) => {
      const journal = journals.find(j => j.id === id);
      if (!journal) {
        throw new Error('Journal not found');
      }
      
      const aiSummary = await generateJournalSummary(journal.content);
      const updatedJournal = updateJournalSummary(id, aiSummary);
      
      if (!updatedJournal) {
        throw new Error('Failed to update journal with summary');
      }
      
      return updatedJournal;
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
});

export async function GET(request: Request) {
  return yoga(request);
}

export async function POST(request: Request) {
  return yoga(request);
} 