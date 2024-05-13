import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import CreatePost from "../CreatePost";
import { useState } from "react";
import EditPost from "../EditPost";
import EditButton from "../EditButton";

export default function AdminPosts() {

  const location = useLocation();
  const currentPath = location.pathname;

  const [isCreateOpen, setIsCreateOpen] = useState(false);


  
  const [post, setPost] = useState(null);

  const handleSetPost = (post) => {
      setPost(post)
  }



  const openCreateForm = () => {
    setIsCreateOpen(true);
  };

  const closeCreateForm = () => {
    setIsCreateOpen(false);
  }

  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditForm = () => {
    setIsEditOpen(true);
  };

  const closeEditForm = () => {
    setIsEditOpen(false);
  }

  const myDate = (date) => {
    const today = new Date();
    if (today.getDate() == date.getDate()) {
      return "Today";
    }
    if (today.getDate() - 1 == date.getDate()) {
      return "Yesterday";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return day + "/" + month + "/" + date.getFullYear();
  };
  const posts = useQuery({
    queryKey: ["allPosts"],
    queryFn: () =>
      axios(`http://localhost:8081${currentPath}`).then((res) => res.data),
  });
  console.log(posts.data);


 


  if (posts.isLoading) {
    return <div>Loading...</div>;
  }
  if (posts.isError) {
    console.log(posts.error);
    return <div>Error!</div>;
  }

  return (
    <>
    <CreatePost isOpen={isCreateOpen} onClose={closeCreateForm}/>
    <EditPost isOpen={isEditOpen} onClose={closeEditForm} post={post}/>
    <div className="mt-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Post's Table</h6>
          <button
            type="button"
            className="btn btn-success"
            style={{ marginLeft: "85%", marginTop: "-2%" }} onClick={openCreateForm}
          >
            Add a post
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                <th>Edit</th>
                
                  <th>id</th>
                  <th>title</th>
                  <th>description</th>
                  <th>data</th>

                  <th>author</th>
                  <th>published</th>
                  <th>created at</th>
                </tr>
              </thead>
             
              <tbody>
                {posts.data.map((post, index) => {
                  return (
                    <tr key={index}>
                      <td >{<EditButton openEditForm={openEditForm} handleSetPost={handleSetPost} post={post}/>}</td>
                      <td>{post.id}</td>
                      <td className="text-overflow">{post.title}</td>
                      <td className="text-overflow text-truncate"
                        style={{
                          maxWidth: "200px"
                        }}
                        >{post.description}</td>
                      <td
                        className="text-overflow text-truncate"
                        style={{
                          maxWidth: "200px"
                        }}
                        
                      >
                        {post.data}
                      </td>

                      <td className="text-overflow">{post.author}</td>

                      <td className="text-overflow">
                        {post.published ? "published" : "unpublished"}
                      </td>
                      <td className="text-overflow">{myDate(new Date( post.createdAt))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
