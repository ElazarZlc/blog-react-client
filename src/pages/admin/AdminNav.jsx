import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";

export default function AdminNav() {
  const { name } = useParams();
  const toPosts = `/admin/${name}/posts`
  const toComment = `/admin/${name}/comments`
  const toUsers = `/admin/${name}/users`
  
  return (
    <div className="d-flex dg-dark" style={{height:"100vh", width:"100vw"}}>
      <nav className="sidebar bg-primary">
        <ul
          className="navbar-nav nav-underline ms-auto py-4 py-lg-0 text-center d-flex justify-content-between"
          style={{ width: "250px", height: "100vh" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={toPosts} className="nav-link px-lg-3 py-3 py-lg-4">Posts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={toComment} className="nav-link px-lg-3 py-3 py-lg-4">Comments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={toUsers} className="nav-link px-lg-3 py-3 py-lg-4">Users</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link px-lg-3 py-3 py-lg-4">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin" className="nav-link px-lg-3 py-3 py-lg-4">LogOut</NavLink>
            </li>
          </ul>
        </ul>
      </nav>
      <main className="container">
        {" "}
        <Outlet />
      </main>
    </div>
  );
}
