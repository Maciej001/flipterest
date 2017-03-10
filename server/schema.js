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

  type Query {
    getPosts(handle: String) : [Post]
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
