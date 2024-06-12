import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myimg from '../assets/myimg.jpg';
import { Helmet } from "react-helmet";
import landingVideo from '../assets/istockphoto-1483562425-640_adpp_is.mp4'
import { useSearch } from './SearchProvider';

function Hireme() {
    const [services, setServices] = useState({
        webDevelopment: false,
        // gameDev: false,
        appDevelopment: false,
    });
    document.body.style.backgroundColor = "#f1f5f9"
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
        websiteURL: '',
        moreDetails: '',
        budget: 'low',
    });
    const [inputFocus, setInputFocus] = useState({
        name: false,
        email: false,
        companyName: false,
        websiteURL: false,
        moreDetails: false,
    });

    const handleCheckboxChange = (service) => {
        setServices((prevServices) => ({
            ...prevServices,
            [service]: !prevServices[service],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const notify = () => {
        toast("Successfully Send Reservation!");
        setSubmitted(true);
    };

    const resetForm = () => {
        setServices({
            webDevelopment: false,
        });
        setFormData({
            name: '',
            email: '',
            companyName: '',
            websiteURL: '',
            moreDetails: '',
            budget: 'low',
        });
        setSubmitted(false);
    };



    // const localhost = 'http://localhost:4000';
    const localhost = import.meta.env.VITE_REACT_APP_API_URL;


    const submitForm = async (formData, services) => {
        try {
            const response = await fetch(`${localhost}/api/submitForm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    companyName: formData.companyName,
                    websiteURL: formData.websiteURL,
                    moreDetails: formData.moreDetails,
                    budget: formData.budget,
                    services, // Add the services separately
                }),
            });

            if (response.ok) {
                // Handle successful form submission
                notify();
                setSubmitted(true);
            } else {
                toast.error("Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email) {
            toast.error("Name and Email are required.");
            return;
        }

        try {
            await submitForm(formData, services);
            // Additional validation logic can be added here

            // notify();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
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
        <div id='blur-container'>
            <Helmet>
                <meta charSet="utf-8" />
                <title className='text-xs'>Shami's Portfolio  - Hire me | Contact us | MERN Stack, Game, C++, & React Native Developer</title>
                <meta charset="UTF-8" />
                <meta name="description" content="Let's Collaborate: Turn Your vision into reality.
                I'm passionate about bringing your ideas to life through innovative coding solutions. Whether you have a fully fleshed-out project or just a spark of an idea, I'm eager to hear from you.
                This form is your bridge to:
                Discuss your project requirements in detail. Share your vision, goals, and any specific needs you have. Explore potential solutions and approaches. Together, we can brainstorm and tailor the perfect solution for your unique project. Get a free quote and timeline estimation. Understand the investment involved and set realistic expectations.Don't hesitate to reach out! I'm always happy to answer questions, discuss your project, or simply connect and explore potential collaborations." />
                <meta name="keywords" content="web developer, [Lahore JoharTown], Figam, Medium-fedility-wrieframe, canva, photoshop,mobile developer, [Lahore JoharTown] React Native developer, [Lahore JoharTown]  MERN Stack developer, [Lahore JoharTown] freelance developer, [Lahore JoharTown], web developer shami gondal, game developer shami gondal , app developer shami gondal, game developer Ehtisham Ahmed gondal, app developer Ehtisham Ahmed gondal, web developer Ehtisham Ahmed gondal, Canva Designer Ehtisham Ahmed gondal
                ,Photopshop Designer Ehtisham Ahmed gondal, Figma Designer Ehtisham Ahmed gondal, Medium-fedility Designer Ehtisham Ahmed gondal,
                hire [game , app, e.g., web] [Lahore JoharTown], hireme, contact us, contact , Hire Ehtisham Ahmed Gondal" />
                <meta name="author" content="Ehtisham Ahmed Gondal" />
            </Helmet>
            <div className="relative overflow-hidden border-0">
            <video
                    className="absolute top-0 left-0 object-cover w-full h-full  border-0 border-none"
                    autoPlay
                    loop
                    muted
                >
                    <source src={landingVideo} type="video/mp4" />

                </video>
                <div className="min-h-screen flex items-center mt-12   py-4 px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-md w-full space-y-4 bg-white p-3 rounded-lg shadow-lg">
                        <div className="text-center">
                            <img className="mx-auto h-12 w-auto" src={myimg} alt="Workflow" />
                            <h2 className="mt-6 text-3xl font-extrabold text-black">
                                Hire Me
                            </h2>
                            <p className="mt-2 text-sm text-gray-900">
                                I am available for your next project.
                            </p>
                        </div>
                        {!submitted ? (
                            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="companyName" className="sr-only">Company Name</label>
                                        <input
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            autoComplete="organization"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="websiteURL" className="sr-only">Website URL</label>
                                        <input
                                            id="websiteURL"
                                            name="websiteURL"
                                            type="text"
                                            autoComplete="url"
                                            value={formData.websiteURL}
                                            onChange={handleInputChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Website URL"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="moreDetails" className="sr-only">More Details</label>
                                        <textarea
                                            id="moreDetails"
                                            name="moreDetails"
                                            rows="4"
                                            value={formData.moreDetails}
                                            onChange={handleInputChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="More Details"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="budget" className="sr-only">Budget</label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="webDevelopment"
                                            name="webDevelopment"
                                            type="checkbox"
                                            checked={services.webDevelopment}
                                            onChange={() => handleCheckboxChange('webDevelopment')}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="webDevelopment" className="ml-2 block text-sm text-black">
                                            Web Development
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="appDevelopment"
                                            name="appDevelopment"
                                            type="checkbox"
                                            checked={services.appDevelopment}
                                            onChange={() => handleCheckboxChange('appDevelopment')}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="appDevelopment" className="ml-2 block text-sm text-black">
                                            App Development
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center text-black">
                                <h3 className="text-2xl font-bold mb-4">Thank you for your submission!</h3>
                                <p className="mb-2">Developer Information:</p>
                                <p className="mb-2">Email: ehtishamahmedgondal@gmail.com</p>
                                <p className="mb-2">Contact Number: +923347527078</p>
                                <button
                                    onClick={resetForm}
                                    className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                >
                                    Reset Form
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <ToastContainer />
            </div>

        </div>
    );
}

export default Hireme;
