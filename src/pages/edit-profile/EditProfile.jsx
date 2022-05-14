import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/_navbar/Navbar'
import EditProfileForm from './components/EditProfileForm'

const EditProfile = () => {

    React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))
    
    const { credentials } = useSelector( state => state.login )

  return (
    <>
       <Navbar />
      <div className='edit-profile'>
           <div className='header px-1 px-md-3  w-100 border-top border-bottom py-2'>
                <h5 className='m-0 p-0  bi bi-pencil-square py-1'> Edit Profile </h5>                
           </div>
           <div className='body px-1 px-4 mt-3'>
                <img 
                    src={ credentials.image } 
                    alt={`${ credentials.name }'s profile`} 
                    className='border'
                />
                <EditProfileForm />
           </div>            
      </div>
    </>
  )
}

export default EditProfile