import { Button, Container } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import footerbg from '../images/footer-bg.svg'
import footerlogo from '../images/devasmriti-logo.svg'
import { Link } from "react-router-dom";
import Footer from "./Footer";


function AboutUs() {
    const ns = "app-page-home";
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <>
              <div className={`${ns}`}>
                <div className={`${ns}__header`}>
                    <Header />
                </div>
                <div className={`${ns}__banner`}></div>
                     <div className="ananta-padmanabu" id="ANANTA_BG">
                            <div class="privacy-policy">
                            <div className="privacy-policy-content">
                              <h1>Cancellation and Refund Policy</h1>
                              </div>
                            <Container>
                            <div class="intro-content">
                                    <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
                                    <ul>
                                      <li>While we generally do not accommodate cancellations, we understand that there may be exceptional circumstances such as accidental orders or technical glitches arising from our Payment gateway partner. If you find yourself in such a situation, please feel free to contact us via email at support@devasmriti.com to request an order cancellation. Please ensure that you submit such requests within 2 days of placing your order. It's important to note that we retain the right to decline cancellation requests that do not adhere to the aforementioned conditions, at our sole discretion.</li>
                                      <li>Conditions for Refund: Sevas once booked and performed can't be refunded. Sevas booked but not performed can only be cancelled as per the cancellation terms.</li>
                                    </ul>
                                  </div>
                                  <div class="intro-content">
                                            <h5>Contact Us</h5>
                                            <p>If you have any questions or concerns regarding these Refund and Cancellations, please contact us at support@devasmriti.com.</p>
                                  </div>
                                </Container>
                               </div>
                              
                            
                          
                          
                      
                       
               
                    <div className="nama-bg"></div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AboutUs;


