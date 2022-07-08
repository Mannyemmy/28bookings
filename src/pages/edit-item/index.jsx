import React from 'react'
import Navbar from '../../components/_navbar/Navbar'
import EditItemForm from '././components/EditItemForm'

const EditItem = () => {
  return (
    <>
       <Navbar />
      <div className='create-item'>
           <h5 className='header text-center pb-3 pt-4 border-top bi bi-bag-plus'>
                &nbsp;Edit Listing
           </h5>
           <div className='create-item-wrapper px-1 px-md-3'>
                 <EditItemForm />
           </div>
      </div>
    </>
  )
}

export default EditItem