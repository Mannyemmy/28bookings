import React from 'react'
import WhyRentWithUs from './WhyRentWithUs'

const ExploreOtherOptions = () => {

    const [  moreOptions ] = React.useState([
        'DSLR Camera Hire','Wedding Dress Hire','Sony DSLR Camera Hire',
        'Sony FS7 Cinema Camera Hire','Samyang Cinema Prime Lens Hire',
        'Guitar Amp Hire','Canon EOS 5D Mark III Hire','Camping Hire',
        'Sigma 18-35mm Lens Hire','Gym Equipment Hire','Canon EOS 6D Mark II Hire',
        'PC Monitor Hire','Rig / Stabiliser / Gimbal Hire','Xbox Console & Game Hire',
        'GoPro Hero Hire','Canon Cinema Prime Lens Hire','Party & Events Hire'
    ])

  return (
    <div className='explore-other-options px-1 px-md-3 pt-5 pb-3'>
         <h5 className='mt-4 '>   Find more in London </h5>
         <ul className='row w-100 p-0 m-0 mx-auto'>
             {
               moreOptions.map(  (option,id) => {
                   return(
                      <li className='col-12 col-md-4 mt-2' key={id}>
                           { option }
                      </li>
                   )
               } )
             }
         </ul>
         <WhyRentWithUs />
    </div>
  )
}

export default ExploreOtherOptions