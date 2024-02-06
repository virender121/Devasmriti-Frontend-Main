import React, { useState,useEffect } from 'react';
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



function Header2() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
  
    const token = localStorage.getItem("token")

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ns = "app-component-header";

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isLogin, setIsLogin, login, logout } = useAuth();
    const [cartTotal, setCartTotal] = useState(0); 
    const [triggerRefresh, setTriggerRefresh] =React.useState(0)
    useEffect(() => {
      
        const fetchCartData = async () => {
            try {
               
        
                const response = await instance.get("api/cart", {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                setCartTotal(response.data.data.total);
                  setTriggerRefresh(prev => prev + 1)

            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        
        fetchCartData();

        if (token) {
            setIsLogin(true)
        }
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/home');
        setIsLogin(false);
        logout();
        handleClose()
    };

    return (
        <>
            <div className={`${ns}`}>
                <section class="app-clients app-new-clients">
                    <div class="app-clients-content">
                        <div class="app-clients-listing app-new-clients-listing">
                            <div class="marquee">
                                <div class="marquee-inner">
                                    <div class="marquee-content">
                                        <div class="marquee-item">
                                            <p>Get a Discount of <span>Rs 1,500/-</span> purchase of <span>Rs 3.999</span></p>
                                        </div>
                                        <div class="marquee-item">
                                            <p>Get a Discount of <span>Rs 1,500/-</span> purchase of <span>Rs 3.999</span></p>
                                        </div>
                                        <div class="marquee-item">
                                            <p>Get a Discount of <span>Rs 1,500/-</span> purchase of <span>Rs 3.999</span></p>
                                        </div>
                                        <div class="marquee-item">
                                            <p>Get a Discount of <span>Rs 1,500/-</span> purchase of <span>Rs 3.999</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Container maxWidth="lg">
                    <div className={`${ns}__wrapper`} id='AppHeader'>
                        <div className={`${ns}__logo`}>
                            <Link to='/home'>
                                <img src="/images/devasmriti-logo.svg" />
                            </Link>
                        </div>
                        <div className={`${ns}__menu`} id='HeaderButton'>
                            <ul className={`${ns}__menu__list`}>
                                <li className={`${ns}__menu__listitem`} id='wallat'>
                                    <Button disableRipple disableElevation className="wallet-btn">
                                        <img src="/images/icons/wallet.svg"/>
                                        <span className='wallet-btn-text'>1,122</span>
                                    </Button>
                                </li>
                                <li className={`${ns}__menu__listitem`} id='wallat-item'>
                                    <Link to='/cart'>
                                    <Button disableRipple disableElevation className="cart-btn">
                                        <img src="/images/icons/cart.svg"/>
                                        <span className='cart-btn-text'>{cartTotal}</span>
                                    </Button>
                                    </Link>
                                </li>
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
                                            >
                                                <div className='profile-info'>
                                                    <img className='profile-btn-user' src='/images/icons/user.svg' />
                                                    <span className='profile-name'>Abhishek</span>
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
                                                <Link to='/profile'>
                                                    <MenuItem className='menu-one' onClick={handleClose}>Profile</MenuItem>
                                                </Link>
                                                <MenuItem className='menu-two' onClick={handleClose}>My account</MenuItem>
                                                <MenuItem className='menu-three' onClick={handleLogout}>Logout</MenuItem>
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
export default Header2;