import React from 'react'

const ExperienceMore = () => {
  return (
    <div className='request-a-callback'>
        <div className="h-100 w-100 pt-4 pb-4 text-white px-1 px-md-0" >
            <h5 className='text-center mt-3'> Ready to own less & experience more? </h5>
            <p className='text-center px-2'>
                Say Bye to Buy and turbocharge your business with 28bookings.
            </p>
            <button  onClick={ () => {
                            window.scrollTo({ top : 0 , behavior : 'smooth' })
                            document.querySelector('.request-form-name-input').focus()
                        }} 
                className='btn btn-light py-1 mx-auto d-block mb-4'>
                    Request a Callback 
            </button>
        </div>
   </div>
  )
}

export default ExperienceMore