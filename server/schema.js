export default `
  scalar Base64EncodedImage
  scalar Date

  type Post {
    _id: ID!
    handle: String!
    imgUrl: String!
    description: String
    createdAt: Date
    likes: [String]
  }

  type Email {
      address: String!
      verified: Boolean!
  }

  type User {
    _id: ID!
    handle: String!
    followees: [String]
    followers: [String]
    emails: [Email]
  }

  type Query {
    getPosts(handle: String) : [Post],
    getUser(handle: String!): User
  }

  type Mutation {
    createPost (
      handle: String
      description: String
      base64ImageData: Base64EncodedImage!
    ): Post!

    addLike (
      userId: String!
      postId: String!
    ): Post!

    follow (
      followee: String!
      follow: Boolean!
    ): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
