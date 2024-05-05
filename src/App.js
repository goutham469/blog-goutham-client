import './App.css';
import Login from './components/Login/Login'
import SignIn from './components/SignUp/SignUp'
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import CreatePost from './components/CreatePost/CreatePost';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<Login/>
    },
    {
      path:'Login',
      element:<Login/>
    },
    {
      path:'SignIn',
      element:<SignIn/>
    },
    {
      path:'Main',
      element:<Main/>
    },
    {
      path:'CreatePost',
      element:<CreatePost/>
    }
  ])
  return (
    <div className="App BodyComponent">
      <div className='bodyComp p-5'>
        <RouterProvider router={router}></RouterProvider>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
