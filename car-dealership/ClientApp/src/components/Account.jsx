import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export const Account = () => {
  const { user, signOut } = useContext(UserContext);
  useEffect(() => {}, [user]);
  return (
    <section id="account">
      <div className="container">
        <div className="row">
          <div className="account__details">
            <h1 className="purple"> Account Details</h1>
            <div>
              Email:
              <span>{user?.email}</span>
            </div>
            <div>
              Name:
              <span>{user?.name}</span>
            </div>
            <div>
              <Link to="/" onClick={signOut}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
