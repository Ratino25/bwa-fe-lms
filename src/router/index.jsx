import { createBrowserRouter } from "react-router-dom";
// import ManagerHomePage from "../pages/ManagerHomePage";
import ManagerHomePage from "../pages/Manager/home";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import SuccessCheckoutPage from "../pages/SuccessCheckout";
import LayoutDashboard from "../components/layout";
import ManagerCourses from "../pages/Manager/courses";
import ManageCreateCoursePage from "../pages/Manager/create-courses";
import ManageCourseDetailPage from "../pages/Manager/course-detail";
import ManageContentCreatePage from "../pages/Manager/course-content-create";
import ManageCoursePreviewPage from "../pages/Manager/course-preview";



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
        },
        {
          path: '/manager/courses/create',
          element: <ManageCreateCoursePage/>
        },
        {
          path: '/manager/courses/:id',
          element: <ManageCourseDetailPage/>
        },
        {
          path: '/manager/courses/:id/create',
          element: <ManageContentCreatePage/>
        },
        {
          path: '/manager/courses/:id/preview',
          element : <ManageCoursePreviewPage/>
        }
      ]
    }
  ]);

export default router;