import React from 'react'

const WhyRentWithUs = () => {

    const [ collapse , setCollapse ] = React.useState({
        collapse1 : false ,
        collapse2 : false ,
        collapse3 : false ,
        collapse4 : false ,
    })

 const handleCollapse = id => {
     switch(id){
         case 1 : 
           setCollapse( { ...collapse , collapse1 : !collapse.collapse1 } )
        break
        case 2 : 
           setCollapse( { ...collapse , collapse2 : !collapse.collapse2 } )
        break
        case 3 : 
           setCollapse( { ...collapse , collapse3 : !collapse.collapse3 } )
        break
        case 4 : 
           setCollapse( { ...collapse , collapse4 : !collapse.collapse4 } )
        break
        default :  
          setCollapse( { ...collapse } )
     }
 }

  return (
    <div className='why-rent-with-us px-2 px-md-3 mt-4 mb-4'>
          <h6 onClick={  () => handleCollapse(1) }
             className='py-1 d-flex justify-content-between mb-0'
             data-bs-toggle="collapse" data-bs-target="#collapse-item">
                <span>   Why rent on 28bookings </span>
                {  
                  collapse.collapse1 ? <i className='bi bi-chevron-up'></i>  : <i className="bi bi-chevron-down"></i> 
                }
           </h6>
           <div id="collapse-item" className="collapse">
               Save money by renting quality equipment and items you 
               only need short term from people in your neighbourhood.
           </div>
           <h6  onClick={  () => handleCollapse(2) }
               className='py-1 d-flex justify-content-between mb-0'
               data-bs-toggle="collapse" data-bs-target="#collapse-item2"
            >                  
               <span> How much does it cost to rent Projector Screen - Epson 50-inch Screen ?</span>
               {  
                  collapse.collapse2 ? <i className='bi bi-chevron-up'></i>  : <i className="bi bi-chevron-down"></i> 
                }
          </h6>
           <div id="collapse-item2" className="collapse">
                ₦15.00 per day, ₦105.00 per week.
           </div>
           <h6  onClick={  () => handleCollapse(3) }
               className='py-1 d-flex justify-content-between mb-0'
               data-bs-toggle="collapse" data-bs-target="#collapse-item3"
            >
                 <span>   How does renting work? </span>
                 {  
                  collapse.collapse3 ? <i className='bi bi-chevron-up'></i>  : <i className="bi bi-chevron-down"></i> 
                }
            </h6>
           <div id="collapse-item3" className="collapse">
               28bookings is a peer-to-peer rental platform — we connect 
               people who need stuff with people who have stuff. Easy. 
               Find what you’re looking for, book the item for the dates
                you need it and get verified by us. Arrange a time to 
                collect your item from the renter and enjoy your rental. 
                Return the item to the renter and leave a review.
           </div>
           <h6  onClick={  () => handleCollapse(4) }
               className='py-1 d-flex justify-content-between mb-0'
               data-bs-toggle="collapse" data-bs-target="#collapse-item4"
            >
                 What is the cancellation policy?
                 {  
                  collapse.collapse4 ? <i className='bi bi-chevron-up'></i>  : <i className="bi bi-chevron-down"></i> 
                }
            </h6>
           <div id="collapse-item4" className="collapse">
                 48-hour cooling off period in which you’ll be fully
                  reimbursed if you cancel a rental you’ve booked.
                   Please note that if you book a rental within 48 
                   hours of the rental start date (e.g. if you book a rental for on 
                   Monday evening for Wednesday morning),
                    then this cooling-off period does not apply.
           </div>
     </div>
  )
}

export default WhyRentWithUs