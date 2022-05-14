import React from 'react'
import Navbar from '../../components/_navbar/Navbar'
import CreateItemForm from './components/CreateItemForm'

const CreateItem = () => {
  
  React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))
  
  return (
    <>
       <Navbar />
      <div className='create-item'>
           <h5 className='header text-center pb-3 pt-4 border-top bi bi-bag-plus'>
                &nbsp;Add New Listing
           </h5>
           <div className='create-item-wrapper px-1 px-md-3'>
                 <CreateItemForm />
           </div>
      </div>
    </>
  )
}

export default CreateItem