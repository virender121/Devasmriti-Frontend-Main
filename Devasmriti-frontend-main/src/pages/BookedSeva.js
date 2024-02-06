import React, { useEffect } from 'react';
import { Button, Container, FormLabel, Typography } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import footerlogo from '../images/devasmriti-logo.svg';
import profile from '../images/profile/profile.svg'
import footerbg from '../images/footer-bg.svg';
import eclipse from '../images/profile/god.svg';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import BasicAccordion2 from "../components/common/Accordion2";
import image from '../images/address/image.png';
import arrowright from '../images/address/arrow-right.svg';
import search from '../images/address/search.svg'
import Footer from './Footer';
import { useState } from 'react';
import instance from '../utils/Api';
import api from '../config/backend';
import axios from 'axios';
function BookedSeva() {
    const ns = "app-page-home";
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));



    const token = localStorage.getItem("token")
    const [profiledata, setProfiledata] = useState([])

    const [error, setError] = useState("")

    // console.log(profiledata)

    const fetchProfileData = async () => {

        try {

            const response = await axios.get(`${api}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const name = response.data.data.fname;
            localStorage.setItem('name', name);
            // console.log("7777", response.data.data)

            setProfiledata(response.data.data);

        } catch (err) {

            setError(err);

            console.log(err)

        }

    };


    const [bookeddata, setBookeddata] = useState([])

    // console.log(bookeddata)

    const fetchBookedData = async () => {

        try {

            const response = await axios.get(`${api}/api/bookings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const name = response.data.data.fname;
            localStorage.setItem('name', name);


            const allBookings = response.data.data.data;


            const successfulBookings = allBookings.filter(
                (booking) => booking.payment_status === "Success"
            );

            setBookeddata(successfulBookings);
            console.log(successfulBookings)
        } catch (err) {

            setError(err);

            console.log(err)

        }

    };
    useEffect(() => {
        fetchProfileData();
        fetchBookedData()
    }, [])


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);

    const handleSearch = () => {
        const lowerCaseQuery = searchQuery.toLowerCase();
    
        console.log(bookeddata);
    
        const filteredResults = bookeddata.filter((order) => {
            const firstSeva = order.order_sevas?.[0];
            console.log(firstSeva);
    
            if (firstSeva) {
                if (firstSeva.seva_price && firstSeva.seva_price.seva) {
               
                    const title = firstSeva.seva_price.seva.title?.toLowerCase();
                    return title && title.includes(lowerCaseQuery);
                } else if (firstSeva.seva_price_information) {
              
                    const title = JSON.parse(firstSeva.seva_price_information)?.title?.toLowerCase();
                    return title && title.includes(lowerCaseQuery);
                }
            }
    
            return false;
        });
    
        setDisplayedData(filteredResults);
    };
    
    
    useEffect(() => {
        handleSearch();
    }, [searchQuery, bookeddata]);

    const handleDownloadInvoice = (orderId) => {

        const invoiceUrl = `${api}/invoice/${orderId}`;
        console.log(invoiceUrl)
        const link = document.createElement('a');
        link.href = invoiceUrl;
        link.download = `invoice_${orderId}.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            <div className={`${ns}`}>
                <div className={`${ns}__header`}>
                    <Header />
                </div>
                <div className="profile">
                    <div className="profile-container">
                        <div className="profile-content">
                            <div className="profile-menu">
                                <div className="profile-menu-content">
                                    <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
                                    <h4>{profiledata.fname}</h4>

                                    <h5>{profiledata.email}</h5>

                                    <p>+91 {profiledata.mobile_number}</p>
                                    <div className="my-profile-info">
                                        <BasicAccordion2 />
                                    </div>
                                    {/* <div className="profile-log-out-btn">
                                        <Button>Logout</Button>
                                    </div> */}
                                </div>
                            </div>
                            <div className="profile-information">
                                <div className='profile-information-box'>
                                    <div className='search-bar'>
                                        <div className='search-btn-box'>
                                            <img src={search} />
                                        </div>
                                        <input
                                            className=''
                                            placeholder='Search your order here'
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                handleSearch();
                                            }}
                                        />
                                        <div className='search-order'>
                                            <Button className='search-btn' onClick={handleSearch}>
                                                Search Order
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='search-box-title'>
                                        {displayedData.length === 1 ? (
                                            <h3>Your Order <span>({displayedData.length} item)</span></h3>
                                        ) : displayedData.length === 0 ? (
                                            <h3>No orders placed</h3>
                                        ) : (
                                            <h3>Your Order <span>({displayedData.length} items)</span></h3>
                                        )}
                                    </div>
                                    {Array.isArray(displayedData) &&
                                        displayedData.map((order, index) => (
                                            <div className="search-border-box" key={index}>
                                                <div className="search-box">
                                                    <div className="search-box-main">
                                                        <div className="search-box-mini">
                                                            <div className="search-box-mini-content">
                                                                {order.order_sevas[0]?.seva_price?.seva?.feature_image_id ? (
                                                                    <Link to={`/seva/${order.order_sevas[0]?.seva_price?.seva?.slug}`}>
                                                                        <img
                                                                            src={`${order.order_sevas[0]?.seva_price?.seva?.feature_image_id.domain}${order.order_sevas[0]?.seva_price?.seva?.feature_image_id.url}`}
                                                                            alt={`Order ${index + 1}`}
                                                                        />
                                                                    </Link>
                                                                ) : (
                                                                    <img src={image} alt={`Order ${index + 1}`} />
                                                                )}
                                                            </div>

                                                            <div className="deliver-date">
                                                                <h4>
                                                                    {order.order_sevas[0]?.seva_price?.seva?.title || ` ${JSON.parse(order.order_sevas[0]?.seva_price_information)?.title}`}
                                                                </h4>
                                                                <p>₹{order.final_paid_amount}</p>
                                                                <p>Booked on {new Date(order.order_sevas[0].created_at).toDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className='right-down'>
                                                            <button className='download-inv' onClick={() => handleDownloadInvoice(order.order_sevas[0]?.order_id)}>
                                                                Download Invoice
                                                            </button>
                                                            {/* <Link to={`/seva/${order.order_sevas[0]?.seva_price.seva?.slug}`}>
                                                                <div className="arrow">
                                                                    <img src={arrowright} alt="Arrow Right" />
                                                                </div>
                                                            </Link> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}



                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default BookedSeva;
