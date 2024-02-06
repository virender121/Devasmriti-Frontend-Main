// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import durgamata from '../images/discover-more/durgamatha.svg';
import { Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import rakesh from '../images/happy-customers/rakesh-roshan.svg';
import quote from '../images/happy-customers/quote.svg';
import api from '../config/backend';
import axios from 'axios';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import { useEffect, useState } from 'react';
import instance from '../utils/Api';



export default () => {

    const [testimonials, setTestimonials] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token")
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get(`${api}/api/home/testimonials`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                      'paginate': '0',
                    }
                  });
                // console.log(response.data.data.data)
                setTestimonials(response.data.data.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchTestimonials();
    }, []);
    return (
        <Swiper

            slidesPerView={1}

            spaceBetween={30}

            autoplay={{

                delay: 2000,

                disableOnInteraction: false,

            }}

            loop={true}

            pagination={{

                clickable: true,

            }}



            breakpoints={{

                640: {

                    slidesPerView: 1,

                    spaceBetween: 20,

                },

                768: {

                    slidesPerView: 1,

                    spaceBetween: 40,

                },

                1024: {

                    slidesPerView: 1,

                    spaceBetween: 70,

                },

            }}

            navigation={{
                nextEl: null, // Hide next arrow
                prevEl: null, // Hide prev arrow
            }}

            modules={[Autoplay, Navigation]}

            className="mySwiper"

        >
            {testimonials && testimonials.map((item, index) => {
                // console.log(item)
                return (
                    <SwiperSlide>
                        <div className="happy-customers-sliders">
                            <div className="happy-customers-cards">
                                <div className="happy-customers-card-content">
                                    <img src={quote} />
                                    <p className='happy-customer-mini-content'>{item.description}</p>
                                    <div className="card-image">
                                        {/* <div className="">
                                            <img src={rakesh} />
                                        </div> */}
                                        <div className="card-image-content">
                                            <h5>{item.name}</h5>
                                            <p>{item.profession}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })}

            {/* <SwiperSlide>
                <div className="happy-customers-sliders">
                    <div className="happy-customers-cards">
                        <div className="happy-customers-card-content">
                            <img src={quote} />
                            <p>Your website is the mirror of your business. Great design is essential to business. Our design-thinking lead process permeates our organization and culture.</p>
                            <div className="card-image">
                                <div className="">
                                    <img src={rakesh} />
                                </div>
                                <div className="card-image-content">
                                    <h5>Rakesh Roshan</h5>
                                    <p>Microsoft. Corp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="happy-customers-sliders">
                    <div className="happy-customers-cards">
                        <div className="happy-customers-card-content">
                            <img src={quote} />
                            <p>Your website is the mirror of your business. Great design is essential to business. Our design-thinking lead process permeates our organization and culture.</p>
                            <div className="card-image">
                                <div className="">
                                    <img src={rakesh} />
                                </div>
                                <div className="card-image-content">
                                    <h5>Rakesh Roshan</h5>
                                    <p>Microsoft. Corp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide> */}

        </Swiper>
    );
};