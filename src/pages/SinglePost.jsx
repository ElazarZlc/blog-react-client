import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Comment from "./Comment";
import GetAPost from "./GetAPost";

export default function SinglePost() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading: commentsIsLoading,
    isError: commentsIsError,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () =>
      axios(`http://localhost:8081/posts/${id}/comments`).then(
        (res) => res.data
      ),
  });

  const handlePostComment = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const comment = {
      name: formElements.name.value,
      data: formElements.comment.value,
      postId: id,
    };
    formElements.name.value = "";
    formElements.comment.value = "";

    try {
      const response = await axios.post(
        "http://localhost:8081/comments",
        comment
      );
      if (response.status === 201) {
        queryClient.invalidateQueries("comments");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }

    e.target.value = "";
  };

  if (commentsIsLoading) {
    return <div>Loading...</div>;
  }

  if (commentsIsError) {
    console.log(postError || commentsError);
    return <div>Error!</div>;
  }

  return (
    <>
      <GetAPost id={id} />
      <form
        style={{
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: "15px",
          marginBottom: "15px",
          backgroundColor: "lightgrey",
        }}
        onSubmit={handlePostComment}
      >
        <div className="mb-3">
          <label className="form-label">Your comment</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Your name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="comment"
            placeholder="The comment"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
      <h1 style={{ textAlign: "center", color: "navy" }}>Comments</h1>
      <ul>
        {comments
          .slice()
          .reverse()
          .map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
      </ul>
    </>
  );
}
