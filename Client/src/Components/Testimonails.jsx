import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import codesoft from '../assets/codesoft.jpg'
import solutions from '../assets/shehgan.jpeg'
import applayce from '../assets/applyace.jpg'
import fiver from '../assets/fiver.png'
import { Helmet } from "react-helmet";
import { useEffect } from 'react';
import { useSearch } from './SearchProvider';

function Testimonials() {

    // Static array of testimonials (replace with actual fetch logic)
    const testimonials = [
        { id: '1', name: 'Apply Ace', designation: 'CEO at ApplyAce', content: `We had the pleasure of working with Ehtisham Ahmed Gondal on the ApplyAce Website project, and it was nothing short of exceptional. We highly recommend his services for anyone seeking outstanding web development.`, img: applayce, link: `https://applyaces.com/` },
        { id: '2', name: 'CodeSoft', designation: 'CodeSoft AI Manager', content: `During Ehtisham Ahmed Gondal's internship at CodeSoft, he showcased exceptional skills and a strong grasp of web development concepts. His commitment to learning and contributing to our projects remotely was commendable. `, img: codesoft, link: `https://www.linkedin.com/posts/ehtisham-ahmed-gondal-314019289_frontenddeveloper-internshipcomplete-codesoft-activity-7122400600436162560-hwCM?utm_source=share&utm_medium=member_desktop` },
        { id: '3', name: 'Solutions Logistics', designation: 'Recuriter at Solutions', content: `Ehtisham Ahmed Gondal proved to be an invaluable asset during his time at Solutions Logistics as a web developer. His proficiency in creating efficient and user-friendly solutions was evident in the projects he undertook.`, img: solutions },
        { id: '4', name: 'FreeLancer', designation: 'Client from freelance', content: `Working with Ehtisham Ahmed Gondal on our MERN stack website project was a game-changer. His attention to detail, innovative problem-solving, and dedication to delivering high-quality work set him apart.`, img: fiver },
        // Add more testimonials as needed
    ];

    document.body.style.backgroundColor = "#edf0f5"
    const navigate = useNavigate();
    const goback = () => {
        navigate(-1)
    }

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
        <div id='blur-container' >
            <Helmet>
                <meta charSet="utf-8" />
                <title className='text-xs'>Shami's Portfolio - Testimonails Page | MERN Stack, Game, C++, & React Native Developer</title>
                <meta charset="UTF-8" />
                <meta name="description" content="Explore what clients are saying about our innovative coding solutions. Read testimonials from satisfied customers who have witnessed their ideas come to life through our expert development services." />
                <meta name="keywords" content="mern stack developer, game developer, cpp developer, react native developer, frontend developer, backend developer, full stack developer, javascript developer, web developer, mobile developer, portfolio, hire developer, freelance developer testimonails coding solutions, development services, client testimonials, innovative coding, satisfied customers" />
                <meta name="author" content="Ehtisham Ahmed Gondal" />
            </Helmet>
            <div className="mx-auto max-w-screen-sm mt-28">
                <h2 className=" text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">Testimonials</h2>
                <p className=" font-light text-gray-500 lg:mb-5 sm:text-xl dark:text-gray-400 p-4 mt-2 text-center">Explore more on me from my clients reviews</p>
            </div>
            <section className="dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                    <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id}>
                                <figure className="flex flex-col justify-center items-center rounded-lg md:rounded-none lg:mt-0 xl:mt-0 mt-4 sm:mt-0 md:mt-0 shadow-lg shadow-black p-8 text-center bg-[#1f2937] border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
                                    <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                                    </svg>
                                    <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">

                                        <p className="my-4 text-light font-light italic ">{testimonial.content}  Check out the results:<a href={testimonial.link} target='_blank' rel="noopener noreferrer" className="ml-2 text-blue-700 cursor-pointer">Click Here</a></p>
                                    </blockquote>
                                    <figcaption className="flex justify-center items-center space-x-3">
                                        <img className="w-9 h-9 rounded-full" src={testimonial.img} alt="profile picture" />
                                        <div className="space-y-0.5 font-medium dark:text-white text-left">
                                            <div className='text-white'>{testimonial.name}</div>
                                            <div className="text-sm font-light text-gray-100 dark:text-gray-100">{testimonial.designation}</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            <div className="text-center ml-4 mb-4  ">
                <Button onClick={goback} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-light focus:outline-none bg-dark rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >Close</Button>
            </div>
        </div>
    );
}

export default Testimonials;
