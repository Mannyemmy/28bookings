import React from 'react'
import {formatCurrency} from "../../../helper"
import {useGetRentalInboxMessagesQuery, useGetInboxMessagesQuery} from "../../../services/messagesApi";

const MyStarts = ({user}) => {

    const {data, isLoading, isSuccess}  = useGetRentalInboxMessagesQuery();
    const {data : orders} = useGetInboxMessagesQuery();

  return (
    <>
       <button className='btn my-starts py-0 my-0' data-bs-toggle='modal' data-bs-target='#my-starts'>
           My Stats
        </button> 
        <div className='modal  fade' id='my-starts'>
            <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down'>
                <div className='modal-content'>     
                    <div className='modal-header py-3 py-md-2'>
                        <h4 className='modal-title'> My Statistics </h4>
                        <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
                    </div>     
                    <div className='modal-body'>
                        <div className='earnings d-flex border-bottom pb-1 w-100'>
                            <div className='d-flex'>
                                <img src={ require('../../../assets/coins.PNG') } alt='coins' />
                                <div>
                                    <h5 className='mb-1'>{formatCurrency(user.user_balance)} </h5>
                                    <p className='mb-0' style={{ fontWeight:300 }}> Lifetime earnings </p>
                                </div>
                            </div>
                            <div className='rentals  ps-3 pe-2'>
                                 <h5 className='mb-0'> Rentals </h5>
                                   {
                                       data && data.length
                                   }
                            </div>
                            <div className='rentals  ps-3 pe-2'>
                                 <h5 className='mb-0'> Request </h5>
                                   {orders && orders.length}
                            </div>
                            <div className='rentals  ps-3 pe-2'>
                                 <h5 className='mb-0'> Enquiries </h5>
                                   0
                            </div>
                            <div className='rentals  ps-3 pe-2'>
                                 <h5 className='mb-0'> Accepted </h5>
                                   N/A
                            </div>
                        </div>
                        {/* <div className='reports mt-3 mt-md-2'>
                             <h5 className='mb-1'>
                                   Reports 
                                   <button className='btn btn-success py-1 ms-3'>
                                        Last 30 days  
                                   </button>
                             </h5>
                             <div className='row w-100 p-0 m-0 mx-auto justify-content-between'>
                                 <div className='col-12 col-md-5 mt-2'>
                                     <p className='mb-0'>   £arnings </p>
                                     <div>
                                         <big> $0.00 </big>   <span className='text-success'> +0% </span>  
                                         vs previous period
                                     </div>
                                 </div>
                                 <div className='col-12 col-md-5 mt-3 mt-md-2'>
                                     <p className='mb-0'>   Rentals </p>
                                     <div>
                                         <big> 0 </big>   <span className='text-success'> +0% </span>  
                                         vs previous period
                                     </div>
                                 </div>
                                 <div className='col-12 col-md-5 mt-3 mt-md-2'>
                                     <p className='mb-0'> Requests </p>
                                     <div>
                                         <big> 0 </big>   <span className='text-success'> +0% </span>  
                                         vs previous period
                                     </div>
                                 </div>
                                 <div className='col-12 col-md-5 mt-3 mt-md-2'>
                                     <p className='mb-0'>  Acceptance rate </p>
                                     <div>
                                         <big> N/A </big>   <span className='text-success'> +0% </span>  
                                         vs previous period
                                     </div>
                                 </div>
                                 <div className='col-12 col-md-5 mt-3 mt-md-2'>
                                     <p className='mb-0'>  Message enquiries </p>
                                     <div>
                                         <big> 0 </big>   <span className='text-success'> +0% </span>  
                                         vs previous period
                                     </div>
                                 </div>
                                 <div className='col-12 col-md-5 mt-3 mt-md-2'>
                                     <p className='mb-0'>  Response rate </p>
                                     <div>
                                         <big> N/A </big>   <span className='text-success'> +0% </span>  
                                         vs previous period
                                     </div>
                                 </div>                                 
                             </div>
                             <p className='note mb-0 mt-2'>
                                  Note: Calculations for Superlender and Experienced Lender
                                   Status are based on the past 3 completed months.
                             </p>
                        </div> */}
                    </div>                           
                </div>
            </div>
        </div>
    </>
  )
}

export default MyStarts