<h1 align="center"><strong>Boilerplate for a Basic Fullstack GraphQL App with React</strong></h1>

<br />

![](https://imgur.com/ousyQaC.png)

<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Basic starter kit for a fullstack GraphQL app with React and Node.js - based on best practices from the GraphQL community.</div>

## Features

* **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
* **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
* **MongoDB:** Uses [Mongoose](http://mongoosejs.com/) as bindings to a local or remote MongoDB database.
* **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground)
* **Extensible**: GraphQL Models are automatically generated from Mongoose schema with [graphql-compose](https://github.com/graphql-compose/graphql-compose)

For a fully-fledged **React & Apollo tutorial**, visit [How to GraphQL](https://www.howtographql.com/react-apollo/0-introduction/). You can more learn about the idea behind GraphQL boilerplates [here](https://blog.graph.cool/graphql-boilerplates-graphql-create-how-to-setup-a-graphql-project-6428be2f3a5).

## Requirements

You need a local or remote [MongoDB](https://www.mongodb.com/) instance to start the server. To configure a remote connection, just take a look at the [connection code](./server/src/db/connection.js) to find which enviroment variables are used.

## Getting started

Copy this repo in your local machine and then install the required dependencies:

```sh
cd react-fullstack-graphql/basic/
yarn install

cd server
yarn install
```

Now you're ready to start the server and the client, just type to run the server:

```sh
yarn start
```

Open another terminal instance to run the client:

```sh
cd react-fullstack-graphql/basic/
yarn start
```

## Contributing

The GraphQL boilerplates are maintained by the GraphQL community, with official support from the [Apollo](https://dev-blog.apollodata.com) & [Graphcool](https://blog.graph.cool/) teams.

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, join the [`#graphql-boilerplate`](https://graphcool.slack.com/messages/graphql-boilerplate) channel on our [Slack](https://graphcool.slack.com/).

This boilerplate has been modified by @andtos90 to use MongoDB with Mongoose instead of Prisma.
