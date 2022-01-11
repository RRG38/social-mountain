import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    let promise = axios.get("https://practiceapi.devmountain.com/api/posts");
    promise
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updatePost(id, text) {
    const newPost = {
      id: id,
      text: text,
    };
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, newPost)
      .then(({ data }) => {
        this.setState({ posts: data });
      })
      .catch((err) => console.log(err));
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(({ data }) => {
        this.setState({ posts: data });
      })
      .catch((err) => console.log(err));
  }

  createPost() {}

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose />

          {posts.map((post) => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              id={post.id}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
