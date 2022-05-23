import React from 'react'
import Search from './Search'

const Header = ({title}) => {
 
    return (
        <header className='page-header'>
            <div className="d-flex justify-content-between px-3 ps-md-4 pe-md-3 mt-4 mt-sm-4">
                <div className="header-text-wrapper">
                    <div className='shadow-box bg-white ms-2  px-3 py-5 py-md-3 mt-md-3'>
                        <h5>  
                           {title} Hire
                        </h5>
                        <p>
                           Cheap {title} rental from owners near you.
                        </p>
                        <Search />   
                       </div>  
                       <h5 className='mt-3'>
                                 Rated Excellent on 
                                 <img 
                                     src={ require('../../../assets/trustpilot.png') }
                                      alt=' trustpilot'
                                      className='ms-1'
                                 />                    
                     </h5>                   
                </div>
                <div className="image-wrapper">
                    <img src={  require('../../../assets/bubbles.png') } alt="header" />
                </div>
            </div>               
        </header>
  )

}

export default Header