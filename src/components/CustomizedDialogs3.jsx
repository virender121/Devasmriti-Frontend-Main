// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { useState } from 'react';
// import ganesh from '../images/confirmation/lord-ganesh.svg';
// import leaf from '../images/confirmation/flower.svg';
// import { Link } from "react-router-dom";


// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// export default function CustomizedDialogs3({total,handleCheckout}) {
//   console.log(handleCheckout)
 


//   return (
//     <div className='log-in confirmation-btn'>
//       <Button className='login-btn' variant="outlined" onClick={handleCheckout}>
//       Place Order ₹{total}
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent>
//          <div className='welcome-back'>
//          <div className='ganesh-leaf'>
//                 <img src={leaf}/>
//             </div>
//           <div className='welcome-back-content'>
//             <img src={ganesh}/>
//             <h4>Puja Booking is Successful</h4>
//             <h5>We have successfully received your details</h5>
//             <p>You will get a confirmation call or WhatsApp within 12 hrs of booking</p>
//           </div>
         
//           <div className='send-otp verify-otp'>
//           <Link to='/home'>
//           <Button disableRipple disableElevation variant="contained" className="app-btn app-btn-primary has-icon-end">
//              <span className="app-btn-text">Return to Homepage</span>
//              </Button>
//           </Link>
//           </div>
//          </div>
//         </DialogContent>
//         {/* <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Save changes
//           </Button>
//         </DialogActions> */}
//       </BootstrapDialog>
//     </div>
//   );
// }