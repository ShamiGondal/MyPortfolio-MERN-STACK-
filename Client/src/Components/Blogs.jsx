import React, { useState } from 'react';
import myImg from '../assets/myimg.jpg'
import blogImg from '../assets/React-Native.png'
import { useSearch } from './SearchProvider';
import { useEffect } from 'react';
import { Helmet } from "react-helmet";


function Blogs() {

    const [blogs, setBlogs] = useState([]);
    document.body.style.backgroundColor = "#020617"
    // const localhost = 'http://localhost:4000'
    const localhost = 'https://myportfolio-server-side.onrender.com'

    const { isSearchBoxVisible, setIsPageBlurred } = useSearch();
    useEffect(() => {
        const blurContainer = document.getElementById('blur-container');

        if (blurContainer) {
            if (isSearchBoxVisible) {
                blurContainer.classList.add('blur');
            } else {
                blurContainer.classList.remove('blur');
            }
        }

        return () => {
            if (blurContainer) {
                blurContainer.classList.remove('blur');
            }
        };
    }, [isSearchBoxVisible]);



    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${localhost}/api/getBlogs`);
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            }
        };

        fetchBlogs();
    }, []);

    const truncateDescription = (description, limit) => {
        // Function to limit the number of words in description
        const words = description.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return description;
    };

    return (
        <div id='blur-container'>
            <Helmet>
                <title>Ehtisham Ahmed's Blogs - Explore the Latest Insights</title>
                <meta charset="UTF-8" />
                <meta name="description" content="Discover the latest blogs by Ehtisham Ahmed. Stay updated with insightful articles on various topics." />
                <meta name="keywords" content="Ehtisham Ahmed, blogs, articles, insights, programming, technology, web development" />
                <meta name="author" content="Ehtisham Ahmed Gondal" />

            </Helmet>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5 mt-24 ">
                {blogs.map((blog) => (
                    <a href={blog.websiteURL} className='cursor-pointer ' key={blog._id} target='_blank' rel='noopner' >
                        <div className=" w-full lg:max-w-full lg:flex hover:transform hover:-translate-y-2 transition-transform duration-300  shadow-sm     ">
                            {blog.images.map((image, index) => (
                                <img
                                    key={index}
                                    className="lg:h-auto lg:w-48 flex-none bg-contain rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden w-full h-full object-cover"
                                    title="Mountain"
                                    src={image}
                                    alt={`Blog Image ${index + 1}`}
                                />
                            ))}

                            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-[#020617] rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img className="w-10 h-10 rounded-full mr-4" src={myImg} alt="Avatar of Writer" />
                                        <div className="text-sm">
                                            <p className=" text-white leading-none -mt-2">Ehtisham Ahmed</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="mb-8  space-y-2 ">
                                    <div className="ml-12  mt-[-10px]">
                                        <div className="text-sm text-[#8997ac] md:flex items-center space-x-1 ">
                                            <p className='flex'><svg className="fill-current text-[#aab3c2] w-3 h-3 mr-2 mt-1 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                            </svg>
                                                Members only
                                            </p>
                                            <p className="text-[#9eacc0]"> Feb 1, 2024</p>
                                        </div>
                                    </div>
                                    <div className="text-white font-bold text-xl mb-2 ">{blog.title}</div>
                                    <p className="text-[#9eacc0] text-base">{blog.description}</p>
                                </div>
                                <div className="md:flex items-center justify-between space-y-2">
                                    <div className="flex items-center">
                                        <div className="text-sm flex space-x-2">
                                            <p className="text-[#9eacc0] font-semibold leading-none">.{blog.views} Reads</p>
                                            <p className="text-[#9eacc0] font-semibold leading-none">.{blog.likes} Likes</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1 flex-wrap">
                                        {blog.keyword.map((keyword, index) => (
                                            <span key={index} className='bg-[#0f172a] bg-opacity-85 px-2 text-white rounded-md text-xs p-1'>
                                                #{keyword}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </a>
                ))}

            </div>


        </div>
    );
}

export default Blogs;