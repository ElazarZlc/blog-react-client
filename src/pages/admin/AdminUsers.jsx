


  import { useQuery } from "@tanstack/react-query";
  import axios from "axios";
  import { useLocation, useParams } from "react-router-dom";
import DeleteUser from "./DeleteUser";
  
  export default function AdminUsers() {
  
    const location = useLocation();
    const currentPath = location.pathname;
  
  
  
    
  
       
  
  
    
    const users = useQuery({
      queryKey: ["allUsers"],
      queryFn: () =>
        axios(`http://localhost:8081${currentPath}`).then((res) => res.data),
    });
    console.log(users.data);
  
  
   
  
  
    if (users.isLoading) {
      return <div>Loading...</div>;
    }
    if (users.isError) {
      console.log(users.error);
      return <div>Error!</div>;
    }
  
    return (
      <>
      <div className="mt-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">users's Table</h6>
            
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
                  
                   
                    <th>name</th>
                    
                 
  
                   
                    <th>password</th>
                  </tr>
                </thead>
               
                <tbody>
                  {users.data.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{<DeleteUser id={user.name}/>}</td>
                        <td>{user.name}</td>
                       
                       
                        <td className="text-overflow">{user.password}</td>
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
  