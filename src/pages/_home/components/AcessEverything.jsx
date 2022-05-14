import React from 'react'
import { Link } from 'react-router-dom'

const AccessEverything = () => {
  return (
    <div className='access-everything mb-3 mb-md-5 pb-0 pb-md-4'>
       <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320">
                <path
                    fill="rgb(44, 203, 187)" 
                    fill-opacity="1" 
                    d="M0,256L26.7,261.3C53.3,267,107,277,160,256C213.3,235,267,181,320,170.7C373.3,160,427,192,480,224C533.3,256,587,288,640,266.7C693.3,245,747,171,800,144C853.3,117,907,139,960,165.3C1013.3,192,1067,224,1120,208C1173.3,192,1227,128,1280,128C1333.3,128,1387,192,1413,224L1440,256L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z">
               </path>
        </svg>
        <div className='w-100 m-0 p-0 d-flex justify-content-between pb-md-4 text-white'>
            <img src={ require('../../../assets/slant.png')} alt="slant" />
            <div className='align-self-center px-2 px-md-0'>
                    <h5> Access anything on the go  </h5>
                    <p className='pe-1'>
                        Message and rent at the tap of a button. 
                        The 2b8bookings app is the easiest way to
                        find what you need, manage your rentals and 
                        purchases and get instant updates. Get it now on iOS and Android.
                    </p>
                    <Link to={'/how-it-worked'} className='btn btn-light py-1'> Learn more  </Link>
            </div>
        </div>
    </div>
  )
}

export default AccessEverything