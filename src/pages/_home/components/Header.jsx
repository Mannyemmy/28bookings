import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'
import RotatingText from './RotatingText'

const Header = () => {
 
    return (
        <header className='page-header'>
            <div className="d-flex justify-content-between px-2 ps-md-4 pe-md-3 mt-4 mt-sm-4">
                <div className="header-text-wrapper">
                        <h5>  
                            Rent  <strong >  <RotatingText /> </strong><br /> 
                            from people in your area
                        </h5>
                        <p>
                           Borrow almost anything from people nearby for jobs 
                           at home, fun experiences or work.
                        </p>
                        <Search />
                        <div className='mt-2 d-flex align-items-center pt-1'>
                            <span > or </span>
                            <Link to='/list-an-item' className='btn py-1 ms-2 px-2'> List an item </Link>
                        </div>
                </div>
                <div className="image-wrapper">
                    <img src={  require('../../../assets/bubbles.png') } alt="header" />
                </div>
            </div>               
        </header>
  )

}

export default Header