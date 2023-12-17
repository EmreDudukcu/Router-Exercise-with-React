import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Error404 from "./Error404";

function User() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error("User not found!");
          setUser(null);
        } else {
          console.error("Unknown error:", error.message);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      {user ? (
        <div>
          <h1>User Detail</h1>
          {loading && <div>Loading...</div>}
          {!loading && (
            <div>
              <div>
                <h6>Name:</h6> {user.name}
              </div>
              <div>
                <h6>User Name:</h6> {user.username}
              </div>
              <div>
                <h6>Email:</h6> {user.email}
              </div>
              <div>
                <h6>Phone Number:</h6> {user.phone}
              </div>
              <div>
                <h6>Website:</h6> {user.website}
              </div>
            </div>
          )}
          <br />
          <br />
          {id <= 10 && id > 1 && (
            <Link to={`/user/${parseInt(user.id) - 1}`}>Prev</Link>
          )}
          <br />
          {id < 10 && id >= 1 && (
            <Link to={`/user/${parseInt(user.id) + 1}`}>Next</Link>
          )}
        </div>
      ) : (
        <Error404 />
      )}
    </div>
  );
}

export default User;
