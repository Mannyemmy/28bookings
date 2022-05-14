import React from 'react'
import Navbar from '../../components/_navbar/Navbar'
import Location from './components/Location'
import Category from './components/Category'
import { useHistory } from 'react-router-dom'

const SearchProduct = () => {
  const history = useHistory()
  const items = [
    {
        id : 1 ,
        name : 'Wimsew W-500 Blind Stitcher Felling Sewing Machine',
        price : 4100,
        image :  require('../../assets/sm1.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 2 ,
        name : 'Viking Sewing Machine',
        price : 5100,
        image :  require('../../assets/sm2.jpg'),
        stars : '(17) SW1P' ,
        owner : ' Cynthia'    
    },
    {
        id : 3 ,
        name : 'Singer 8280 in central London',
        price : 6000,
        image :  require('../../assets/sm3.jpeg'),
        stars : '(14) NW6' ,
        owner : 'Jae'   
    },
    {
        id : 4 ,
        name : 'Wimsew W-500 Blind Stitcher Felling Sewing Machine',
        price : 4500,
        image :  require('../../assets/sm4.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 5 ,
        name : 'Brother sewing machine',
        price : 8900,
        image :  require('../../assets/sm5.jpg'),
        stars : '(58) W2' ,
        owner : 'Nat'   
    },
    {
        id : 6 ,
        name : 'Industrial sewing machine (on site in Shoreditch)',
        price : 1000,
        image :  require('../../assets/sm6.jpeg'),
        stars : '(14) EC2A' ,
        owner : ' Sarah'
    },
    {
        id : 7 ,
        name : 'Wimsew W-500 Blind Stitcher Felling Sewing Machine',
        price : 7000,
        image :  require('../../assets/sm7.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 8 ,
        name : 'SILVER CREST Sewing Machine',
        price : 8800,
        image :  require('../../assets/sm8.jpg'),
        stars : '(19) SE5' ,
        owner : ' Roger'      
    },
    {
        id : 9 ,
        name : 'Brother Industrial 3-5 thread Overlocker Sewing Machine',
        price : 9600,
        image :  require('../../assets/sm9.png'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 10 ,
        name : 'Wimsew W-500 Blind Stitcher Felling Sewing Machine',
        price : 2300,
        image :  require('../../assets/sm10.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 11 ,
        name : 'Janome Digital Sewing Machine, Model DC3050',
        price : 2100,
        image :  require('../../assets/sm11.jpg'),
        stars : '(31) NW6' ,
        owner : 'Emma'
    },
    {
        id : 12 ,
        name : 'Wilcox & Gibbs Industrial 4 thread Overlocker Sewing Machine',
        price : 6700,
        image :  require('../../assets/sm12.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
]

  React.useEffect( () => {
      window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' })
      // open location modal after page load by 3seconds
       setTimeout( () => document.querySelector('button.location-btn').click() , 2000)
    } , [])

    const handleNavigateToRentalPage = (id) => {
        history.push(`/rental/${ id }`)
    }

  return (
    <>  
       <Navbar />
        <div className="search-page">
          <div className=' mt-2 mt-sm-1 px-2 pb-2 border-bottom'> 
               <button className='btn py-1 px-3 me-2 location-btn' data-bs-toggle='modal' data-bs-target='#locationModal'>
                  Location
              </button>             
              <button className='btn py-1 px-3 me-2' data-bs-toggle='modal' data-bs-target='#categoryModal'>
                  Category
              </button>
          </div>          
          <Location  id = 'locationModal' />
          <Category id = 'categoryModal'  />
          <div className="search-result row w-100 p-0 m-0 mx-auto mt-md-2 mb-4">
              {
                  items.map( item => {
                      return(
                          <div  key={ item.id } className='col-12 col-md-3 p-0 m-0 mt-3 mt-md-2'>
                               <div   onClick={ () => handleNavigateToRentalPage( item.id ) } className='d-block mx-auto'>
                               <img src={ item.image } alt={ item.name } className='w-100' />
                               <p className="d-flex justify-content-between px-1 mt-1 mb-1">  
                                   <span> { item.owner } </span>
                                   <span> <i className="fas fa-star"></i> { item.stars }</span>
                               </p>
                               <h6 className='mb-0'> { item.name } </h6>
                                <p className='price p-0 pt-1 mb-1'>₦{ item.price }/day</p>
                               </div>
                          </div>
                      )
                  } )
               }
          </div>
        </div>
    </>
  )

}

export default SearchProduct