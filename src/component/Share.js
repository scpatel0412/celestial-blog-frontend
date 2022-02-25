import React from 'react'
import {FacebookIcon,FacebookShareButton,WhatsappIcon,WhatsappShareButton,PinterestShareButton,PinterestIcon, InstapaperIcon} from "react-share"

const Share = () => {
  return (
    <div>
        <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32}/>
        </FacebookShareButton>
        <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon size={32}/>
        </WhatsappShareButton>
        <PinterestShareButton url={window.location.href}>
            <PinterestIcon size={32}/>
        </PinterestShareButton>
        
        
    </div>
  )
}

export default Share