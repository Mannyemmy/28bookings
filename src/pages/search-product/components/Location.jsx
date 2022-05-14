import React from 'react'

const Location = ({ id }) => {
  return (
    <>
         <div className='modal fade location-modal' id={ id }> 
            <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down'>
                <div className='modal-content'>
                
                <div className='modal-header py-3 py-md-2'>
                    <h4 className='modal-title bi bi-brightness-high'> &nbsp; Select your location </h4>
                    <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
                </div>
                
                <div className='modal-body  mx-auto'>
                        <div className=' input-group w-100'>                        
                            <input        
                                    name='search-address'                             
                                    type='search' 
                                    className='form-control ' 
                                    placeholder='Type an address..'
                            />
                            <span 
                                data-bs-toggle='tooltip' title='Search almost anything..'
                                className='input-group-text px-1 sp-1 bi ps-md-2 bi-search pe-2'>
                            </span>
                        </div>
                        <div className="d-flex mt-3">
                             <img src={ require('../../../assets/current-location-coloured.png') } alt="" />
                             <div className='ps-1'> 
                                  <h6 className='mb-0'>Select my location </h6> 
                                  <p className='mb-3'>  We will show you items near you sorted by distance </p>
                            </div>
                        </div>
                        <h5>  POPULAR </h5>                    
                          <ul className='p-0 m-0'>
                            <li className='py-2 border-bottom'>  London </li>
                            <li className='py-2 border-bottom'> Bristol  </li>
                            <li className='py-2 border-bottom'> Manchester  </li>
                            <li className='py-2 border-bottom'> Edinburgh  </li>
                            <li className='py-2 border-bottom'> Leeds  </li>
                            <li className='py-2 border-bottom'> Norwich  </li>
                            <li className='py-2 border-bottom'> Cardiff  </li>
                            <li className='py-2 border-bottom'> Birmingham  </li>
                        </ul>
                </div>         
                </div>
            </div>
        </div>
    </>
  )
}

export default Location