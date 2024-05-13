import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditPost({ isOpen, onClose, post}) {
  if (!isOpen) return null;

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [data, setData] = useState(post.data);

  const [isChecked, setIsChecked] = useState(post.published);

  const queryClient = useQueryClient();

  const { name } = useParams();

  const handleEditPost = async (e) => {
    e.preventDefault();

    const formElements = e.target.elements;
    console.log("isChecked ", isChecked);
    const newPost = {
      title: formElements.title.value,
      description: formElements.description.value,
      data: formElements.content.value,
      author: post.author,
      published: isChecked,
    };

    try {
      const response = await axios.put(
        `http://localhost:8081/admin/${name}/posts/${post.id}`,
        newPost
      );
      if (response.status === 201) {
        

        queryClient.invalidateQueries("allPosts");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }

    e.target.value = "";
    onClose();
  };


  const deletePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:8081/admin/${name}/posts/${post.id}`);
      if (response.status === 204) {
        queryClient.invalidateQueries("allPosts");
      } else {
        console.error('Error deleting post:', response.data);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <>
    
      <form
        style={{
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: "15px",
          marginBottom: "15px",
          backgroundColor: "lightblue",
        }}
        onSubmit={handleEditPost}
      >
        <div className="mb-3">
          <label className="form-label">Edit the post</label>
          <button onClick={onClose} style={{ float: "right" }}>
            x
          </button>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.value);
            }}
            placeholder="title"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.value);
            }}
            placeholder="description"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="content"
            value={data}
            onChange={(e) => {
              setData(e.value);
            }}
            placeholder="content"
            required
          />
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={isChecked}
            onChange={handleChange}
          />
          <label className="form-check-label">The post for publication</label>
        </div>
        <div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
        <button style={{backgroundColor: "red", marginLeft: "50%"}} onClick={deletePost}>Delete post</button>
        </div>
      </form>
    </>
  );
}
