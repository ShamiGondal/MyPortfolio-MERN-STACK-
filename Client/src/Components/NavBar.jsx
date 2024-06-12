import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import myimg from '../assets/myimg.jpg';
import { useSearch } from './SearchProvider';

function NavBar() {
    // State variables
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    // React Router hooks
    const location = useLocation();
    const navigate = useNavigate();

    // Search provider hooks
    const { isSearchBoxVisible, setIsSearchBoxVisible, isPageBlurred, setIsPageBlurred } = useSearch();

    // API base URL
    // const localhost = 'http://localhost:4000';
    const localhost = import.meta.env.VITE_REACT_APP_API_URL;

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close mobile menu
    const closeMenu = () => {
        setIsOpen(false);
    };

    // Handle input change for search
    const onChange = async (e) => {
        setValue(e.target.value);


        try {
            // Fetch projects data
            const projectsResponse = await fetch(`${localhost}/api/getProjects`);
            if (!projectsResponse.ok) {
                throw new Error(`HTTP error! Status: ${projectsResponse.status}`);
            }
            const projectsData = await projectsResponse.json();

            // Fetch blogs data
            const blogsResponse = await fetch(`${localhost}/api/getBlogs`);
            if (!blogsResponse.ok) {
                throw new Error(`HTTP error! Status: ${blogsResponse.status}`);
            }
            const blogsData = await blogsResponse.json();

            // Combine and filter data from both endpoints
            const allData = [...projectsData, ...blogsData];
            const filteredData = allData
                .filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
                .map(({ _id, title }) => ({ _id, title }));

            setData(filteredData);
            setShowSuggestions(filteredData.length > 0);

            if (!e.target.value) {
                setShowSuggestions(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    // State for projects and blogs
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);

    // Fetch projects on component mount
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${localhost}/api/getProjects`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const projectsData = await response.json();
                setProjects(projectsData || []);
            } catch (error) {
                console.error('Error fetching project data:', error.message);
            }
        };

        fetchProjects();
    }, []);

    // Fetch blogs on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsResponse = await fetch(`${localhost}/api/getBlogs`);
                if (!blogsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${blogsResponse.status}`);
                }
                const blogsData = await blogsResponse.json();
                setBlogs(blogsData || []);
            } catch (error) {
                console.error('Error fetching blog data:', error.message);
            }
        };

        fetchBlogs();
    }, []);

    // Handle suggestion click
    const handleSuggestionClick = async (itemId, e) => {
        e.preventDefault(); // Prevent the default behavior of the click event

        const selectedProject = projects.find((project) => project.title.toLowerCase() === itemId.toLowerCase());
        if (selectedProject) {
            setSelectedSuggestion(selectedProject);

            const { slug } = selectedProject;
            if (slug) {
                navigate(`/projects/${slug}`);
                setValue('');
                setShowSuggestions(false);
                setSelectedSuggestion(null); // Clear selected suggestion after navigation
            }
        }

        const selectedBlog = blogs.find((blog) => blog.title.toLowerCase() === itemId.toLowerCase());
        if (selectedBlog) {
            // Open the blog's websiteURL in a new tab
            window.open(selectedBlog.websiteURL, '_blank');
        }

    };

    // Handle Enter key press and arrow key navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Treat Enter key as click
            if (selectedSuggestion) {
                const { slug } = selectedSuggestion;
                if (slug) {
                    navigate(`/projects/${slug}`);
                    setValue('');
                    setShowSuggestions(false);
                    setSelectedSuggestion(null);
                }
            }
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();

            const totalSuggestions = data.length;
            const direction = e.key === 'ArrowDown' ? 1 : -1;
            let nextIndex = focusedIndex + direction;
            nextIndex = (nextIndex + totalSuggestions) % totalSuggestions;
            setFocusedIndex(nextIndex);
        }
    };

    // Close the search box when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isSearchInput = event.target.closest('#search-input');
            const isSearchButton = event.target.closest('.fa-magnifying-glass');
            const isSuggestion = event.target.closest('.dropdown');

            if (!isSearchInput && !isSearchButton && !isSuggestion && isSearchBoxVisible) {
                closeSearchBox();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isSearchBoxVisible]);

    // Close mobile menu on route change
    useEffect(() => {
        closeMenu();
    }, [location]);

    // State for showing/hiding search box
    const [searchBoxVisible, setSearchBoxVisible] = useState(false);

    // Toggle search box visibility
    const toggleSearchBox = () => {
        setIsSearchBoxVisible(!searchBoxVisible);
        setIsPageBlurred(!isPageBlurred);
        setValue('');
        setShowSuggestions(false);
    };

    // Close search box
    const closeSearchBox = () => {
        setIsSearchBoxVisible(false);
        setIsPageBlurred(false);
        setValue('');
        setShowSuggestions(false);
    };

    const renderPredefinedLinks = () => {
        if (value) {
            // Don't render predefined links if there is any input
            return null;
        }

        else {
            return (

                <>
                    <div className="bg-slate-800 p-2 ">
                        <Link to='/Coding' className='text-white text-xl text-font-extralight italic  '><i class="fa-solid fa-turn-down"></i>  Coding Projects </Link>
                    </div>
                    <hr className='bg-white h-1' />
                    <div className="bg-slate-800 p-2 ">
                        <Link to='/Designs' className='text-white text-xl text-font-extralight italic '><i class="fa-solid fa-turn-down"></i>  Designing Projects </Link>
                    </div>
                    <hr className='bg-white h-1' />
                    <div className="bg-slate-800 p-2 ">
                        <Link to='/Blogs' className='text-white text-xl text-font-extralight italic '><i class="fa-solid fa-turn-down"></i> Mine Blogs </Link>
                    </div>
                    <hr className='bg-white h-1' />
                </>
            );
        }

    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title className="text-xs">Shami's Portfolio - Landing Page | MERN Stack, Game, C++, & React Native Developer</title>
                <meta charset="UTF-8" />
                <meta
                    name="description"
                    content="Elevate your digital presence with Shami Ahmed Gondal, a versatile developer skilled in crafting modern web and mobile experiences. Explore my portfolio to discover how I leverage cutting-edge technologies to meet your needs, or contact me today to discuss your project!"
                />
                <meta
                    name="keywords"
                    content="mern stack developer, game developer, cpp developer, react native developer, frontend developer, backend developer, full stack developer, javascript developer, web developer, mobile developer, portfolio, hire developer, freelance developer"
                />
                <meta name="author" content="Ehtisham Ahmed Gondal" />
            </Helmet>
            <div className="">
                <div className="">
                    <nav className="py-2 bg-[#1f2937] fixed-top   ">
                        <div className="container mx-auto flex justify-between items-center">
                            <div className="flex space-x-14 md:space-x-9 sm:hidden hidden lg:block md:block">
                                <Link
                                    to="/"
                                    className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid  p-2 hover:rounded transition-all ${location.pathname === '/' ? 'bg-[#111827] p-2' : ''
                                        }`}
                                >
                                    DashBoard
                                </Link>
                                <Link
                                    to="/Coding"
                                    className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid  p-2 hover:rounded transition-all ${location.pathname === '/Coding' ? 'bg-[#111827] p-2' : ''
                                        }`}
                                >
                                    Coding
                                </Link>
                                <Link
                                    to="/Designs"
                                    className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid  p-2 hover:rounded transition-all ${location.pathname === '/Designs' ? 'bg-[#111827]' : ''
                                        }`}
                                >
                                    Design
                                </Link>
                                <Link
                                    to="/Services"
                                    className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid  p-2 hover:rounded transition-all ${location.pathname === '/Services' ? 'bg-[#111827]' : ''
                                        }`}
                                >
                                    Services
                                </Link>
                                <Link
                                    to="/HireMe"
                                    className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid p-2 hover:rounded transition-all ${location.pathname === '/HireMe' ? 'bg-[#111827]' : ''
                                        }`}
                                >
                                    Hire Me!
                                </Link>
                                <Link
                                    to="/Blogs"
                                    className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid p-2 hover:rounded transition-all ${location.pathname === '/Blogs' ? 'bg-[#111827]' : ''
                                        }`}
                                >
                                    Blogs
                                </Link>
                            </div>

                            <div className="block lg:hidden md:hidden xl:hidden flex justify-end">
                                <button onClick={toggleMenu} className="text-[#d1d3d0] ml-auto">
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                            </div>

                            {isOpen && (
                                <div className="lg:hidden md:hidden fixed top-0 left-0 h-50% mt-14 p-3 z-50 w-full bg-slate-800 bg-opacity-94 transition-all transition-height duration-300 ease-in-out animated-navbar">
                                    <ul className="flex flex-col items-center space-y-5 justify-center h-full">
                                        <li>
                                            <Link to="/" className="text-[#d1d3d0]">
                                                DashBoard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Coding" className="text-[#d1d3d0]">
                                                Coding
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Designs" className="text-[#d1d3d0]">
                                                Design
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Services" className="text-[#d1d3d0]">
                                                Services
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/HireMe" className="text-[#d1d3d0]">
                                                Hire Me!
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Blogs" className="text-[#d1d3d0]">
                                                Blogs
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={toggleMenu} className="font-mono font-extrabold">
                                                <i className="fa-solid fa-xmark font-extrabold text-red-600 text-2xl"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            <div className="space-x-4 relative flex right-0">
                                <div className="relative group mt-2">
                                    <button
                                        onClick={toggleSearchBox}
                                        className={`fa-solid fa-magnifying-glass absolute rounded-none  right-0 mt-[-12px] p-3  text-xl  text-gray-400 bg-none border-0 shadow-none   cursor-pointer z-50 ${searchBoxVisible ? 'hidden' : ''
                                            }`}
                                    ></button>


                                    {isSearchBoxVisible && (
                                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-md">
                                            <div className="bg-slate-800 h-60 flex-1 overflow-y-auto ">
                                                <div className="relative flex rounded-lg shadow-sm ">
                                                    <div className="flex ">
                                                        <input
                                                            type="text"
                                                            id="search-input"
                                                            security="true"
                                                            spellCheck="true"
                                                            onChange={onChange}
                                                            value={value}
                                                            placeholder="Quick Search Projects, Blogs..."
                                                            name="hs-trailing-button-add-on-with-icon-and-button"
                                                            className={`py-3 px-4 block w-[260px] sm:w-[300px] md:w-[400px] lg:w-[400px] xl:w-[500px] 2xl:w-80 border-gray-200 shadow-sm rounded-md 
                                    text-sm
                                    focus:z-10 focus:border-blue-500 focus:ring-blue-500 
                                    disabled:opacity-50 disabled:pointer-events-non 
                                    dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 
                                    ${value || isFocused ? 'bg-white text-black' : 'bg-slate-800'}
                                    text-xl
                                `}
                                                            onFocus={() => {
                                                                setIsSearchBoxVisible(true);
                                                                setIsFocused(true);
                                                            }}
                                                            onBlur={() => {
                                                                setTimeout(() => {
                                                                    setIsFocused(false);
                                                                    setShowSuggestions(false);
                                                                    setIsSearchBoxVisible(false);
                                                                }, 200);
                                                            }}
                                                            onKeyDown={handleKeyDown}
                                                        />

                                                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 ps-3 p-3  rounded-r-md bg-slate-600 cursor-pointer ">
                                                            <svg
                                                                className="flex-shrink-0 h-4 w-5 text-slate-300 cursor-pointer"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={24}
                                                                height={24}
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <circle cx={11} cy={11} r={8} />
                                                                <path d="m21 21-4.3-4.3" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                {showSuggestions && (
                                                    <div className="dropdown bg-[#1f2937] absolute   mt-[-4px] w-full z-50 text-light">
                                                        {data.map((item, index) => (
                                                            <div key={item._id} onClick={(e) => handleSuggestionClick(item.title, e)}>
                                                                <li className={`list-item list-none text-light hover:bg-gray-700 p-3 transition-all duration-300 cursor-pointer ${index === focusedIndex ? 'bg-gray-700' : ''}`}>
                                                                    <Link  >{item.title} <i className="fa-solid fa-arrow-up-right-from-square ml-2 text-xs "></i></Link>
                                                                </li>
                                                                <hr className="bg-blue-500" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Conditionally render predefined links based on input */}
                                                {value ? null : (
                                                    <div>
                                                        <div className="bg-slate-800 p-2 ">
                                                            <Link to='/Coding' className='text-white text-xl text-font-extralight italic  '><i class="fa-solid fa-turn-down"></i>  Coding Projects </Link>
                                                        </div>
                                                        <hr className='bg-white h-1' />
                                                        <div className="bg-slate-800 p-2 ">
                                                            <Link to='/Designs' className='text-white text-xl text-font-extralight italic '><i class="fa-solid fa-turn-down"></i>  Designing Projects </Link>
                                                        </div>
                                                        <hr className='bg-white h-1' />
                                                        <div className="bg-slate-800 p-2 ">
                                                            <Link to='/Blogs' className='text-white text-xl text-font-extralight italic '><i class="fa-solid fa-turn-down"></i> Mine Blogs </Link>
                                                        </div>
                                                        <hr className='bg-white h-1' />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="bg-slate-800 flex justify-between rounded-b-md  ">
                                                <hr className='bg-white h-1' />
                                                <p className='text-white text-sm p-1 italic right-0' >Projects | Designs | Blogs</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="relative group">
                                    <Link to="./Moreonme">
                                        <input
                                            type="image"
                                            src={myimg}
                                            alt="Image"
                                            className="w-10 h-10 border-2 mt-1  rounded-3xl bg-gray-800 hover:bg-gray-700 hover:border-gray-600 transition duration-300 ease-in-out"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        />
                                    </Link>
                                    {isHovered && (
                                        <div className="absolute hidden md:block lg:block xl:block w-[250px]  p-2 right-2 bg-white border rounded-lg shadow-md  flex-col">
                                            <p className=" mb-2 font-bold  text-gray-500">Ehtisham Ahmed Gondal</p>
                                            <hr className=" border-2  bg-blue-400 flex justify-center" />
                                            <p className="italic text-sm">Click to see more details on me</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default NavBar;
