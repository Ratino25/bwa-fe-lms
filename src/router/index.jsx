import { createBrowserRouter, redirect } from "react-router-dom";
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
import ManageStudentsPage from "../pages/Manager/students";
import StudentPage from "../pages/student/StudentOverview";
import secureLocalStorage from "react-secure-storage";
import { MANAGER_SESSION, STORAGE_KEYS } from "../utils/const";
import { getCategories, getCourse, getCourseDetail, getDetailContent } from "../services/courseService";



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
      id: MANAGER_SESSION,
      loader: async () => {
        const session = secureLocalStorage.getItem(STORAGE_KEYS)        
        if(!session){
          throw redirect('/manager/sign-in');
        }
        return session
      },
      element: <LayoutDashboard/>,
      children: [
        {
          index: true,
          element: <ManagerHomePage/>
        },
        {
          path: '/manager/courses', 
          loader: async () => {
            const data = await getCourse();
            // console.log(data);
            return data;
          },
          element: <ManagerCourses/>
        },
        {
          path: '/manager/courses/create',
          loader: async () => {
            const categories = await getCategories();
            
            return {categories, course: null};
          },
          element: <ManageCreateCoursePage/>
        },
        {
          path: '/manager/courses/edit/:id',
          loader: async ({params}) => {
            const categories = await getCategories();
            const course = await getCourseDetail(params.id);

            console.log(course);
            
            return {categories, course: course?.data};
          },
          element: <ManageCreateCoursePage/>
        },
        {
          path: '/manager/courses/:id',
          loader: async ({params}) => {
            const course = await getCourseDetail(params.id);
            
            return course?.data;
          },
          element: <ManageCourseDetailPage/>
        },
        {
          path: '/manager/courses/:id/create',
          element: <ManageContentCreatePage/>
        },
        {
          path: '/manager/courses/:id/edit/:contentId',
          loader: async ({params}) => {
            const content = await getDetailContent(params.contentId);
            return content?.data;
          },
          element: <ManageContentCreatePage/>
        },
        {
          path: '/manager/courses/:id/preview',
          loader: async ({params}) => {
            const course = await getCourseDetail(params.id, true);
            return course?.data;
          },
          element : <ManageCoursePreviewPage/>
        },
        {
          path: '/manager/students',
        element: <ManageStudentsPage/>
        }
      ]
    },
    {
      path: "/student",
      element: <LayoutDashboard isAdmin = {false}/>,
      children: [
        {
          index: true,
          element : <StudentPage/>
        },
        {
          path: "/student/detail-course/:id",
          element: <ManageCoursePreviewPage/>
        }
      ]
    }
  ]);

export default router;