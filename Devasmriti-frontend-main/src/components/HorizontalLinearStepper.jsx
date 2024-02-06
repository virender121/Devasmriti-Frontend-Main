import { useEffect, React, useState } from "react";
import instance from "../utils/Api";
import { Stepper, Step, StepLabel, Dialog, DialogContent, TextField, Select, MenuItem } from "@mui/material";
import { Button, Container, Typography, FormLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import cartimage from "../images/cart/cart-image.svg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import TextField from "@mui/material/TextField";
import { Link, useParams } from "react-router-dom";
import BasicAccordion3 from "../components/common/Accordion3";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from '@mui/icons-material/Add';
import CustomizedDialogs3 from "./CustomizedDialogs3";
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import leaf from '../images/confirmation/flower.svg';
import ganesh from '../images/confirmation/lord-ganesh.svg';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useCart } from '../pages/CartContext';
import api from "../config/backend";
import axios from 'axios';
function NonLinearHorizontalStepper({ setTriggerRefresh }) {
  const token = localStorage.getItem("token")
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [whatsup_no, setWhatsupNo] = useState('');
  const [country_id, setCountryId] = useState(1);
  const [state_id, setStateId] = useState('1');
  const [city_id, setCityId] = useState('1');
  const [address_1, setAddress1] = useState('');
  const [address_2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [address_name, setAddressName] = useState('');
  const [cityData, setCityData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [stupidity, setStupidity] = useState(undefined)
  const [open, setOpen] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [isSelectedFamily, setIsSelectedFamily] = useState(undefined)


  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };
  



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [otp, setOtp] = useState('');

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));


  const handleSaveAddress = async () => {
    try {
      const postData = {
        fname,
        lname,
        email,
        phone_no,
        whatsup_no,
        country_id: 1,
        state_id: selectedState,
        city_id: selectedCity.id,
        address_1,
        address_2,
        pincode,
        address_name,
      };
      const response = await axios.post(`${api}/api/address`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Address saved successfully:', response.data);
      setFname('');
      setLname('');
      setEmail('');
      setPhoneNo('');
      setWhatsupNo('');
      setCountryId('');
      setStateId('');
      setCityId('');
      setAddress1('');
      setAddress2('');
      setPincode('');
      setAddressName("");
      // fetchData();
      setTriggerRefresh(prev => prev + 1)
      window.location.reload();
      handleCloseAddAddressModal()
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };


  const { productId } = useParams();
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Information", "Complete "];
  const { cartTotal, setCartTotal, setCartCountRefresh } = useCart();

  const handleStepClick = (step) => () => {
    if (familyData && familyData.length) {
      setActiveStep(step)
    }
  };

  const { decrementCartTotal } = useCart();
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const [familyData, setFamilyData] = useState([]);

  // console.log(familyData)
  // console.log(cartData)

  useEffect(() => {
    const fetchData = async () => {


      try {
        const response = await axios.get(`${api}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'paginate': '0',
          }
        });
        setCartData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err);
        // console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cartData && cartData.data) {
      // console.log('updated in check', selectedFamily);
      let selectedFamilyIds = [];
      let selectedKeys = []; 
  
      if (selectedFamily && selectedFamily.length > 0) {
        selectedFamilyIds = selectedFamily.map(member => member.id);
        // console.log('Selected Family IDs:', selectedFamilyIds);
      }
  
      if (Array.isArray(isSelectedFamily)) {
        selectedKeys = isSelectedFamily.map(obj => Object.keys(obj)[0]);
        // console.log(selectedKeys);
      }
  
      const updatedStupidity = cartData.data.map(item => {
        return {
          "seva_id": item.seva_id,
          "seva_price_id": item.seva_price_id,
          "is_prasadam_available": item.is_prasadam_available,
          "user_family_detail_id": selectedKeys
        };
      });
  
      setStupidity(updatedStupidity);
    }
  }, [cartData, familyData, selectedFamily, isSelectedFamily]); 
  

  useEffect(() => {
    if (cartData && cartData.data && isSelectedFamily === undefined) {
      setIsSelectedFamily(
        cartData.data.map(item => {
          const studified = {}

          studified[`${item.id}`] = false
// console.log(item)
          return studified
        })
      )
    }
  }, [cartData])
  // console.log(isSelectedFamily)
  // console.log(stupidity)

  const handleCheckout = async () => {
    // console.log({isSelectedFamily})
    if (isSelectedFamily === undefined) {
      alert('Please select at least one family member before proceeding to checkout.');
      return
    }

    let isallchecked = false
    
    isSelectedFamily.forEach(item => {
      isallchecked = false
      const values = Object.values(item)

      if (values.every(value => value === true)) {
        isallchecked = true
      }
    })

    if (isallchecked === false) {
      alert('Please select at least one family member before proceeding to checkout.');
      return
    }
    if (!selectedAddressId) {
      alert('Please select a delivery address before proceeding to checkout.');
      // console.log("No address selected. Exiting handleCheckout.");
    }
  
    if (stupidity) {
      try {
        const { data, status } = await axios.post(`${api}/api/bookings`, {
        
        cart: stupidity,
        "shipping_user_address_id": selectedAddressId,
        "billing_user_address_id": selectedAddressId,
          "original_price": calculateTotal() ,
          "final_paid_amount": calculateTotal(),
          "is_from_cart": 1
        },
      
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (data.success) {
          const checkoutlink = data.data.checkout_url
          // console.log(data)

          if (checkoutlink) {
            window.location.href = checkoutlink
          }
        }

      } catch (error) {
        console.error("Error during checkout:", error);
      }
    } else {
      console.error("Cart data (stupidity) is not defined");
    }
  };

  // console.log(cartTotal)
  // console.log(familyData)

  // console.log(stupidity)

  const removeItemFromCart = async (id) => {

    try {
      await axios.delete(`${api}/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setCartData((prevCartData) => {
        decrementCartTotal();
        const updatedCartData = prevCartData.data.filter((item) => item.id !== id);
        return { ...prevCartData, data: updatedCartData };
      });
    } catch (err) {
      // console.error(err);
    }
  };


  const calculateTotal = () => {
    let total = 0;
    if (Array.isArray(cartData.data)) {
      cartData.data.forEach((item) => {
        total += item.seva_price.selling_price;
      });
    }
    return total;
  };

  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${api}/api/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'paginate': '0',
          }
        });
        // console.log(response.data.data.data)
        setAddresses(response.data.data.data);
        setTriggerRefresh(prev => prev + 1)
        setError(null);
      } catch (err) {
        setError(err);
        // console.error(err);
      }
    };

    fetchAddresses();
  }, []);

  const [selectedState, setSelectedState] = useState('');
  const [citiesInSelectedState, setCitiesInSelectedState] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const fetchCityData = async () => {
    try {
      const response = await axios.get(`https://${api}/api/city`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'paginate': '0',
        }
      });
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.success === 1) {
          const cityData = responseData.data.data;
          setCityData(cityData)
          // console.log('City Data:', cityData);
        } else {
          // console.error('API Error:', responseData.message);
        }
      } else {
        // console.error('API Error: Unexpected status code', response.status);
      }
    } catch (error) {
      // console.error('API Error:', error.message);
    }
  };
  const fetchStateData = async () => {
    try {
      const response = await axios.get(`${api}/api/states`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'paginate': '0',
        }
      });
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.success === 1) {
          const StateDataa = responseData.data.data;
          setStateData(StateDataa)
          // console.log('City Data:', StateDataa);
        } else {
          // console.error('API Error:', responseData.message);
        }
      } else {
        // console.error('API Error: Unexpected status code', response.status);
      }
    } catch (error) {
      // console.error('API Error:', error.message);
    }
  };

  useEffect(() => {
    fetchCityData()
    fetchStateData()
  }, [])
  useEffect(() => {
    if (selectedState) {
      const cities = cityData.filter((city) => city.state_id === selectedState);
      setCitiesInSelectedState(cities);
    } else {
      setCitiesInSelectedState([]);
    }
  }, [selectedState, cityData]);

  const handleCitySelection = (cityId) => {
    // Find the selected city data based on cityId and update the selectedCity state
    const city = cityData.find((city) => city.id === cityId);
    setSelectedCity(city);
  };


  // const handlePlaceOrder = async () => {
  //   try {
  //     const response = await instance.post('api/booking', {
  //       cart: cartData.data,
  //       shipping_user_address_id: shipping_user_address_id,
  //       billing_user_address_id: billing_user_address_id,
  //       coupon_code: coupon_code,
  //       original_price: calculateTotal(),
  //       reward_points: reward_points,
  //       extra_charges: extra_charges,
  //       coupon_amount: coupon_amount,
  //       final_paid_amount: calculateTotal() + 80,
  //       is_from_cart: 1
  //     });
  //     console.log("Booking successful:", response.data);
  //   } catch (err) {
  //     console.error("Error during booking:", err);
  //   }
  // };


  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const handleOpenAddAddressModal = () => {
    setAddAddressModalOpen(true);
  };

  const handleCloseAddAddressModal = () => {
    setAddAddressModalOpen(false);
  };

  const handleCheckboxChange = (e, index) => {
    const updatedCartData = [...cartData.data];
    updatedCartData[index].is_prasadam_available = e.target.checked;

  };

  // console.log({ addresses })

  return (
    <div>
      {/* Content for each step */}
      <div>
        {steps.map((label, index) => (
          <div
            className="click"
            key={label}
            style={{ display: index === activeStep ? "block" : "none" }}
          >
            {/* Add content for each step */}
            {index === 0 && (
              <Container>
                <div className="add-to-cart add-to-cart-2">
                  <div className="add-to-cart-content">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>

                        <div className="add-to-cart-box">
                          <div className="top-stepper">
                            <Stepper activeStep={activeStep} alternativeLabel>
                              {steps.map((label, index) => (
                                <Step key={label}>
                                  <StepLabel onClick={handleStepClick(index)}>
                                    {label}
                                  </StepLabel>
                                </Step>
                              ))}
                            </Stepper>
                          </div>
                          <Typography variant="h5">
                            Your Order <span>({cartTotal} items)</span>
                          </Typography>
                          {cartData && cartData.data && Array.isArray(cartData.data) && cartData.data.length > 0 ? (
                            cartData.data.map((item, index) => (
                              <>
                                <div>
                                  <div className="add-to-cart-box-2">
                                    {/* <img src={cartimage} /> */}
                                    <div className="add-to-card-seva">
                                      <div className="add-to-card-seva-content">
                                        <Typography variant="h4">
                                          Seva Name - {item.seva.title}
                                        </Typography>
                                        {item.seva_price.family_type ? <div style={{ backgroundColor: "grey", borderRadius: "8px", padding: "5px 10px" }}>{item.seva_price.family_type}</div> : undefined}

                                        <p>{new Date(item.seva.start_date).toDateString()}</p>
                                        <Typography variant="h5">
                                          {/* Event Type - <span>{productDetails.event}</span> */}
                                        </Typography>
                                        <Typography>
                                          <input
                                            type="checkbox"
                                            id=""
                                            name=""
                                            value=""
                                            style={{ display: item.is_prasadam_available ? "block" : "none" }}
                                            checked={item.is_prasadam_available}
                                            onChange={(e) => handleCheckboxChange(e, index)}
                                          />
                                          <label htmlFor="">
                                            {item.is_prasadam_available ? "Prasadam" : ""}
                                          </label>
                                        </Typography>
                                      </div>
                                      <div className="add-to-card-seva-content-2">
                                        <h4>₹{item.seva_price.selling_price}</h4>
                                        <div className="remove-btn">
                                          <Button
                                            onClick={() => removeItemFromCart(item.id)}
                                          >
                                            Remove
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                                <div className="">
                                  <BasicAccordion3 
                                    familyData={familyData} 
                                    setFamilyData={setFamilyData} 
                                    selectedFamily={selectedFamily} 
                                    setSelectedFamily={setSelectedFamily} 
                                    seva={item} 
                                    setIsSelectedFamily={setIsSelectedFamily}
                                  />

                                </div>

                              </>
                            ))) : (
                            <div className="no-items-in-cart">No items in checkout</div>
                          )}
                          <Button className="_0plu"
                            variant="outlined"
                            onClick={() => setActiveStep(1)}
                          >
                            Continue
                          </Button>
                        </div>
                        {/* <div className="add-family-details-btn">
                          <Button disableRipple disableElevationn onClick={handleCheckout} >
                            <VerifiedUserIcon />
                            Place Order ₹{calculateTotal() + 80}
                            <KeyboardArrowRightIcon />
                          </Button>
                        </div> */}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className="order-summary">
                          {/* <div className="coupons">
                            <div className="coupons-content">
                              <div className="coupons-content-title">
                                <h4>Coupons</h4>
                              </div>
                              <div className="coupons-btn">
                                <Button>
                                  View all
                                  <span>
                                    <img
                                      className="app-btn-img"
                                      src="/images/icons/arrow-right-orange.svg"
                                    />
                                  </span>
                                </Button>
                              </div>
                            </div>
                            <div className="coupons-main-btns">
                              <Button className="coupon-name">
                                {productDetails.sku_code}
                              </Button>
                              <Button>Apply</Button>
                            </div>
                          </div> */}
                          <div className="order-summary-title">
                            <h2>Order Summary</h2>
                          </div>
                          <div className="order-summary-list">
                            <ul>
                              <li className="sub-total">Sub Total</li>
                              <li>₹{calculateTotal()}</li>
                            </ul>
                            {/* <ul>
                              <li className="sub-total">Shipping</li>
                              <li>₹80</li>
                            </ul> */}
                            <ul>
                              <li className="sub-total">Total</li>
                              <li>₹{calculateTotal()}</li>
                            </ul>
                          </div>
                          {/* <div className="proceed-to-pay">
                            <Button
                              variant="contained"
                              className="app-btn app-btn-primary has-icon-end"
                            >
                              <span className="app-btn-text" onClick={handleCheckout}>
                                Proceed To Pay
                              </span>
                              <img
                                className="app-btn-img"
                                src="/images/icons/arrow-right.svg"
                              />
                            </Button>
                          </div> */}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Container>
            )}
            {index === 1 && (
              <Container>
                <div className="add-to-cart add-to-cart-2">
                  <div className="add-to-cart-content">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div className="add-to-cart-box">
                          <div className="top-stepper">
                          <Button className="_9hyx"
                            variant="outlined"
                            onClick={() => setActiveStep(0)}
                          >
                            <IoMdArrowRoundBack />
                          </Button>
                            <Stepper activeStep={activeStep} alternativeLabel>
                              {steps.map((label, index) => (
                                <Step key={label}>
                                  <StepLabel onClick={handleStepClick(index)}>
                                    {label}
                                  </StepLabel>
                                </Step>
                              ))}
                            </Stepper>
                          </div>
                          <div className="">
                            <Typography variant="h5">
                              Your Order <span>({cartTotal} items)</span>
                            </Typography>
                            <div className="">
                              {/* <BasicAccordion3 familyData={familyData} setFamilyData={setFamilyData} handleCheckout={handleCheckout} /> */}
                            </div>
                            <div className="select-delivery-address">
                              <div className="deliver-address-content">
                                <div className="deliver-address-title">
                                  <h3>Select Delivery Address</h3>
                                </div>
                                <div className="view-all">
                                  <Button disableRipple disableElevation>View All
                                    <span><img className="app-btn-img" src="/images/icons/arrow-right-orange.svg" /></span>
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {addresses.map((address) => (
                              <div className="select-address-home-2" key={address.id}>
                                <div className="select-address-home">
                                  <div className="select-address-box">
                                    <div className="address">
                                      <div className="home">
                                        <Checkbox
                                          checked={selectedAddressId === address.id}
                                          onChange={() => handleSelectAddress(address.id)}
                                        />
                                        <h3>{address.address_name}</h3>
                                      </div>
                                      <p>{address.address_1},{address.city.name},{address.state.name},{address.country.name}</p>
                                      <p></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                            <div className="add-new-address">
                              <Button disableRipple disableElevation onClick={handleOpenAddAddressModal}>
                                <span><AddIcon /></span>
                                Add New Address</Button>
                            </div>
                            <Dialog open={isAddAddressModalOpen} onClose={handleCloseAddAddressModal} fullWidth maxWidth="md">
                              <DialogContent style={{ padding: '20px' }} >
                                <div>
                                  <div>
                                    <Typography variant='h6'>Address Details</Typography>

                                    <div className='billing-forms'>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Full Name</FormLabel>
                                            <TextField id="name"
                                              // placeholder="Akash"
                                              value={fname}
                                              onChange={(e) => setFname(e.target.value)}
                                            />
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Last Name</FormLabel>
                                            <TextField
                                              id="name"
                                              value={lname}
                                              onChange={(e) => setLname(e.target.value)}
                                              // placeholder="Gupta"
                                               />
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Phone No</FormLabel>
                                            <TextField value={phone_no} onChange={(e) => setPhoneNo(e.target.value)} id="outlined-number" type="tel" 
                                            // placeholder="+91 82107 16196"
                                            InputLabelProps={{ shrink: true, }} />
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Email ID</FormLabel>
                                            <TextField value={email}
                                              onChange={(e) => setEmail(e.target.value)} id="email"
                                              //  placeholder="akashgupta@gmail.com" 
                                              />

                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={12} xl={12}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Address Line 1</FormLabel>
                                            <TextField value={address_1}
                                              onChange={(e) => setAddress1(e.target.value)} id="demo-helper-text-aligned"
                                              //  placeholder="KPHB Phase 1, Kukatpally, Hyderabad"
                                                />
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={12} xl={12}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Address Line 2</FormLabel>
                                            <TextField value={address_2}
                                              onChange={(e) => setAddress2(e.target.value)}
                                              id="demo-helper-text-aligned"
                                              //  placeholder="KPHB Phase 1, Kukatpally, Hyderabad" 
                                               />
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-2">
                                            <FormLabel>State</FormLabel>
                                            <Select
                                              id="state"
                                              value={selectedState}
                                              onChange={(e) => setSelectedState(e.target.value)}
                                            >
                                              <MenuItem disabled value="">Select ur State</MenuItem>
                                              {stateData.map((state) => (
                                                <MenuItem key={state.id} value={state.id}>
                                                  {state.name}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-2">
                                            <FormLabel>City</FormLabel>
                                            <TextField
                                              id="city"
                                              value={selectedCity }
                                              onChange={(e) => handleCitySelection(e.target.value)}
                                            />
                                              {/* <MenuItem disabled value="">Select ur city</MenuItem>
                                              {citiesInSelectedState.map((city) => (
                                                <MenuItem key={city.id} value={city.id}>
                                                  {city.name}
                                                </MenuItem>
                                              ))} */}
                                            
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Pin Code</FormLabel>
                                            <TextField value={pincode}
                                              onChange={(e) => setPincode(e.target.value)} id="number" 
                                              // placeholder="500072"
                                               />
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Whatsapp No</FormLabel>
                                            <TextField value={whatsup_no}
                                              onChange={(e) => setWhatsupNo(e.target.value)}
                                              id="number" 
                                              // placeholder="+91 82107 16196"
                                               />
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                          <div className="myfamily-forms-1">
                                            <FormLabel>Address_name</FormLabel>
                                            <TextField value={address_name}
                                              onChange={(e) => setAddressName(e.target.value)}
                                              id="number"
                                              //  placeholder="Enter addrees tpe"
                                                />
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </div>
                                    <div className='myfamily-forms-btn'>
                                      <Button onClick={handleSaveAddress}>Save Address</Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="add-family-details-btn">
                            <Button disableRipple disableElevation>
                              <VerifiedUserIcon />
                              <div className='log-in confirmation-btn'>
                                <Button className='login-btn' variant="outlined" onClick={handleCheckout}>
                                  Place Order ₹{calculateTotal()}
                                </Button>
                                <BootstrapDialog
                                  onClose={handleClose}
                                  aria-labelledby="customized-dialog-title"
                                  open={open}
                                >
                                  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                  </DialogTitle>
                                  <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                      position: 'absolute',
                                      right: 8,
                                      top: 8,
                                      color: (theme) => theme.palette.grey[500],
                                    }}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                  <DialogContent>
                                    <div className='welcome-back'>
                                      <div className='ganesh-leaf'>
                                        <img src={leaf} />
                                      </div>
                                      <div className='welcome-back-content'>
                                        <img src={ganesh} />
                                        <h4>Puja Booking is Successful</h4>
                                        <h5>We have successfully received your details</h5>
                                        <p>You will get a confirmation call or WhatsApp within 12 hrs of booking</p>
                                      </div>

                                      <div className='send-otp verify-otp'>
                                        <Link to='/home'>
                                          <Button disableRipple disableElevation variant="contained" className="app-btn app-btn-primary has-icon-end">
                                            <span className="app-btn-text">Return to Homepage</span>
                                          </Button>
                                        </Link>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </BootstrapDialog>
                              </div>

                              <KeyboardArrowRightIcon />
                            </Button>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div className="order-summary">
                          <div className="coupons">
                            <div className="coupons-content">
                              <div className="coupons-content-title">
                                <h4>Coupons</h4>
                              </div>
                              <div className="coupons-btn">
                                <Button>
                                  View all
                                  <span>
                                    <img
                                      className="app-btn-img"
                                      src="/images/icons/arrow-right-orange.svg"
                                    />
                                  </span>
                                </Button>
                              </div>
                            </div>
                            {/* <div className="coupons-main-btns">
                              <Button className="coupon-name">
                                AJDNSAJNNJ
                              </Button>
                              <Button>Apply</Button>
                            </div> */}
                          </div>
                          <div className="order-summary-title">
                            <h2>Order Summary</h2>
                          </div>
                          <div className="order-summary-list">
                            <ul>
                              <li className="sub-total">Sub Total</li>
                              <li>₹{calculateTotal()}</li>
                            </ul>
                            {/* <ul>
                              <li className="sub-total">Shipping</li>
                              <li>₹80</li>
                            </ul> */}
                            <ul>
                              <li className="sub-total">Total</li>
                              <li>₹{calculateTotal()}</li>
                            </ul>
                          </div>
                          {/* <div className="proceed-to-pay">
                            <Button
                              variant="contained"
                              className="app-btn app-btn-primary has-icon-end"
                            >
                              <span className="app-btn-text" onClick={handleCheckout}>
                                Proceed To Pay
                              </span>
                              <img
                                className="app-btn-img"
                                src="/images/icons/arrow-right.svg"
                              />
                            </Button>
                          </div> */}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Container>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NonLinearHorizontalStepper;
