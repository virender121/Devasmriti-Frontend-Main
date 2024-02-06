import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import facebook from "../../images/social-icons/facebook.svg";
import whatsapp from "../../images/social-icons/whatsapp.svg";
import copyLink from "../../images/social-icons/copylink.svg";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height:"380px",
  width:"400px",
  borderRadius: '10px',
};
const responsiveStyle = {
 width:'30%',

 '@media (max-width: 600px)': {
  width: '90%', 
},

}


const ShareModel = ({ isOpen, handleClose }) => {
     const ModelLinks =[
        {title:"whatsapp",
        link:"https://www.facebook.com",
        des:"Share via whatsapp",
        imagesrc :whatsapp
        },
        {
            title:"Facebook",
        link:"https://www.facebook.com",
        des:"Share via facebook",
        imagesrc :facebook
        },
        {
            title:"Copy Link",
        link:"https://www.facebook.com",
      des:"Tap On The Text To Copy Link",
        imagesrc :copyLink
        }
    ]
  return (
    <div>
      
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
      closeAfterTransition={false}
    >
      
      <Box sx={{ ...style, ...responsiveStyle}} >
        <button
      style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 ,background: "none",border:"none", color:"orange",fontSize:"20px" }}
      onClick={handleClose}
      aria-label="Close"
    >
      X
    </button>
        {ModelLinks.map((share, index ) =>{
            return(
                
                 <div style={{display:"flex",borderBottom:"1px solid orange",marginTop: index === 0 ? '50px' : '10px',marginBottom:"10px"}} key={index}>
        <img src={share.imagesrc} alt='facebookicon' style={{marginBottom: index=== 0 ? '7px': '12px', paddingLeft: index=== 0 ? '0px':"12px" && index===1 ? '7px' :"12px"}}/>
       <div style ={{display:"flex", flexDirection:"column", marginLeft: index === 0 ? '5px':"7px" && index=== 2 ? '14px':'7px',fontWeight:"bold"}}>{share.title}<span></span><span style={{fontSize:"12px"}}>{share.des}</span></div>
    
       </div>
                 )
        })}
       
       
      </Box>
    </Modal>
    </div>
  );
};

export default ShareModel;
