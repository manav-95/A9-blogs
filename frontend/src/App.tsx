import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop.ts'
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import AddBlog from './pages/AddBlog';
import Navbar from './components/Navbar';
import Followers from './components/Followers.tsx';
import ProfileLayout from './components/Layouts/ProfileLayout.tsx';
import AuthorBlogs from './components/AuthorBlogs.tsx';
import Registration from './pages/Registration.tsx';
import Login from './pages/Login.tsx';


import './App.css'

function App() {


  return (
    <>
      <Router>
        <ScrollToTop />
          <div className=''>
            <Navbar />
          </div>
          <div className='mt-20'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blog/:blogId' element={<BlogDetails />} />
              <Route path='/add-blog' element={<AddBlog />} />
              {/* <Route path='/profile/:authorProfile' element={<ProfilePage />} /> */}
              {/* <Route path='/followers/:authorFollowers' element={<Followers />} /> */}

              <Route path='/profile' element={<ProfileLayout />}>
                <Route index path='/profile/:authorProfile' element={<AuthorBlogs />} />
                <Route path='/profile/:type/:authorProfile' element={<Followers />} />
              </Route>

              {/* Authencation Pages Routes */}
              <Route path='/register' element={<Registration />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
      </Router>

    </>
  )
}

export default App
