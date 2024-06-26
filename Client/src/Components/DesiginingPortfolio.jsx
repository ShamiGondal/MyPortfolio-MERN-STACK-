import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Loader from "./Loader";
import { Helmet } from 'react-helmet'
import { useSearch } from "./SearchProvider";

function CodingPortfolio() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBodyMoved, setIsBodyMoved] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // const localhost = 'http://localhost:4000/api'
    const localhost = import.meta.env.VITE_REACT_APP_API_URL;

    const handleClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setIsBodyMoved(!isBodyMoved);
    };

    const handleOutsideClick = (e) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target) &&
            !e.target.closest("button")
        ) {
            setIsDropdownOpen(false);
            setIsBodyMoved(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [isDropdownOpen]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true when starting to fetch data
                const response = await fetch(`${localhost}/api/getProjects`);

                if (response.ok) {
                    const data = await response.json();
                    const designingProjects = data.filter(
                        (project) => project.type === "designing"
                    );
                    
                    const reversedProjects = designingProjects.reverse();

                    if (reversedProjects.length > 0) {
                        setProjects(reversedProjects);
                    }
                } else {
                    console.error("Error fetching projects:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching projects:", error.message);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchData();
    }, []);
    const onChange = (e) => {
        const value = e.target.value;
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(value)
                ? prevFilters.filter((filter) => filter !== value)
                : [...prevFilters, value]
        );
    };

    const filterData = () => {
        if (selectedFilters.length === 0) {
            return projects; // Return all data if no filters are selected
        }

        return projects.filter((project) =>
            project.filters.some((filter) => selectedFilters.includes(filter))
        );
    };

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        const truncatedText = words.length > limit ? `${words.slice(0, limit).join(' ')}...` : text;
        return truncatedText;
    };

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
    return (
        <div id="blur-container">
            <Helmet>
                <meta charSet="utf-8" />
                <title className='text-xs'>Shami's Designing Portfolio - MERN Stack, Game, C++, & React Native Developer</title>
                <meta charset="UTF-8" />
                <meta name="description" content="Crafting Innovative Solutions - Your Vision, My Expertise
                Bring your digital ideas to life with [Ehtisham Ahmed Gondal], a skilled and passionate developer crafting solutions that captivate and engage. Masterful command of [React Native , C++, e.g., MERN Stack, React Native, C++ , Canva, PhotoShop, Figma, Medium-fedility.wireframe]A proven track record of building captivating [types of projects you build, e.g., web applications, mobile apps, games].An unwavering commitment to exceeding expectations and delivering exceptional results" />
                <meta name="keywords" content="web developer, [Lahore JoharTown], Figam, Medium-fedility-wrieframe, canva, photoshop,mobile developer, [Lahore JoharTown] React Native developer, [Lahore JoharTown]  MERN Stack developer, [Lahore JoharTown] freelance developer, [Lahore JoharTown], web developer shami gondal, game developer shami gondal , app developer shami gondal, game developer Ehtisham Ahmed gondal, app developer Ehtisham Ahmed gondal, web developer Ehtisham Ahmed gondal, Canva Designer Ehtisham Ahmed gondal
                ,Photopshop Designer Ehtisham Ahmed gondal, Figma Designer Ehtisham Ahmed gondal, Medium-fedility Designer Ehtisham Ahmed gondal,
                hire [game , app, e.g., web] [Lahore JoharTown]" />
                <meta name="author" content="Ehtisham Ahmed Gondal" />
            </Helmet>

            <div
                className={`p-3 flex-col items-center justify-center mb-2 bg-slate-50 ${isBodyMoved ? "mt-[-40px]" : ""
                    }`}
            >
                <h2 className="text-center font-bold text-2xl mb-4 font-serif text-black mt-20 z-50">Designing Portfolio <i class="fa-solid fa-pen"></i></h2>
                <div className="h-14 flex relative mt-[-20px] ">
                    <i className="text-slate-600 mt-24 font-light">Filter By:</i>
                    <i className="text-black mt-20 absolute right-0">
                        <button className="p-2 btn" onClick={handleClick}>
                            <i className="fa-solid fa-caret-down text-slate-900 text-xl"></i>
                        </button>
                    </i>
                    {isDropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className={`absolute bg-white mt-36 w-full rounded-md shadow-md animate__animated animate__fadeInDown scale-y-${isDropdownOpen ? "100" : "0"} z-50`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-3">
                                <div className="col-span-1 ">
                                    <h3 className="text-sm font-medium text-gray-900">Project Types</h3>
                                    <div className="mt-2 flex flex-col">
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" value={"web"} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onChange={onChange} />
                                            <span className="ml-2 text-sm font-normal text-gray-700">Web Development</span>
                                        </label>
                                        <label className="inline-flex items-center mt-2">
                                            <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onChange={onChange} value={"app"} />
                                            <span className="ml-2 text-sm font-normal text-gray-700">App Development</span>
                                        </label>
                                        <label className="inline-flex items-center mt-2">
                                            <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onChange={onChange} value={"game"} />
                                            <span className="ml-2 text-sm font-normal text-gray-700">Game Development</span>
                                        </label>
                                        <label className="inline-flex items-center mt-2">
                                            <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onChange={onChange} value={"canva"} />
                                            <span className="ml-2 text-sm font-normal text-gray-700">Canva</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <h3 className="text-sm font-medium text-gray-900 ">Project Size & Ranking</h3>
                                    <div className="mt-2  flex flex-col">
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onChange={onChange} value={"large"} />
                                            <span className="ml-2 text-sm font-normal text-gray-700">Large Projects</span>
                                        </label>
                                        <label className="inline-flex items-center mt-2">
                                            <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onChange={onChange} value={"small"} />
                                            <span className="ml-2 text-sm font-normal text-gray-700">Small Projects</span>
                                        </label>
                                        <label className="inline-flex items-center mt-2">
                                            <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onChange={onChange} value={"ranked"} />
                                            <span className="ml-2 text-sm font-normal text-gray-700">Ranked Projects</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <hr className="w-full bg-slate-950 mt-20 " />
                {loading ? (
                    <Loader />
                ) : (
                    <div
                        className={`md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-x-4 gap-y-9 max-w-screen-xl mt-16`}
                    >
                        {filterData().map((project) => (
                            <Card key={project._id} className="h-full rounded-md mb-8 md:mb-3 lg:mb-3 xl:mb-3 ">
                                <CardHeader
                                    color="blue-gray"
                                    className="relative h-56 rounded-md shadow-md shadow-black mt-[-10px]"
                                >
                                    <img
                                        src={project.image[0]}
                                        alt="card-image"
                                        className="h-full w-full object-cover rounded-md"
                                    />
                                </CardHeader>
                                <CardBody className="p-3">
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        {project.title}
                                    </Typography>
                                    <Typography>{truncateText(project.overview, 40)}</Typography>
                                </CardBody>
                                <CardFooter className="p-3">
                                {project.tags && <Typography className="bg-slate-200 p-1 w-fit mb-2 ">#{project.tags}</Typography>}
                                {project.pDate && <Typography className="bg-slate-200 p-1 w-fit mb-2 ">{project.pDate}</Typography>}
                                    <Link to={`/projects/${project.slug}`} >
                                        <Button variant="gradient" className="text-white p-3 bg-dark">
                                            <span>Read more</span>
                                        </Button>
                                    </Link>


                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CodingPortfolio;
