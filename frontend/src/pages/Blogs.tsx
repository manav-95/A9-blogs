import { Link } from 'react-router-dom'
import BlogImage from '/banner-1.jpg'
import ProfileImage from '/profile-example-2.png'


const blogs = [
  { id: "0", authorName: 'Jhon Doe0', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'The MongoDB Mistake That’s Costing Your Startup Millions 🚀', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
  { id: "1", authorName: 'Jhon Doe1', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'Top 10 Best React Libraries You Should Try in 2025', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
  { id: "2", authorName: 'Jhon Doe2', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'React 19: Goodbye to Old Features, Hello to the Future', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
  { id: "3", authorName: 'Jhon Doe3', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'Advanced React Patterns and Best Practices', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
  { id: "4", authorName: 'Jhon Doe4', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'Express.js Secrets That Senior Developers Don’t Share', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
  { id: "5", authorName: 'Jhon Doe5', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: 'My Favourite Software Architecture Patterns', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
  { id: "6", authorName: 'Jhon Doe6', profileImage: ProfileImage, createdAt: 'Feb 27, 2025', image: BlogImage, heading: '10 Expert Performance Tips Every Senior JS React Developer Should Know', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
]

const Blogs = () => {
  return (
    <>
      <div className='max-w-5xl mx-auto px-4'>

        <div className='flex flex-col space-y-4'>
          {blogs.map((blog) => (

            <Link to={`/blog/${blog?.heading}`} className='grid grid-cols-12 gap-2 items-start border-b py-6'>
              <div className='col-span-8 pl-6'>
                <div
                  key={blog.id}
                  className='pt-0'
                >
                  <Link to={`/profile/${blog.authorName}`} className='flex items-center justify-start space-x-3 mb-2'>
                    <img
                      src={blog.profileImage}
                      alt={blog.authorName}
                      className='h-8 w-8 object-cover rounded-sm aspect-square'
                    />
                    <h1 className='font-medium text-lg'>{blog.authorName}</h1>
                  </Link>
                  <h1 className='text-3xl font-semibold mb-5'>{blog.heading}</h1>
                  <span className='line-clamp-2 text-gray-700 text-lg mb-4'>{blog.smallDescription}</span>
                  <span className='font-medium'>{blog.createdAt}</span>
                </div>


              </div>

              <div className='col-span-4 px-6'>
                <img src={blog.image} alt="Blog Image" className='aspect-[3/2] object-contain' />
              </div>
            </Link>

          ))}
        </div>
      </div>

    </>
  )
}

export default Blogs