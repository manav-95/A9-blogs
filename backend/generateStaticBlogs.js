import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

import { fileURLToPath } from 'url';

// Resolve `__dirname` since it's not available in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:5000/api/blogs'; // Your backend API

const generateBlogs = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data, typeof data)

    const blogs = Array.isArray(data) ? data : data.blogs;

    if (!Array.isArray(blogs)) {
      throw new Error("Invalid API response: Expected an array");
    }

    const outputDir = path.join(__dirname, 'public', 'blogs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }


    blogs.forEach((blog) => {
      const filePath = path.join(outputDir, `${blog._id}.html`);

     // If the file exists, update it; otherwise, create a new one
     if (fs.existsSync(filePath)) {
      console.log(`Updating: ${blog._id}.html`);
    } else {
      console.log(`Creating: ${blog._id}.html`);
    }

      const blogHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">
        <script src="https://cdn.tailwindcss.com"></script>
          <link rel="icon" type="image/svg+xml" href="${blog.imageUrl}" />
        <link rel="stylesheet" href="blog.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${blog.title}</title>
        <meta name="description" content='${blog.tags}'>
      </head>
      <body>
        <div class="max-w-5xl mx-auto px-4 py-10">
          <h1 class="text-[56px] font-black leading-[66px] tracking-tight text-[#242424] break-words">${blog.title}</h1>
          <div class="flex justify-between items-center space-x-2 my-8">
            <div class="flex justify-start items-center space-x-4">
              <img class="h-16 w-16 rounded-full object-cover object-center" src="${blog.authorImage}" alt="profile image">
              <div class="flex flex-col items-start justify-start -space-y-1">
                <span class="text-2xl font-medium flex items-center gap-x-4">${blog.author}</span>
                <span class="text-base font-medium text-gray-600">${blog.authorFollowers} followers</span>
              </div>
            </div>
            <span class="text-lg font-medium self-end text-gray-800">${blog.createdAt}</span>
          </div>

         <hr class="border">

           <div class="flex justify-center items-center w-full">
          <img class="aspect-[3/2] w-full object-cover bg-gray-50 my-10 rounded-md" src="${blog.imageUrl}" alt="Blog Image" />
          </div>
          <div class="tiptap-editor">
            ${blog.content}
          </div>
        </div>
      </body>
      </html>
      `;

      fs.writeFileSync(path.join(outputDir, `${blog._id}.html`), blogHTML);
    });

    console.log('✅ Static blog pages generated successfully!');
  } catch (error) {
    console.error('Error generating static pages:', error);
  }
};

// Run the function
generateBlogs();

export default generateBlogs;
