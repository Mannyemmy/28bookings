import React from 'react'

const Form = () => {
   
    return( 
           <form className='d-block mx-auto'> 
                <h5 className='text-center mt-3 mb-1'> Get In Touch  </h5>                
                <p className='text-center mb-1'> Get a response within 24 hours </p>
                 <input 
                        type='text'
                         className='form-control py-2 mt-3 request-form-name-input' 
                         id='name'    
                         name='name'      
                         placeholder='name'     
                         required           
                     />
                    <input 
                         type='text'
                         className='form-control py-2 mt-3' 
                         id='company-name'
                         name='company-name'   
                         placeholder='company name'  
                         required                      
                     />                    
                    <input 
                        type='email'
                        className='form-control py-2 mt-3' 
                        id='company-email'
                        name='company-email'   
                        placeholder='company email'  
                        required                      
                    />                           
                <input 
                    type='number'
                    className='form-control py-2 mt-3' 
                    id='contact-number'
                    name='contact-number'
                    placeholder='contact number'  
                    required                         
                />              
                <input 
                    type='text'
                    className='form-control py-2 mt-3' 
                    id='city'
                    name='city'    
                    placeholder='city'          
                    required             
                />                 
             <textarea 
                type='text'
                className='form-control py-2 mt-3' 
                id='city'
                name='city'  
                required    
                placeholder='products you are looking to rent e.g ( windows , mackbook ) etc..'                     
            />         
            <button className='btn btn-success mt-2 d-block mx-auto'>  Request A Callback  </button>         
     </form>
    )
}

export default Form