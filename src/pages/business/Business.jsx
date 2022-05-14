import React,{ Fragment} from 'react'
import Navbar from '../../components/_navbar/Navbar'
import ExperienceMore from './components/ExperienceMore'
import Header from './components/Header'
import HelpingBusiness from './components/HelpingBusiness'
import OurExperience from './components/OurExperience'
import OurStories from './components/OurStories'
import RentingBenefits from './components/RentingBenefits'
import RequestACallback from './components/RequestACallback'
import TrustedCompanies from './components/TrustedCompanies'

const Business = () => {
    
 React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))

  return (
    <Fragment>
          <Navbar />
          <div className='_business'>
               <Header />
               <TrustedCompanies />
               <HelpingBusiness />
               <RentingBenefits />
               <RequestACallback />
               <OurExperience />
               <OurStories />
               <ExperienceMore />
          </div>
    </Fragment>
  )
}

export default Business