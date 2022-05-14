import React from 'react'

const TrustedCompanies = () => {

 const  companiesLogo  = [
      require('../../../assets/amazon.png') ,      
      require('../../../assets/wework.png'),
      require('../../../assets/zoomcar.png'),
      require('../../../assets/kotak.png'),
      require('../../../assets/social.png'),
 ]

  return (
    <div className='trusted-companies mt-4'>
            <h5 className='text-center'>  Trusted by companies like:  </h5>
            <div className="d-flex justify-content-center flex-wrap">
                 {
                     companiesLogo.map( (logoSrc,id) => {
                         return( <img key={id} src={ logoSrc } alt="company's logo" /> )
                     })
                 }
            </div>
    </div>
  )
}

export default TrustedCompanies