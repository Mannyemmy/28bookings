import React from 'react'
import { useHistory } from  'react-router-dom'
import { useGetRandomItemQuery } from '../../../services/itemsApi';

const MoreItems = () => {
    const { data : items, error, isLoading, isFetching, isSuccess } = useGetRandomItemQuery();
    const history = useHistory() ;
    

 const handlePrevClick = () => {
     document.querySelector('div.more-items-wrapper').scrollLeft -= 180
 }
 const handleNextClick = () => {
   document.querySelector('div.more-items-wrapper').scrollLeft += 180
}

const handleNavigateToRentalPage = (slug) => {
    history.push(`/rental/${ slug }`)
}

  return (
    <div className="more-items px-1 px-md-3 mt-4 mt-md-2">
           <h5> People also viewed </h5>
           <div className="d-flex justify-content-between p-0 m-0 mt-3">
               <div className='prev-btn-wrapper h-100 d-flex align-items-center m-hide'>
                    <button onClick={ handlePrevClick } className='btn btn-success prev-btn bi bi-chevron-left'></button>
               </div>
               <div className="product-wrapper more-items-wrapper h-100 d-flex flex-nowrap scrolling-container">
                     {
                         items?.map( (item) => {
                             return (
                                 <div onClick={ () => handleNavigateToRentalPage( item.slug ) }
                                  className="me-3 h-100" key={item.id}>
                                      <img src={`${item.imagesCdnUrl}nth/${0}/` } alt={ item.title } />
                                      <h6 className='mb-1 mt-2'> { item.title } </h6>
                                      <p className='ps-1'>₦{item.daily_price} / day </p>
                                 </div>
                             )
                         })
                     }
               </div>
               <div className="next-btn-wrapper h-100 d-flex align-items-center m-hide">
                   <button onClick={ handleNextClick } className='btn btn-success prev-btn bi bi-chevron-right'></button>
               </div>
          </div>
    </div>
  )
}

export default MoreItems