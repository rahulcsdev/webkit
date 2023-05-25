import React, { useState } from 'react';
import UserSkills from './UserSkills';
import UserPersonalInformation from './UserPersonalInformation';
import UserAbout from './UserAbout';

const UserNavbar = () => {
  const [viewMode, setViewMode] = useState('skills'); // Set initial viewMode to 'skills'

  const clickS = "text-secondary border-b-2 border-secondary";
  const notClickS = "text-black";
;

  let componentToRender;

  if (viewMode === 'skills') {
    componentToRender = <UserSkills />;
  } else if (viewMode === 'personalInfo') {
    componentToRender = <UserPersonalInformation />;
  } else if (viewMode === 'about') {
    componentToRender = <UserAbout />;
  }

  return (
    <div className='px-5 py-6'>
      <nav>
        <ul className='flex  items-center gap-10 mt-5'>
          <li>
            <div onClick={() => setViewMode('skills')} className={`${viewMode === 'skills' ? clickS : notClickS}`}>
              <p className='mb-2 text-xl'>My Skills</p> 
            </div>
          </li>
          <li>
            <div onClick={() => setViewMode('personalInfo')} className={`${viewMode === 'personalInfo' ? clickS : notClickS}`}>
              <p className='mb-2 text-xl'>Personal Information</p>
            </div>
          </li>
          <li>
            <div onClick={() => setViewMode('about')} className={`${viewMode === 'about' ? clickS : notClickS}`}>
              <p className='mb-2 text-xl'>About</p>
            </div>
          </li>
        </ul>
      </nav>
      <div>{componentToRender}</div>
    </div>
  );
};

export default UserNavbar;

