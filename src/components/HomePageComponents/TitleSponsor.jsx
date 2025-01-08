import React from 'react';

const tempImage = "https://i.ibb.co/0MYbGtD/rb-55783.png";

const TitleSponsor = () => {
  return (
    <div className='w-[100%] uppercase font-bold flex justify-center items-center flex-col gap-y-4'>
        <h1 className=" text-white text-3xl">
            <span className="text-[#10a2b5] text-center">Title Sponsor</span>
        </h1>
        <div className='flex sm:flex-row flex-col justify-center items-center sm:gap-x-8 gap-y-8 w-[50%]'>
            <a href="" target="_blank" rel="noopener noreferrer">
                <img src={tempImage} alt="Title Sponsor" className='w-72' /> {/* Increased image size */}
            </a>
        </div>
    </div>
  );
}

export default TitleSponsor;