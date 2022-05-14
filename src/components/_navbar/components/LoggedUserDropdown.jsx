import React,{ Fragment } from 'react'
import { Link } from 'react-router-dom'
import {  useSelector , useDispatch } from 'react-redux'
import { logoutUser } from '../../../features/login-signup/loginSlice'

const LoggedUserDropdown = () => {

    const dispatch = useDispatch() ;
    const { credentials } = useSelector(  state => state.login )

    const handleLogout = () => {
          dispatch( logoutUser() ) ;           
    }

  return (
     <Fragment>
          <div className='dropdown d-inline-block logged-user-dropdown px-0'>
              <button type='button' className='btn dropdown-togle py-0 px-1 mx-2' data-bs-toggle='dropdown'>
                     <img 
                         src={ credentials.image }
                          alt={ `${credentials.name }'s profile` } 
                          className='me-1'
                      />
                     <span className='d-none d-md-inline-block'>
                            { credentials.name }  
                            <i className='fa fa-chevron-down text-secondary'></i>
                    </span>
              </button>
                <ul className='dropdown-menu px-0 mx-0'>
                    <li><Link className='dropdown-item ps-2' to='/inbox'> Inbox </Link> </li>
                    <li><Link className='dropdown-item ps-2' to='/rentals'> Rentals </Link> </li>
                    <li><Link className='dropdown-item ps-2' to='/favorites'> Favorites </Link> </li>
                    <li><Link className='dropdown-item ps-2' to='/profile'> Profile </Link> </li>
                    <li><Link className='dropdown-item ps-2' to='/create-item'> Create Item </Link> </li>
                    <li className='border-top'>
                        <button className='btn ps-2 p-0 text-danger logout-btn' onClick={ handleLogout }>
                           <span className="bi bi-box-arrow-left"></span>  Log out
                        </button>
                    </li>
                </ul>
           </div>
     </Fragment>
  )
}

export default LoggedUserDropdown