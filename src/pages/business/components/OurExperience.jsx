import React from 'react'

const OurExperience = () => {

  return (
    <div className='our-experience mt-4 pt-3'> 
        <h5 className='text-center'>  The  <strong> 28</strong>bookings Experience  </h5>
        <div className="row w-100 p-o m-0 mx-auto px-1 px-md-3 mt-2">
             <div className="col-12 mt-3 mt-sm-2 col-md-4">
                  <img 
                       src={ require('../../../assets/mf_experience_as_new.png') }
                        alt="asset" 
                        className='d-block mx-auto'
                  />
                  <h5>  As good as New </h5>
                  <p>
                     All 28bookings devices undergo multiple quality
                      tests to ensure they make you smile during the 
                      entire rental period. In case they still give 
                      you any trouble, we will replace the assets at the earliest.
                  </p>
             </div>

             <div className="col-12 mt-3 mt-sm-2 col-md-4">
                  <img 
                       src={ require('../../../assets/mf_experince_customer_support.png') }
                        alt="asset" 
                        className='d-block mx-auto'
                  />
                  <h5>  Dedicated customer support </h5>
                  <p>
                     Our support team is a call or email away during 
                     your rental duration. In case of any asset issues,
                      we aim to diagnose this within 4 working hours.
                  </p>
             </div>

             <div className="col-12 mt-3 mt-sm-2 col-md-4">
                  <img 
                       src={ require('../../../assets/mf_experience_flexible_tenure.png') }
                        alt="asset" 
                        className='d-block mx-auto'
                  />
                  <h5>  
                         Flexible Tenure 
                  </h5>
                  <p>
                      We understand every business is different and that’s
                       why we’ve designed flexible tenures for all products
                        starting from 1 Month to 1+ Years. You can easily 
                        swap, upgrade or return your gadgets during your rental duration.
                  </p>
             </div>
        </div>
    </div>
  )
}

export default OurExperience