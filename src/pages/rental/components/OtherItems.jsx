import React from 'react'
import { useHistory } from  'react-router-dom'
import { Link } from 'react-router-dom'

const OtherItems = () => {

  const history = useHistory() ;
  const otherItems = [
         {
             id :1 ,
             name : 'extreme pro sandisk memory card' ,
             image : require('../../../assets/2-x-sd-extreme-pro-sandisk-memory-cards--64gb-82177396.jpg'),
             price : 2500 ,
         },
         {
            id :2 ,
            name : 'lumens projector-27mx15m' ,
            image : require('../../../assets/softbox-lights-for-studio--portraits--fashion--video--68605804.jpg'),
            price : 400 ,
        },
        {
            id :3 ,
            name : 'viewsonic home cinema projector' ,
            image : require('../../../assets/viewsonic-px747-4k-home-cinema-projector-3500-lumens-28479411.jpg'),
            price : 5000 ,
        } ,
        {
            id :4 ,
            name : 'keyboard controller with usb' ,
            image : require('../../../assets/akai-midi-mpk-mini-mk3-keyboard--controller-with-usb--42198553.jpg'),
            price : 200 ,
        },
        {
            id :5 ,
            name : 'canon 5d mark 50mm' ,
            image : require('../../../assets/canon-5d-mark-4-iv-and-canon-50mm--f-12-l--42472249.jpg'),
            price : 500 ,
        },
        {
            id :6 ,
            name : 'epson lumens-300 inch display' ,
            image : require('../../../assets/epson-ehtw650-3lcd-full-hd-3100-lumens-300-inch-display-23261432.png'),
            price : 3000 ,
        },
        {
            id :7 ,
            name : 'epson projector hd display ' ,
            image : require('../../../assets/epson-projector--full-hd-ebs41-10696421.jpg'),
            price : 7000 ,
        },
        {
            id :8 ,
            name : 'softbox for portraits fashion' ,
            image : require('../../../assets/softbox-lights-for-studio--portraits--fashion--video--68605804.jpg'),
            price : 2900 ,
        } ,
        {
            id :9 ,
            name : 'smoke machine 700w with blue led' ,
            image : require('../../../assets/smoke-machine--700w--with-blue-led-lights-05235447.jpg'),
            price : 6000 ,
        } ,       
        {
            id :10 ,
            name : 'projector-screen-27m-x-x2m' ,
            image : require('../../../assets/120-projector-screen-27m-x-x2m-78123768.jpg'),
            price : 800 ,
        },
    ]

  const handlePrevClick = () => {
      document.querySelector('div.product-wrapper').scrollLeft -= 180
  }
  const handleNextClick = () => {
    document.querySelector('div.product-wrapper').scrollLeft += 180
}
const handleNavigateToRentalPage = (id) => {
    history.push(`/rental/${ id }`)
}

  return (
    <div className='other-items px-1 px-md-4 mt-5 mt-md-4 mb-3 '>
          <h5> Other items from Antonio  </h5>
          <div className="d-flex justify-content-between p-0 m-0 mt-3">
               <div className='prev-btn-wrapper h-100 d-flex align-items-center m-hide'>
                    <button onClick={ handlePrevClick } className='btn btn-success prev-btn bi bi-chevron-left'></button>
               </div>
               <div className="product-wrapper h-100 d-flex flex-nowrap scrolling-container">
                     {
                         otherItems.map( (item) => {
                             return (
                                 <div onClick={ () => handleNavigateToRentalPage( item.id ) } className="me-3 h-100" key={item.id}>
                                      <img src={item.image } alt={ item.name } />
                                      <h6 className='mb-1 mt-2'> { item.name } </h6>
                                      <p className='ps-1'>₦  { item.price } / day </p>
                                 </div>
                             )
                         })
                     }
               </div>
               <div className="next-btn-wrapper h-100 d-flex align-items-center m-hide">
                   <button onClick={ handleNextClick } className='btn btn-success prev-btn bi bi-chevron-right'></button>
               </div>
          </div>
          <Link to='/profile/antonio' className='btn d-block mx-auto mt-3 py-1'> See all listings from Antonio </Link>
    </div>
  )
}

export default OtherItems