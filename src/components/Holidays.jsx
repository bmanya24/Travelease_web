import { Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../styles/Holidays.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Holidays = () => {
  const [placesData, setPlacesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/destinations`)
      .then((response) => {
        setPlacesData(response.data.slice(0, 6)); // Display top 3 destinations
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleBook = (place) => {
    const userData = JSON.stringify(place);
    localStorage.setItem("currentData", userData);
    navigate("/hotels");
  };

  return (
    <div id="holidays">
      <div id="text">
        <Heading>Find Popular Destinations</Heading>
        <div className="desc">
          <p>
            Escape the ordinary and explore the extraordinary - with our
            handpicked selection of destinations and travel deals, you'll be
            able to create the trip of your dreams.
          </p>
        </div>

        <Button id="Explore">
          <Link to="/destinations">Explore More </Link>
        </Button>
      </div>
      <div id="holidaysContainer">
        {placesData.map((place) => (
          <div className="box" key={place.id}>
            <div className="holidayImage">
              <img src={place.imageURL} alt={place.placeName} />
            </div>
            <div className="content">
              <Heading>{place.placeName}</Heading>
              <h2>{place.tripDuration}</h2>
              <div className="bookingBox">
                <div className="priceBox">
                  <span id="starts">Starts from</span>
                  <span id="price">${place.price} / person</span>
                </div>
                <Button
                  id="btn"
                  onClick={() => {
                    handleBook(place);
                  }}
                >
                  Book
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Holidays;
