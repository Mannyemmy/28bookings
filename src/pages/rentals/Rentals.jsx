import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/_navbar/Navbar'

const Rentals = () => {
 
    React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))

    return (
    <>
      <Navbar />
       <div className='rentals'>
          <h1 className='border-bottom border-top py-2 ps-2 bi bi-bag-check'> Rentals </h1>
          <div className='d-flex justify-content-center'>
                <div className='wrapper py-3'>
                    <img 
                         src={ require('../../assets/no-rental.PNG') }
                         alt='empty inbox'
                         className='d-block mx-auto'
                    />
                    <div className='no-inbox text-center mb-3'>
                         <h5 className='text-center mb-1'> No rentals yet </h5>
                         <p className='text-center'>
                           This is where you'll see the items you've rented from others
                         </p>
                         <Link to={'/list-an-item'} className='btn btn-success py-1 px-3'>
                               List an item 
                         </Link>
                    </div>
                </div>
          </div>
       </div>
    </>
  )
}

export default Rentals