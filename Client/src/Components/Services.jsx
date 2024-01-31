import appimg from '../assets/appimg.png';
import webimg from '../assets/webimg.png';
import gameimg from '../assets/gameimg.png';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import landingVideo from '../assets/laptop_-_1625 (720p).mp4'


const Services = () => {
  const cardsData = [
    { color: 'red', tip: 'Web Development', secondText: 'Elevate your business or personal brand with my web development expertise. I create sleek, responsive, and user-friendly websites, ensuring a seamless online experience for your audience. ', tags: ['MERN', 'FIGMA', 'Medium Fedility'], img: webimg },
    { color: 'blue', tip: 'App Development', secondText: 'Unleash the power of mobile technology with my app development services. From intuitive user interfaces to robust functionality, I craft applications that resonate with users and meet your specific objectives.', tags: ['React Native', 'Android Studio'], img: appimg },
    { color: 'green', tip: 'Game Development', secondText: 'Dive into the realm of immersive gameplay experiences. My game development services bring ideas to life, crafting captivating narratives and cutting-edge visuals that engage players on various platforms.', tags: ['C#', 'C++', 'Unity'], img: gameimg },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title className='text-xs'>Shami's Services - MERN Stack, Game, C++, & React Native Developer</title>
        <meta charset="UTF-8" />
        <meta name="description" content="Explore a range of expert development services tailored to bring your ideas to life. Our coding solutions cover web development, mobile app development, custom software solutions, and more. Discover how our team of skilled developers can meet your unique project requirements." />
        <meta name="keywords" content="web developer, [Lahore JoharTown], Figam, Medium-fedility-wrieframe, canva, photoshop,mobile developer, [Lahore JoharTown] React Native developer, [Lahore JoharTown]  MERN Stack developer, [Lahore JoharTown] freelance developer, [Lahore JoharTown], web developer shami gondal, game developer shami gondal , app developer shami gondal, game developer Ehtisham Ahmed gondal, app developer Ehtisham Ahmed gondal, web developer Ehtisham Ahmed gondal, Canva Designer Ehtisham Ahmed gondal
                ,Photopshop Designer Ehtisham Ahmed gondal, Figma Designer Ehtisham Ahmed gondal, Medium-fedility Designer Ehtisham Ahmed gondal,
                hire [game , app, e.g., web] [Lahore JoharTown] MERN Stack, Game, C++, & React Native Developer , Services , form , hireme , contact us development services, coding solutions, web development, mobile app development, custom software solutions, skilled developers" />
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
        <div className="flex flex-col gap-5 mt-16 p-9 justify-center items-center">
          <h1 className="text-center font-bold text-4xl mb-4 font-serif text-[#f5f5f5] z-50">Services <i class="fa-brands fa-servicestack"></i></h1>
          <div className="cards flex flex-wrap justify-center items-center gap-5 md:gap-8 lg:gap-8 xl:gap-8">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className={`card mb-8 flex flex-col text-center rounded-lg cursor-pointer text-white ${card.color} 
      w-full md:w-96 overflow-hidden transition-transform duration-300 transform hover:scale-105`}
              >
                <img src={card.img} className="h-48 w-full object-cover" alt="Service Image" />
                <div className="p-4 flex-shrink-0">
                  <p className="text-lg font-bold">{card.tip}</p>
                  <p className="text-sm mt-3">{card.secondText}</p>
                  <div className="flex gap-2 mt-3 justify-center">
                    {card.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-white rounded-md text-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <button
                  className={`btn btn-primary mb-5 md:mt-5 lg:mt-5 xl:mt-5 ${card.tip.toLowerCase().includes("app development") || card.tip.toLowerCase().includes("game") ? 'cursor-not-allowed' : ''}`}
                  disabled={card.tip.toLowerCase().includes("app development") || card.tip.toLowerCase().includes("game")}
                >
                  <Link to="/Hireme">Contact me</Link>
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
