'use client'
import Property from '@/models/Property';
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton,EmailShareButton,FacebookIcon,TwitterIcon,WhatsappIcon,EmailIcon} from 'react-share'
const ShareButton = ({property}) => {
  console.log("propertyyyy",property);
  
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
  return  (
    <>
    <h3 className="text-xl font-bold text-center pt-2">Share This</h3>
    <div className="flex gap-3 justify-center pb-5">
      <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g,'')}For Rent`}>
      <FacebookIcon size={40} round={true}/>

      </FacebookShareButton>
       <TwitterShareButton url={shareUrl} quote={property.name} hashtags={[`${property.type.replace(/\s/g,'')}For Rent`]}>
      <TwitterIcon size={40} round={true}/>

      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} quote={property.name} separator='::'>
      <WhatsappIcon size={40} round={true}/>

      </WhatsappShareButton>
      <EmailShareButton url={shareUrl} quote={property.name} body={`check this out ${shareUrl}!`}>
      <EmailIcon size={40} round={true}/>

      </EmailShareButton>
    </div>
    </>
  )
};

export default ShareButton;
