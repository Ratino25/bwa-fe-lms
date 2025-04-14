import { createBrowserRouter } from "react-router-dom";
// import ManagerHomePage from "../pages/ManagerHomePage";
import ManagerHomePage from "../pages/Manager/home";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import SuccessCheckoutPage from "../pages/SuccessCheckout";
import LayoutDashboard from "../components/layout";
import ManagerCourses from "../pages/Manager/courses";



const router = createBrowserRouter([
    {
      path : "/",
      element : <ManagerHomePage/>
    },
    {
      path : "/manager/sign-in",
      element : <SignInPage/>
    },
    {
      path: "/manager/sign-up",
      element : <SignUpPage/>
    },
    {
      path: "/success-checkout",
      element: <SuccessCheckoutPage/>
    },
    {
      path: "/manager",
      element: <LayoutDashboard/>,
      children: [
        {
          index: true,
          element: <ManagerHomePage/>
        },
        {
          path: '/manager/courses',
          element: <ManagerCourses/>
        }
      ]
    }
  ]);

export default router;