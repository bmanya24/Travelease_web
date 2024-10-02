import React from "react";
import "../styles/Home.css";
import { Button, Heading } from "@chakra-ui/react";
const Home = () => {
  return (
    <div id='home'>
      <div className='resp'>
        <div id='imgSection'>
          <div className='box1'>
            <img
              id='main'
              src='https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='img1'
            />
          </div>
          <div className='box2'>
            <img
              id='main'
              src='https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=600'
              alt='img2'
            />
          </div>
        </div>
        <div className='container'>
          <div id='textSection'>
            <Heading id='heading'>Explore, Discover, Wander: Your Journey Begins Here!</Heading>
            <span id='span'>
            Welcome to Travelease, where every click opens the door to a new adventure! Immerse yourself 
            in a world of exploration, discover hidden gems, and wander through the extraordinary. Your 
            journey starts with us—seamless bookings, exclusive experiences, and a community of fellow 
            explorers. Let's turn your travel dreams into unforgettable realities. Join us on the path to discovery!
            #ExploreWithUs #DiscoverMore #WanderlustJourney






            </span>
          </div>

          <Button id='btn'>
            <a href='#about'>Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
