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

function CodingPortfolio() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBodyMoved, setIsBodyMoved] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(true)
    // const localhost = 'http://localhost:4000/api'
    const localhost = 'https://myportfolio-server-side.onrender.com'

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
        // Fetch projects data from the server when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetch(`${localhost}/api/getProjects`);
                const data = await response.json();
                const codingProjects = data.filter(project => project.type === 'coding');

                // Set state only if there are coding projects
                if (codingProjects.length > 0) {
                    setProjects(codingProjects);
                }
            } catch (error) {
                console.error("Error fetching projects:", error.message);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once on mount

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

    const handleReadMore = (project) => {
        navigate(`/projects/${project.slug}`);
    };

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        const truncatedText = words.length > limit ? `${words.slice(0, limit).join(' ')}...` : text;
        return truncatedText;
    };

    return (
        <div>
            {Loading ? <Loader /> :
                <div
                    className={`p-3 flex-col items-center justify-center mb-2 bg-slate-50 ${isBodyMoved ? "mt-[-40px]" : ""
                        }`}
                >
                    <h2 className="mt-20 text-center text-xl font-serif font-bold">
                        Coding Portfolio
                    </h2>
                    <div className="h-14 flex relative ">
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
                                                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onChange={onChange} value={"database"} />
                                                <span className="ml-2 text-sm font-normal text-gray-700">DataBase</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <h3 className="text-sm font-medium text-gray-900 ">Project Size & Ranking</h3>
                                        <div className="mt-2 flex flex-col">
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
                    <div
                        className={`md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-x-4 gap-y-9 max-w-screen-xl mt-16`}
                    >
                        {filterData().map((project) => (
                            <Card key={project._id} className="h-full rounded-md mb-8 md:mb-3 lg:mb-3 xl:mb-3  ">
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
                                    <Link to={`/projects/${project.slug}`} onClick={() => handleReadMore(project)}>
                                        <Button variant="gradient" className="text-white p-3 bg-dark">
                                            <span>Read more</span>
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default CodingPortfolio;
