import React from 'react'

const Category = ({ id }) => {
  
  const categories = [
     {
       id : 1,
       imageSrc : '/svg-icons/film&photography.svg',
       name : 'Film & Photography'
     } ,
     {
      id : 2,
      imageSrc : '/svg-icons/audiovisualequipment.svg',
      name : 'Audio Visual Equipment'
    } ,
    {
      id : 3,
      imageSrc : '/svg-icons/projectors&screens.svg',
      name : 'Projectors & Screens'
    } ,
    {
      id : 4,
      imageSrc : '/svg-icons/drones.svg',
      name : 'Drones'
    } ,
    {
      id : 5,
      imageSrc : '/svg-icons/djequipment.svg',
      name : 'dj equipment'
    } ,
    {
      id : 6,
      imageSrc : '/svg-icons/transport.svg',
      name : 'transport'
    } ,
    {
      id : 7,
      imageSrc : '/svg-icons/storage.svg',
      name : 'storage'
    } ,
    {
      id : 8,
      imageSrc : '/svg-icons/electronics.svg',
      name : 'electronics'
    } ,
    {
      id : 9,
      imageSrc : '/svg-icons/party&events.svg',
      name : 'party & events'
    } ,
    {
      id : 10,
      imageSrc : '/svg-icons/sports.svg',
      name : 'sports'
    } ,
    {
      id : 11,
      imageSrc : '/svg-icons/musicalinstruments.svg',
      name : 'musical instruments'
    } ,
    {
      id : 12,
      imageSrc : '/svg-icons/home,office&garden.svg',
      name : 'home,office & garden'
    } ,
    {
      id : 13,
      imageSrc : '/svg-icons/kids&baby.svg',
      name : 'kids & baby'
    } ,
    {
      id : 14,
      imageSrc : '/svg-icons/holiday&travel.svg',
      name : 'holiday & travel'
    } ,
    {
      id : 15,
      imageSrc : '/svg-icons/clothing.svg',
      name : 'clothing'
    } ,
  ] 

  return (
    <>
        <div className='modal fade category-modal' id={ id }> 
            <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down'>
                <div className='modal-content'>
                
                <div className='modal-header py-3 py-md-2'>
                    <h4 className='modal-title'> Categories </h4>
                    <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
                </div>
                
                <div className='modal-body px-1'>
                      <div className="row w-100 p-0 m-0 mx-auto justify-content-between">
                           { 
                             categories.map( category => {
                                const {  id , name , imageSrc } = category
                                 return ( 
                                    <div key={id} className='col-sm-3  flex-child'>
                                         <div style={ { backgroundImage : `url(${ imageSrc })` } }
                                              className="svg-image d-block mx-auto"
                                              ></div>
                                          <p className='text-center'> { name } </p>
                                    </div> 
                                  )

                             } )
                           }
                      </div>
                </div>         
                </div>
            </div>
        </div>
    </>
  )
}

export default Category