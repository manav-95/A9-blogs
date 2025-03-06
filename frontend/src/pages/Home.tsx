import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

import About from '../components/About'

import { FaArrowRightLong } from "react-icons/fa6";

import Banner1 from '/banner-1.jpg'
import Banner2 from '/banner-2.jpg'
import ProjectsDoneSection from "../components/ProjectsDoneSection";

const blogBanners = [
  { id: "0", authorName: 'Jhon Doe', createdAt: 'Feb 27, 2025', image: Banner1, heading: 'The MongoDB Mistake That’s Costing Your Startup Millions 🚀', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
  { id: "1", authorName: 'Jhon Doe', createdAt: 'Feb 27, 2025', image: Banner2, heading: 'Top 10 Best React Libraries You Should Try in 2025', smallDescription: 'Hey there, fellow developers! I’m Sachin, and today I want to share some of my favorite React component libraries that can make your development process smoother and more efficient. Whether you’re building dashboards,', },
]
const Home = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex flex-col">

          <div className="flex justify-between items-center my-4">
            <h1 className="text-3xl uppercase font-semibold">Feature Blogs</h1>
            <button onClick={() => navigate(`/blogs`)}
              
              className="flex items-center py-1 px-4 border-2 border-black hover:bg-black hover:text-white rounded transition-all duration-100"
            >
              <span>More Blogs</span>
              <FaArrowRightLong className="h-4 w-4 ml-2 flex-shrink-0" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {blogBanners.map((banner, index) => (
              <button onClick={() => navigate(`/blog/${banner.heading}`)} key={index} className="">
                <div>
                  {loading && (
                    <div className=" bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
                  )}
                  <img
                    src={banner.image}
                    alt="blog images"
                    className="aspect-[3/2] rounded object-cover"
                    onLoad={() => setLoading(false)}
                  />
                </div>
                <div className="">
                  <span className="tracking-wide text-xl font-semibold text-gray-800 line-clamp-2 leading-6 uppercase mt-4">{banner.heading}</span>
                </div>
              </button>
            ))}
          </div>

        </div>

        <About />
        <ProjectsDoneSection />

      </div>
    </>
  )
}

export default Home