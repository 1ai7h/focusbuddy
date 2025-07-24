import { createSchema, createYoga } from 'graphql-yoga';
import { haikus } from '../../../../data/haikus';

const typeDefs = /* GraphQL */ `
  type Haiku {
    id: Int!
    lines: [String!]!
  }

  type Query {
    haikus: [Haiku!]!
    haiku(id: Int!): Haiku
  }
`;

const resolvers = {
  Query: {
    haikus: () => haikus,
    haiku: (_: any, { id }: { id: number }) =>
      haikus.find(h => h.id === id) || null,
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