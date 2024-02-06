import React, { useState, useEffect } from 'react';
import { Container, IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AlertDialog from '../CustomizedDialogs';
import CustomizedDialogs from '../CustomizedDialogs';
import { Link } from "react-router-dom";
import instance from "../../utils/Api";
import { useAuth } from '../../utils/Auth';
import { useNavigate } from "react-router-dom";
import { useCart } from '../../pages/CartContext';
import profile from '../../images/user.svg';
import booked from '../../images/profile/booked-seva.svg';
import log from '../../images/log-outicon.svg'
import HeaderSwiper from './HeaderSwiper';
import api from '../../config/backend';
import axios from 'axios';


function Header({ triggerRefresh1, setTriggerRefresh, showClientsSection }) {
    const navigate = useNavigate()
    const { cartTotal, setCartTotal, setCartCountRefresh } = useCart();
    const [anchorEl, setAnchorEl] = useState(null);

    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ns = "app-component-header";


    const { isLogin, setIsLogin, login, logout } = useAuth();



    // const [triggerRefresh, setTriggerRefresh] = React.useState(0)
    useEffect(() => {

        const fetchCartData = async () => {

            // console.log({ triggerRefresh1 })
            try {


                const response = await axios.get(`${api}/api/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'paginate': '0',
                    }
                });

                // console.log(response.data.data.data.length)


                // setTriggerRefresh(prev => prev + 1)
                setCartCountRefresh(prev => prev + 1)


            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();

        if (token) {
            setIsLogin(true)
        }
    }, [triggerRefresh1]);
    const [profiledata, setProfiledata] = useState([])
    const [announcedata, setAnnouncedata] = useState([])
    const [error, setError] = useState("")


    // console.log(profiledata)

    const fetchAnnounceData = async () => {
        try {
            const response = await axios.get(`${api}/api/anouncement`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'paginate': '0',

                }
            });
            const data = response.data.data.data;
            if (data && data.length > 0) {
                setAnnouncedata(data);
            }
        } catch (err) {
            setError(err);
            console.error(err);
        }
    };

    const fetchProfileData = async () => {


        try {
            const response = await axios.get(`${api}/api/user/profile`, {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'paginate': '0',
                }
            })
            // console.log({ data: response.data })
            setProfiledata(response.data.data.mobile_number);
            const name = response.data.data.fname
            localStorage.setItem('name', name || '');
        } catch (err) {
            setError(err);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAnnounceData();
    }, [])

    useEffect(() => {
        // console.log(triggerRefresh1)
        fetchProfileData();
    }, [triggerRefresh1]);


    const handleLogout = () => {
        localStorage.clear();
        setCartCountRefresh(prev => prev + 1)
        navigate('/home');
        window.location.reload()
        setIsLogin(false);
        logout();
        handleClose()
    };
    // console.log({ cartTotal })
    // const isLoggedIn = localStorage.getItem('token') !== null;
    // const userName = localStorage.getItem('name');
    // const isNameNullOrEmpty = userName === null || userName.trim() === '';

    // // Check if name is null or empty after login and navigate to /profile if needed
    // useEffect(() => {
    //     // Check if name is null or empty after login and navigate to /profile if needed
    //     if (isLoggedIn && isNameNullOrEmpty) {
    //         // User is logged in but the name is null or empty, navigate to the profile or another route
    //         navigate('/profile');
    //     } else if (isLoggedIn && !isNameNullOrEmpty) {
    //         // User is logged in and the name is not null, navigate to the homepage
    //         navigate('/home');
    //     }
    // }, [isLoggedIn, isNameNullOrEmpty, navigate]);


    return (
        <>
            <div className={`${ns}`}>

                {showClientsSection !== false && (
                    <section className="app-clients app-new-clients">
                        <div className="app-clients-content">
                            <div className="app-clients-listing app-new-clients-listing">
                                <div className="marquee">
                                    <div className="marquee-inner">
                                        <div className="marquee-content">
                                            <HeaderSwiper />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <Container maxWidth="lg">
                    <div className={`${ns}__wrapper`} id='AppHeader'>
                        <div className={`${ns}__logo`}>
                            <Link to='/home'>
                                <img src="/images/devasmriti-logo.svg" />
                            </Link>
                        </div>
                        <div className={`${ns}__menu`} id='HeaderButton'>
                            <ul className={`${ns}__menu__list`}>
                                {/* <li className={`${ns}__menu__listitem`} id='wallat'>
                                    <Button disableRipple disableElevation className="wallet-btn">
                                        <img src="/images/icons/wallet.svg" />
                                        <span className='wallet-btn-text'>{profiledata}</span>
                                    </Button>
                                </li> */}
                                {/* <li className={`${ns}__menu__listitem`} id='wallat-item'>
                                    <Link to='/cart'>
                                        <Button disableRipple disableElevation className="cart-btn">
                                            <img src="/images/icons/cart.svg" />
                                            <span className='cart-btn-text'>{cartTotal}</span>
                                        </Button>
                                    </Link>
                                </li> */}
                                <li className={`${ns}__menu__listitem`}>
                                    {isLogin ? (

                                        <>
                                            <Button
                                                id="basic-button"
                                                className='profile-btn'
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                disableRipple disableElevation
                                            >
                                                <div className='profile-info'>
                                                    <img className='profile-btn-user' src='/images/icons/user.svg' />
                                                    {/* <span className='profile-name'>{name}</span> */}
                                                    <img className='profile-btn-arrow' src='/images/icons/down-arrow.svg' />
                                                </div>
                                            </Button>
                                            <Menu className='header-menu'
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem className='menu-one'>{"+91" + profiledata}</MenuItem>
                                                <Link to='/user/profile'>
                                                    <MenuItem className='menu-one' onClick={handleClose}><img src={profile} />Profile</MenuItem>
                                                </Link>
                                                <Link to='/bookedseva'>
                                                    <MenuItem className='menu-two' onClick={handleClose}><img src={booked} />Booked Seva</MenuItem>
                                                </Link>
                                                <MenuItem className='menu-three' onClick={handleLogout}><img src={log} />Logout</MenuItem>
                                            </Menu>
                                        </>
                                    ) : (
                                        <CustomizedDialogs isLogin={isLogin} setIsLogin={setIsLogin} setTriggerRefresh={setTriggerRefresh} />
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default Header;