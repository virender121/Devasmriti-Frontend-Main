import React from "react"
import { Button, Container } from "@mui/material"
import Header from "../components/common/Header"
import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import individual from "../images/individual/individual-banner.svg"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import bookingcart from "../images/individual/add-to-cart.svg"
import CustomTabPanel2 from "../components/common/CustomTabPanel2"
import { Link, useNavigate, useParams } from "react-router-dom"
import footerbg from "../images/footer-bg.svg"
import footerlogo from "../images/devasmriti-logo.svg"
import Swipper from "../components/common/Swipper"
import BasicAccordion from "../components/common/Accordion"
import MultipleSelectPlaceholder from "../components/common/MultipleSelectPlaceholder"
import PlaygroundSpeedDial from "../components/common/PlaygroundSpeedDial"
import { useState } from "react"
import { useEffect } from "react"
import instance from "../utils/Api"
import { useAuth } from "../utils/Auth"
import LoginDailog from "../components/LoginDailog"
import Footer from "./Footer"
import SevasFaq from "../components/common/SevasFaq"
import Header2 from "../components/common/Header2"
import { useCart } from '../pages/CartContext'
import api from "../config/backend"
import axios from 'axios';
function Individual() {
  const token = localStorage.getItem("token")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }


  const navigate = useNavigate()

  const { cartTotal, updateCartTotal, selectedPriceId, setSelectedPriceId } = useCart()
  const { productId } = useParams()
  // console.log(productId)
  const [age, setAge] = useState("")
  const [price, setPrice] = useState([])
  const [selectedSellingPrice, setSelectedSellingPrice] = useState(null)
  const [selectedSellingPriceTitle, setSelectedSellingPriceTitle] = useState('')
  const [error, setError] = useState(null)
  const [productDetails, setProductDetails] = useState([])
  const [triggerRefresh, setTriggerRefresh] = React.useState(0)
  const [selectedSevaPrice, setSelectedSevaPrice] = useState(undefined)

  // console.log(price)
  // console.log(productDetails)


  const handleChange = (event) => {
    setAge(event.target.value)
  }
  const ns = "app-page-home"
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }))

  const isLoggedIn = localStorage.getItem('token')

  const user = useAuth()
  // useEffect(() => {
  //   setIsLoggedIn(user.isLogin);
  // }, []);


  const fetchSevasData = async () => {
    try {
      const response = await axios.get(`${api}/api/sevas/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'paginate': '0',
        }
      })

      setProductDetails(response.data.data)
      // console.log('see', productDetails)
      const sevaPrices = response.data.data.seva_prices

      if (sevaPrices && sevaPrices.length > 0) {
        const defaultPrice = sevaPrices.find(item => item.is_default)

        // console.log({ defaultPrice })

        setSelectedSevaPrice(defaultPrice)
        setPrice(sevaPrices)
        setSelectedSellingPrice(defaultPrice.selling_price)
        setSelectedSellingPriceTitle(defaultPrice.title)
        // setTriggerRefresh(prev => prev + 1)
        // console.log(selectedSellingPrice)
      } else {
        console.log("No seva prices found or the data structure is unexpected.")
      }
    } catch (err) {
      setError(err)
    }
  }


  useEffect(() => {
    fetchSevasData()
  }, [])
  const user_id = localStorage.getItem('user_id')

  const addToCart = async () => {
    if (isLoggedIn) {
      const cartData = {
        cart: {
          user_id: user_id,
          seva_id: productDetails.id,
          seva_price_id: selectedPriceId || productDetails.seva_prices[0].id,
          is_prasadam_available: 0,
          qty: 1,
        }
      }
      // console.log(selectedPriceId)
      // console.log('ccccc', cartData)

      try {
        const response = await axios.post(`${api}/api/cart`, { cart: cartData }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        // console.log({ t: response.data })
        if (response.data.success === 1) {
          setTriggerRefresh(prev => prev + 1)
          if (response.data.data.length) {
            updateCartTotal(cartTotal + 1)
          }
        } else {
          console.log("errorrrr")
        }
      } catch (error) {
        console.error("Error adding items to the cart:", error)
      }
    }
  }


  const handlePriceChange = (price) => {
    setSelectedSevaPrice(price)
    setSelectedSellingPrice(price.selling_price)
    setSelectedSellingPriceTitle(price.title)
  }
console.log(productDetails)
  return (
    <>
      <div className={`${ns}`}>
        <div className={`${ns}__header`}>
          <Header />
        </div>
        <div className={`${ns}__banner`} id="IndividualBanner">
          <Container>
            <div className="thila-homam">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="individual-image">
                    {productDetails.banner_image_id && (
                      <img src={`${productDetails.banner_image_id.domain}${productDetails.banner_image_id.url}`} alt={productDetails.feature_image_id.name} />
                    )}
                    {/* <img src={`${seva.banner_image_id.domain}${seva.banner_image_id.url}`} /> */}
                    {/* <div className="speeddeal">
                      <PlaygroundSpeedDial />
                    </div> */}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="individual-content">
                    <h2>{productDetails.title}</h2>
                    <h5>{new Date(productDetails.expairy_date).toDateString()}</h5>
                    <h6>
                      <span className="event">Event</span> {productDetails.event}
                    </h6>
                    <h6>
                      <span className="venue">Venue</span> {productDetails.location}
                    </h6>
                  </div>
                  <div className="choose-seva-cost">
                    <h2>₹{selectedSellingPrice}</h2>
                  </div>
                  {productDetails.seva_prices && productDetails.seva_prices.length > 1 && (
                  <div className="choose-seva">
                    <div className="choose-seva-content ">
                      <label>Choose a Seva</label>
                      <MultipleSelectPlaceholder onPriceChange={handlePriceChange} productDetails={productDetails} />
                    </div>
                  </div>
                  )}
                  
                  <div className="choose-seva-booking-cost">
                    {/* {isLoggedIn ? (

                      <Button onClick={addToCart} disableRipple disableElevation>
                        <span>
                          <img src={bookingcart} />
                        </span>
                        Add to Cart
                      </Button>

                    ) : (
                      <Button onClick={openDialog} disableRipple disableElevation>
                        <span>
                          <img src={bookingcart} />
                        </span>
                        Add to Cart
                      </Button>
                    )} */}

                    {isLoggedIn ? (
                      <Link to={productDetails.is_expaired ? '#' : `/checkout/${productDetails.slug ? productDetails.slug : productDetails.id}/seva/${selectedSevaPrice && selectedSevaPrice.id}`}
                        style={{ textDecoration: 'none', color: 'inherit', cursor: productDetails.is_expaired ? 'not-allowed' : 'pointer' }}>
                        <Button
                          disableRipple
                          disableElevation
                          className={`bookseva ${productDetails.is_expaired ? 'disabled' : 'highlight'}`}
                          disabled={productDetails.is_expaired}
                          style={{ color: productDetails.is_expaired ? 'white' : 'white' }}
                         
                        >
                         {productDetails.is_expaired ? 'Seva closed' : 'Book Now'}
                         
                        </Button>

                      </Link>
                    ) : (
                      <Button
                      onClick={openDialog}
                        disableRipple
                        disableElevation
                        className="bookseva"
                        disabled={productDetails.is_expaired}
                        style={{ color: productDetails.is_expaired ? 'white' : 'white' }}
                      >
                        <span style={{ marginRight: '8px' }}> {productDetails.is_expaired ? 'Seva closed' : 'Book Now'}</span>
                      
                      </Button>
                    )}



                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <LoginDailog setTriggerRefresh={setTriggerRefresh}  open={isDialogOpen} handleClose={closeDialog} productDetails={productDetails} selectedSevaPrice={selectedSevaPrice} />
        <div className="champaign-tab">
          <Container>
            <CustomTabPanel2 productDetails={productDetails} />
          </Container>
        </div>
        {/* <div className="description-tabs-2">
          <Container>
            <div className="descripition-tabs-2-content">
              <h4>Description</h4>
              <div className="description-content">
                <p>
                 {productDetails.description}
                </p>
                <p>
                  The last day of Mahalayapakshas, Amavasya tithi is considered
                  even more Special to perform pitru karmas and attain
                  Punya.Thila homam means the homam which is done using Sesame
                  seeds or Til Seeds, it is performed to satisfy your ancestors
                  and get their blessings on you and your family.{" "}
                </p>
                <p>
                  Thila homam can be performed on every Amavasya. Performing
                  Thila Homam on Mahalayapaksha Amavasya can show the same
                  results of performing the homa on all amavasya through the
                  year. Performing Thila Homam on Mahalaya Amavasya will help
                  you to come out of Pitru Dosha and benefit you with positive
                  results and remove obstacles. Take part in Thila homam in
                  Satguru Charitable Trust through Devesmriti in Agni Linga
                  Kshetra Tiruvannamalai duringon October 14th (Amavasya).Note :{" "}
                </p>
                <p>
                  After completion of seva you will receive a Video recording
                  update.
                </p>
                <p>
                  <strong>
                    As it is related to Pitru doshas and Pitru karma prasad will
                    not be available.
                  </strong>
                </p>
              </div>
            </div>
            <div className="faq faq-2">
              <div className="faq-content">
                <h2>Frequently asked questions</h2>
              </div>
              <div className="faq-main-content">
                <SevasFaq />
              </div>
            </div>
            <div className="descripition-tabs-2-content">
              <h4>Additiobal Information</h4>
              <div className="description-content">
              <p>
                 {productDetails.description}
                </p>
                <p>
                  MahalayaPakshas falls in the month of Bhadrapada and lasts for
                  15 days. All 15 days are considered the most special days to
                  show your gratitude and appease your ancestors.
                </p>
                <p>
                  The last day of Mahalayapakshas, Amavasya tithi is considered
                  even more Special to perform pitru karmas and attain
                  Punya.Thila homam means the homam which is done using Sesame
                  seeds or Til Seeds, it is performed to satisfy your ancestors
                  and get their blessings on you and your family.{" "}
                </p>
                <p>
                  Thila homam can be performed on every Amavasya. Performing
                  Thila Homam on Mahalayapaksha Amavasya can show the same
                  results of performing the homa on all amavasya through the
                  year. Performing Thila Homam on Mahalaya Amavasya will help
                  you to come out of Pitru Dosha and benefit you with positive
                  results and remove obstacles. Take part in Thila homam in
                  Satguru Charitable Trust through Devesmriti in Agni Linga
                  Kshetra Tiruvannamalai duringon October 14th (Amavasya).Note :{" "}
                </p>
                <p>
                  After completion of seva you will receive a Video recording
                  update.
                </p>
                <p>
                  <strong>
                    As it is related to Pitru doshas and Pitru karma prasad will
                    not be available.
                  </strong>
                </p>
              </div>
            </div>
          </Container>
        </div> */}
        <div className="discover-more app-new-individual-suggested-puja app-new-individual-suggested-puja-2">
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
  )
}

export default Individual
