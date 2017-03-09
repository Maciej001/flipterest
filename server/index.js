import { Meteor } from 'meteor/meteor'
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schema';
import resolvers from './resolvers';
import PostsRepository from './connectors/PostsRepository';
import {Posts} from './collections'

const posts = [
  {handle: 'user-1', imgUrl: 'https://s3.amazonaws.com/flipterest/fernando.jpg', createdAt: new Date(), likes: [], description: 'Fernando presenting his project'},
  {handle: 'user-2', imgUrl: 'https://s3.amazonaws.com/flipterest/lukasz.jpg', createdAt: new Date(), likes: ['user-1', 'user-3'], description: 'Lukasz'},
  {handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/rainey.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Rainey'},
  {handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/tarkan.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Tarkan'},
  {handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/sacha1.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Sacha'},
  {handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/sacha2.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Sacha 2'},
  {handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/sacha3.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Sacha 3'},
  {handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/sacha4.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Sacha 4'},
]

Meteor.startup(() => {
  console.log("starting")
  if (Meteor.isServer) {
    console.log("Server");
    const DBPosts = Posts.find().fetch()
    console.log(`DBPosts.length`, DBPosts.length);
    if (!DBPosts.length) {
      console.log("posts 0 length")
      posts.forEach( post => {
        Posts.insert(post);
      })
    }
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
