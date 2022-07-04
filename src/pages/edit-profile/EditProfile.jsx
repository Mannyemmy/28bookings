import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/_navbar/Navbar'
import EditProfileForm from './components/EditProfileForm'
import {useGetUserQuery} from "../../services/usersApi";
import {url} from "../../helper"

const EditProfile = () => {

    React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))
    
    const  credentials  = useSelector((state) => state.auth.user);

    const {data : user , isLoading, isSuccess} = useGetUserQuery(credentials.id);

  return (
    <>
       <Navbar />
       {isLoading ? (
            <p>Loading...</p>
       ) : user && (
<div className='edit-profile'>
           <div className='header px-1 px-md-3  w-100 border-top border-bottom py-2'>
                <h5 className='m-0 p-0  bi bi-pencil-square py-1'> Edit Profile </h5>                
           </div>
           <div className='body px-1 px-4 mt-3'>
                <img 
                    src={ `${url}${user.profile[0].picture}`  } 
                    alt={`${credentials.first_name}`}
                    className='border'
                />
                <EditProfileForm  user={user}/>
           </div>            
      </div>
       )}
      
    </>
  )
}

export default EditProfile