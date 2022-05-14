import React from 'react'

const HowItWorks = () => {
  return (
    <div className='how-it-works mt-4 py-3 mb-3'>
        <h5 className='text-center mb-3'>  How Rental Works? </h5>
        <div className="row w-100 p-0 m-0 px-md-4 px-xl-5 mx-auto justify-content-center">
            <div className="col-12 col-sm-6 col-md-3">
                 <h6>
                    <b className='me-1 mb-1'> 1. </b> Find
                 </h6>
                 <p>
                    Find what you’re looking for, from projectors to pogo sticks
                 </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                 <h6>
                    <b className='me-1 mb-1'> 2. </b> Book
                 </h6>
                 <p>
                    Book the item for your chosen dates and let us verify you
                 </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                 <h6>
                    <b className='me-1 mb-1'> 3. </b> Play
                 </h6>
                 <p>
                    Arrange collection from the lender and enjoy your rental
                 </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                 <h6>
                    <b className='me-1 mb-1'> 4. </b> Return
                 </h6>
                 <p>
                    Return the item to the lender and leave them a review
                 </p>
            </div>
        </div>
    </div>
  )
}

export default HowItWorks