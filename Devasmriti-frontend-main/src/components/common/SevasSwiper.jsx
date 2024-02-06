import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import instance, { noauthinstance } from "../../utils/Api";
import "swiper/css";
import durgamata from '../../images/discover-more/durgamatha.svg';
import { Autoplay, Navigation } from "swiper/modules";
import { Button } from "@mui/material";
import strip from "../../images/discover-more/durgamatha-strip.svg";
import { Link } from "react-router-dom";
import api from "../../config/backend";
import axios from 'axios';
import 'swiper/css/navigation';
export default () => {
    const [sevadata, setSevaData] = useState([]);
    // const [readMoreStates, setReadMoreStates] = useState({});
    // const readMoreLimit = 50;
    const token = localStorage.getItem("token")
    const fetchSevaData = async () => {
        try {
            const response = await axios.get(`${api}/api/sevas`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'paginate': '0',
                }
            });
            setSevaData(response.data.data.data);
            // const initialReadMoreStates = {};
            // response.data.data.data.forEach((event, index) => {
            //     initialReadMoreStates[index] = false;
            // });
            // setReadMoreStates(initialReadMoreStates);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSevaData();
    }, []);

    // const toggleReadMore = (index) => {
    //     // Toggle the readMore state for the clicked event
    //     setReadMoreStates((prevState) => ({
    //         ...prevState,
    //         [index]: !prevState[index],
    //     }));
    // };

    const html = "<h1>Test</h1>"

    return (
        <div>

        </div>
    )
}
        // <Swiper
            // slidesPerView={1}
            // spaceBetween={15}
            // loop={true}
            // autoplay={{
            //     delay: 2000,
            //     disableOnInteraction: false,
            // }}

            // pagination={{
            //     clickable: true,
            // }}
            // breakpoints={{
            //     640: {
            //         slidesPerView: 2,
            //         spaceBetween: 20,
            //     },
            //     768: {
            //         slidesPerView: 2,
            //         spaceBetween: 30,
            //     },
            //     1024: {
            //         slidesPerView: 3,
            //         spaceBetween: 30,
            //     },
            // }}
            // navigation={true}
            // modules={[Autoplay, Navigation]}
            // className="mySwiper"
        // >
            {/* {sevadata.map((item, index) => ( */}
                {/* // <SwiperSlide key={index}> */}
                    {/* // <div className="discover-more-boxs"> */}
                        {/* <div key={index} className="nava-chandi-bg"> */}
                            {/* <h4>{item.title}</h4> */}
                            {/* <div className="readmore-desc">
                                <p className="read-more-link description-scroll"style={{width:"335px",height:"100px",margin:"5px"}}  dangerouslySetInnerHTML={{ __html : item.description}}>        
                                </p> */}
                                {/* <p className="read-more-link" onClick={() => toggleReadMore(index)}>
                                    {readMoreStates[index] ? item.description : item.description.slice(0, readMoreLimit)}
                                    <span> {readMoreStates[index] ? "Read Less" : "Read More..."}</span>
                                </p> */}
                            {/* </div> */}
                            {/* <div className="durgamata"> */}
                                {/* <img src={durgamata} alt="loading" /> */}
                                {/* <img style={{marginTop:"35px"}} src={`${item.banner_image_id.domain}${item.banner_image_id.url}`} alt="loading" /> */}
                                {/* <div className="strip">
                                    <img src={strip} />
                                    <div className="date-time">
                                        <p>{new Date(item.start_date).toDateString()}</p>
                                    </div>
                                </div> */}
                            {/* </div> */}
                            {/* <div className="book-seva"> */}
                                {/* <Link to={`/seva/${item.slug ? item.slug : item.id}`}> */}
                                    {/* <Button disableRipple disableElevation 
                                    className="book-seva-btn">
                                    {item.is_expaired ? 'View Details' : 'Book Now'}
                                    </Button> */}
                                    {/* <Button disableRipple disableElevation 
                                        className="book-seva-btn" style={{marginTop:"35px",  width:"320px"}}>
                                        View Details1
                                    </Button> */}
                                {/* </Link> */}

                            {/* </div> */}
                        {/* </div> */}
                    {/* </div> */}
                {/* // </SwiperSlide> */}
            {/* // ))} */}
        {/* </Swiper> */}
    {/* ); */}
{/* }; */}
    
                                