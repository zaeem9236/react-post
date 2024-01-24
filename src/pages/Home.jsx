import { useSelector, useDispatch } from "react-redux"
import { login as authSlice } from "../redux/slices/authSlice";
import { authService } from "../appwrite/auth";

const Home = () => {
  // const loggedIn = authService.getCurrentUser()
  // .then(dd=> console.log('e', dd))

  return <div> 
    I am Home page
    {/* <h1>{JSON.stringify (loggedIn)}</h1> */}
    </div>;
};
export default Home;

