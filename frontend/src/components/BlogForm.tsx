import { X } from "lucide-react";
import React, { useState, useEffect } from "react"
import axios from 'axios'

const BlogForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    title: '',
    tags: [] as string[],
  });

  // Handle Tag Input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setFormData({ ...formData, tags: newTags });
      }
      setInputValue("");
    }
  };

  // Remove Tag
  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Title and Tags
    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }
    if (tags.length === 0) {
      alert("Please add at least one tag!");
      return;
    }

    const finalData = { ...formData, tags };
    console.log("Form Data Submitted:", finalData);

    setTags([]);
    setInputValue("");
    setFormData({ title: '', tags: [] })
  }



  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data || blogs);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }




  return (
    <>
      <form onKeyDown={preventEnterSubmit} onSubmit={handleSubmit} className="w-full bg-gray-100 rounded py-4 px-8 mb-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full py-1.5 px-4 mb-2" placeholder="Enter Blog Title" required />
        <input type="text" value={inputValue} onKeyDown={handleKeyDown} onChange={(e) => setInputValue(e.target.value)} className="w-full py-1.5 px-4 mb-2" placeholder="Enter tags" />
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center space-x-2 border border-green-500 pl-4 pr-1 py-1 rounded-full">
              <span className="text-green-500">{tag}</span>
              <button onClick={() => removeTag(index)} className="bg-red-500 py-1 px-1 rounded-full text-white"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <button
            type="submit"
            className={`py-2 px-10 text-white rounded
            ${formData.title.trim() && tags.length > 0
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!formData.title.trim() || tags.length === 0}
          >
            Submit
          </button>
        </div>
      </form>

      <div className="max-w-5xl mx-auto px-4">
        {/* {blogs.map((blog, index) => (
          <div key={index} className="border p-4 my-2">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <div>
              <span className="text-green-500">Tags: {blog.tags.join(", ")}</span>
              <p className="text-sm text-gray-600">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))} */}

        {/* <h1>{blog.title}</h1>
      
        <p>{blog.content}</p>
        <p><strong>Tags:</strong> {blog.tags.join(", ")}</p> */}


      </div>

    </>
  )
}

export default BlogForm
