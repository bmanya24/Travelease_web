import React, { useEffect, useState } from "react";
import "../styles/HotelCard.css";
import { Button, Heading } from "@chakra-ui/react";
import { RiStarSFill } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCupHotFill } from "react-icons/bs";
import axios from "axios";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const HotelCard = () => {
  const [hotelData, setHotelData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/hotels")
      .then((response) => {
        setHotelData(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch hotel data. Please try again later.");
        console.log(error);
      });
  }, []);

  const localData = JSON.parse(localStorage.getItem("currentData")) || {};
  const selectedLocation = localData.placeName || ""; // Get the selected location

  // Filter hotels by the selected location
  const filteredHotels = hotelData.filter((hotel) =>
    hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
  );

  const handleBookNow = (hotel) => {
    const combinedData = { ...localData, ...hotel };
    localStorage.setItem("currentData", JSON.stringify(combinedData));
    navigate("/flights");
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    const maxStars = 5; // Maximum number of stars
    const filledStars = Math.floor(rating); // Get the number of filled stars
    const emptyStars = maxStars - filledStars; // Calculate the number of empty stars

    return (
      <>
        {Array.from({ length: filledStars }, (_, index) => (
          <RiStarSFill key={index} className="star-icon" />
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <RiStarSFill key={index + filledStars} className="star-icon empty" />
        ))}
      </>
    );
  };

  return (
    <div id='HotelCardBody'>
      <Heading>Available Hotels in {selectedLocation}...</Heading>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {filteredHotels.length > 0 ? (
        filteredHotels.map((hotel, index) => (
          <div key={index}>
            <div id='HotelContainer'>
              <div id='LeftHotelBox'>
                <img src={hotel.imageURL} alt={hotel.hotelName} />
              </div>
              <div id='MiddleHotelBox'>
                <div id='MiddleHotelBoxTop'>
                  <div id='HotelName'>
                    <p>{hotel.hotelName}</p>
                  </div>
                  <div id='HotelLocation'>
                    <FaMapMarkerAlt />
                    <p>{hotel.location}</p> {/* Ensure location is visible */}
                  </div>
                </div>
                <div id='HotelRatingTag'>
                  <div id='star'>
                    {renderStars(hotel.rating)} {/* Render stars based on rating */}
                  </div>
                  <p>{hotel.rating} Ratings</p>
                </div>
              </div>

              <div id='RightHotelBox'>
                <p id='HotelPrice'>$ {hotel.pricePerNight}</p>
                <p>+ $ {hotel.pricePerNight * 0.20} TAXES & FEES</p>
                <p>1 room per night</p>
                <div id='BreakFastSection'>
                  <BsCupHotFill />
                  <p>INCL OF FREE BREAKFAST</p>
                </div>
                <Button
                  colorScheme='whatsapp'
                  onClick={() => handleBookNow(hotel)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hotels available in {selectedLocation}.</p>
      )}
    </div>
  );
};

export default HotelCard;
