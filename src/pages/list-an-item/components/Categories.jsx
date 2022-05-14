import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Categories = () => {

const { categories } = useSelector( state => state.categories )

  return (
    <div className='categories px-1 px-md-4 mb-4 mt-4'>
           <h5>
               Explore Our Categories
           </h5>
           <div className="row w-100 p-0 m-0 mx-auto">
               {
                   categories.map( (category , index) => {
                        return (
                             <div key={ index } className='col-6 pb-0 mt-3'>
                                <Link to={`/products/${ category.des }`}  key={ index } className='p-0 m-0'> 
                                 <img 
                                    src={ category.src }
                                    alt={ category.des } 
                                    className='w-100 p-0 m-0'
                                  />
                                 <p className='des pb-2 mb-0 border pt-1'> { category.des } </p>
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