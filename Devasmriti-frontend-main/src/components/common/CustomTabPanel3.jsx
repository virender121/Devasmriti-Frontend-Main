import React, { useEffect, useRef, useState } from "react";
import durgamata from "../../images/discover-more/durgamatha.svg";
import sevaname from "../../images/champaign/image-01.png";
import sevaname1 from "../../images/champaign/image-02.png";
import sevaname2 from "../../images/champaign/image-03.png";
import bookingcart from "../../images/individual/add-to-cart.svg";
import BasicSelect from "./BasicSelect";
import { Link, useNavigate } from "react-router-dom";
import BasicAccordion from "../common/Accordion";
import { Grid, Button } from "@mui/material";
import EventFaq from "./EventFaq";
import instance from "../../utils/Api";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../utils/Auth";
import { useCart } from "../../pages/CartContext";
import Swipper3 from "./Swipper3";
import LoginDailog from "../LoginDailog";
import axios from "axios";
// import MultipleSelectPlaceholder from "./MultipleSelectPlaceholder"
import MultipleSelectPlaceholder2 from "../MultipleSelectPlaceholder2";
import api from "../../config/backend";

const App = ({ sevas, setTriggerRefresh }) => {
  const token = localStorage.getItem("token");
  // console.log(sevas)
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = useAuth();
  useEffect(() => {
    setIsLoggedIn(user.isLogin);
  }, []);

  const { cartTotal, updateCartTotal } = useCart();
  const [visibleSection, setVisibleSection] = useState("section1");
  // const [triggerRefresh, setTriggerRefresh] = React.useState(0)
  const updatesevasdata = sevas.event_updates;
  // console.log(updatesevasdata)
  const sevasdata = sevas.sevas;
  // console.log(sevasdata)
  const eventFaq = sevas.event_faqs;
  // console.log(eventFaq)

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedPriceList, setSelectedPriceList] = useState([]);

  console.log(selectedPriceList);


  const navigate = useNavigate();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    console.log({ sevasdata });
    sevasdata &&
      setSelectedPriceList(
        sevasdata.map((seva) => {
          const def = seva.seva_prices.find((option) => option.is_default)
          return {
            seva_id: seva.id,
            selected_price: def ? def : seva.seva_prices[0]
          };
        })
      );
  }, [sevasdata]);


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
  const user_id = localStorage.getItem("user_id");
  const handleAddToCart = async (seva) => {
    if (token) {
      const cartData = {
        cart: {
          user_id: user_id,
          seva_id: seva.id,
          seva_price_id: seva.seva_prices[0].id,
          is_prasadam_available: 0,
          qty: 1,
        },
      };
      // console.log('ccccc', cartData)

      try {
        const response = await axios.post(
          `${api}/api/cart`,
          { cart: cartData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log({ t: response.data })
        if (response.data.success === 1) {
          // console.log(1)
          setTriggerRefresh((prev) => prev + 1);
          // if (response.data.data.length) {
          //     updateCartTotal(cartTotal + 1)
          // }
        } else {
          console.log("errorrrr");
        }
      } catch (error) {
        console.error("Error adding items to the cart:", error);
      }
    } else {
      openDialog();
    }
  };
  const [sevaForDialog, setSevaForDialog] = useState(null);

  const handleBookSeva = (seva, redirect) => {
    console.log(seva)
    console.log(redirect)
    const sevapriceid = selectedPriceList.find(
      (item) => item.seva_id === seva?.id
    ).selected_price.id;
    localStorage.removeItem("newSelectedPriceId");

    if (redirect) {
      navigate(`/checkout/${seva.slug ? seva.slug : seva.id}/seva/${sevapriceid}`)
      return
    }

    if (token) {
      navigate(`/checkout/${seva.slug ? seva.slug : seva.id}/seva/${sevapriceid}`);
    } else {
      console.log(seva)
      setSevaForDialog(seva);
      openDialog();

    }
  };



  // Render the handleredirect result wherever it makes sense in your component
  // For example, in the render method or in the JSX where you want to display it

  // const boxStyle = {
  //   maxHeight: "450px", 
  //   overflowY: "scroll",
  //   borderTopWidth: "0px",
  // };

  const html = "<h1>Test</h1>";

  function handlePriceChange(selected_price, id) {
    console.log({ selected_price, id });
    setSelectedPriceList((previousValue) => {
      // return [{ seva_id: id, selected_price }]
      if (previousValue) {
        const copy = JSON.parse(JSON.stringify(previousValue))
        const index = copy.findIndex((item) => item.seva_id === id);
        console.log({ index })
        copy[index] = { seva_id: id, selected_price }
        console.log(copy);
        return copy;
      }
      return previousValue;
    });
  }

  return (
    <>
      <nav className="nav">
        <Button
          className={visibleSection === "section1" ? "active" : ""}
          onClick={() => handleNavClick(section1Ref)}
        >
          Seva
        </Button>
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

      <div ref={section1Ref} data-section="section1" className="section1">
        <div className="">
          <h3>Sevas</h3>
          <Grid container alignItems={"flex-start"} spacing={2}>
            {sevasdata &&
              sevasdata.map((seva, index) => {

                console.log({
                  t: selectedPriceList.find(
                    (item) => item.seva_id === seva.id
                  )?.selected_price.selling_price
                })

                return (
                  <Grid justify="flex-start" key={index} item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <div className="champaign-sev-box">
                      {/* <img src={sevaname1}/> */}
                      <img
                        src={`${seva.feature_image_id.domain}${seva.feature_image_id.url}`}
                        alt={seva.feature_image_id.name}
                      />
                      <div className="champaign-sev-box-content">
                        <h4>{seva.title}</h4>
                        <h5>{seva.date}</h5>
                        <div className="choose-seva">
                          <div className="choose-seva-content multiselect-option">
                            <label className="choose-seva-margin">
                              Choose a Seva
                            </label>
                            {seva.seva_prices && seva.seva_prices.length > 1 && (
                              <MultipleSelectPlaceholder2
                                onPriceChange={handlePriceChange}
                                seva={seva}
                              />
                            )}
                          </div>
                        </div>
                        <p className="price-cost">
                          {" "}
                          Price -{" "}
                          <span>
                            ₹
                            {selectedPriceList.length &&
                              selectedPriceList.find(
                                (item) => item.seva_id === seva.id
                              )?.selected_price.selling_price}
                          </span>
                        </p>
                        {/* <div className="choose-seva">
                                                    <div className="choose-seva-content">
                                                   
                                                    <MultipleSelectPlaceholder2 onPriceChange={handlePriceChange} seva={seva} />
                                                    </div>
                                                </div> */}

                        <div className="champaign-sev-select-box">
                          <p
                            // style={boxStyle}
                            dangerouslySetInnerHTML={{
                              __html: seva.description,
                            }}
                          ></p>

                          <div className="choose-seva-booking-cost champaign-btns">
                            {/* <Button onClick={() => handleAddToCart(seva)} disableRipple disableElevation>
                                                        <span>
                                                            <img src={bookingcart} />
                                                        </span>
                                                        Add to Cart
                                                    </Button> */}

                            <Button
                              onClick={() => handleBookSeva(seva)}
                              disableRipple
                              disableElevation
                              className={`bookseva ${seva.is_expaired ? "" : "highlight"
                                }`}
                              disabled={seva.is_expaired}
                              style={{
                                color: seva.is_expaired ? "white" : "white",
                              }}
                            >
                              {seva.is_expaired ? "Seva closed" : "Book Seva"}
                            </Button>

                            {/* {isLoggedIn ? (

                                                        <Link to={``}>
                                                            <Button disableRipple disableElevation className="bookseva">
                                                                Book Seva
                                                                <span>
                                                                </span>
                                                            </Button>
                                                        </Link>

                                                    ) : (
                                                        
                                                    )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );

              })}

          </Grid>
          <LoginDailog
            setTriggerRefresh={setTriggerRefresh}
            open={isDialogOpen}
            handleClose={closeDialog}
            seva={sevaForDialog}
            handleBookSeva={handleBookSeva}
          />
        </div>
      </div>

      <div ref={section2Ref} data-section="section2" className="section2">
        <div className="">
          <div className="description-content">
            <h3>Description</h3>
            <p dangerouslySetInnerHTML={{ __html: sevas.description }}></p>
          </div>
        </div>
      </div>
      <div ref={section3Ref} data-section="section3" className="section3">
        <div className="description-content">
          <h3>Updates</h3>
          {sevas.additional_information && sevas.additional_information.length === 0 ? (
            <div className="accordion">
              <Typography variant="h4" className="main-content">
                There are no updates for this events
              </Typography>
            </div>
          ) : (
            <p
              dangerouslySetInnerHTML={{ __html: sevas.additional_information }}
            ></p>
          )}
        </div>
      </div>
      <div ref={section4Ref} data-section="section4" className="section4">
        <div className="">
          <div className="faq-2">
            <div className="faq-main-content-2">
              {/* <EventFaq /> */}
              <BasicAccordion />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
