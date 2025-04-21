
// import { BrowserRouter as Router } from 'react-router-dom';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Jobs from './components/Jobs';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/adminComponents/Companies';
import CompanyNameForm from './components/adminComponents/CompanyNameForm';
import CompanySetup from './components/adminComponents/CompanySetup';
import AdminJobs from './components/adminComponents/JobDashboard';
import JobDashboard from './components/adminComponents/JobDashboard';
import AdminPostJobs from './components/adminComponents/PostJob';
import PostJob from './components/adminComponents/PostJob';
import ApplicantTrackingSystem from './components/adminComponents/ApplicantTrackingSystem';
import ProtectedRoute from './components/adminComponents/ProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';


const appRouter= createBrowserRouter([
  {
    path:"/",
    element:<LandingPage/>
  },
  {
    path:"/signup",
    element:<UserProtectedRoute>

      <Signup/>
    </UserProtectedRoute>
  },
  {
    path:"/login",
    element:<UserProtectedRoute>

      <Login/>
    </UserProtectedRoute>
  },
  
  {
    path:"/jobs",
    element:<Jobs/>
  },
  
  {
    path:"/browse",
    element:<Browse/>
  },
  ,
  
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  //admin related routes
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/company/create",
    element:<ProtectedRoute><CompanyNameForm/></ProtectedRoute>
    
  }
  ,
  {
    path:"/admin/company/update/:id", 
    element:<ProtectedRoute>
      <CompanySetup/>
    </ProtectedRoute>
  },
  {
    path:"admin/jobs", 
    element:<ProtectedRoute>
      <JobDashboard/>
    </ProtectedRoute>
  },{
    path:"/admin/jobs/post",
    element:<ProtectedRoute>
      <PostJob/>
    </ProtectedRoute>
  },
  {
    path:"/admin/jobs/applications/:id",
    element:<ProtectedRoute>
      <ApplicantTrackingSystem/>
    </ProtectedRoute>
  }
])

function App() {
  return (
    
      // <LandingPage />
      <RouterProvider router={appRouter}/>
      
   
  );
}
export default App