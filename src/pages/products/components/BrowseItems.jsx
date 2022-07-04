
import React from 'react'
import { useHistory } from  'react-router-dom'
import {useGetItemsByCategoryQuery} from "../../../services/categoriesApi";

const BrowseItems = ({id, title, slug}) => {

    const { data: items , error, isLoading, isFetching, isSuccess} = useGetItemsByCategoryQuery(id) 
    
const history = useHistory() ;


const handleNavigateToRentalPage = (slug) => {
    history.push(`/rental/${ slug}`)
}

  return (
      <>
      
        {
            isLoading ? ("") : (
                <div className='browse-items px-1 px-md-3 mt-4'>
         <h5> Browse {title} in your Area </h5>
         <div className="row w-100 p-0 m-0 mx-auto">
              {
                  items.length < 1 ? (
                      <div className='w-100 d-flex justify-content-center'>
                          <img src="/no-items-found.webp" alt="no-item-found" className='h-75'/>
                      </div>
                  ) :(
                      <>
                      {
                         items.map( item => {
                        return(
                            <div onClick={ () => handleNavigateToRentalPage( item.slug ) } key={ item.id } className='col-12 col-md-3 p-0 m-0 mt-3 mt-md-2'>
                                 <div className='d-block mx-auto'>
                                 <img src={`${item.imagesCdnUrl}nth/${0}/` } alt={ item.title } className='w-100' />
                                 <p className="d-flex justify-content-between px-1 mt-1 mb-1">  
                                     <span> {item.created_by.first_name} {item.created_by.last_name}</span>
                                     <span className="tw-text-green-400 font-semibold">{ item.city.toUpperCase()}</span>
                                     {/* <span> <i className="fas fa-star"></i> { item.stars }</span> */}
                                 </p>
                                 <h6 className='mb-0 px-1'> { item.title } </h6>
                                  <p className='price p-0 pt-1 mb-1 px-1'>₦{ item.daily_price }/day</p>
                                 </div>
                            </div>
                        )
                    } )  
                      }
                      </>
                   
                  )}
         </div>
         <button className='btn btn-success mt-3 d-block mx-auto'
                 onClick={ () => history.push(`/category/${slug}`) }
         >
            {title} for rent in Your Area
         </button>
    </div>
            )
        }
      </>
    
  )
}

export default BrowseItems
 
