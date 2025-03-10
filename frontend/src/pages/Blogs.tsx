import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'




const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      console.log("Blogs : ", response.data)
      setAllBlogs(response.data.blogs)
      console.log(allBlogs)
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, [])



  return (
    <>
      <div className='max-w-5xl mx-auto px-4'>

        <div className='flex flex-col space-y-4'>
          {allBlogs.map((blog: any) => (

            <Link to={`http://localhost:5000/blogs/${blog._id}.html`} className='grid grid-cols-12 gap-2 items-start border-b py-6'>
              <div key={blog?.id} className='col-span-8 '>
                  <Link to={``} className='flex items-center justify-start space-x-3 mb-2'>
                    <img
                      src={`${blog.imageUrl}`}
                      alt={''}
                      className='h-11 w-11 object-cover rounded-full aspect-square'
                    />
                    <h1 className='font-semibold text-xl line-clamp-1'>{blog.title}</h1>
                  </Link>
                  <div className='flex flex-col justify-between h-32 mt-4'>
                    <span className='line-clamp-2 text-gray-700 text-[17px]'>Creating a multilingual website with Next.js enhances the user experience and boosts SEO by providing content in native languages. It helps</span>
                     <span className='font-medium'>{blog.createdAt}</span>
                  </div>
                </div>

              <div className='col-span-4 px-6'>
                <img src={`${blog.imageUrl}`} alt="Blog Image" className='aspect-[3/2] object-cover rounded bg-gray-50' />
              </div>
            </Link>

          ))}
        </div>
      </div>

    </>
  )
}

export default Blogs