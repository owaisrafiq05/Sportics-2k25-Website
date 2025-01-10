import React from 'react';
import { PersonCard } from './PersonCard';

const TeamPage = () => {
  return (
    <div className='flex flex-col justify-center items-center w-[100%] py-12 px-12  mb-28'>
        
        <div className='flex justify-center items-center w-[100%] py-12'>
          <h1 className="integral-cf text-center text-5xl md:text-7xl font-bold py-6 px-2 bg-gradient-to-b from-gray-400 to-gray-600 text-transparent bg-clip-text">
            OUR TEAM
          </h1>
        </div>

        <div className="flex flex-col lg:gap-16 md:gap-8 gap-8 flex-wrap">
          <div className='flex justify-center'>
            <PersonCard image="https://i.ibb.co/44bLHW7/president.jpg" name="Taha Abbas" position="President" />
          </div>
          <div className="flex gap-8 lg:gap-16 md:gap-8 justify-center md:flex flex-wrap">
            <PersonCard image="https://i.ibb.co/6sHRFWy/Whats-App-Image-2025-01-10-at-15-13-11-324996ce.jpg" name="Ghulam Mohiuddin" position="Vice President" />
            <PersonCard image="https://i.ibb.co/KLC12BY/IMG-20240426-WA0272-2.jpg" name="Anush Hussain" position="Vice President" />
          </div>
          <div className='flex gap-8 lg:gap-16 md:gap-8 flex-wrap justify-center'>
            <PersonCard image="https://i.ibb.co/ZB8WLNw/Untitled.jpg" name="Wisha Zahid" position="General Secretary" />
            <PersonCard image="https://i.ibb.co/QX4jQN4/treasurer.jpg" name="Shahzaib Mirza" position="Treasurer" />
            <PersonCard image="https://i.ibb.co/XjYLNNz/Event-Manager-Moeed.jpg" name="Moeed Uddin" position="Event Manager" />
          </div>
          <div className="flex gap-8 lg:gap-16 md:gap-8 flex-wrap justify-center">
            <PersonCard image="https://i.ibb.co/jfNb3GK/Ausaja-Image.jpg" name="Ausaja Hussain" position="Event Manager" />
            <PersonCard image="https://i.ibb.co/gJTyZ88/Esports-Head-zohaib.jpg" name="Zohaib Siddiqui" position="E-Sports Director" />
            <PersonCard image="https://i.ibb.co/nbTRqfH/DC-Head-Ansar.jpg" name="Anser Tayyab" position="Director Discipline Affairs" />

          </div>
          <div className="flex gap-8 lg:gap-16 md:gap-8 flex-wrap justify-center">
            <PersonCard image="https://i.ibb.co/QK0SGtd/dc-head-Almeeza.jpg" name="Almeeza Tariq" position="Director Discipline Affairs" />
            <PersonCard image="https://i.ibb.co/S0DmNVt/saim.jpg" name="Muhammad Saim" position="Design Director" />
          </div>
        </div>


    </div>
  );
};

export default TeamPage;


