import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

const Reservations = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [reservationReceived, setReservationReceived] = useState(false);
  const localhost = 'https://myportfolio-server-side.onrender.com'
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`${localhost}/api/getFormDetails`);
        const data = await response.json();
        console.log(data);
        setFormDetails(data);
        setReservationReceived(false)

        // Check if new reservations are received
        if (data.length > formDetails.length) {
          // If new reservation is received, set reservationReceived to true
          setReservationReceived(true);

          // Reset reservationReceived after a certain delay (e.g., 5 seconds)
          setTimeout(() => {
            setReservationReceived(false);
          }, 5000);
        }
      } catch (error) {
        console.error('Error fetching form details:', error.message);
      }
    };

    fetchFormDetails();
  }, [formDetails]);

  useEffect(() => {
    // Play a notification sound when a new reservation is received
    if (reservationReceived) {
      const notificationSound = new Audio('../assets/'); // replace with your sound file
      notificationSound.play();
    }
  }, [reservationReceived]);


  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title className='text-xs'>Shami's Portfolio - Reservations Details | MERN Stack, Game, C++, & React Native Developer</title>
                <meta charset="UTF-8" />
                <meta name="description" content="Crafting Innovative Solutions - Your Vision, My Expertise
                Bring your digital ideas to life with [Ehtisham Ahmed Gondal], a skilled and passionate developer crafting solutions that captivate and engage. Masterful command of [React Native , C++, e.g., MERN Stack, React Native, C++ , Canva, PhotoShop, Figma, Medium-fedility.wireframe]A proven track record of building captivating [types of projects you build, e.g., web applications, mobile apps, games].An unwavering commitment to exceeding expectations and delivering exceptional results" />
                <meta name="keywords" content="web developer, [Lahore JoharTown], Figam, Medium-fedility-wrieframe, canva, photoshop,mobile developer, [Lahore JoharTown] React Native developer, [Lahore JoharTown]  MERN Stack developer, [Lahore JoharTown] freelance developer, [Lahore JoharTown], web developer shami gondal, game developer shami gondal , app developer shami gondal, game developer Ehtisham Ahmed gondal, app developer Ehtisham Ahmed gondal, web developer Ehtisham Ahmed gondal, Canva Designer Ehtisham Ahmed gondal
                ,Photopshop Designer Ehtisham Ahmed gondal, Figma Designer Ehtisham Ahmed gondal, Medium-fedility Designer Ehtisham Ahmed gondal,
                hire [game , app, e.g., web] [Lahore JoharTown]" />
                <meta name="author" content="Ehtisham Ahmed Gondal" />
            </Helmet>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 mt-20 text-center">Reservation Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {formDetails.map((formData) => (
          <div key={formData._id} className="bg-white p-4 rounded-md shadow-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-1 lg:col-span-2">
                <p className="text-gray-700 mb-2">{formData.name}</p>
                <p className="text-gray-700 mb-2">{formData.email}</p>
                <p className="text-gray-700 mb-2">{formData.companyName}</p>
                <p className="text-gray-700 mb-2">{formData.websiteURL}</p>
                <p className="text-gray-700 mb-2">{formData.moreDetails}</p>
                <p className="text-gray-700 mb-2">{formData.budget}</p>
                <p className="text-gray-700 mb-2">{formData.moreDetails}</p>
                <p className="text-gray-700 mb-2">
                  {Object.keys(formData.services).filter((key) => formData.services[key]).join(', ')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Reservations;
