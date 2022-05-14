import React from 'react'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Dates = ({ id }) => {

 const [  calenderDate , setCalenderDate ] = React.useState( new Date() )

  return (
    <>       
        <div className='modal fade date-modal' id={ id }> 
            <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down'>
                <div className='modal-content'>
                
                <div className='modal-header py-3 py-md-2'>
                    <h4 className='modal-title bi bi-calendar2-check'> &nbsp; Select rental dates </h4>
                    <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
                </div>
                
                <div className='modal-body'>
                     <div className='calender-wrapper mx-auto'> 
                            <Calender 
                                    tileClassName={'title'}
                                    className={'w-100 border-0'}
                                    value={ calenderDate }
                                    onChange = {  setCalenderDate }                                                              
                            />
                     </div>
                </div>
                
                <div className='modal-footer py-3 py-md-1'>
                    <button  className='btn btn-light py-1' onClick={ 
                         () => setCalenderDate( new Date() )
                     }>
                        Clear Dates
                    </button>
                    <button  className='btn btn-success py-1'>
                        Apply Dates
                    </button>
                </div>

                </div>
            </div>
        </div>

    </>
  )
}

export default Dates