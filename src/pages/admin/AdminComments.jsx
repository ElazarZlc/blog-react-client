import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import DeleteComment from "./DeleteComment";

export default function AdminComments() {

  const location = useLocation();
  const currentPath = location.pathname;



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

     


  
  const comments = useQuery({
    queryKey: ["allComments"],
    queryFn: () =>
      axios(`http://localhost:8081${currentPath}`).then((res) => res.data),
  });
  console.log(comments.data);


 


  if (comments.isLoading) {
    return <div>Loading...</div>;
  }
  if (comments.isError) {
    console.log(comments.error);
    return <div>Error!</div>;
  }

  return (
    <>
    <div className="mt-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Comments's Table</h6>
          
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
                <th>Delete</th>
                
                  <th>post id</th>
                  <th>name</th>
                  
                  <th>data</th>

                 
                  <th>created at</th>
                </tr>
              </thead>
             
              <tbody>
                {comments.data.map((comment, index) => {
                  return (
                    <tr key={index}>
                      <td>{<DeleteComment id={comment.id}/>}</td>
                      <td>{comment.postId}</td>
                      <td className="text-overflow">{comment.name}</td>

                      <td
                        className="text-overflow text-truncate"
                        style={{
                          maxWidth: "200px"
                        }}
                        
                      >
                        {comment.data}
                      </td>
                     
                      <td className="text-overflow">{myDate(new Date (comment.createdAt))}</td>
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
