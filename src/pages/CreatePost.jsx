import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CreatePost({ isOpen, onClose }) {
  if (!isOpen) return null;


  const [isChecked, setIsChecked] = useState(false); 

  const queryClient = useQueryClient();

  const { name } = useParams();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const formElements = e.target.elements;

    const post = {
      title: formElements.title.value,
      description: formElements.description.value,
      data: formElements.content.value,
      author: name,
      published: isChecked,
    };

    try {
      const response = await axios.post(
        `http://localhost:8081/admin/${name}/posts`,
        post
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


  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  }
  return (
    <>
      <form
        style={{
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: "15px",
          marginBottom: "15px",
          backgroundColor: "lightgrey",
        }}
        onSubmit={handleCreatePost}
      >
        <div className="mb-3">
          <label className="form-label">Create a new post</label>
          <button onClick={onClose} style={{ float: "right" }}>
            x
          </button>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="title"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="description"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="content"
            placeholder="content"
            required
          />
        </div>
        <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch"  checked={isChecked}
        onChange={handleChange}/>
  <label className="form-check-label">The post for publication</label>
</div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </>
  );
}
