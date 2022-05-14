import React from 'react'
import { useDispatch } from 'react-redux' ;
import {  updateLoginStatus } from '../../../features/login-signup/loginSlice'

const Signup = ({ setShowSignUp }) => {
  
  const dispatch = useDispatch()

  const [ emailInput , setEmailInput ] = React.useState({
      value : '',
      status : '',
      isLoading : false ,
  })

  const handleShowSignup = () => setShowSignUp( false )

  const handleEmailChange = event => setEmailInput({...emailInput,value : event.target.value})

  const handleSubmit = (event) => {
        event.preventDefault()
        let isOk = true ;         
        //check if email address is valid 
        if( (! emailInput.value.includes('@') ) || emailInput.value.startsWith('@')
             || emailInput.value.endsWith('@') ){

            setEmailInput({...emailInput, status:'Error! please use a valid email address.'})
            isOk = false ;
        }

        //check if all input are not empty excluding image which is optional
        if( !emailInput.value ){
              setEmailInput({...emailInput, status:'Sorry! your email address is required.'})
              isOk = false ;              
        } 
       
        if( isOk){
            setEmailInput({...emailInput, isLoading :true , status : '' })
            //log user in. if user credentials are all correct
             dispatch( updateLoginStatus() )
            //close sidebar once a user is successfully logged in.            
                document.querySelector('.d-close-r-sidebar').click() ;                                                    
        }
  }

  return (
       <div className='signup-container'>
        <div className='flex-column'>                           
            <span className='btn-close d-close-r-sidebar text-reset d-inline-block p-2' data-bs-dismiss='offcanvas'>
            </span>                         
            <h1 className='mt-4 ps-2'> Welcome to  <b>28</b>Bookings! </h1>
        </div>
        <div className='offcanvas-body ps-2 mt-0 pt-0'>
            <p className='mb-2'> Enter your email address to get started. </p>
            <span className='d-block'></span>
          <form className='mt-2 w-100'>
             <label htmlFor='email'> Email </label>
              <input 
                     type='email' 
                     name='email'
                     value={ emailInput.value }
                     id='email'
                     className='form-control py-3 py-md-2' 
                     placeholder='jhondoe@example.com'
                     onChange={ handleEmailChange }
              />
              <p className='m-0 ms-1 p-0 pt-1 text-danger status'> { emailInput.status } </p>
              <p className='sign-in mb-0 mt-2 text-dark' style={{ fontWeight : '400' }}> 
                      Don't have an account ?
                     <span className='btn ms-1 p-0 m-0 text-primary' onClick={ handleShowSignup }> 
                         create new account
                     </span> 
              </p>
              <button className='btn btn-success d-block mx-auto text-center mt-3' onClick={ handleSubmit }>
                   {  
                        emailInput.isLoading ?
                                 <i className='spinner spinner-border text-white'></i>
                                             : 
                                 'Continue'                        
                    }
              </button>
          </form>           
        </div>
    </div> 
  )
}

export default Signup