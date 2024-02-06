import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import resend from '../../src/images/resend.svg'



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs2() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [otp, setOtp] = useState('');


  return (
    <div className='log-in'>
      <Button className='login-btn' variant="outlined" onClick={handleClickOpen}>
        Log In
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div className='welcome-back'>
            <div className='welcome-back-content'>
              <h2>Enter OTP </h2>
              <p>Sent at <span>+91 821071 84699</span></p>
            </div>
            <div className='send-otp-number'>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
              <div className='resending-otp'>
                <p>Resending OTP in <span>58s</span></p>
                <h5>Wrong Number ?</h5>
              </div>
              <div className='resend'>
                <div className='receive-otp'>
                  <p>Didn’t receive the OTP?</p>
                </div>
                <div className='resend-btn'>
                  <Button>
                    <img src={resend} />
                    <span>Resend</span>
                  </Button>
                </div>
              </div>

            </div>
            <div className='send-otp verify-otp'>
              <Button variant="contained" className="app-btn app-btn-primary has-icon-end">
                <span className="app-btn-text">Verify</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}