import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import OtpInput from 'react-otp-input'
import resend from '../../src/images/resend.svg'
import { noauthinstance } from '../utils/Api'
import { useState } from 'react'
import { firebase, auth } from '../config/firebase'
import { useEffect } from "react"
import { CircularProgress } from "@mui/material"
import { useNavigate } from 'react-router-dom'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export default function CustomizedDialogs({ setIsLogin, setTriggerRefresh }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [logindata, setLogindata] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  // const [otp, setOtp] = useState('');
  const [otpOpen, setOtpOpen] = useState(false)
  const [otpData, setOtpData] = useState({ otp: '', user_id: null })
  const [phonecode, setPhonecode] = useState("+91")

  const [formattedPhone, setFormattedPhone] = useState("")
  const [otp, setOtp] = useState('')
  const [show, setshow] = useState(false)
  const [final, setfinal] = useState('')
  const [justPlaying, setJustPlaying] = useState(false)
  const [playingAgain, setPlayingAgain] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifyloading, setVerifyLoading] = useState(false)
  function setuprecaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: function (response) {
        // console.log("recature resolved")
        this.onSignInSubmit()
      }
    })
  }

  useEffect(() => {
    setuprecaptcha()
  }, [])

  useEffect(() => {
    setFormattedPhone(`${phonecode}${phoneNumber}`)
  }, [phoneNumber, phonecode])

  // Sent OTP
  const signin = () => {
    if (formattedPhone === "" || formattedPhone.length < 13) {
      alert("Phone number too short")
      return
    }

    setJustPlaying(true)
    setOtp("")
    setLoading("sending-otp")

    var verify = window.recaptchaVerifier

    auth.signInWithPhoneNumber(formattedPhone, verify).then((result) => {
      setLoading(false)
      setJustPlaying(false)
      setfinal(result)
      setshow(true)
      setResendCountdown(60)
    })
      .catch((err) => {
        alert(err)
        window.location.reload()
      })
  }

  const sendAuthToBackend = async (result) => {
    const response = await noauthinstance.post('api/user/login', { mobile_number: phoneNumber })

    let userid

    if (response.data.success === 1) {
      userid = response.data.data.user_id
    } else {
      return
    }

    const { data, status } = await noauthinstance.post('api/user/login_with_otp', {
      user_id: userid,
      otp: "1234",
      result: JSON.stringify(result)
    })

    // console.log({ data })

    setPlayingAgain(false)

    if (data.success === 1) {
      setIsLogin(true)
      setOtpOpen(false)
      const token = data.data.token.access_token
      localStorage.setItem('token', token)
      const user_id = data.data.user.id
      localStorage.setItem('user_id', user_id)
      // console.log(token)
      setTriggerRefresh(prev => prev + 1)
    }
  }

  // Validate OTP
  const ValidateOtp = () => {
    setPlayingAgain(true)
    if (otp === null || final === null)
      return;
      setVerifyLoading(true);
    final.confirm(otp).then((result) => {
      // success
      sendAuthToBackend(result)
    }).catch((err) => {
      alert("Wrong code")
      setPlayingAgain(false)
    })
    .finally(() => {
      setVerifyLoading(false); // Reset loading state after OTP verification is done
    });
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const isLoggedIn = localStorage.getItem('token') !== null;

  // Check if the name is null
  // const userName = localStorage.getItem('name');
  // const isNameNull = userName === null;
  
  // if (isLoggedIn && isNameNull) {
  //   // User is logged in but the name is null, navigate to the profile or another route
  //   navigate('/profile'); // Change '/profile' to your desired route
  // }
  // const handleClose = () => {
  //   setOpen(false)
  // }
  // const handleotpClose = () => {
  //   setOtpOpen(false)
  // }

  // const handleSendOTP = async () => {
  //   try {
  //     const response = await noauthinstance.post('api/user/login', { mobile_number: phoneNumber })
  //     if (response.data.success === 1) {

  //       setOtpData({
  //         otp: response.data.data.otp,
  //         user_id: response.data.data.user_id,
  //       })
  //       setOpen(false)
  //       setOtpOpen(true)
  //     } else {
  //       console.error('Server response indicates an error.')
  //     }
  //   } catch (error) {
  //     console.error('Error sending OTP:', error)
  //   }
  // }

  // const handleCloseOTP = () => {
  //   setOtpOpen(false)
  // }

  // const handleVerifyOTP = async () => {
  // try {
  // const response = await noauthinstance.post('api/user/login_with_otp', {
  //   user_id: otpData.user_id,
  //   otp: otp,
  // })

  // if (response.data.success === 1) {
  //   setIsLogin(true)
  //   console.log('Login successful')
  //   setOtpOpen(false)
  //   const token = response.data.data.token.access_token
  //   localStorage.setItem('token', token)
  //   const user_id = response.data.data.user.id
  //   localStorage.setItem('user_id', user_id)
  //   console.log(token)
  // } else {
  //   console.error('OTP verification failed.')
  // }
  // } catch (error) {
  //   console.error('Error verifying OTP:', error)
  // }
  // }

  const [resendCountdown, setResendCountdown] = useState(60) // 60 seconds countdown
  const [isCountdownRunning, setIsCountdownRunning] = useState(false)

  const startResendCountdown = () => {
    if (!isCountdownRunning) {
      setResendCountdown(60) // Reset the countdown to its initial value
      setIsCountdownRunning(true)

      const countdownInterval = setInterval(() => {
        setResendCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(countdownInterval) // Stop the countdown when it reaches 0
            setIsCountdownRunning(false)
            return 0
          }
          return prevCountdown - 1
        })
      }, 1000) // Update the countdown every second (1000 ms)
    }
  }



  useEffect(() => {
    if (show) {
      startResendCountdown()
    }
  }, [show])
  const handleWrongNumber = () => {
    setOtp('');
    setshow(false);
    setPhoneNumber('');
};


  return (
    <div className='log-in'>
      <div id="recaptcha-container"></div>
      <Button className='login-btn' variant="outlined" onClick={handleClickOpen}>
        Log In
      </Button>
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
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
              <h2>The way to Sanatan Dharma</h2>
              <p>Start your Journey!</p>
            </div>
            <div className='mobile-number'>
              <label className='' >Mobile No</label>
              <div className='phone-inputs'>
                <input value={phonecode} onChange={e => setPhonecode(e.target.value)} className='input-1' placeholder='+91'  style={{ textAlign: 'center' }} />
                <input className='input-2' placeholder='Enter Number' onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <p>Enter 10 digit number to login your account</p>
            </div>
            <div className='send-otp'>
              <Button style={{ width: "141px", height: "45px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => justPlaying === false ? signin() : undefined} variant="contained" className="app-btn app-btn-primary has-icon-end">
                {loading === "sending-otp" ? <CircularProgress size={24} /> : <span className="app-btn-text">Send OTP</span>}
              </Button>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>

      {/* OTP Dialog */}
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={show}
        onEnter={() => startResendCountdown()}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpen(false)
            setshow(false)
          }}
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
              <p>Sent at <span>+91 {phoneNumber}</span></p>
            </div>
            <div className='send-otp-number'>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
              <div className='resending-otp'>
                <p>Resend OTP in <span>{resendCountdown}s</span></p>
                <h5 style={{cursor:'pointer'}}onClick={handleWrongNumber}>Wrong Number ?</h5>
              </div>
              <div className='resend'>
                <div className='receive-otp'>
                  <p>Didn’t receive the OTP?</p>
                </div>
                <div className='resend-btn'>
                  <Button onClick={() => {
                    if (isCountdownRunning) {
                      return
                    }
                    setOtp("")
                    startResendCountdown()
                    signin()
                  }}>
                    <img src={resend} />
                    <span style={{ color: isCountdownRunning ? undefined : "#ff5b00" }}>Resend</span>
                  </Button>
                </div>
              </div>

            </div>
            <div className='send-otp verify-otp'>
              <Button
                onClick={() => !playingAgain ? ValidateOtp() : undefined}
                variant="contained"
                className="app-btn app-btn-primary has-icon-end"
              >
               {verifyloading ? <CircularProgress size={24} /> : <span className="app-btn-text">Verify</span>}
              </Button>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
    // <div style={{ "marginTop": "200px" }}>
    //   <center>
    //     <div style={{ display: !show ? "block" : "none" }}>
    //       <input value={formattedPhone} onChange={(e) => {
    //         setFormattedPhone(e.target.value)
    //       }}
    //         placeholder="phone number" />
    //       <br /><br />
    //       <div id="recaptcha-container"></div>
    //       <button onClick={signin}>Send OTP</button>
    //     </div>
    //     <div style={{ display: show ? "block" : "none" }}>
    //       <input type="text" placeholder={"Enter your OTP"}
    //         onChange={(e) => { setotp(e.target.value) }}></input>
    //       <br /><br />
    //       <button onClick={ValidateOtp}>Verify</button>
    //     </div>
    //   </center>
    // </div>
  )
}
