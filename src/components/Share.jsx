import {ShareSocial} from 'react-share-social' 

const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  padding: '5px 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};
export default function RSSUsage({slug}) {
  return <ShareSocial 
     style={style}
     url ={`https://28bookings.com/rental/${slug}`}
     socialTypes={['facebook','twitter']}
   />
}