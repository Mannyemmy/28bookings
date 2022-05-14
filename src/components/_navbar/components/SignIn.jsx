import React,{ useState } from 'react'

const SignIn = ({setShowSignUp}) => {

 const handleSetShowSignup = () => setShowSignUp(true)

 const [  signIn , setSignIn  ] = useState({
     email : '' ,
     fullName : '' ,
     password : '' ,
     confirmPassword : '' ,
     errorMessege : '' ,
     isOk : true
 })

 React.useLayoutEffect(  () => { 
    document.body.style.overflowY = 'scroll'  
    window.scroll(0,0)           
} , [])

 const handleSignIn = event => {
     event.preventDefault()
     setSignIn({...signIn ,  [event.target.name] : event.target.value })
 }

 const handleSubmit = event => {
     event.preventDefault() ;
     /* client side validation */
     // dom selector function
     const $ = element => document.querySelector(element)
      
     const { isOk , fullName , password , confirmPassword , errorMessege , email } = signIn 
     
     if( password.length < 8  && confirmPassword.length < 8 ) {
        setSignIn({...signIn, isOk : false , errorMessege : 'Error! password should be atleast 8 characters.'}) 
    }
     
     if( password !== confirmPassword ) {
        setSignIn({...signIn, isOk : false , errorMessege : 'Error! the two password did no match.'}) 
    }

    //check if email address is valid 
    if( (! email.includes('@') ) || email.startsWith('@') || email.endsWith('@') ){ 
       setSignIn({...signIn, isOk : false , errorMessege : 'Please use a valid email address.'})
       $('.sign-up-email').focus()
    }

    if(!fullName || !password || !confirmPassword || !email){
        setSignIn({...signIn, isOk : false , errorMessege : 'Please fill all the required fields.'})         
    }      
     /* ------------------------- */   
     //send a form data to the server..
    
 }

  return (
    <div className='sign-in-container'  >
        <form style={{width:'94%'}} className='mt-3 d-block mx-auto'>
            <span className='btn-close d-close-r-sidebar text-reset d-inline-block p-2' data-bs-dismiss='offcanvas'>
            </span>              
             <h1> Hey There! </h1>
             <p className='mb-1'> Looks like you're  new here. Enter your details and get started. </p>
             <span className="divider d-block mt-1 mb-2"></span>             
             <label htmlFor='email'> Email <sup className="text-danger"> * </sup> </label>
              <input 
                     type='email' 
                     name='email'
                     value={  signIn.email }
                     id='email'
                     className='form-control py-3 py-md-2 sign-up-email' 
                     placeholder='jhondoe@example.com'
                     onChange={ handleSignIn }     
                     maxLength = { 200 }                 
              />
              <label htmlFor='name'>Full Name <sup className="text-danger"> * </sup> </label>
              <input 
                     type='text' 
                     name='fullName'
                     value={ signIn.fullName }
                     id='name'
                     className='form-control py-3 py-md-2' 
                     placeholder='your name..'
                     onChange={ handleSignIn }   
                     maxLength = { 200 }                    
              />
              <label htmlFor='password'>Password<sup className="text-danger"> * </sup> </label>
              <input 
                     type='password' 
                     name='password'
                     value={ signIn.password }
                     id='password'
                     className='form-control py-3 py-md-2' 
                     placeholder='password..'
                     onChange={ handleSignIn }     
                     maxLength = { 16 }                  
              />
              <label htmlFor='c-password'>Confirm password<sup className="text-danger"> * </sup> </label>
              <input 
                     type='password' 
                     name='confirmPassword'
                     value={  signIn.confirmPassword }
                     id='c-password'
                     className='form-control py-3 py-md-2' 
                     placeholder='confirm password..'
                    onChange={ handleSignIn }  
                    maxLength = { 16 } 
              />
              <p className='status text-danger mt-1 m-0'>  { signIn.errorMessege } </p>
              <p className='sign-in p-0 mb-2 pt-2 pt-md-0'> Already have an account ? 
                  <span className='text-primary ms-1' onClick={handleSetShowSignup}> Login </span>
              </p>
              <button className='btn btn-success d-block w-75 mx-auto' onClick={ handleSubmit }>
                    Create Account 
              </button>
        </form>
    </div>
  )
}

export default SignIn