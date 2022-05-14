import React from 'react'

const OurStories = () => {

 const stories = [
     {
        id : 1 ,
        name : 'Udit Dhawan',
        title : 'CEO, DropShop Network',
        image : require('../../../assets/Udit_Dhawan.png'),
        review : ` As a fast-growing startup, liquidity is our priority. 
                   We started renting from 28bookings about 18 months ago 
                   and the experience has been fantastic. 28bookings has
                    allowed us to focus on growth while keeping our capital 
                    expenditure really low. With 28bookings, we’ve made 
                    renting a primary choice for all our tech needs.`
    } ,
    {
        id : 2 ,
        name : 'Urmil Shah',
        title : 'Strategy & New Initiatives, Swiggy',
        image : require('../../../assets/Urmil_Shah.png'),
        review : `28bookings has come to our rescue for all our 
                 on-demand tech needs. Their ease of booking and 
                 quick delivery have always been impressive.
                  We look forward to renting more often on
                   28bookings as we scale our new initiatives.`
    } ,
    {
        id : 3 ,
        title : 'Operations Associate, Goldman Sachs',
        name : 'Hangkhrai Brahma',
        image : require('../../../assets/Harikrama.png'),
        review : ` We started renting from Mutterfly during the Covid-19
         Lockdown and the process was really convenient. Top quality 
         gadgets and a really helpful customer team have made 
         remote work really easy for us.  `
    } ,
 ]

 const handleScrollBackward = () => {
      const scrollingContainer = document.querySelector('.scrolling-container')
      scrollingContainer.scrollLeft -= 250
 }

 const handleScrollForward = () => {
    const scrollingContainer = document.querySelector('.scrolling-container')
    scrollingContainer.scrollLeft += 250
}

  return (
    <div className='our-stories mt-2 px-1 px-md-4  py-4'>
         <div className="d-flex justify-content-between py-2">
               <div className="f-child mt-md-4">
                    <h5>
                       The  <strong>28</strong>bookings Stories
                    </h5>
                    <p>
                      We are happy when our customers are too.
                    </p>
                    <div className="btn-wrapper d-none d-md-block">
                         <button 
                              onClick={ handleScrollBackward }
                              className='btn btn-outline-success fas fa-angle-left'                          
                          >                             
                         </button>
                         <button 
                              onClick={   handleScrollForward }
                              className='ms-3 btn btn-outline-success fas fa-angle-right'                          
                          >                             
                         </button>
                    </div>
               </div>
               <div className="s-child">
                    <div className='stories-wrapper d-flex flex-nowrap scrolling-container'>
                           {
                               stories.map( story => {
                                   return(
                                       <div key={story.id} className='mt-0 p-2 me-3 bg-white'>
                                            <img className='mx-auto my-2' src={ story.image } alt={ story.name} />
                                            <p className='text-center'> <strong>" </strong> { story.review } <strong> "</strong> </p>
                                             <div className="divider  mx-auto my-3"></div>
                                             <h5 className='text-center'> { story.name }  </h5>
                                             <h4 className='text-center'>  { story.title } </h4>                                                                                      
                                       </div>
                                   )
                               })
                           }
                    </div>
               </div>
         </div>
    </div>
  )

}

export default OurStories