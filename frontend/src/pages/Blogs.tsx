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

            <Link to={`http://localhost:5000/blogs/${blog._id}.html`}>
              <div className='grid grid-cols-12 gap-2 items-start border-b py-6'>
                <div key={blog?._id} className='col-span-8 '>
                  <Link to={`/profile/${blog.author}`}>
                    <div className='flex items-center justify-start space-x-3 mb-2'>
                      <img
                        src={`${blog.authorImage}`}
                        alt={'author profile'}
                        className='h-11 w-11 object-cover rounded-full aspect-square'
                      />
                      <h1 className='text-lg line-clamp-1'>{blog.author}</h1>
                    </div>
                  </Link>
                  <div className='flex flex-col justify-between h-32 mt-2'>
                    <h1 className='text-2xl font-semibold mb-2 line-clamp-1'>{blog.title}</h1>
                    <span className='line-clamp-2 leading-7 text-gray-700 text-[17px] mb-2'>Creating a multilingual website with Next.js enhances the user experience and boosts SEO by providing content in native languages. It helps ashdgsa dasdhsagd sadjsadh gaksghd sadkajsgdasd asjdsagd asdkj</span>
                    <span className='font-medium'>{blog.createdAt}</span>
                  </div>
                </div>


                <div className='col-span-4 px-6'>
                  <img src={`${blog.imageUrl}`} alt="Blog Image" className='aspect-[3/2] object-cover rounded bg-gray-50' />
                </div>
              </div>
            </Link>

          ))}
        </div>
      </div>

    </>
  )
}

export default Blogs