import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myimg from '../assets/myimg.jpg';
import { Helmet } from "react-helmet";
import landingVideo from '../assets/istockphoto-1483562425-640_adpp_is.mp4'


function Hireme() {
    const [services, setServices] = useState({
        webDevelopment: false,
        // gameDev: false,
        // appDevelopment: false,
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
    const localhost = 'https://myportfolio-server-side.onrender.com'


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






    return (
        <>
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
            <div className="relative overflow-hidden border-0 border-none">
                <video
                    className="absolute top-0 left-0 object-cover w-full h-full  border-0 border-none"
                    autoPlay
                    loop
                    muted
                >
                    <source src={landingVideo} type="video/mp4" />

                </video>
                <div className={`relative  mt-16 flex justify-center items-center  p-9 ${submitted ? 'form-submitted' : ''}`}>
                    <form className={`form w-full sm:w-full md:w-[500px] lg:w-[700px] xl:w-[800px] p-5 bg-opacity-70 relative shadow-md shadow-black rounded-lg ${submitted ? 'flipped' : ''}`} onSubmit={handleSubmit}>
                        {submitted ? (
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl text-white font-semibold text-center mb-4">We will be responding you soon...!</h2>

                                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex justify-end px-4 pt-4">

                                    </div>
                                    <div className="flex flex-col items-center pb-10 text-center">
                                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={myimg} alt="Bonnie image" />
                                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Ehtisham Ahmed Gondal</h5>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Developer at SoftAims</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">+92163847377</span>
                                        <div className="flex mt-4 md:mt-6 ">
                                            <a href="https://www.linkedin.com/in/ehtisham-ahmed-gondal-314019289/" target='_blank' rel="noopener noreferrer" className="inline-flex items-center px-1 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "><i className="fa-brands fa-linkedin mx-2"></i></a>
                                            <a href="https://github.com/ShamiGondal" target='_blank' rel="noopener noreferrer" className="inline-flex items-center px-1 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"><i className="fa-brands fa-github mx-2" ></i> </a>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="mt-4 bg-gradient-to-b from-teal-500 to-blue-500 text-white font-medium py-2 px-4 rounded-full shadow-md"
                                    onClick={resetForm}
                                >
                                    Go Back
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="lg:flex xl:flex lg:space-x-8 xl:space-x-8">
                                    <div className="">
                                        <div className="md:flex lg:flex xl:flex md:space-x-8 lg:space-x-8 xl:space-x-8 space-y-3 md:space-y-0 lg:space-y-0 xl:space-y-0">
                                            <div className="space-y-3 flex flex-col">
                                                <label htmlFor="name" className="text-white font-semibold">
                                                    Your Name <sup><i className="fa-solid fa-star text-yellow-800"></i></sup>
                                                </label>
                                                <input
                                                    type="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder='Type name here...'
                                                    className="input-field bg-transparent rounded-md h-8 pl-2 text-white focus-within:text-black focus-within:bg-white border-1 border-[#424f63]"
                                                    spellCheck='true'
                                                />
                                            </div>
                                            <div className="space-y-3 flex flex-col md:mt-0 lg:mt-0 xl:mt-0">
                                                <label htmlFor="email" className="text-white font-semibold">
                                                    Your Email <sup><i className="fa-solid fa-star text-yellow-800"></i></sup>
                                                </label>
                                                <input
                                                    name='email'
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder='Type email here...' className="input-field bg-transparent rounded-md h-8 pl-2 text-white focus-within:text-black focus-within:bg-white border-1 border-[#424f63]" />
                                            </div>
                                        </div>
                                        <div className="  md:flex lg:flex xl:flex  md:space-x-8 lg:space-x-8 xl:space-x-8">
                                            <div className="space-y-3 flex flex-col ">
                                                <label htmlFor="companyName" className="text-white font-semibold mt-3">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="companyName"  // Corrected the name attribute
                                                    value={formData.companyName}
                                                    onChange={handleInputChange}
                                                    placeholder="Company"
                                                    className="input-field bg-transparent rounded-md h-8 pl-2 text-white focus-within:text-black focus-within:bg-white border-1 border-[#424f63]"
                                                />
                                            </div>
                                            <div className="space-y-3 flex flex-col ">
                                                <label htmlFor="websiteURL" className="text-white font-semibold mt-3 ">
                                                    Website URL
                                                </label>
                                                <input
                                                    type="text"
                                                    name="websiteURL"  // Corrected the name attribute
                                                    value={formData.websiteURL}
                                                    onChange={handleInputChange}
                                                    placeholder="URL"
                                                    className="input-field bg-transparent rounded-md h-8 pl-2 text-white focus-within:text-black focus-within:bg-white border-1 border-[#424f63] mb-3"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="space-y-3 flex flex-col">
                                            <label htmlFor="moreDetails" className="text-white font-semibold">
                                                Additional Information
                                            </label>
                                            <textarea
                                                rows={5}
                                                placeholder="Any extra info..."
                                                name='moreDetails'
                                                type='text'
                                                maxLength={100}
                                                onChange={handleInputChange}
                                                value={formData.moreDetails}
                                                className="bg-transparent rounded-md h-28 pl-2 text-white focus-within:text-black focus-within:bg-white border-2 border-[#4e5a6b] mb-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex flex-col mt-3 ">
                                    <label className="text-white font-semibold">Services Required <sup><i className="fa-solid fa-star text-yellow-800"></i></sup></label>
                                    <div className="flex mt-3 flex-col space-y-3">
                                        {Object.entries(services).map(([key, value]) => (
                                            <div key={key} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={key}
                                                    checked={value}
                                                    onChange={() => handleCheckboxChange(key)}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor={key}
                                                    className="cursor-pointer flex items-center justify-center w-6 h-6 border-2 border-gray-300 rounded-md transition duration-300 focus-within:border-blue-500"
                                                >
                                                    <div
                                                        className={`w-3 h-3 bg-blue-500 rounded-md transition-transform ${value ? 'transform scale-100' : 'transform scale-0'
                                                            }`}
                                                    ></div>
                                                </label>


                                                <label htmlFor={key} className="text-white ml-2">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <div className="space-y-3 flex flex-col">
                                    <label htmlFor="budget" className="text-white font-semibold mt-3">
                                        Budget <sup><i className="fa-solid fa-star text-yellow-800"></i></sup>
                                    </label>
                                    <select
                                        id="budget"
                                        className="bg-transparent rounded-md h-8 pl-2 text-white focus-within:text-black focus-within:bg-white border border-[#1f2937] focus:border-none"
                                        onChange={handleInputChange}
                                        name="budget"
                                    >
                                        <option value="low" className='bg-[#1f2937] bg-opacity-85'>Low</option>
                                        <option value="medium" className='bg-[#1f2937]  bg-opacity-85'>Medium</option>
                                        <option value="high" className='bg-[#1f2937] bg-opacity-85'>High</option>
                                    </select>

                                </div>

                            </>
                        )}
                        {!submitted && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="transition-all transform hover:-translate-y-3 focus:outline-none focus:ring focus:border-blue-300 active:scale-95 relative flex items-center space-x-2 bg-gradient-to-b from-teal-500 to-blue-500 text-white font-medium py-2 px-4 rounded-full shadow-md"
                                    type="submit"
                                >
                                    <div className="svg-wrapper">
                                        <div className="svg-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-6 h-6 fill-current">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span>Send </span>
                                </button>
                            </div>
                        )}
                    </form>
                    <ToastContainer />
                </div>
            </div >
        </>
    );
}

export default Hireme;
