import { Button, Container } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import footerbg from "../images/footer-bg.svg";
import CustomTabPanel3 from "../components/common/CustomTabPanel3";
import Swipper from "../components/common/Swipper";
import footerlogo from "../images/devasmriti-logo.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../utils/Api";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import sevaname from '../images/champaign/image-01.png';
import sevaname1 from '../images/champaign/image-02.png';
import sevaname2 from '../images/champaign/image-03.png';
import { FaShareAlt } from "react-icons/fa";
import React, { useRef } from 'react';
import Header2 from "../components/common/Header2";
import api from "../config/backend";
import share_icon from '.././images/social-icons/share_icon.png';
import axios from 'axios';
import ShareModel from "../components/common/ShareModel";



function Champaign({ triggerRefresh1, setTriggerRefresh }) {

  const { productId } = useParams();

  // console.log(productId)

  const token = localStorage.getItem("token")
  const ns = "app-page-home";
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [sevadata, setSevaData] = useState([]);
  const [sevaerror, setSevaError] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  // const [triggerRefresh, setTriggerRefresh] = React.useState(0)
  // console.log(productDetails)
  const [sevaDataArray, setSevaDataArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  
  
  
  



  // const fetchSevasData = async () => {
  //   try {
  //     const response = await instance.get("api/sevas");
  //     console.log(response.data.data.data)
  //     setSevaData(response.data.data.data);
  //   } catch (err) {
  //     setSevaError(err);
  //     console.log(err)
  //   }
  // };

  

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`${api}/api/events/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'paginate': '0',
        }
      });
      // console.log("111", response.data.data)
      setProductDetails(response.data.data);
      const sevas = response.data.data.sevas;
      setSevaDataArray(sevas);
      // console.log(sevas)
      setTriggerRefresh(prev => prev + 1)
    } catch (err) {
      setError(err);
    }
  };



  useEffect(() => {
    fetchEventData()
    // fetchSevasData()
  }, [])
  const sevasSectionRef = useRef(null);

  // const sevaDataArray = [
  //   {
  //     id: 1,
  //     name: 'Seva Name - Ananadanam 1',
  //     date: '14th October 2023',
  //     price: 2000,
  //     description: 'Lorem Epson is a dummy text to fill the sentences Lorem Epson is a dummy text to fill the sentences',
  //     image: sevaname
  //   },
  //   {
  //     id: 2,
  //     name: 'Seva Name - Ananadanam 2',
  //     date: '15th October 2023',
  //     price: 2500,
  //     description: 'Another description for the second seva.',
  //     image: sevaname2
  //   },
  //   {
  //     id: 3,
  //     name: 'Seva Name - Ananadanam 3',
  //     date: '16th October 2023',
  //     price: 1800,
  //     description: 'Description for the third seva.',
  //     image: sevaname1
  //   },
  //   {
  //     id: 4,
  //     name: 'Seva Name - Ananadanam 4',
  //     date: '17th October 2023',
  //     price: 2200,
  //     description: 'Description for the fourth seva.',
  //     image: sevaname2
  //   },
  //   // Add more sevas as needed
  // ];





  return (
    <>
      <div className={`${ns}`}>
        <div className={`${ns}__header`}>
          <Header triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />
        </div>
        <div className="_3gpv">
        {productDetails.banner_image_id && (
          <div style={{position:'relative'}}>
        <img src={`${productDetails.banner_image_id.domain}${productDetails.banner_image_id.url}`} alt={productDetails.banner_image_id.name} />
        <span className="share_icon" onClick={handleOpen}><img src={share_icon} alt ='share' style={{width:'100%',height:'33px',marginTop:'0px'}} /> </span>
        </div>
        
        )}
 
        </div>
       <ShareModel  isOpen={isModalOpen} handleClose={handleClose} /> 
        
        <div className="ananta-padmanabu">
          <Container maxWidth="lg">
            <div className="ananta-padmanabu-box">
              <div className="ananta-padmanbu-content">
                <h2>
                  {productDetails.title}
                </h2>
                <div className="ananta-padmanbu-mini-content">
                  <div className="ananta-mini-content">
                    <h4>{new Date(productDetails.expairy_date_time).toDateString()}</h4>
                    <h5 className="event">
                      <span>Event</span> {productDetails.event}
                    </h5>
                    <h5 className="venue">
                      <span>Venue</span> {productDetails.location}
                    </h5>
                  </div>
                  <div className="ananta-padmanbu-btn">
                    {/* <Link to={`/check_out/${productDetails.id}`}> */}
                    <Button
                      onClick={() => sevasSectionRef.current.scrollIntoView({ behavior: 'smooth' })}
                      variant="contained"
                      disableRipple
                      disableElevation
                      className="app-btn app-btn-primary has-icon-end"
                    >
                      <span className="app-btn-text">Book Seva</span>
                    </Button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="champaign-tab">
          <Container ref={sevasSectionRef}>
            <CustomTabPanel3 setTriggerRefresh={setTriggerRefresh} sevas={productDetails} />
          </Container>
        </div>
        <div className="discover-more app-new-individual-suggested-puja">
          <Container>
            <div className="discover-more-content">
              <div className="discover-more-buttons">
                <div className="">
                  <h2>Suggested Pujas</h2>
                </div>
              </div>
              <Swipper />
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Champaign;
