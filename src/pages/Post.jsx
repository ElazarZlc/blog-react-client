import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`posts/${id}`);
  };
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

  return (
    <li
      className="list-group-item list-group-item-action pt-4 pb-3
       "
      onClick={() => handleClick(post.id)}
      type="buttom"
    >
      <h1
        className="fw-bold mb-3
   "
      >
        {post.title}
      </h1>
      <h3
        className="fw-light mb-4
   "
      >
        {post.description}
      </h3>
      <p className="float-end">{myDate(new Date(post.createdAt))}</p>
    </li>
  );
}
