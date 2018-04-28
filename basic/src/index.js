import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import FeedPage from "./components/FeedPage";
import DraftsPage from "./components/DraftsPage";
import CreatePage from "./components/CreatePage";
import CreateUser from "./components/CreateUser";
import DetailPage from "./components/DetailPage";

import storageUtil from "./utils/storage";

import "tachyons";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = storageUtil.getAuthToken();
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
    }
    if (networkError) {
    }
  },
  clientState: {
    defaults: {
      isConnected: true
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } });
          return null;
        }
      }
    }
  }
});

// TODO: handle logout
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <nav className="pa3 pa4-ns">
          <Link
            className="link dim black b f6 f5-ns dib mr3"
            to="/"
            title="Feed"
          >
            Blog
          </Link>
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/"
            title="Feed"
          >
            Feed
          </NavLink>
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/drafts"
            title="Drafts"
          >
            Drafts
          </NavLink>
          <Link
            to="/create"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            + Create Draft
          </Link>
          <Link
            to="/login"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            Login/Register
          </Link>
        </nav>
        <div className="fl w-100 pl4 pr4">
          <Switch>
            <Route exact path="/" component={FeedPage} />
            <Route path="/drafts" component={DraftsPage} />
            <Route path="/create" component={CreatePage} />
            <Route path="/register" component={CreateUser} />
            <Route path="/login" component={CreateUser} />
            <Route path="/post/:id" component={DetailPage} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
