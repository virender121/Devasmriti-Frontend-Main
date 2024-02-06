import { Button, Container } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import om from '../images/banner/om-lg-left.svg';
import om2 from '../images/banner/om-sm-right.svg';
import smcloud from '../images/banner/sm-cloud.svg';
import cloud from '../images/banner/cloud.svg';
import durgamata from '../images/discover-more/durgamatha.svg';
import lordshiva from '../images/discover-more/lord-shiva.png';
import puja from '../images/features/puja.svg'
import annadanam from '../images/features/annadanam.svg'
import gauseva from '../images/features/gau-seva.svg'
import templeconstruction from '../images/features/temple-construction.svg'
import others from '../images/features/others.svg'
import pooja from '../images/devasmriti-digitally/pooja.svg'
import family from '../images/devasmriti-digitally/family-data.svg'
import booking from '../images/devasmriti-digitally/booking.svg'
import blessing from '../images/devasmriti-digitally/blessing.svg'
import footerbg from '../images/footer-bg.svg'
import React, { useRef, useState, useEffect } from 'react';
import BasicAccordion from "../components/common/Accordion";
import footerlogo from '../images/devasmriti-logo.svg'
import Swipper from "../components/common/Swipper";
import { Link } from "react-router-dom";
import Swipper2 from "../components/Swipper2";
import SevasSwiper from "../components/common/SevasSwiper";
import Footer from "./Footer";
import api from "../config/backend";
import axios from "axios";
import { useCart } from "./CartContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Home({ triggerRefresh1, setTriggerRefresh }) {
    const ns = "app-page-home";
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const sevasSectionRef = useRef(null);

    const token = localStorage.getItem("token");
    const { orderStatus } = useCart()
    const [sevaTypeDynamic, setSevaTypeDynamic] = useState([]);
    const Explore = async () => {
        try {
            const { data, status } = await axios.get(`${api}/api/seva_types`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    paginate: "0",
                },
            });
            const filterdSevas = data.data.data.filter(item => item.is_active === true);
            console.log("data", filterdSevas)

            setSevaTypeDynamic(filterdSevas);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        Explore();
    }, []);

    useEffect(() => {
        if (orderStatus == true) {
            toast.success('Your seva was booked successfully, check the details in booked seva section')
        }
    }, [])

    return (
        <>
            <div className={`${ns}`}>
                <div className={`${ns}__header`}>
                    <Header triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />
                </div>
                <div className={`${ns}__banner`} id="AppBanner">
                    {/* <img className="om-lg-left" src="/images/om-lg-left.svg"/>
                    <img className="om-sm-right" src="/images/om-sm-right.svg"/>
                    <div className="banner-clouds">
                        <img className="cloud-right" src="/images/cloud.svg"/>
                        <img className="cloud-left" src="/images/cloud.svg"/>
                    </div> */}
                    <Container maxWidth="lg">
                        <div className='banner-content'>
                            <h1>The Way to <span>Sanatan Dharma</span></h1>
                            {/* <p>Experience the sacred rituals with Devasmriti simply book tour spiritual journey, Take part in Sevas, Poojas, Annadanam, Gau Poojas and more, All from your Home.</p> */}

                            <Button onClick={() => sevasSectionRef.current.scrollIntoView({ behavior: 'smooth' })} variant="contained" disableRipple disableElevation className="app-btn app-btn-primary has-icon-end">
                                <span className="app-btn-text">Book Now</span>
                                {/* <img className="app-btn-img" src="/images/icons/arrow-right.svg"/> */}
                            </Button>

                        </div>
                        <div className='banner-image'>
                            <img className="banner-lp" src="/images/banner-mountain.svg" />
                            <img className="banner-mb" src="/images/banner-mb.svg" />
                        </div>
                    </Container>
                    <div className="om-left">
                        <img src={om} />
                    </div>
                    <div className="cloud-left">
                        <img src={cloud} />
                    </div>
                    <div className="cloud1-left">
                        <img src={smcloud} />
                    </div>
                    <div className="om-right">
                        <img src={om2} />
                    </div>
                    <div className="cloud1-right">
                        <img src={cloud} />
                    </div>
                    <div className="cloud-right">
                        <img src={cloud} />
                    </div>
                </div>
                <div className="discover-more" ref={sevasSectionRef}>
                    <Container>
                        <div className="discover-more-content">
                            <div className="discover-more-buttons">
                                <div className="">
                                    <h2>Discover more Puja's</h2>
                                </div>
                                <div className="">
                                    <Link to='/explore_puja'>
                                        <Button disableRipple disableElevation>Explore All
                                            <span><img className="app-btn-img" src="/images/icons/arrow-right-orange.svg" /></span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <Swipper />
                        </div>
                    </Container>
                </div>
                <div className="our-special-offers">
                    <Container>
                        <div className="our-special-offers-box">
                            <Grid container alignItems={'center'} spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <div className="our-special-offers-content">
                                        <h2><span>Thai Pusam Annadaan </span> seva for sadhus in Tiruvannamalai </h2>
                                        <p>Get closer to the divine by feeding the Sadhus and devotees in Tiruvannamalai with Rs.251</p>
                                        <div className="offers-button">
                                            <Link to='/seva/thaipusamannadanam-2024'>
                                                <Button variant="contained" disableRipple disableElevation className="app-btn app-btn-primary has-icon-end">
                                                    <span className="app-btn-text">Book Now</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <div className="our-special-offers-image">
                                        <img src={lordshiva} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                {/* <div className="discover-more" ref={sevasSectionRef}> */}
                {/* <Container>
                        <div className="discover-more-content">
                            <div className="discover-more-buttons">
                                <div className="">
                                    <h2>Sevas</h2>
                                </div>
                                <div className="">
                                    <Link to='/explore_puja'>
                                        <Button disableRipple disableElevation>Explore All
                                            <span><img className="app-btn-img" src="/images/icons/arrow-right-orange.svg" /></span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <SevasSwiper />
                        </div>
                    </Container> */}
                {/* </div> */}
                <div className="featured-sevas">
                    <Container>
                        <div className="featured-seva-box">
                            <h4>Categories</h4>
                            <div className="fearuted-box-content">
                                <Grid container justifyContent={'center'} spacing={2}>
                                    {/* <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                                            <Link to={"/explore_puja?category=All"}>
                                                <div className="box-content">
                                                    <img style={{width: "150px", height:"150px",objectFit: "cover"}} src={others}/>
                                                    <h4>All</h4>
                                                </div>
                                            </Link>
                                    </Grid> */}
                                    {sevaTypeDynamic.map((item) => {
                                        // console.log(item);
                                        return (
                                            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                                                <Link to={`/explore_puja?category=${item.id}`}>
                                                    <div className="box-content">
                                                        <img style={{ width: "150px", height: "150px", objectFit: "cover" }} src={`${item.image.domain}${item.image.url}`} />
                                                        <h4>{item.name}</h4>
                                                    </div>
                                                </Link>
                                            </Grid>)
                                    })}
                                </Grid>
                            </div>
                        </div>
                    </Container>
                </div>
                {/* <div className="devasmriti-digital-main">
                    <Container>
                        <div className="devasmriti-digital-content">
                            <h2>Know how you will indulge in sevas with <span>Devasmriti, Digitally</span></h2>
                        </div>
                        <div className="devasmriti-digital">
                        <Grid container justifyContent={'center'} alignItems={'center'} spacing={2}>
                            <Grid item xs={12} sm={12}md={4} lg={5} xl={5}>
                                <div className="devasmriti-image">
                                    <img src={pooja} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}md={4} lg={5} xl={5}>
                                <div className="devasmriti-digital-seva-content">
                                    <h2>01</h2>
                                    <h5>Choose a <span> Pooja</span></h5>
                                    <p>Lorem Epson is a dummy text to fill the sentences</p>
                                </div>
                            </Grid>
                        </Grid>
                        </div>
                        <div className="devasmriti-digital">
                        <Grid container justifyContent={'center'} alignItems={'center'} spacing={2}>
                            <Grid item xs={12} sm={12}md={4} lg={5} xl={5}>
                                <div className="devasmriti-image">
                                    <img src={family} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}md={4} lg={5} xl={5}>
                                <div className="devasmriti-digital-seva-content devasmriti-digital-seva-content-2">
                                    <h2>02</h2>
                                    <h5>Add<span> Family Data</span></h5>
                                    <p>Lorem Epson is a dummy text to fill the sentences</p>
                                </div>
                            </Grid>
                        </Grid>
                        </div>
                        <div className="devasmriti-digital">
                        <Grid container justifyContent={'center'} alignItems={'center'} spacing={2}>
                            <Grid item xs={12} sm={12}md={4} lg={5} xl={5}>
                                <div className="devasmriti-image">
                                    <img src={booking} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}md={4} lg={5} xl={5}>
                                <div className="devasmriti-digital-seva-content devasmriti-digital-seva-content-2">
                                    <h2>03</h2>
                                    <h5>Complete<span> Booking</span></h5>
                                    <p>Lorem Epson is a dummy text to fill the sentences</p>
                                </div>
                            </Grid>
                        </Grid>
                        </div>
                        <div className="devasmriti-digital">
                        <Grid container justifyContent={'center'} alignItems={'center'} spacing={2}>
                            <Grid item xs={12} sm={12}md={4} lg={5} xl={5}>
                                <div className="devasmriti-image">
                                    <img src={blessing} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}md={4} lg={5} xl={5}>
                                <div className="devasmriti-digital-seva-content devasmriti-digital-seva-content-3">
                                    <h2>04</h2>
                                    <h5>Receive the<span> Blessing</span></h5>
                                    <p>Lorem Epson is a dummy text to fill the sentences</p>
                                </div>
                            </Grid>
                        </Grid>
                        </div>
                    </Container>
                    <div className="nama-bg"></div>
                </div> */}
                <div className="bookseva-lorem">
                    <Container>
                        <div className="bookseva-lorem-content">
                            <h2>Way to Sanathan Dharma</h2>
                            <Link to='/explore_puja'>
                                <Button variant="contained" disableRipple disableElevation className="app-btn app-btn-primary has-icon-end">
                                    <span className="app-btn-text">Start your Journey</span>
                                    {/* <img className="app-btn-img" src="/images/icons/arrow-right.svg"/> */}
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </div>

                <div className="happy-customers">
                    <Container>
                        <div className="happy-customers-content">
                            <h3>Blessed devotees</h3>
                            <h2>A word from our devotees</h2>
                        </div>
                        <Swipper2 />
                    </Container>
                </div>
                <div className="faq">
                    <Container>
                        <div className="faq-content">
                            <h2>Frequently asked questions</h2>
                        </div>
                        <div className="faq-main-content">
                            < BasicAccordion />
                        </div>
                    </Container>
                </div>
                <Footer />
            </div>
            <ToastContainer />
        </>
    )
}

export default Home;
