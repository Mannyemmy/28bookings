import React from 'react'
import Switch from 'react-switch'

const AccountSettings = () => {

 const[ contactPreferences , setContactPreference  ] = React.useState(false)
 const[ isItemSearchable , setIsItemSearchable   ] = React.useState(true)
 
 const handleContactPreference = () => setContactPreference(!contactPreferences)
 const handleItemSearchable = () => setIsItemSearchable(!isItemSearchable)


  return (
    <>
       <button class='btn modal-toggler py-0 my-0' data-bs-toggle='modal' data-bs-target='#account-settings'>
           Account Settings
        </button>
 
        <div class='modal  fade' id='account-settings'>
            <div class='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
                <div class='modal-content'>     
                    <div class='modal-header py-2 ps-1'>
                        <h4 class='modal-title py-0 my-0 bi bi-gear'> Account Settings </h4>
                        <button type='button' class='btn-close' data-bs-dismiss='modal'></button>
                    </div>     
                    <div class='modal-body px-2 pt-2'>
                       <div className='contact-preference'>
                             <h6 className='mb-0'> Contact preferences  </h6>
                             <p className='d-flex justify-content-between'>
                                 <span> 
                                      Receive exclusive offers and hear 28bookings latest news
                                 </span>
                                <Switch
                                    checked={ contactPreferences } 
                                    onChange = { handleContactPreference }   
                                    activeBoxShadow={'0 0 0 transparent'} 
                                    onColor = '#00985d'  
                                    width={ window.matchMedia('(max-width:500px)') && 40 }
                                    height = { window.matchMedia('(max-width:500px)') && 20 }
                                    handleDiameter = { window.matchMedia('(max-width:500px)') && 20 }
                                  />  
                             </p>
                             <h6 className='mb-01'> Holiday mode </h6>
                             <p  style={{ textAlign : 'left' }}>
                                If you know you will be unable to manage your account 
                                 for a while you can pause the entire account. 
                                 This means your items will be paused so you don't
                                  hurt your lender rating with slow replies or rejected rentals.
                             </p>
                             <p className='d-flex justify-content-between mb-0'>
                                 <span className='text-success'> 
                                    Your items are searchable and bookable.
                                 </span>
                                <Switch
                                    checked={ isItemSearchable } 
                                    onChange = { handleItemSearchable }   
                                    activeBoxShadow={'0 0 0 transparent'} 
                                    onColor = '#00985d'  
                                    width={ window.matchMedia('(max-width:500px)') && 40 }
                                    height = { window.matchMedia('(max-width:500px)') && 20 }
                                    handleDiameter = { window.matchMedia('(max-width:500px)') && 20 }
                                  />  
                             </p>
                        </div>                                    
                    </div>                           
                </div>
            </div>
        </div>
    </>
  )
}

export default AccountSettings