import { useState, useEffect } from 'react';

const Reservations = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [reservationReceived, setReservationReceived] = useState(false);
  const localhost = 'http://ec2-13-60-10-186.eu-north-1.compute.amazonaws.com:4000/api'
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`${localhost}/getFormDetails`);
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
  );
};

export default Reservations;
