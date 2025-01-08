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
            <PersonCard image="https://i.ibb.co/x2wd129/president.jpg" name="Taha Abbas" position="President" />
          </div>
          <div className="flex gap-8 lg:gap-16 md:gap-8 justify-center md:flex flex-wrap">
            <PersonCard image="https://i.ibb.co/Xsf9F2c/Vice-President-Ghulam.jpg" name="Ghulam Mohiuddin" position="Vice President" />
            <PersonCard image="https://i.ibb.co/7SPx6cv/Vice-President-Anush.jpg" name="Anush Hussain" position="Vice President" />
          </div>
          <div className='flex gap-8 lg:gap-16 md:gap-8 flex-wrap justify-center'>
            <PersonCard image="https://i.ibb.co/pf1JGGS/Untitled.jpg" name="Wisha Zahid" position="General Secretary" />
            <PersonCard image="https://i.ibb.co/Xp0kRHJ/treasurer.jpg" name="Shahzaib Mirza" position="Treasurer" />
            <PersonCard image="https://i.ibb.co/Jvp9x7h/saim.jpg" name="Muhammad Saim" position="Branding Director" />
          </div>
          <div className="flex gap-8 lg:gap-16 md:gap-8 flex-wrap justify-center">
            <PersonCard image="https://i.ibb.co/41b4HHN/Event-Manager-Moeed.jpg" name="Moeed Uddin" position="Event Manager" />
            <PersonCard image="https://i.ibb.co/h1MrPCb/event-manager-ausaja.jpg" name="Ausaja Hussain" position="Event Manager" />
            <PersonCard image="https://i.ibb.co/MPZ6f7d/Esports-Head-zohaib.jpg" name="Zohaib Siddiqui" position="E-Sports Director" />

          </div>
          <div className="flex gap-8 lg:gap-16 md:gap-8 flex-wrap justify-center">
            <PersonCard image="https://i.ibb.co/Zx23dw5/DC-Head-Ansar.jpg" name="Anser Tayyab" position="Director Discipline Affairs" />
            <PersonCard image="https://i.ibb.co/sKx48qr/dc-head-Almeeza.jpg" name="Almeeza Tariq" position="Director Discipline Affairs" />
          </div>
        </div>


    </div>
  );
};

export default TeamPage;


