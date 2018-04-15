import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { DRAFTS_QUERY } from "./DraftsPage";
import { FEED_QUERY } from "./FeedPage";

class DetailPage extends Component {
  render() {
    return (
      <Query query={POST_QUERY} variables={{ _id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            );
          }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occured.</div>
              </div>
            );
          }

          const post = data.postById;
          const action = post && this._renderAction(post);
          return (
            <div>
              {post && (
                <Fragment>
                  <h1 className="f3 black-80 fw4 lh-solid">{post.title}</h1>
                  <p className="black-80 fw3">{post.text}</p>
                  {action}
                </Fragment>
              )}
            </div>
          );
        }}
      </Query>
    );
  }

  _renderAction = ({ _id, isPublished }) => {
    const publishMutation = (
      <Mutation
        mutation={PUBLISH_MUTATION}
        update={(cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY });
          const { feed } = cache.readQuery({ query: FEED_QUERY });
          cache.writeQuery({
            query: FEED_QUERY,
            data: { feed: feed.concat([data.postPublish.record]) }
          });
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: {
              drafts: drafts.filter(
                draft => draft._id !== data.postPublish.record._id
              )
            }
          });
        }}
      >
        {(publish, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await publish({
                  variables: { _id }
                });
                this.props.history.replace("/");
              }}
            >
              Publish
            </a>
          );
        }}
      </Mutation>
    );
    const deleteMutation = (
      <Mutation
        mutation={DELETE_MUTATION}
        update={(cache, { data }) => {
          if (isPublished) {
            const { feed } = cache.readQuery({ query: FEED_QUERY });
            cache.writeQuery({
              query: FEED_QUERY,
              data: {
                feed: feed.filter(
                  post => post._id !== data.postRemoveById.record._id
                )
              }
            });
          } else {
            const { drafts } = cache.readQuery({ query: DRAFTS_QUERY });
            cache.writeQuery({
              query: DRAFTS_QUERY,
              data: {
                drafts: drafts.filter(
                  draft => draft._id !== data.postRemoveById.record._id
                )
              }
            });
          }
        }}
      >
        {(deletePost, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await deletePost({
                  variables: { _id }
                });
                this.props.history.replace("/");
              }}
            >
              Delete
            </a>
          );
        }}
      </Mutation>
    );
    if (!isPublished) {
      return (
        <Fragment>
          {publishMutation}
          {deleteMutation}
        </Fragment>
      );
    }
    return deleteMutation;
  };
}

const POST_QUERY = gql`
  query PostQuery($_id: MongoID!) {
    postById(_id: $_id) {
      _id
      title
      text
      isPublished
    }
  }
`;

const PUBLISH_MUTATION = gql`
  mutation PublishMutation($_id: MongoID!) {
    postPublish(_id: $_id) {
      record {
        _id
        title
        text
        isPublished
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteMutation($_id: MongoID!) {
    postRemoveById(_id: $_id) {
      record {
        _id
      }
    }
  }
`;

export default withRouter(DetailPage);
