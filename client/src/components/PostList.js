import { useEffect, useState } from 'react';
import { getAll } from '../models/PostModel';
import PostItemSmall from './PostItemSmall';

function PostList({ pathname }) {
  console.log(pathname);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAll(pathname).then((posts) => setPosts(posts));
  }, [pathname]);

  return (
    <ul>
      {posts &&
        posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => {
            return (
              <li key={`postId_${post.id}`}>
                <PostItemSmall post={post} />
              </li>
            );
          })}
    </ul>
  );
}

export default PostList;
