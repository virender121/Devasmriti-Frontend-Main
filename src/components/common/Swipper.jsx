import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import instance, { noauthinstance } from "../../utils/Api";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import durgamata from '../../images/discover-more/durgamatha.svg';
import { Button } from "@mui/material";
import strip from "../../images/discover-more/durgamatha-strip.svg";
import { Link } from "react-router-dom";
import "swiper/css/pagination"
import 'swiper/css/navigation';
import api from "../../config/backend";
import axios from 'axios';
import strip1 from '../../images/strip1.jpeg'
export default () => {
  const [eventdata, setEventData] = useState([]);
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const html = "<h1>Test</h1>"

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={15}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}

      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      navigation={true}
      modules={[Autoplay, Navigation, Pagination]}
      className="mySwiper"

    >
      {eventdata.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="discover-more-boxs">
            <div key={index} className="nava-chandi-bg p-0 add-new-strip-box"
              style={{ backgroundImage: `url(${item.background_image_id.domain + item.background_image_id.url})` }}
            >
              <div className="traditional-strip">
                <p>
                  {item.expairy_date
                    ? new Date(item.expairy_date).toDateString()
                    : new Date(item.expairy_date_time).toDateString()}
                </p>
              </div>

             

              {/* <div className="readmore-desc"> */}
              {/* <p className="read-more-link description-scroll"  style={{width:"335px",height:"100px",margin:"5px"}}dangerouslySetInnerHTML={{ __html : item.description}}>
                
                </p> */}
              {/* </div> */}
              <div className="sevacard-img">
                <img src={`${item.banner_image_id.domain}${item.banner_image_id.url}`} alt="loading" />
              </div>
              <div className="seva-title" style={{position:"absolute",top:"220px",backgroundColor:"#fff",width:"99.6%"}}>
                <h4 style={{ color: "black", padding: "10px 20px" }}>{item.title.length > 60 ? item.title.slice(0, 60) + "..." : item.title}</h4>
                <p style={{ color: "black", padding: "0 20px" }}><span style={{ color: "#7e91ae" }}>Event</span>: {item.event}</p>
              </div>
              <div className="book-seva">
                <Link style={{ width: "100%", padding: "0 20px" }} to={`/sevas/${item.slug ? item.slug : item.id}`}>
                  <Button disableRipple disableElevation
                    className="book-seva-btn" style={{ marginTop: "105px", width: "100%" }}>
                    {item.is_expaired ? 'View Details' : 'Book Now'}
                  </Button>

                </Link>
              </div>
              </div>
              </div>
            
          
          
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
