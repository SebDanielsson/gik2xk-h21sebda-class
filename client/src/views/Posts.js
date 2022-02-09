import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostModel from '../models/PostsModel';
export default function Posts() {
  const postModel = new PostModel('posts');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postModel.getAll().then((posts) => {
      setPosts(posts);
    });
  }, []);
  console.log(posts);
  return (
    <ul>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <li key={`post_${post.id}`}>
              <Link to={`/users/${post.author.id}/posts`}>
                Författare: {post.author.username}
              </Link>
              <br />
              <img
                src={post.imageUrl}
                style={{ width: '200px', height: '200px' }}
              />
              <p>
                <Link to={`/posts/${post.id}`}>Titel: {post.title}</Link>
              </p>
              <p>Skrivet: {post.createdAt}</p>
              {post.body}
            </li>
          );
        })}
    </ul>
  );
}
