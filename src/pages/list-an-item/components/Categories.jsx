import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useGetItemsByCategoryQuery, useGetAllCategoriesQuery } from '../../../services/categoriesApi'

const Categories = () => {

// const { categories } = useSelector( state => state.categories )
const {data : categories, isLoading} = useGetAllCategoriesQuery()

  return (
    <div className='categories px-1 px-md-4 mb-4'>
           <h5>
               Explore Our Categories
           </h5>
           <div className="row w-100 p-0 m-0 mx-auto">
               {
                   categories?.map( (category , index) => {
                        return (
                             <div key={ index } className='col-6 pb-0 mt-3'>
                                <Link
                                      to={`/category/${ category.slug }`} 
                                      key={ index } className='p-0 m-0'
                                 > 
                                 <img 
                                    src={`/${category.image}`}
                                    alt={ category.name } 
                                    className='w-100 p-0 m-0'
                                  />
                                 <p className='des pb-2 mb-0 border pt-1'> { category.name } </p>
                                </Link>
                             </div>
                        )
                   } )
               }
           </div>
    </div>

  )
}

export default Categories