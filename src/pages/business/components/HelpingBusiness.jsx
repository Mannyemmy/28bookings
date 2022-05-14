import React from 'react'
 
const HelpingBusiness = () => {
    
 const images = [
    require('../../../assets/laptop.PNG') ,
    require('../../../assets/photo-video.PNG') ,
    require('../../../assets/light-audio.PNG') ,
    require('../../../assets/gaming.PNG') ,
 ]

  return (
    <div className='helping-business px-1 px-md-4 mt-5'>
          <h5 className='mb-3'>
              We love helping Businesses across
          </h5>
          <div className='d-block w-100'>
               {
                   images.map(  ( imgSrc , id) => {
                       return(
                           <img key={id} src={  imgSrc } alt="assets" className='inline-block me-3' />
                       )
                   })
               }
          </div>
    </div>
  )
}

export default HelpingBusiness