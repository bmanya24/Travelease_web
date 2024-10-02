import React, { useEffect, useState } from "react";
import "../styles/FlightCard.css";
import { Button, Heading } from "@chakra-ui/react";
import { ImSpoonKnife } from "react-icons/im";
import axios from "axios";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const FlightCard = () => {
  const [flightData, setFlightData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3003/flights")
      .then((response) => {
        setFlightData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flight data:", error);
      });
  }, []);

  const localData = JSON.parse(localStorage.getItem("currentData")) || [];
  let destinationCity = "";
  
  if (!isEmpty(localData.placeName)) {
    let parts = localData.placeName;
    destinationCity = parts; // Assuming the first part is the city
  }

  const handleBookNow = (flight) => {
    const combinedData = { ...localData, ...flight };
    localStorage.setItem("currentData", JSON.stringify(combinedData));
    navigate("/signup");
  };

  return (
    <div id='flightCardsBody'>
      <Heading>Available Flights to {destinationCity}...</Heading>
      {flightData
        .filter(flight => flight.to.city.toLowerCase() === destinationCity.toLowerCase()) // Filter by destination city
        .map((flight, index) => (
          <div key={index}>
            <div id='FlightContainer'>
              <div id='Section2'>
                <div id='Devider1'>
                  <div id='FlightDetails'>
                    <div id='FlightLogo'>
                      <img src={flight.airline_logo} alt='Airline Logo' />
                    </div>
                    <div id='FlightName'>
                      <p>{flight.airline}</p>
                      <p>{flight.from.airport_name}</p>
                    </div>
                  </div>
                  <div id='TimeSection'>
                    <div id='TimeBox'>
                      <p>{new Date(flight.departure_time).toLocaleString()}</p>
                      <p>{flight.from.city}, {flight.from.country}</p>
                    </div>
                    <div id='Line'></div>
                    <div id='TimeBox'>
                      <p>{new Date(flight.arrival_time).toLocaleString()}</p>
                      <p>{flight.to.city}, {flight.to.country}</p>
                    </div>
                  </div>
                </div>
                <div id='Devider2'>
                  <div id='TotalTime'>
                    <p>{flight.total_time}</p>
                    <p>Non Stop</p>
                  </div>
                  <div id='FlightPrice'>
                    <p>$ {flight.price}</p>
                    <Button
                      colorScheme='red'
                      variant='outline'
                      onClick={() => handleBookNow(flight)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
              <div id='Section3'>
                <div id='FlightFooter'>
                  <div id='MealSection'>
                    <ImSpoonKnife />
                    <p>Free Meal</p>
                  </div>
                  <div id='Emissions'>
                    <p>Emissions: 142 Kg CO2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FlightCard;
