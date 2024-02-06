import React, { useEffect, useRef, useState } from "react";
import durgamata from "../../images/discover-more/durgamatha.svg";
import sevaname from "../../images/champaign/image-01.png";
import sevaname1 from "../../images/champaign/image-02.png";
import sevaname2 from "../../images/champaign/image-03.png";
import bookingcart from "../../images/individual/add-to-cart.svg";
import BasicSelect from "./BasicSelect";
import { Link } from "react-router-dom";
import BasicAccordion from "../common/Accordion";
import { Grid, Button } from "@mui/material";
import EventFaq from './EventFaq'
import instance from "../../utils/Api";
import SevasFaq from "./SevasFaq";
import Typography from '@mui/material/Typography';
import Swipper3 from "./Swipper3";
const App = ({ productDetails }) => {
    // console.log(productDetails)
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);

    const [visibleSection, setVisibleSection] = useState("section1");

    const updatesevasdata = productDetails.seva_updates
    // console.log(updatesevasdata)

    const sevasFaq = productDetails.seva_faqs
    // console.log(sevasFaq)

    useEffect(() => {
        const handleScroll = () => {
            const sectionRefs = [
                { ref: section1Ref, name: "section1" },
                { ref: section2Ref, name: "section2" },
                { ref: section3Ref, name: "section3" },
                { ref: section4Ref, name: "section4" },
            ];
            // const currentScrollPosition = window.scrollY ;
            const currentScrollPosition = window.scrollY;
            for (let i = 0; i < sectionRefs.length; i++) {
                const section = sectionRefs[i];
                if (section.ref.current) {
                    const sectionTop = section.ref.current.offsetTop - 210;
                    // const sectionTop = section.ref.current.offsetTop;
                    const sectionBottom = sectionTop + section.ref.current.clientHeight;

                    if (
                        currentScrollPosition >= sectionTop &&
                        currentScrollPosition <= sectionBottom
                    ) {
                        setVisibleSection(section.name);
                    }
                }
            }
        };

        const handleResize = () => {
            // Your code for handling resize, similar to your previous implementation
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        // Initial height measurement
        handleResize();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // const handleNavClick = (sectionRef) => {
    //   sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    //   setVisibleSection(sectionRef.current.dataset.section);
    // };

    const handleNavClick = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop - 190,
            behavior: "smooth",
        });
        setVisibleSection(ref.current.dataset.section);
    };

    // const handleAddToCart = async (seva) => {
    //     try {
    //         const cartItem = {
    //             user_id: 1,
    //             seva_id: seva.id,
    //             seva_price_id: 1,
    //             is_prasadam_available: 0,
    //             qty: 1,
    //         };

    //         const response = await axios.post('api/cart', {
    //             cartItem
    //         });
    //         console.log('Item added to cart:', response.data);
    //     } catch (error) {
    //         console.error('Error adding item to cart:', error);
    //     }
    // };



    const html = "<h1>Test</h1>"
    return (
        <>
            <nav className="nav">
                {/* <Button
                    className={visibleSection === "section1" ? "active" : ""}
                    onClick={() => handleNavClick(section1Ref)}
                >
                    Seva
                </Button> */}
                <Button
                    className={visibleSection === "section2" ? "active" : ""}
                    onClick={() => handleNavClick(section2Ref)}
                >
                    Description
                </Button>
                <Button
                    className={visibleSection === "section3" ? "active" : ""}
                    onClick={() => handleNavClick(section3Ref)}
                >
                    Update
                </Button>
                <Button
                    className={visibleSection === "section4" ? "active" : ""}
                    onClick={() => handleNavClick(section4Ref)}
                >
                    FAQs
                </Button>
            </nav>

            {/* <div ref={section1Ref} data-section="section1" className="section1">
                <div className="">
                    <Grid container alignItems={"center"} spacing={2}>
                        {productDetails && productDetails.map((seva, index) => {
                            console.log(seva)
                            return (
                                <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="champaign-sev-box">
                                        <img src={`${seva.banner_image_id.domain}${seva.banner_image_id.url}`} alt={seva.banner_image_id.name} />
                                        <div className="champaign-sev-box-content">
                                            <h4>{`Seva Name - ${seva.title}`}</h4>
                                            <h5>{seva.date}</h5>
                                            <p className="price-cost">
                                                {" "}
                                                Price - <span>₹{seva.seva_prices.selling_price}</span>
                                            </p>
                                            <div className="champaign-sev-select-box">
                                                <p>{seva.description}</p>
                                                <div className="choose-seva-booking-cost champaign-btns">
                                                    <Button disableRipple disableElevation onClick={() => handleAddToCart(seva)}>
                                                        <span>
                                                            <img src={bookingcart} alt="Add to Cart" />
                                                        </span>
                                                        Add to cart
                                                    </Button>
                                                    <Link to="/check_out">
                                                        <Button className="bookseva">Book Now</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </div> */}

            <div ref={section2Ref} data-section="section2" className="section2">
                <div className="">
                    <div className="description-content">
                        <h3>Description</h3>
                        
                        <p dangerouslySetInnerHTML={{ __html : productDetails.description}}></p>
                        
                    </div>
                </div>
            </div>
            <div ref={section3Ref} data-section="section3" className="section3">
                <div className='description-content'>
                    <h3>Updates</h3>
                    {productDetails.additional_information && productDetails.additional_information.length === 0 ? (
                        <div className='accordion'>
                            <Typography variant="h4" className='main-content'>There are no updates for this Seva</Typography>
                        </div>
                    ) : (
                        <div className="">
                            <p dangerouslySetInnerHTML={{ __html : productDetails.additional_information}}></p>
                        </div>
                    )}
                </div>
            </div>
            <div ref={section4Ref} data-section="section4" className="section4">
                <div className="">
                    <div className="faq-2">
                        <div className="faq-main-content-2">
                            <h3>FAQ's</h3>
                            {/* <SevasFaq /> */}
                            < BasicAccordion />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;