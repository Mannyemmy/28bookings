import React,{ useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'

const EditProfileForm = () => {
   
  const [ editForm , setEditForm ] = useState({
    profileImage : '' ,
    username : '' ,
    city : '' ,
    businessName : '' ,
    about : '',
    storeAddress : '',
    errorMessege : '',
  })

  const { credentials } = useSelector(  state => state.login )

  useEffect(  
      () => {
           //set the value of input fields to value of the logged user.
            setEditForm({...editForm , username : credentials.name })
      } , []
   )
   // handle input change
  const handleEditFormChange = event => {
      event.preventDefault()
      //check if input type is file 
      if(event.target.type === 'file'){
          setEditForm({ ...editForm , [ event.target.name ] : event.target.files[0] })            
      }
      setEditForm({ ...editForm , [ event.target.name ] : event.target.value })
  }

//handle form submit
const handleSubmit = event => {
    event.preventDefault() ;
    let formData = new FormData( document.querySelector('form.edit-form') )       
}

  return (
    <> 
        <form className='w-100 m-0 p-0 edit-form'>
                <label htmlFor='profile-image' className='btn p-0 m-0 profile-image'>
                     Change profile picture
                </label>
                <input 
                      type='file'
                      name='profileImage'
                      id='profile-image'
                      className='image-label'                              
                      onChange = {  handleEditFormChange }             
              />
              <div className='inputs-wrapper mt-3'>
                  <label htmlFor='name'> Update Name </label>
                   <input 
                        id='name'
                        type='text'
                        name='username'
                        placeholder='your name'
                        className='form-control py-2'
                        value={ editForm.username }  
                        onChange = {  handleEditFormChange }  
                    />
                    <label htmlFor='city' className='mt-3'> Your City </label>
                   <input 
                        id='city'
                        type='text'
                        name='city'
                        placeholder='add city..'
                        className='form-control py-2'
                        value={ editForm.city }  
                        onChange = {  handleEditFormChange }  
                    />
                    <label htmlFor='b-name' className='mt-3'> Add business </label>
                   <input 
                        id='b-name'
                        type='text'
                        name='businessName'
                        placeholder='add business..'
                        className='form-control py-2'
                        value={ editForm.businessName }  
                        onChange = {  handleEditFormChange }  
                    />
                    <label htmlFor='about' className='mt-3'> Add few words about your self </label>
                   <textarea
                        id='about'
                        type='text'
                        name='about'                        
                        className='form-control py-2'
                        value={ editForm.about }  
                        onChange = {  handleEditFormChange }  
                    />
                    <span data-bs-toggle='collapse' data-bs-target='#advanced' className='dropdown-toggle'>
                         Advanced
                    </span>
                    <div id='advanced' className='collapse'>
                       <label htmlFor='location' className='mt-1'> Store Location </label>
                       <p className='p-location mb-1 text-secondary'>
                            Add a specific address for your rental store. 
                           This will be visible to all renters. Only recommended
                            for businesses using a commercial location. 
                        </p>
                        <textarea
                                id='location'
                                type='text'
                                name='storeAddress'                        
                                className='form-control py-2'
                                value={ editForm.storeAddress }  
                                onChange = {  handleEditFormChange }  
                        />
                   </div>
              </div>
              <p className='status'></p>
              <div className='d-flex update-data justify-content-end mb-4 border-top pt-2'>
                     <div>
                          <button className='btn btn-success px-3 me-2' onClick={ handleSubmit }>
                                Save 
                          </button>
                          <Link to='/profile' className='btn ' > Cancel  </Link>
                     </div>
              </div>
      </form>
    </>
  )
}

export default EditProfileForm