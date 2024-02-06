import React from 'react'
import footerlogo from '../images/devasmriti-logo.svg'
import om from '../images/banner/om-lg-left.svg';
import om2 from '../images/banner/om-sm-right.svg';
import Grid from '@mui/material/Grid';
import cloud from '../images/banner/cloud.svg';
import footerbg from '../images/footer-bg.svg';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import facebook from '../../src/images/social-icons/facebook.svg';
import youtube from '../../src/images/social-icons/youtube.png';
import instagram from '../../src/images/social-icons/instagram.svg';
import linkedin from '../../src/images/social-icons/linkedin.png';


const Footer = () => {
    return (
        <>
            <div className="footer">
                <Container>
                    <div className="footer-logo-content">
                        <Link to='/home'>
                            <img src={footerlogo} />
                        </Link>
                        {/* <p>At Devasmriti, we deeply comprehend the transformative power of spiritual.</p> */}
                        <div className='footer-social-icons'>
                            <ul>
                                <li>
                                    <a href='https://www.facebook.com/devasmritiofc?mibextid=LQQJ4d' target='_blank'>
                                        <img src={facebook} />
                                    </a>
                                </li>
                                <li>
                                    <a href='https://instagram.com/devasmriti?igshid=OGQ5ZDc2ODk2ZA' target='_blank'>
                                        <img src={instagram} />
                                    </a>
                                </li>
                                <li>
                                    <a href=' https://www.linkedin.com/company/devasmritioriginal/' target='_blank'>
                                        <img src={linkedin} />
                                    </a>
                                </li>
                                <li>
                                    <a href='https://youtube.com/@Devasmriti?si=2XUvigHGZyVpdViR' target='_blank'>
                                        <img src={youtube} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-main-content">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                <div className="get-to-know">
                                    <p>Get to know us</p>
                                    <ul>
                                        <li>
                                            <Link to='/home'>
                                                Home
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <Link to='/sevas'>
                                                Individual
                                            </Link>
                                        </li> */}
                                        {/* <li>
                                            <Link to='/about_us'>
                                                About Us
                                            </Link>
                                        </li> */}
                                        {/* <li>
                                            <Link to='/event'>
                                                Champaign
                                            </Link>
                                        </li> */}
                                        <li>
                                            <Link to='/explore_puja'>
                                                Explore All
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="">Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                <div className="get-to-know">
                                    <p>Connect with us</p>
                                    <ul>
                                        <li>
                                            <Link to="">Facebook</Link>
                                        </li>
                                        <li>
                                            <Link to="">Twitter</Link>
                                        </li>
                                        <li>
                                            <Link to="">Instagram</Link>
                                        </li>
                                        <li>
                                            <Link to="">Youtube</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                <div className="get-to-know">
                                    <p>Company</p>
                                    <ul>
                                        <li>
                                            <Link to="/about_us">About Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/terms">Terms of Use</Link>
                                        </li>
                                        <li>
                                            <Link to="/Privacy">Privacy Policy</Link>
                                        </li>
                                        <li>
                                            <Link to="/Refund">Refund / Cancellation Policy</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                <div className="get-to-know get-to-know-2">
                                    <p>Registered Office Address</p>
                                    <ul>
                                        <li>91 Springboard Business Hub Pvt Ltd, LVS Arcade, Plot No. 71, Jubilee Enclave, Hitec City, Madhapur, Serilingampally, Hyderabad, Telangana, India – 500081</li>
                                        <li>
                                            < a href='tel:support@devasmriti.com'>Email : support@devasmriti.com</a>
                                        </li>
                                        <li>
                                            < a href='tel:+91 9697972999'> Phone : +91 9697972999</a>
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
                <div className="footer-bg">
                    <img src={footerbg} />
                </div>
            </div>
            <div className="sub-footer">
                <Container>
                    <div className="sub-footer-content">
                        <p>© Devasmriti Digital Services Private Limited Copyright 2023. All Rights Reserved.</p>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer