import { Heading, Button } from "@chakra-ui/react"; // Import Chakra UI components
import React from "react";
import { useNavigate } from "react-router-dom"; // To handle navigation
import "../styles/Flights.css"; // Import styles

const Flights = () => {
  const navigate = useNavigate();

  // Function to handle the flight booking button click
  const handleFlightBooking = () => {
    navigate("/flights"); // Navigate to the flights page
  };

  return (
    <div id="flights">
      <div id="text">
        <Heading>Best and Comfortable Flights Experience</Heading>
        <div className="desc">
          <p>
            From the moment you step on board, our dedicated team is committed
            to providing a smooth and unforgettable experience, ensuring your
            flight is nothing short of extraordinary.
          </p>
        </div>
      </div>
      <div className="flightContainer">
        <div className="flightCard">
          <img
            src="https://cdn.britannica.com/69/155469-131-14083F59/airplane-flight.jpg"
            alt="Flight"
            className="flightImage" // Add a class for styling
          />
        </div>
        <div className="flightCard">
          <img
            src="https://ratedrecruitment.co.uk/uploads/blog/cabin-crew.jpg"
            alt="Cabin Crew"
            className="flightImage"
          />
        </div>
        <div className="flightCard">
          <img
            src="https://uchealth-wp-uploads.s3.amazonaws.com/wp-content/uploads/sites/6/2020/03/03103927/Travel-photo-tiny.webp"
            alt="Travel"
            className="flightImage"
          />
        </div>
      </div>
      <Button
        colorScheme="blue"
        size="md"
        onClick={handleFlightBooking} // Handle button click
        marginTop="20px" // Add some margin to space it from text
      >
        Book a Flight
      </Button>
    </div>
  );
};

export default Flights;
