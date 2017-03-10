import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schema';
import resolvers from './resolvers';
import PostsRepository from './connectors/PostsRepository';
import UsersRepository from './connectors/UsersRepository';
import {Posts} from './collections'
import bodyParser from 'body-parser';


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
  if (Meteor.isServer) {
    const DBPosts = Posts.find().fetch()
    if (!DBPosts.length) {
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
    Users: new UsersRepository(),
  }
},{
  configServer: expressServer => {
    expressServer.use(bodyParser.json({limit: '5mb'}));
  }
});

Accounts.onCreateUser((options, user) => {
  const email = user.emails[0].address;
  const handle = email.substring(0, email.indexOf('@'));
  return Object.assign({}, user, { handle });
});
