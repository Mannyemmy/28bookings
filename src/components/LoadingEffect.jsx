import React from 'react'

const LoadingEffect = ({ className , height }) => {
  return (
    <div className={ `d-flex justify-content-center w-100 align-items-center ${ className }` }
         style ={{ height : height }}
      >
           <span className='spinner spinner-border'></span>
    </div>
  )
}

export default LoadingEffect