import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../types/redux";
import { logout } from "../reducers/auth";

const Profile = () => {
const dispatch = useDispatch<AppDispatch>();
const { isLoading, isError, errorMessage, user } = useSelector((state: RootState) => state.auth);

const handleLogoutClick = () => {
  dispatch(logout());
};

  return (
  <div>
    <h2>Profile</h2>
    <p>Manage your profile info here.</p>
    {
      isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>User Information</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Name:</strong> {user?.name}</p>
          <button onClick={() => handleLogoutClick()}>Logout</button>
        </div>
      )
    }
    {isError && <p style={{ color: 'red' }}>{errorMessage}</p>}
  </div>
)
};

export default Profile;