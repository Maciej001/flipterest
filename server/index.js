import { Meteor } from 'meteor/meteor'
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schema';
import resolvers from './resolvers';
import PostsRepository from './connectors/PostsRepository';


Meteor.startup(() => {
  if (Meteor.isServer) {

  }
})
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

createApolloServer({
  schema: executableSchema,
  context: {
    Posts: new PostsRepository(),
  }
});
