import React from 'react'

const ProductDescription = () => {
  return (
    <div className='product-description px-1 px-md-3'>
       <div className='description'>
           <h5>  Description </h5>
          <p>    Projectors & Screens | Standard Projectors | Portable Speakers</p>
          <h4>  * PLEASE CHECK AVAILABILITY BEFORE BOOKING * </h4>
          <p>The original and most advanced portable projection screen, Epson. </p>
          <ul>
              <li>  ~ 50" pull out screen </li>
              <li> ~ 4:3 aspect for presentations  </li>
              <li> ~ Quick set up for desktop usage  </li>
              <li>  ~ Compact carrying size perfect for travelling presenters </li>
              <li> ~ Perfect for home cinema too  </li>
          </ul>           
          <p>              
                    This is the ultimate screen for mobile professionals. 
                    Whether you're walking across town, commuting by car
                     or train, this lightweight, compact screen is the perfect
                      travelling partner for on-the-go presentations.
          </p>
          <p>
               When you're ready to present, this unique one-piece design
                allows you to set up quickly and easily on any tabletop 
                in less than 30 seconds. When it's time to shut down,
                 the screen stores away quickly and easily into a carrying case.
          </p>
        </div>
        <button className='btn px-0 text-primary' onClick={  
            () => { 
                     document.querySelector('.product-description>div').style.height = 'auto'
                     document.querySelector('.product-description>button').classList.add('d-none')
                  }
         }> Read more. </button>          
    </div>
  )
}

export default ProductDescription