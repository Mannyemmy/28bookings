import React from 'react'

const HowItWorks = () => {
  return (
    <div className='how-it-works mt-4 py-3'>
        <h5 className='text-center mb-3'>  How It Works? </h5>
        <div className="row w-100 p-0 m-0 px-md-4 px-xl-5 mx-auto justify-content-center">
            <div className="col-12 col-sm-6 col-md-3">
                 <h6>
                    <b className='me-1 mb-1'> 1. </b> Arrange
                 </h6>
                 <p>
                    Make sure you’re available for handovers on the days being booked by the borrower.
                 </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                 <h6>
                    <b className='me-1 mb-1'> 2. </b> Accept
                 </h6>
                 <p>
                     Once a user is verified by our risk algorithms and our team,
                      you’ll receive a request to accept.
                 </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                 <h6>
                    <b className='me-1 mb-1'> 3. </b> Handover
                 </h6>
                 <p>
                   Take a few pictures of the items and hand them over to the borrower.
                 </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                 <h6>
                    <b className='me-1 mb-1'> 4. </b> Payment
                 </h6>
                 <p>
                    24 hours after the rental starts, we’ll pay out your earnings to your account.
                 </p>
            </div>
        </div>
    </div>
  )
}

export default HowItWorks