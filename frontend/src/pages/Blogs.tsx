import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const removeHtmlTags = (html: string) => html.replace(/<[^>]+>/g, "");



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

            <a target='_blank' href={`http://localhost:5000/blogs/${blog._id}.html`}>
              <div className='grid grid-cols-12 gap-2 items-start border-b py-6'>
                <div key={blog?._id} className='col-span-8 '>
                  <Link to={`/profile/${blog.authorId}`}>
                    <div className='flex items-center justify-start space-x-3 mb-3'>
                      <img
                        src={`${blog.authorImage}`}
                        alt={'author profile'}
                        className='h-10 w-10 object-cover rounded-xs aspect-square border'
                      />
                      <div className='flex flex-col'>
                        <h1 className='text-xl -mb-1'>{blog.author}</h1>
                        <p>{blog.authorFollowers} Followers</p>
                      </div>
                    </div>
                  </Link>
                  <div className='flex flex-col justify-between max-h-48 mt-2'>
                    <h1 className='text-3xl font-semibold mb-2 line-clamp-2'>{blog.title}</h1>
                    {blog.content && (
                      <span className='line-clamp-2 text-base font-medium leading-7 text-[#242424] opacity-[0.6] text-[17px] mb-2'>
                        {removeHtmlTags(blog.content)}
                      </span>
                    )}

                    <span className='text-[15px] font-medium'><span className='mr-1 text-[#242424] opacity-[0.6]'>Plublished on </span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                      })}</span>
                  </div>
                </div>


                <div className='col-span-4 p-10'>
                  <img src={`${blog.imageUrl}`} alt="Blog Image" className='aspect-[3/2] object-cover rounded-xs bg-gray-50' />
                </div>
              </div>
            </a>

          ))}
        </div>
      </div >

    </>
  )
}

export default Blogs