export default `
  type Post {
    _id: ID!
    handle: String!
    imgUrl: String!
    description: String
    likes: [String]
  }

  type Query {
    getPosts(handle: String) : [Post]
  }

  type Mutation {
    createPost (
      handle: String!
      imgUrl: String!
      description: String
    ): Post

  }
  schema {
    query: Query
    mutation: Mutation
  }
`;
