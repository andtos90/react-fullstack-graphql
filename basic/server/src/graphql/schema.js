const {
  composeWithMongoose,
  GraphQLMongoID
} = require("graphql-compose-mongoose");
const { schemaComposer, Resolver } = require("graphql-compose");

const dbSchema = require("../db/schema");
const authMutation = require("./mutation/auth");

const UserTC = composeWithMongoose(dbSchema.User);
const PostTC = composeWithMongoose(dbSchema.Post);

schemaComposer.rootQuery().addFields({
  postById: PostTC.getResolver("findById"),
  postByIds: PostTC.getResolver("findByIds"),
  postOne: PostTC.getResolver("findOne"),
  postMany: PostTC.getResolver("findMany"),
  postCount: PostTC.getResolver("count"),
  feed: new Resolver({
    name: "feed",
    type: [PostTC],
    resolve: async ({ args, context }) => {
      const posts = await context.db.Post.find({ isPublished: true }).exec();
      return posts;
    }
  }),
  drafts: new Resolver({
    name: "drafts",
    type: [PostTC],
    resolve: async ({ args, context }) => {
      const posts = await context.db.Post.find({ isPublished: false }).exec();
      return posts;
    }
  })
});

schemaComposer.rootMutation().addFields({
  signup: new Resolver({
    name: "signup",
    type: schemaComposer.getOrCreateTC("RegisteredUser", t => {
      t.addFields({
        token: {
          name: "token",
          type: "String"
        },
        user: {
          name: "user",
          type: UserTC
        }
      });
    }),
    args: {
      email: {
        name: "email",
        type: "String"
      },
      password: {
        name: "password",
        type: "String"
      }
    },
    resolve: authMutation.signup
  }),
  login: new Resolver({
    name: "login",
    type: schemaComposer.getOrCreateTC("RegisteredUser", t => {
      t.addFields({
        token: {
          name: "token",
          type: "String"
        },
        user: {
          name: "user",
          type: UserTC
        }
      });
    }),
    args: {
      email: {
        name: "email",
        type: "String"
      },
      password: {
        name: "password",
        type: "String"
      }
    },
    resolve: authMutation.login
  })
});

schemaComposer.rootMutation().addFields({
  postCreate: PostTC.getResolver("createOne"),
  postUpdateById: PostTC.getResolver("updateById"),
  postUpdateOne: PostTC.getResolver("updateOne"),
  postUpdateMany: PostTC.getResolver("updateMany"),
  postRemoveById: PostTC.getResolver("removeById"),
  postRemoveOne: PostTC.getResolver("removeOne"),
  postRemoveMany: PostTC.getResolver("removeMany"),
  postPublish: new Resolver({
    name: "postPublish",
    type: "UpdateOnePostPayload",
    args: {
      _id: {
        name: "_id",
        type: GraphQLMongoID
      }
    },
    resolve: async ({ args, context }) => {
      const post = await context.db.Post.findOne({ _id: args._id }).exec();
      if (post) {
        post.set({ isPublished: true });
        await post.save();
      }
      if (post) {
        return {
          record: post,
          recordId: post._id
        };
      }

      return null;
    }
  })
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;
