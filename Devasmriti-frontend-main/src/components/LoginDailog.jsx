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
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/Auth'
import { CircularProgress } from "@mui/material"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))

export default function LoginDailog({ open, handleClose,handleBookSeva,seva,setTriggerRefresh,productDetails,selectedSevaPrice }) {

    const navigate = useNavigate()
    const [logindata, setLogindata] = useState([])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [otpOpen, setOtpOpen] = useState(false)
    const [otpData, setOtpData] = useState({ otp: '', user_id: null })
    const [loading, setLoading] = useState(false)
    const [verifyloading, setVerifyLoading] = useState(false)
    const { setIsLogin } = useAuth()

    // console.log(logindata)

    // console.log(otp)
    // const [open, setOpen] = useState(false)
    const [phonecode, setPhonecode] = useState("+91")

    const [formattedPhone, setFormattedPhone] = useState("")
    const [justPlaying, setJustPlaying] = useState(false)
    const [playingAgain, setPlayingAgain] = useState(false)

    const [show, setshow] = useState(false)
    const [final, setfinal] = useState('')

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
            console.log({seva})
            setIsLogin(true)
            setOtpOpen(false)
            const token = data.data.token.access_token
            localStorage.setItem('token', token)
            const user_id = data.data.user.id
            localStorage.setItem('user_id', user_id)
            // console.log(token)
            
            handleClose()
            setshow(false)
            if (handleBookSeva) {
                handleBookSeva(seva, true);
            } else if (productDetails) {
                navigate(`/checkout/${productDetails.is_expaired ? '#' : `${productDetails.slug ? productDetails.slug : productDetails.id}/seva/${selectedSevaPrice && selectedSevaPrice.id}`}`);
            }
               setTriggerRefresh(prev => prev + 1)
           
        }
    }

    // Validate OTP
    const ValidateOtp = (seva) => {
        setPlayingAgain(true)
        // e.preventDefault()
        // console.log({ otp })
        if (otp === null || final === null)
            return;
            setVerifyLoading(true);
        final.confirm(otp).then((result) => {
            // success
            // navigate("/home")
            sendAuthToBackend(result,seva)
            // navigate(-1)
        }).catch((err) => {
            alert("Wrong code")
            setPlayingAgain(false)
        })
        .finally(() => {
            setVerifyLoading(false); // Reset loading state after OTP verification is done
          });
    }

    const isLoggedIn = localStorage.getItem('token') !== null;

    // Check if the name is null
    const userName = localStorage.getItem('name');
    // const isNameNull = userName === null;
    
    // if (isLoggedIn && isNameNull) {
    //   // User is logged in but the name is null, navigate to the profile or another route
    //   navigate('/profile'); // Change '/profile' to your desired route
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


    const [isOtpVerification, setIsOtpVerification] = useState(false);

    // ... (other code)

    const handleWrongNumber = () => {
        setshow(false);
        setPhoneNumber('');
    };

    return (
        <div className='log-in'>
            <div id="recaptcha-container"></div>
            {/* <Button className='login-btn' variant="outlined" open={open}>
            </Button> */}
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
                        // setOpen(false)
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
                                <h5 onClick={handleWrongNumber}>Wrong Number ?</h5>
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
    )
}
