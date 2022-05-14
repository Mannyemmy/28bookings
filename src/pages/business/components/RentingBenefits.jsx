import React from 'react'

const RentingBenefits = () => {
  
    const [ collapse , setCollapse ] = React.useState({
        collapse1 : true ,
        collapse2 : false ,
        collapse3 : false ,
        collapse4 : false ,
    })

 const handleCollapse = id => {
     switch(id){
         case 1 : 
           setCollapse( { ...collapse , collapse1 : !collapse.collapse1 } )
        break
        case 2 : 
           setCollapse( { ...collapse , collapse2 : !collapse.collapse2 } )
        break
        case 3 : 
           setCollapse( { ...collapse , collapse3 : !collapse.collapse3 } )
        break
        case 4 : 
           setCollapse( { ...collapse , collapse4 : !collapse.collapse4 } )
        break
        default :  
          setCollapse( { ...collapse } )
     }
 }

  return (
    <div className='renting-benefit px-1 px-md-4 mt-4 py-4'>
          <div className="row col-12 col-md-6 justify-content-md-between w-100 p-0 mx-auto">
              <div className='child-1'>
                   <h5>
                      Benefits of Renting on  <strong>28bookings </strong>
                   </h5>
                   <p>
                      Experience the latest tech without buying.
                   </p>
                   <div className="d-flex justify-content-between">
                        <img src={ require('../../../assets/thumb1.jpg') } alt="thumb1" />
                        <img src={ require('../../../assets/thumb2.jpg') } alt="thumb2" />
                        <img src={ require('../../../assets/thumb3.jpg') } alt="thumb3" />
                   </div>
              </div>
              <div className="child-2 accordion">                             
                    <div>                                 
                        <h5 
                             data-bs-toggle="collapse" href={`#collapse-1`} 
                             className='py-3 py-sm-2 bg-white d-flex justify-content-between px-2 align-items-center'
                             onClick={  () => handleCollapse(1) }
                        >
                            Low upfront cost
                            {  
                                  collapse.collapse1 ?
                                        <span className='fas fa-minus'></span> 
                                             : 
                                        <span className="fas fa-plus"></span> 
                            }
                        </h5>                                
                        <div id={`collapse-1`} className="collapse show px-2 pb-2" data-bs-parent="#accordion">
                            Renting allows you to preserve cash for core investment 
                            needs. This helps you focus on growth opportunities without 
                            spending on infrastructure.
                        </div>
                    </div>                     

                    <div>                                 
                        <h5 
                             data-bs-toggle="collapse" 
                             href={`#collapse-2`} 
                             className='py-3 py-sm-2 bg-white d-flex justify-content-between px-2 align-items-center'
                             onClick={  () => handleCollapse(2) } 
                        >
                           Convenience
                           {  
                                  collapse.collapse2 ?
                                        <span className='fas fa-minus'></span> 
                                             : 
                                        <span className="fas fa-plus"></span> 
                            }
                        </h5>                                
                        <div id={`collapse-2`} className="collapse px-2 pb-2" data-bs-parent="#accordion">
                            28bookings flexible tenure allows you to choose the right
                            subscription plan for your projects without worrying about
                            investment. You can easily scale up (or down) your gadgets
                            with time and projects.
                        </div>
                    </div>     

                    <div>                                 
                        <h5  
                            data-bs-toggle="collapse"
                             href={`#collapse-3`} 
                             className='py-3 py-sm-2 bg-white d-flex justify-content-between px-2 align-items-center'
                             onClick={  () => handleCollapse(3) }
                        >
                            Accounting & Tax benefits
                            {  
                                  collapse.collapse3 ?
                                        <span className='fas fa-minus'></span> 
                                             : 
                                        <span className="fas fa-plus"></span> 
                            }
                        </h5>                                
                        <div id={`collapse-3`} className="collapse px-2 pb-2" data-bs-parent="#accordion">
                                Equipments rented are treated as “Operating lease”
                                and not included as assets on the balance sheet.
                                This increases borrowing capacity and help you 
                                improve financial ratios such as Debt to Equity 
                                or Return on Assets (ROA). Additionally, in many 
                                cases a lease will eliminate the possibility of a
                                loss on sale when owned assets are eventually sold. 
                                If purchased and then depreciated, just about any
                                high tech assets will be on the books at a value 
                                in excess of current market values. 
                        </div>
                    </div>     

                    <div>                                 
                        <h5 
                          data-bs-toggle="collapse" 
                          href={`#collapse-4`} 
                          className='py-3 py-sm-2 bg-white d-flex justify-content-between px-2 align-items-center'
                          onClick={  () => handleCollapse(4) }
                         >
                            Beat obsolescence & boost productivity
                            {  
                                  collapse.collapse4 ?
                                        <span className='fas fa-minus'></span> 
                                             : 
                                        <span className="fas fa-plus"></span> 
                            }
                        </h5>                                
                        <div id={`collapse-4`} className="collapse px-2 pb-2" data-bs-parent="#accordion">
                            Renting allows you to easily upgrade to the latest 
                            gadgets without worrying about disposing your outdated assets.
                            This allows businesses to always work with the latest
                            gadgets and maximise productivity at work
                        </div>
                    </div>     

              </div>
          </div>
    </div>
  )

}

export default RentingBenefits