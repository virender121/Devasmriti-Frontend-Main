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
                              <h1>Privacy Policy</h1>
                              </div>
                            <Container>
                                <div class="privacy-policy-title">
                                  <h4>Last updated on Aug 22nd, 2023</h4>
                                 <p>This privacy policy sets out how Devasmriti Digital Services Private Limited uses and protects any information that you give Devasmriti Digital Services Private Limited when you use this website.</p>
                                 <p>Devasmriti Digital Services Private Limited is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.</p>
                                 <p>Devasmriti Digital Services Private Limited may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
                                </div>
                                </Container>
                               </div>
                              
                              <Container>
                                  <div class="intro-content">
                                            <h5>We may collect the following information:</h5>
                                            <ul>
                                              <li>Name, Nakshatra, Gothra, Rashi</li>
                                              <li>Contact information including Email address, Phone number, Address</li>
                                              <li>Demographic information such as postcode, preferences and interests</li>
                                              <li>Other information relevant to customer surveys and/or offers</li>
                                            </ul>
                                  </div>
                                  <div class="intro-content">
                                    <h5>What we do with the information we gather</h5>
                                    <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
                                    <ul>
                                      <li>Internal record keeping.</li>
                                      <li>We may use the information to improve our products and services.</li>
                                      <li>We may periodically send promotional emails about new products and services, special offers or other information which we think you may find interesting using the email address which you have provided</li>
                                      <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>

                                    </ul>
                                    <p>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures.</p>
                                  </div>
                                  <div class="privacy-policy-title">
                                  <h4>How we use cookies</h4>
                                     <p>A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyses web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences</p>
                                     <p>We use traffic log cookies to identify which pages are being used. This helps us analyses data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                                     <p>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
                                    <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>

                                </div>

                                <div class="intro-content">
                                    <h5>Controlling your personal information</h5>
                                    <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
                                    <ul>
                                      <li>whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
                                      <li>if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at support@devasmriti.com</li>

                                    </ul>
                                    <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</p>
                                    <p>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.</p>
                                    <p>If you have any questions regarding this Privacy Policy or the practices of this Site, please contact us at support@devasmriti.com</p>
                                  </div>
                                </Container>
                          
                          
                      
                       
               
                    <div className="nama-bg"></div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AboutUs;


