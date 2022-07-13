import React from 'react'
import { useHistory } from  'react-router-dom'
import { Link } from 'react-router-dom'
import ItemCard from '../../../components/ItemCard'

const OtherItems = ({user_items, user}) => {

  const history = useHistory() ;
  

  const handlePrevClick = () => {
      document.querySelector('div.product-wrapper').scrollLeft -= 180
  }
  const handleNextClick = () => {
    document.querySelector('div.product-wrapper').scrollLeft += 180
}
const handleNavigateToRentalPage = (slug) => {
    history.push(`/rental/${slug}`)
}

  return (
    <div className='other-items px-1 px-md-4 mt-5 mt-md-4 mb-3 '>
          <h5> Other items from {user.first_name}  </h5>
          <div className="d-flex justify-content-between p-0 m-0 mt-3">
               <div className='prev-btn-wrapper h-100 d-flex align-items-center m-hide'>
                    <button onClick={ handlePrevClick } className='btn btn-success prev-btn bi bi-chevron-left'></button>
               </div>
               <div className="product-wrapper h-100 d-flex flex-nowrap scrolling-container">
                     {
                         user_items.map( (item) => {
                             return (
                                 <div onClick={ () => handleNavigateToRentalPage( item.slug ) } className="me-3 h-100" key={item.id}>
                                      <img src={`${item.imagesCdnUrl}nth/${0}/` } alt={ item.title } />
                                      <h6 className='mb-1 mt-2'> { item.title } </h6>
                                      <p className='ps-1'>₦  { item.daily_price } / day </p>
                                 </div>
                             )
                         })
                     }
               </div>
               <div className="next-btn-wrapper h-100 d-flex align-items-center m-hide">
                   <button onClick={ handleNextClick } className='btn btn-success prev-btn bi bi-chevron-right'></button>
               </div>
          </div>
          <Link to={`/user/${user.id}`} className='btn d-block mx-auto mt-3 py-1'> See all listings from {user.first_name} </Link>
    </div>
  )
}

export default OtherItems