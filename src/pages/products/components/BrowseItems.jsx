import React from 'react'
import { useHistory } from  'react-router-dom'

const BrowseItems = () => {
    
const history = useHistory() ;
const items = [
    {
        id : 1 ,
        name : 'Wimsew W-500 Blind Stitcher Felling Sewing Machine',
        price : 4100,
        image :  require('../../../assets/sm1.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 2 ,
        name : 'Viking Sewing Machine',
        price : 5100,
        image :  require('../../../assets/sm2.jpg'),
        stars : '(17) SW1P' ,
        owner : ' Cynthia'    
    },
    {
        id : 3 ,
        name : 'Singer 8280 in central London',
        price : 6000,
        image :  require('../../../assets/sm3.jpeg'),
        stars : '(14) NW6' ,
        owner : 'Jae'   
    },
    {
        id : 4 ,
        name : 'Wimsew W-500 Blind Stitcher Felling Sewing Machine',
        price : 4500,
        image :  require('../../../assets/sm4.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 5 ,
        name : 'Brother sewing machine',
        price : 8900,
        image :  require('../../../assets/sm5.jpg'),
        stars : '(58) W2' ,
        owner : 'Nat'   
    },
    {
        id : 6 ,
        name : 'Industrial sewing machine (on site in Shoreditch)',
        price : 1000,
        image :  require('../../../assets/sm6.jpeg'),
        stars : '(14) EC2A' ,
        owner : ' Sarah'
    },
    {
        id : 7 ,
        name : 'Wimsew W-500 Blind Stitcher Felling Sewing Machine',
        price : 7000,
        image :  require('../../../assets/sm7.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 8 ,
        name : 'SILVER CREST Sewing Machine',
        price : 8800,
        image :  require('../../../assets/sm8.jpg'),
        stars : '(19) SE5' ,
        owner : ' Roger'      
    },
    {
        id : 9 ,
        name : 'Brother Industrial 3-5 thread Overlocker Sewing Machine',
        price : 9600,
        image :  require('../../../assets/sm9.png'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 10 ,
        name : 'Wimsew W-500 Blind Stitcher Felling Sewing Machine',
        price : 2300,
        image :  require('../../../assets/sm10.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
    {
        id : 11 ,
        name : 'Janome Digital Sewing Machine, Model DC3050',
        price : 2100,
        image :  require('../../../assets/sm11.jpg'),
        stars : '(31) NW6' ,
        owner : 'Emma'
    },
    {
        id : 12 ,
        name : 'Wilcox & Gibbs Industrial 4 thread Overlocker Sewing Machine',
        price : 6700,
        image :  require('../../../assets/sm12.jpg'),
        stars : '(14) NW6' ,
        owner : 'Robin'
    },
]

const handleNavigateToRentalPage = (id) => {
    history.push(`/rental/${ id }`)
}

  return (
    <div className='browse-items px-1 px-md-3 mt-4'>
         <h5> Browse Sewing Machines in London </h5>
         <div className="row w-100 p-0 m-0 mx-auto">
              {
                  items.map( item => {
                      return(
                          <div onClick={ () => handleNavigateToRentalPage( item.id ) } key={ item.id } className='col-12 col-md-3 p-0 m-0 mt-3 mt-md-2'>
                               <div className='d-block mx-auto'>
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
         <button className='btn btn-success mt-3 d-block mx-auto'
                 onClick={ () => history.push('/products/sewing-machine') }
         >
            Sewing Machines for rent in London
         </button>
    </div>
  )
}

export default BrowseItems
 
