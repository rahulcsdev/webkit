// import React from 'react';
// import { Text , Grid , Image } from '@mantine/core';
// import ProgressBar from "../../components/ProgressBar";
// import UserSkiilsData from "../../utils/data";

// const UserSkills = () => {
//   return (
//     <>
//     <div>
//       <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis viverra viverra mollis sed vitae fames nunc sollicitudin viverra. Curabitur massa, ultrices diam ipsum faucibus risus. Hendrerit justo, quis massa a elementum. At elementum.</Text>

//       <Grid>
//       <Grid.Col span={6}>
//         <div className='flex items-center'>
//         <Image
//           src="assets/01.png"
//           height={40}
//           width={40}
//           alt="01"
//         />
//         <div>
//           <p>Adobe Photoshop</p>
//           <h6>85%</h6>
//           <div className="w-full mb-6 mt-6">
//           <ProgressBar percentage="85" />
//         </div>
//         </div>
//         </div>
//       </Grid.Col>
//       <Grid.Col span={6}>
        
//       </Grid.Col>
//       </Grid>
//     </div>


//     </>
//   )
// }

// export default UserSkills;

import React from 'react';
import { Text, Grid, Image } from '@mantine/core';
import ProgressBar from "../../components/ProgressBar";
import { UserSkiilsData } from "../../utils/data";

const UserSkills = () => {
  return (
    <>
      <div>
        <h4  className='mt-5 text-xl text-gray-600 leading-9'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis viverra viverra mollis sed vitae fames nunc sollicitudin viverra. Curabitur massa, ultrices diam ipsum faucibus risus. Hendrerit justo, quis massa a elementum. At elementum.
        </h4>

        <Grid className='mt-2'>
          {UserSkiilsData.map((skill, index) => (
            <Grid.Col span={6} key={index} className='mt-5 mb-4'>
              <div className='flex items-center'>
                <Image
                  src={skill.image}
                  height={40}
                  width={40}
                  alt={skill.title}
                />
                <div className='ml-4 w-full'>
                <div className='flex items-center justify-between'>
                  <p>{skill.title}</p>
                  <h6>{skill.percentage} %</h6>
                </div>
                <div className="w-full mb-2 mt-6">
                    <ProgressBar percentage={skill.percentage} />
                  </div>
                </div>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default UserSkills;
