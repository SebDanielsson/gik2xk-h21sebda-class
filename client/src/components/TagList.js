import { useEffect, useState } from 'react';
import { getAll } from '../models/TagModel';
import Tag from './Tag';

function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAll().then((tags) => setTags(tags));
  }, []);
  return (
    <ul style={{ display: 'flex', gap: '0.3rem' }}>
      {tags &&
        tags.map((tag) => {
          return (
            <li key={`tagId_${tag.id}`}>
              <Tag tagName={tag.name} />
            </li>
          );
        })}
    </ul>
  );
}

export default TagList;
