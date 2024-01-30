import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import myimg from '../assets/myimg.jpg';

function NavBar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(0); // Add state for focused suggestion index
    const navigate = useNavigate();
    const localhost = 'https://myportfolio-server-side.onrender.com'

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const onChange = async (e) => {
        setValue(e.target.value);

        try {
            const response = await fetch(`${localhost}/api/getProjects`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();

            const projects = res || [];
            const filteredData = projects
                .filter((project) => project.title.toLowerCase().includes(e.target.value.toLowerCase()))
                .map(({ _id, title }) => ({ _id, title }));

            setData(filteredData);
            setShowSuggestions(filteredData.length > 0);

            if (!e.target.value) {
                setShowSuggestions(false);
            }
        } catch (error) {
            console.error('Error fetching project data:', error.message);
        }
    };

    const handleSuggestionClick = (itemId) => {
        navigate(`/projects/${itemId}`);
        setValue(""); // Clear the input field
        setShowSuggestions(false); 
    };
    const handleReadMore = (itemId) => {
        navigate(`/projects/${itemId}`);
        
    };
    

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Treat Enter key as click
            // ... perform search or other action ...
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();

            const totalSuggestions = data.length;
            const direction = e.key === 'ArrowDown' ? 1 : -1;
            let nextIndex = focusedIndex + direction;
            nextIndex = (nextIndex + totalSuggestions) % totalSuggestions;
            setFocusedIndex(nextIndex);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('#search-input') && showSuggestions) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showSuggestions]);

    useEffect(() => {
        closeMenu();
    }, [location]);
    return (
        <>
            <div className="">
                <div className="">
                    <nav className="py-2 bg-[#1f2937] fixed-top   ">
                        <div className="container mx-auto flex justify-between items-center">
                            <div className="flex space-x-14 md:space-x-9 sm:hidden hidden lg:block md:block">
                                <Link to="/" className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid  p-2 hover:rounded transition-all ${location.pathname == '/' ? 'bg-[#111827] p-2' : ''}`} >DashBoard</Link>
                                <Link to="/Coding" className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid  p-2 hover:rounded transition-all ${location.pathname == '/Coding' ? 'bg-[#111827] p-2' : ''}`} >Coding</Link>
                                <Link to="/Designs" className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid  p-2 hover:rounded transition-all ${location.pathname == '/Designs' ? 'bg-[#111827]' : ''}`} >Design</Link>
                                <Link to="/Services" className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid  p-2 hover:rounded transition-all ${location.pathname == '/Services' ? 'bg-[#111827]' : ''}`} >Services</Link>
                                <Link to="/HireMe" className={`text-[#d1d3d0] hover:bg-slate-100 hover:bg-opacity-15 hover:border-transparent hover:border-solid p-2 hover:rounded transition-all ${location.pathname == '/HireMe' ? 'bg-[#111827]' : ''}`} >Hire Me!</Link>
                            </div>

                            {/* Hamburger menu for small screens */}
                            <div className="block lg:hidden md:hidden xl:hidden flex justify-end">
                                <button onClick={toggleMenu} className="text-[#d1d3d0] ml-auto">
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                            </div>


                            {/* Navigation for small screens */}
                            {isOpen && (
                                <div className="lg:hidden md:hidden fixed top-0 left-0 h-50% mt-14 p-3 z-50 w-full bg-slate-800 bg-opacity-94 transition-all transition-height duration-300 ease-in-out animated-navbar">
                                    <ul className="flex flex-col items-center space-y-5 justify-center h-full">
                                        <li><Link to="/" className="text-[#d1d3d0]">DashBoard</Link></li>
                                        <li><Link to="/Coding" className="text-[#d1d3d0]">Coding</Link></li>
                                        <li><Link to="/Designs" className="text-[#d1d3d0]">Design</Link></li>
                                        <li><Link to="/Services" className="text-[#d1d3d0]">Services</Link></li>
                                        <li><Link to="/HireMe" className="text-[#d1d3d0]">Hire Me!</Link></li>
                                        <li><button onClick={toggleMenu} className="font-mono font-extrabold"><i className="fa-solid fa-xmark font-extrabold text-red-600 text-2xl"></i></button></li>
                                    </ul>
                                </div>


                            )}
                            <div className="space-x-4 relative flex right-0">
                                <div className="relative group mt-2">
                                    <input
                                        type="text"
                                        security='true'
                                        spellCheck="true"
                                        onChange={onChange}
                                        value={value}
                                        placeholder="Search"
                                        className={`w-full lg:w-[250px] md:w-[120px]  input-field rounded-lg p-[3px] pl-2 hover:text-black border-0 focus:outline-none ${value || isFocused ? "bg-white text-black" : "bg-slate-800"
                                            }`}
                                        onFocus={() => setIsFocused(true)} // Set focus state
                                        onBlur={() => setIsFocused(false)} // Reset focus state
                                        onKeyDown={handleKeyDown} // Handle keyboard events
                                    />
                                    <button className="fa-solid fa-magnifying-glass absolute top-1/2 transform -translate-y-1/2 right-2 mt-[-5px] text-gray-400 "></button>
                                    {showSuggestions && (
                                        <div className="dropdown bg-[#1f2937] absolute mt-[-4px] w-full z-50 text-light">
                                            {data.map((item) => (
                                                <div key={item._id} onClick={() => {
                                                    setValue(item.title);
                                                    handleSuggestionClick();
                                                }}>
                                                    <li className='list-item  list-none text-light hover:bg-gray-700 p-2 transition-all duration-300  cursor-pointer '>
                                                        <Link to={`/projects/${item._id}`} onClick={() => handleReadMore(item._id)}>{item.title}</Link>
                                                    </li>
                                                    <hr className='bg-blue-500' />
                                                </div>
                                            ))}
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
                                        /></Link>
                                    {isHovered && (
                                        <div className="absolute hidden md:block lg:block xl:block w-[250px]  p-2 right-2 bg-white border rounded-lg shadow-md  flex-col">
                                            <p className=" mb-2 font-bold  text-gray-500">Ehtisham Ahmed Gondal</p>
                                            <hr className=' border-2  bg-blue-400 flex justify-center' />
                                            <p className='italic text-sm'>Click to see more details on me</p>
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
