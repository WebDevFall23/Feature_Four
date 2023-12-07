import React from "react";

/* STATELESS CHILD COMPONENT */
const PostForm = ({ post, onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Title:</label>
        <input
          type="title"
          value={post.title}
          onChange={(e) => onChange(e, "title")}
          required
        /><br />

        <label>Post Content:</label>
        <br />
        <input
          type="content"
          value={post.content}
          style={{ width: '75%', minHeight: '100px' }}
          onChange={(e) => onChange(e, "content")}
          required
        /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
