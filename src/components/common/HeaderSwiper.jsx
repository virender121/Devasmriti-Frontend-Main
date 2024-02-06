import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import instance, { noauthinstance } from "../../utils/Api";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import durgamata from '../../images/discover-more/durgamatha.svg';
import { Button } from "@mui/material";
import strip from "../../images/discover-more/durgamatha-strip.svg";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css/pagination"
import api from "../../config/backend";
import axios from 'axios';
export default () => {
    const [announcedata, setAnnouncedata] = useState([])
    const [error, setError] = useState("")
    const token = localStorage.getItem("token")
    // console.log(announcedata)

    const navigate = useNavigate()

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

    useEffect(() => {
        fetchAnnounceData();
    }, []);

    console.log({ announcedata })
    return (
        <Swiper
            
            slidesPerView={1}
            spaceBetween={15}
            autoplay={{
                delay: 1600,
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
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
            }}
            navigation={false}
            modules={[Autoplay, Navigation, Pagination]}
            className="mySwiper"

        >
            {announcedata.map((item, index) => {
                // console.log(item)
                return (
                    <SwiperSlide style={{ cursor: "pointer" }} onClick={() => navigate(`/seva/${item.seva && item.seva.slug}`)} key={index}>
                        <div className="heading-title">
                            <p>{item.title}</p>
                        </div>
                    </SwiperSlide>
                )

            })}
        </Swiper>
    );
};
