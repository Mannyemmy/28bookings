import React from 'react'
import { Link } from 'react-router-dom'

const Reviews = ({user}) => {

  const [ reviews ] = React.useState([
      {   
          id : 1 ,
          name : 'Faduma',
          messege : 'Great rental as always, very accommodating and super helpful',
          image : require('../../../assets/Adam.jpg'),
          date : '8 Mar 20'
      },
        {   
          id : 2 ,
          name : 'Urmil Shah',
          messege : 'Antonio was brilliant and friendly, even took his time to show me how things worked.',
          image : require('../../../assets/Urmil_Shah.png') ,
          date : '17 Mar 20'
      },
      {   
        id : 3 ,
        name : 'Udit Dhawan',
        messege : 'Antonio is a very professional guy. He helps me a lot during my stressful shooting days.',
        image : require('../../../assets/Udit_Dhawan.png') ,
        date : '7 Feb 20'
     },
     {   
      id : 4 ,
      name : 'Harikrama',
      messege : 'Antonio was super helpful and understanding, highly recommend renting from him!!',
      image : require('../../../assets/Harikrama.png') ,
      date : '10 Mar 21'
    },
  ])

  return (
    <div className='reviews px-1 px-md-4 mt-3'>
        <h5>  {user.first_name}'s reviews </h5>
        <div className="d-flex justify-content-center flex-wrap w-100">
             {
               reviews.map( review => {
                   return(
                     <div className='user-review mt-1' key={ review.id }> 
                          <div className="d-flex justify-content-between">
                               <img src={ review.image } alt={ review.name } />
                                <div className='desciption-wrapper'>
                                    <p className="d-flex w-100  m-0 p-0 justify-content-between"> 
                                      <span> { review.name } </span>
                                      <span className="date"> { review.date } </span>
                                    </p>
                                    <div className="stars-wrapper">
                                        <span className='fas fa-star'>   </span>
                                        <span className='fas fa-star'>   </span>
                                        <span className='fas fa-star'>   </span>
                                        <span className='fas fa-star'>   </span>
                                        <span className='fas fa-star'>   </span>
                                    </div>
                                </div>                                
                          </div>
                          <p className='review-messege mt-1'> { review.messege }  </p>
                      </div>
                   )
               })
             }             
        </div>
        <Link to={`/profile/${user.id}`} className='btn d-block mx-auto mt-1 mb-2 py-1'> See all reviews </Link>
    </div>
  )
}

export default Reviews