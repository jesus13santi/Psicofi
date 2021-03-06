import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: View, ...args }) => {
  const {user} = useContext(UserContext);
    const isLoggedIn= !!user
    if (isLoggedIn) {
      return <Route {...args} render={()=><View />} />
    }
    return (
      <Route
        {...args}
        render={({ location }) => (
          <>
            <Redirect to={{ pathname: "/login", state: { form: location } }} />
          </>
        )}
      />
    );



  return <div></div>;
};

export default PrivateRoute;