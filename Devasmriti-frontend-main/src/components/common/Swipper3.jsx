import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import instance, { noauthinstance } from "../../utils/Api";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import durgamata from '../../images/discover-more/durgamatha.svg';
import { Button } from "@mui/material";
import strip from "../../images/discover-more/durgamatha-strip.svg";
import { Link } from "react-router-dom";
import image01 from '../../images/update/update-image-01.svg';
import image02 from '../../images/update/update-image-02.svg';
import box from '../../images/update/box.svg';
import arrow from '../../images/update/arrow.svg';
import { Grid } from "@mui/material";
import api from "../../config/backend";
import axios from 'axios';

export default ({ updates }) => {
  // console.log(updates)
  const [eventdata, setEventData] = useState([]);
  const [readMoreStates, setReadMoreStates] = useState({});
  const token = localStorage.getItem("token")
  const fetchEventData = async () => {
    try {
      const response = await axios.get(`${api}/api/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'paginate': '0',
        }
      });
      setEventData(response.data.data.data);
      // console.log(response.data.data.data)
      const initialReadMoreStates = {};
      response.data.data.data.forEach((event, index) => {
        initialReadMoreStates[index] = false;
      });
      setReadMoreStates(initialReadMoreStates);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const toggleReadMore = (index) => {
    // Toggle the readMore state for the clicked event
    setReadMoreStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={15}
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
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      {updates && updates.map((item, index) => {
        // console.log(item)
        return (
          <SwiperSlide key={index}>
            <div className="">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="update-main-content">
                    <div className="">
                      <img src={image01} />
                    </div>
                    <div className="update-main-box">
                      <div className="update-title">
                        <div className="">
                          <img src={box} />
                        </div>
                        <div className="upadte-mini-title">
                          <h5>Lorem Epson</h5>
                          <p>{new Date(item.updated_at).toDateString()}</p>
                        </div>
                      </div>
                      <div className="upadate-main-content">
                        <h3>{item.title}</h3>
                        <img src={arrow} />
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
};
