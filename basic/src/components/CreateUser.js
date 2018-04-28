import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import storageUtil from "../utils/storage";

class AuthForm extends Component {
  state = {
    email: "",
    password: ""
  };
  render() {
    console.log(this.props);
    const { isRegister, error } = this.props;
    return (
      <form
        onSubmit={async e => {
          e.preventDefault();
          const { email, password } = this.state;
          await this.props.onSubmit({
            variables: { email, password }
          });
        }}
      >
        <h1>{isRegister ? `Register User` : `Login User`}</h1>
        <input
          autoFocus
          className="w-100 pa2 mv2 br2 b--black-20 bw1"
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="Email"
          type="text"
          value={this.state.email}
        />
        <input
          autoFocus
          className="w-100 pa2 mv2 br2 b--black-20 bw1"
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="Password"
          type="text"
          value={this.state.password}
        />
        <input
          className={`pa3 bg-black-10 bn ${this.state.text &&
            this.state.title &&
            "dim pointer"}`}
          disabled={!this.state.email || !this.state.password}
          type="submit"
          value={isRegister ? `Register` : `Login`}
        />
        {error && `Errore`}
      </form>
    );
  }
}

class CreateUser extends Component {
  render() {
    const isRegister = this.props.location.pathname === "/register";
    return (
      <div className="pa4 flex justify-center bg-white">
        {isRegister ? (
          <a
            className="f6 pointer"
            onClick={() => this.props.history.replace("/login")}
          >
            Login
          </a>
        ) : (
          <a
            className="f6 pointer"
            onClick={() => this.props.history.replace("/register")}
          >
            Register
          </a>
        )}
        <Mutation
          mutation={isRegister ? CREATE_USER_MUTATION : LOGIN_USER_MUTATION}
          update={(cache, { data }) => {
            const token = data.login ? data.login.token : data.signup.token;
            storageUtil.setAuthToken(token);

            // TODO: set user
          }}
        >
          {(onSubmit, { data, loading, error }) => (
            <AuthForm
              onSubmit={onSubmit}
              error={error}
              isRegister={isRegister}
            />
          )}
        </Mutation>
      </div>
    );
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

const LOGIN_USER_MUTATION = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export default withRouter(CreateUser);
