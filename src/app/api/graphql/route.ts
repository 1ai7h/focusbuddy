import { createSchema, createYoga } from 'graphql-yoga';
import { haikus } from '../../../../data/haikus';

// In-memory storage for posts
let posts: any[] = [];

const typeDefs = /* GraphQL */ `
  type Haiku {
    id: Int!
    lines: [String!]!
  }

  type Post {
    id: Int!
    date: String!
    userId: Int!
    userName: String!
    content: String!
  }

  type Query {
    haikus: [Haiku!]!
    haiku(id: Int!): Haiku
    posts: [Post!]!
  }

  type Mutation {
    createPost(userId: Int!, userName: String!, content: String!): Post!
  }
`;

const resolvers = {
  Query: {
    haikus: () => haikus,
    haiku: (_: any, { id }: { id: number }) =>
      haikus.find(h => h.id === id) || null,
    posts: () => posts,
  },
  Mutation: {
    createPost: (_: any, { userId, userName, content }: any) => {
      const newPost = {
        id: Math.floor(Math.random() * 1000000),
        date: new Date().toISOString(),
        userId,
        userName,
        content,
      };
      posts.push(newPost);
      return newPost;
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

export {
  yoga as GET,
  yoga as POST,
}; 