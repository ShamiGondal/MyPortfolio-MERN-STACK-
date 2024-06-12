import { Link } from 'react-router-dom';
import landingImage from '../assets/LandingImage.png';
import codesoft from '../assets/codesoft.jpg'
import solutions from '../assets/shehgan.jpeg'
import applayce from '../assets/applyace.jpg'
import fiver from '../assets/fiver.png'
import { Helmet } from "react-helmet"
import { useEffect } from 'react';
import { useSearch } from './SearchProvider';

function LandingPage() {

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
                <title className='text-xs'>Shami's Portfolio - Landing Page | MERN Stack, Game, C++, & React Native Developer</title>
                <meta charset="UTF-8" />
                <meta name="description" content="Elevate your digital presence with Shami Ahmed Gondal, a versatile developer skilled in crafting modern web and mobile experiences. Explore my portfolio to discover how I leverage cutting-edge technologies to meet your needs, or contact me today to discuss your project!" />
                <meta name="keywords" content="mern stack developer, game developer, cpp developer, react native developer, frontend developer, backend developer, full stack developer, javascript developer, web developer, mobile developer, portfolio, hire developer, freelance developer" />
                <meta name="author" content="Ehtisham Ahmed Gondal" />
            </Helmet>
            <div className="container mx-auto flex flex-col-reverse md:flex-row justify-center items-center h-screen md:space-x-5 lg:space-x-5 mb-5 md:mb-5 lg:mb-5 xl:mb-5 mt-20 sm:mt-20 md:mt-10 lg:mt-0 xl:mt-0 ">
                <div className="flex flex-col items-center space-y-2 animate__animated animate__fadeInUp mb-5 md:mb-0 lg:mb-0 xl:mb-0">
                    <h2 className="text-center font-bold mt-4 md:mt-0 text-2xl md:text-4xl">Hi! My Name is Ehtisham.</h2>
                    <p className="text-center font-medium">I like to do Design and Code Stuff</p>
                    <div className="flex space-x-3">
                        <Link to="/Designs" className='font-semibold text-blue-700 mr-2'>Design Portfolio</Link>|
                        <Link to="/Coding" className='font-semibold text-blue-700'>Coding Portfolio</Link>
                    </div>
                </div>
                <div className="relative items-center z-0 md:mt-0 lg:mt-2 xl:mt-2">
                    <img
                        title='Dont look at me like this'
                        src={landingImage}
                        alt="landing"
                        className="w-full md:w-96 lg:w-96 xl:w-96 h-auto mt-5 rounded-3xl animate__animated animate__delay-1s animate__zoomIn heartbeat"
                    />
                    {/* Colored notes */}
                    <Link to='/Testimonials' className="absolute top-0 left-0 w-2/5 h-1/4 bg-yellow-300 rounded-3xl transform rotate-6 opacity-70 transition-transform duration-300 hover:rotate-3 hover:scale-105">
                        <figcaption className="flex items-center justify-center mt-2 flex-col space-y-1 px-3 animate__animated animate__delay-1s animate__zoomIn heartbeat">
                            <p className='text-sm'>Apply Ace</p>
                            <img className="w-6 h-6 rounded-full" src={applayce} alt="profile picture" />
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-black dark:text-white text-[10px]">Buder Munir</div>
                                <div className="pl-3  font-medium text-black dark:text-gray-400 text-[10px]">CEO ApplyAce</div>
                            </div>
                        </figcaption>
                    </Link>

                    <Link to='/Testimonials' className="absolute top-0 right-0 w-2/5 h-1/4 bg-green-300 rounded-3xl transform -rotate-6 opacity-70 transition-transform duration-300 hover:rotate-3 hover:scale-105">
                        <figcaption className="flex items-center justify-center mt-2 flex-col space-y-1 px-3 animate__animated animate__delay-1s animate__zoomIn heartbeat">
                            <p>CodeSoft</p>
                            <img className="w-6 h-6 rounded-full" src={codesoft} alt="profile picture" />
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-black dark:text-white text-xs text-[10px]">Manesh Bindra</div>
                                <div className="pl-3  font-medium text-black dark:text-gray-400 text-xs text-[10px]">Manager CodeSoft</div>
                            </div>
                        </figcaption>
                    </Link>
                    <Link to="/Testimonials" className="absolute bottom-0 left-0 w-2/5 h-1/4 bg-blue-300 rounded-3xl transform -rotate-6 opacity-70 transition-transform duration-300 hover:rotate-3 hover:scale-105">
                        <figcaption className="flex items-center justify-center mt-2 flex-col space-y-1 px-3 animate__animated animate__delay-1s animate__zoomIn heartbeat">
                            <p>Freelancer</p>
                            <img className="w-6 h-6 rounded-full" src={fiver} alt="profile picture" />
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-black dark:text-white text-xs text-[10px]">Micheal Gough</div>
                                <div className="pl-3  font-medium text-black dark:text-gray-400 text-xs text-[10px]">Freelancer Client</div>
                            </div>
                        </figcaption>
                    </Link>
                    <Link to='/Testimonials' className="absolute bottom-0 right-0 w-2/5 h-1/4 bg-pink-300 rounded-3xl transform rotate-6 opacity-70 transition-transform duration-300 hover:rotate-3 hover:scale-105">
                        <figcaption className="flex items-center justify-center mt-2 flex-col space-y-1 px-3 animate__animated animate__delay-1s animate__zoomIn heartbeat">
                            <p>Solutions </p>
                            <img className="w-6 h-6 rounded-full" src={solutions} alt="profile picture" />
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-black dark:text-white text-xs text-[10px]">Aryan Iqbal</div>
                                <div className="pl-3  font-medium text-black dark:text-gray-400 text-xs text-[10px]">Solutions Logistics</div>
                            </div>
                        </figcaption>
                    </Link>
                </div>
            </div>
            <footer className='md:flex lg:flex md:space-x-3 lg:space-x-3 mb-2 ml-5 md:mt-0 lg:mt-0 xl:mt-0'>
                <div className="flex space-x-3">
                    <div>
                        <a href="https://www.linkedin.com/in/ehtisham-ahmed-gondal-314019289/" target='_blank' rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin text-blue-800 text-2xl md:text-4xl hover:transform hover:scale-110 hover:ease-in-out hover:transition-all"></i>
                        </a>
                    </div>
                    <div>
                        <a href="https://github.com/ShamiGondal" target='_blank' rel="noopener noreferrer">
                            <i className="fa-brands fa-github text-grey-500 text-2xl md:text-4xl hover:transform hover:scale-110 hover:ease-in-out hover:transition-all "></i>
                        </a>
                    </div>
                    <div>
                        <a href="mailto:ehtishamahmedgondal@gmail.com">
                            <i className="fa-solid fa-envelope text-blue-300 text-2xl md:text-4xl hover:transform hover:scale-110 hover:ease-in-out hover:transition-all"></i>
                        </a>
                    </div>

                </div>
                <div></div>
                <div className="flex space-x-4 mt-2 md:mt-0 lg:mt-0 xl:mt-0">
                    <p className='hidden md:block lg:block xl:block'>|</p>
                    <div className="text-blue-700 font-semibold ">
                        <a href="https://drive.google.com/file/d/1veXwoHTnWbsJLyV3kcEDRVFlAhYBcefD/view?usp=sharing" target='_blank' rel="noopener noreferrer" title='Download latest resume'  >Resume</a>
                        <p className='font-extralight text-black italic'>Last Updated: June 06, 2024</p>
                    </div>
                    <>|</>
                    <div className="text-blue-700 font-semibold ">
                        <Link to="./Moreonme">More on me </Link>
                    </div>
                </div>
            </footer>

        </div>


    );
}

export default LandingPage;
