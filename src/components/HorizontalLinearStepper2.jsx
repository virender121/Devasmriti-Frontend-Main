import React from "react"
import { useEffect, useState } from "react"
import instance from "../utils/Api"
import { Stepper, Step, StepLabel, DialogContent, TextField, MenuItem, Select } from "@mui/material"
import { Button, Container, Typography, FormLabel } from "@mui/material"
import Grid from "@mui/material/Grid"
import cartimage from "../images/cart/cart-image.svg"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip'
import { Link, useNavigate, useParams } from "react-router-dom"
import BasicAccordion3 from "../components/common/Accordion3"
import Checkbox from "@mui/material/Checkbox"
import AddIcon from '@mui/icons-material/Add'
import CustomizedDialogs3 from "./CustomizedDialogs3"
import { styled } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { useCart } from '../pages/CartContext'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import leaf from '../images/confirmation/flower.svg'
import ganesh from '../images/confirmation/lord-ganesh.svg'
import api from "../config/backend"
import { IoMdArrowRoundBack } from "react-icons/io"
import axios from 'axios'

function NonLinearHorizontalStepper2({ setTriggerRefresh, sevaPriceID }) {
	const [open, setOpen] = useState(false)
	const { productId } = useParams()
	const [activeStep, setActiveStep] = useState(0)
	const [selectedSellingPrice, setSelectedSellingPrice] = useState(null)
	const [error, setError] = useState(null)
	const [productDetails, setProductDetails] = useState([])
	const [stupidity, setStupidity] = useState(undefined)
	const [familyData, setFamilyData] = useState([])
	const [selectedFamily, setSelectedFamily] = useState([])
	const [isSelectedFamily, setIsSelectedFamily] = useState(undefined)
	const token = localStorage.getItem("token")
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [email, setEmail] = useState('')
	const [phone_no, setPhoneNo] = useState('')
	const [whatsup_no, setWhatsupNo] = useState('')
	const [country_id, setCountryId] = useState(1)
	const [state_id, setStateId] = useState('')
	const [city_id, setCityId] = useState('')
	const [address_1, setAddress1] = useState('')
	const [address_2, setAddress2] = useState('')
	const [pincode, setPincode] = useState('')
	const [address_name, setAddressName] = useState('')
	const [cityData, setCityData] = useState([])
	const [stateData, setStateData] = useState([])
	const [optForPrasadam, setOptForPrasadam] = useState(true)
	const [familycheck, setFamilyCheck] = useState([])
	const [selectedAddressId, setSelectedAddressId] = useState(null)
	const [extrachargesLabel, setExtrachargesLabel] = useState('')
	const [extrachargesPercentage, setExtrachargesPercentage] = useState()
	const [addressNameOptions, setAddressNameOptions] = useState([
		{ id: 'home', name: 'Home' },
		{ id: 'office', name: 'Office' },
		{ id: 'other', name: 'Other' },
	])
	const [otherAddressName, setOtherAddressName] = useState('')
	const [cartData, setCartData] = useState([])
	const [price, setPrice] = useState([])
	const [addresses, setAddresses] = useState([])
	// const [triggerRefresh, setTriggerRefresh] = React.useState(0)
	const [selectedState, setSelectedState] = useState('')
	const [citiesInSelectedState, setCitiesInSelectedState] = useState([])
	const [selectedCity, setSelectedCity] = useState('')

	// Store the selected seva
	const [selectedProduct, setSelectedProduct] = useState(undefined)

	const navigate = useNavigate()

	const handleAddressNameChange = (e) => {
		const selectedValue = e.target.value

		if (selectedValue === 'other') {
			// If "Other" is chosen, reset otherAddressName
			setOtherAddressName('')
		}

		setAddressName(selectedValue)
	}
	const [fieldErrors, setFieldErrors] = useState({
		fname: false,

		email: false,
		phone_no: false,
		whatsup_no: false,
		state_id: false,
		city_id: false,
		address_1: false,
		pincode: false,
		address_name: false,
	});
	const validateForm = () => {
		const errors = {};
		const nameRegex = /^[A-Za-z]+$/;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^[6-9]\d{9}$/;

		if (!fname || !nameRegex.test(fname)) errors.fname = true;
		if (!email || !emailRegex.test(email)) errors.email = true;
		if (!phone_no || !phoneRegex.test(phone_no)) errors.phone_no = true;
		if (!whatsup_no || !phoneRegex.test(whatsup_no)) errors.whatsup_no = true;
		if (!selectedState) errors.selectedState = true;
		if (!selectedCity) errors.selectedCity = true;
		if (!address_1) errors.address_1 = true;
		if (!pincode) errors.pincode = true;


		setFieldErrors(errors);

		if (Object.values(errors).some((error) => error)) {
			return false;
		}

		return true;
	};
	const handleSaveAddress = async () => {
		if (!validateForm()) {
			return;
		}

		try {
			const postData = {
				fname,
				lname,
				email,
				phone_no,
				whatsup_no,
				country_id: 1,
				state_id: selectedState,
				city_id: selectedCity,
				address_1,
				address_2,
				pincode,
				address_name: address_name === 'other' ? otherAddressName : address_name,
			}

			const response = await axios.post(`${api}/api/address`, postData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})
			setAddresses((prevAddresses) => [...prevAddresses, response.data.data])
			handleCloseAddAddressModal()
			setFname('')
			setLname('')
			setEmail('')
			setPhoneNo('')
			setWhatsupNo('')
			setCountryId('')
			setStateId('')
			setCityId('')
			setAddress1('')
			setAddress2('')
			setPincode('')
			setAddressName("")

			setTriggerRefresh(prev => prev + 1)


		} catch (error) {
			if (error.response && error.response.data && error.response.data.message) {
				alert(`An error occurred while saving the address: ${error.response.data.message}`)
			}
		}
	}
	const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false)
	const handleOpenAddAddressModal = () => {
		setAddAddressModalOpen(true)
	}

	const handleCloseAddAddressModal = () => {
		setAddAddressModalOpen(false)
		setFname('')
		setLname('')
		setEmail('')
		setPhoneNo('')
		setWhatsupNo('')
		setCountryId('')
		setStateId('')
		setCityId('')
		setAddress1('')
		setAddress2('')
		setPincode('')
		setAddressName("")
		setFieldErrors({
			fname: false,

			email: false,
			phone_no: false,
			whatsup_no: false,
			state_id: false,
			city_id: false,
			address_1: false,

			pincode: false,
			address_name: false,

		});
	}


	const handleClose = () => {
		setOpen(false)
	}

	const BootstrapDialog = styled(Dialog)(({ theme }) => ({
		'& .MuiDialogContent-root': {
			padding: theme.spacing(2),
		},
		'& .MuiDialogActions-root': {
			padding: theme.spacing(1),
		},
	}))
	const steps = ["Information", "Complete "]

	const handleStepClick = (step) => () => {
		if (familyData && familyData.length) {
			setActiveStep(step)
		}
	}
	// let selectedPriceItem
	const { setOrderStatus } = useCart()

	const calculateTotal = () => {
		let total = 0
		if (selectedProduct) {
			total = extrachargesLabel ? (selectedProduct.selling_price + (selectedProduct.selling_price * (extrachargesPercentage / 100))) : selectedProduct.selling_price
		}
		return total
	}

	const fetchAddresses = async () => {
		try {
			const response = await axios.get(`${api}/api/address`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					'paginate': '0',
				}
			})

			setAddresses(response.data.data.data)
			setError(null)
		} catch (err) {
			setError(err)
		}
	}

	const fetchSevasData = async () => {
		try {
			const response = await axios.get(`${api}/api/sevas/${productId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					'paginate': '0',
				}
			})

			const idontcare = response.data.data
			const sevaPrices = response.data.data.seva_prices

			setProductDetails(response.data.data)
			setExtrachargesLabel(response.data.data.extracharges_label)
			setExtrachargesPercentage(response.data.data.extracharges_percentage)

			const thisproduct = sevaPrices.find(item => item.id == sevaPriceID)

			setSelectedProduct(thisproduct)

			let selectedKeys = []
			const selectedFamilyIds = selectedFamily.map(member => member.id)

			if (Array.isArray(isSelectedFamily)) {
				selectedKeys = isSelectedFamily.filter(obj => {
					if (Object.values(obj)[0]) {
						return true
					}
					return false
				}).map(obj => Object.keys(obj)[0])

			}

			const nothing = [{
				"seva_id": idontcare.id,
				"seva_price_id": thisproduct.id,
				"is_prasadam_available": idontcare.seva_prices[0].is_prasadam_available,
				"user_family_detail_id": familycheck

			}]
			// console.log(9)
			// console.log(nothing)
			setStupidity(nothing)

			if (sevaPrices && sevaPrices.length > 0) {

				const firstSellingPrice = sevaPrices[0].selling_price
				setPrice(sevaPrices)
				setSelectedSellingPrice(firstSellingPrice)
				setTriggerRefresh(prev => prev + 1)
			} else {

			}
		} catch (err) {
			setError(err)
		}
	}

	const getStupidity = async () => {
		const response = await axios.get(`${api}/api/sevas/${productId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
				'paginate': '0',
			}
		})

		const idontcare = response.data.data
		let selectedKeys = []
		const selectedFamilyIds = selectedFamily.map(member => member.id)
		// console.log('select', isSelectedFamily)
		if (Array.isArray(isSelectedFamily)) {
			selectedKeys = isSelectedFamily.filter(obj => {
				if (Object.values(obj)[0]) {
					return true
				}
				return false
			}).map(obj => Object.keys(obj)[0])

		}

		const nothing = [{
			"seva_id": idontcare.id,
			"seva_price_id": Number(sevaPriceID),
			"is_prasadam_available": idontcare.seva_prices[0].is_prasadam_available,
			"user_family_detail_id": familycheck

		}]

		setStupidity(nothing)
	}

	const removeItemFromCart = async (id) => {
		navigate("/")
	}

	const sendPaymentStatusToServer = async (data, response, status) => {
		try {
			if (status == 'Success') {
				await axios.put(`${api}/api/bookings/${data.data.id}`, {
					"payment_status": status,
					"transaction_id": response.razorpay_payment_id,
					"transaction_response": JSON.stringify(data.razor_pay)
				}, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				setOrderStatus(true);
				setTimeout(() => {
					setOrderStatus(false);
				}, 3000);
				navigate('/home')
			} else if (status == 'Cancelled') {
				axios.put(`${api}/api/bookings/${data.data.id}`, {
					"payment_status": status,
					"transaction_id": data.data.invoice_id,
					"transaction_response": JSON.stringify(data.razor_pay)
				}, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
			}
			else if (response.error.reason == 'payment_failed') {
				axios.put(`${api}/api/bookings/${data.data.id}`, {
					"payment_status": status,
					"transaction_id": response.error.metadata.payment_id,
					"transaction_response": JSON.stringify(data.razor_pay)
				}, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
			}
		} catch (error) {
			console.error('Error sending payment status to server', error);
		}
	};

	const handleCheckout = async () => {
		let isallchecked = false

		for (const item of isSelectedFamily) {
			const values = Object.values(item)

			if (values.includes(true)) {
				isallchecked = true
				break
			}
		}
		if (!isallchecked && familycheck.length === 0) {
			alert('Please select at least one family member before proceeding to checkout.')
			return
		}


		if (!selectedAddressId) {
			alert('Please select a delivery address before proceeding to checkout.')

			return
		}

		if (stupidity) {
			// Add prashadam available to stupidity
			const stupiditycopy = JSON.parse(JSON.stringify(stupidity))

			stupiditycopy[0].is_prasadam_available = optForPrasadam

			try {

				const { data } = await axios.post(`${api}/api/bookings`, {
					cart: stupiditycopy,
					"shipping_user_address_id": selectedAddressId,
					"billing_user_address_id": selectedAddressId,
					"original_price": calculateTotal(),
					"final_paid_amount": calculateTotal(),
					"is_from_cart": 0
				}, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				// console.log('dataaaaaaa', data)
				let UserData = JSON.parse(data.data.billing_address)
				const options = {
					key: data.razor_pay.keys.key_id,
					amount: data.razor_pay.order.amount,
					currency: data.razor_pay.order.currency,
					name: "Devasmriti",
					description: "Total Amount",
					image: "/images/devasmriti-logo.svg",
					order_id: data.razor_pay.order.id,
					handler: function (response) {
						console.log('response', response)
						sendPaymentStatusToServer(data, response, 'Success');
					},
					modal: {
						ondismiss: function () {
							sendPaymentStatusToServer(data, null, 'Cancelled');
						}
					},
					prefill: {
						name: UserData.fname,
						email: UserData.email,
						contact: UserData.phone_no,
					},
					// notes: {
					// 	address: deliverAddress,
					// },
					retry: {
						enabled: false,
					},
					timeout: 900,
					theme: {
						color: "#3399cc",
					},
				};
				const razor = new window.Razorpay(options);
				razor.on("payment.failed", function (response) {
					sendPaymentStatusToServer(data, response, 'Failed');
				});
				razor.open();
				// if (data.success) {
				// 	const checkoutlink = data.data.checkout_url

				// 	if (checkoutlink) {
				// 		window.location.href = checkoutlink
				// 	}
				// }

			} catch (error) {
				console.error("Error during checkout:", error)
			}
		} else {
			console.error("Cart data (stupidity) is not defined")
		}
	}

	const fetchCityData = async () => {
		try {
			const response = await axios.get(`${api}/api/city`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					'paginate': '0',
				}
			})
			if (response.status === 200) {
				const responseData = response.data
				if (responseData.success === 1) {
					const cityData = responseData.data.data
					setCityData(cityData)

				} else {
					console.error('API Error:', responseData.message)
				}
			} else {
				console.error('API Error: Unexpected status code', response.status)
			}
		} catch (error) {
			console.error('API Error:', error.message)
		}
	}

	const fetchStateData = async () => {
		try {
			const response = await axios.get(`${api}/api/states`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					'paginate': '0',
				}
			})
			if (response.status === 200) {
				const responseData = response.data
				if (responseData.success === 1) {
					const StateDataa = responseData.data.data
					setStateData(StateDataa)
					console.log(stateData)

				} else {
					console.error('API Error:', responseData.message)
				}
			} else {
				console.error('API Error: Unexpected status code', response.status)
			}
		} catch (error) {
			console.error('API Error:', error.message)
		}
	}

	useEffect(() => {
		fetchCityData()
		fetchStateData()
		fetchAddresses()
		fetchSevasData()
	}, [])

	useEffect(() => {
		getStupidity()
	}, [isSelectedFamily])

	// useEffect(() => {
	//   const fetchData = async () => {
	//     try {
	//       const response = await axios.get(`${api}/api/cart`, {
	//         headers: {
	//           Authorization: `Bearer ${token}`,
	//           'Content-Type': 'application/json'
	//         }
	//       });
	//       setCartData(response.data.data);
	//       setError(null);
	//     } catch (err) {
	//       setError(err);
	//       console.error(err);
	//     }
	//   };

	//   fetchData();
	// }, []);

	// useEffect(() => {
	//   if (cartData && cartData.data) {

	//     let selectedFamilyIds = [];
	//     let selectedKeys = [];
	//     if (selectedFamily && selectedFamily.length > 0) {
	//       selectedFamilyIds = selectedFamily.map(member => member.id);

	//     }

	//     if (Array.isArray(isSelectedFamily)) {
	//       selectedKeys = isSelectedFamily.map(obj => Object.keys(obj)[0]);

	//     }
	//     const updatedStupidity = cartData.data.map(item => {
	//       return {
	//         "seva_id": item.seva_id,
	//         "seva_price_id": selectedPriceItem.id,
	//         "is_prasadam_available": item.is_prasadam_available,
	//         "user_family_detail_id": selectedKeys,
	//       };
	//     });

	//     setStupidity(updatedStupidity);
	//   }
	// }, [selectedFamily, cartData, sevaPriceID, isSelectedFamily]);

	useEffect(() => {
		if (cartData && cartData.data && isSelectedFamily === undefined) {
			setIsSelectedFamily(
				cartData.data.map(item => {
					const studified = {}

					studified[`${item.id}`] = false

					return studified
				})
			)
		}
	}, [cartData])

	useEffect(() => {
		if (selectedState) {
			const cities = cityData.filter((city) => city.state_id === selectedState)
			setCitiesInSelectedState(cities)
		} else {
			setCitiesInSelectedState([])
		}
	}, [selectedState, cityData])

	useEffect(() => {
		console.log({ productDetails })
		if (productDetails && productDetails.seva_prices && isSelectedFamily === undefined) {
			setIsSelectedFamily(
				productDetails.seva_prices.map(item => {
					const studified = {}

					studified[`${item.id}`] = false
					return studified
				})
			)
		}

	}, [productDetails])

	const [refresh, setRefresh] = useState(true)

	console.log(refresh)

	return (
		<div>
			<div>
				{steps.map((label, index) => (
					<div
						className="click"
						key={label}
						style={{ display: index === activeStep ? "block" : "none" }}
					>
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
														Your Order <span>(1 item)</span>
													</Typography>
													<div>
														{selectedProduct && (
															<div className="add-to-cart-box-2" key={selectedProduct.id}>
																<div className="add-to-card-seva">
																	<div className="add-to-card-seva-content">
																		<Typography variant="h4">
																			Seva Name - {selectedProduct.title}
																		</Typography>
																		<p>
																			{selectedProduct.start_date ? new Date(selectedProduct.start_date).toDateString() : ''}
																		</p>
																		{selectedProduct.is_prasadam_available ? <Typography>
																			<input
																				type="checkbox"
																				id=""
																				name=""
																				value=""
																				checked={optForPrasadam}
																				onChange={() => setOptForPrasadam(prev => !prev)}
																			/>

																			<label htmlFor="">
																				Prasadam
																			</label>
																		</Typography> : undefined}
																	</div>
																	<div className="add-to-card-seva-content-2">
																		<h4>₹{selectedProduct.selling_price}</h4>
																		<div className="remove-btn app-new-remove-btn">
																			<Button onClick={() => removeItemFromCart(selectedProduct.id)}>
																				Remove
																			</Button>
																		</div>
																	</div>
																</div>
															</div>
														)}
													</div>
													<div className="">
														<BasicAccordion3
															familyData={familyData}
															setFamilyData={setFamilyData}
															selectedFamily={selectedFamily}
															setSelectedFamily={setSelectedFamily}
															isSelectedFamily={isSelectedFamily}
															seva={selectedProduct ? selectedProduct : {}}
															setIsSelectedFamily={setIsSelectedFamily}
															setFamilyCheck={setFamilyCheck}
															familycheck={familycheck}
															setRefresh={setRefresh}
															handleCheckout={handleCheckout}
														/>
													</div>
													<div>
														{console.log(familycheck)}
														{familycheck.length > 0 ? (
															<Button
																className="_0plu"
																variant="outlined"
																onClick={() => setActiveStep(1)}
															>
																Continue
															</Button>
														) : (
															<Tooltip title="Please select a family" placement="bottom">
																<div>
																	<Button
																		className="disabledButton"
																		variant="outlined"
																		disabled
																	>
																		Continue
																	</Button>
																</div>
															</Tooltip>
														)}
													</div>
												</div>
											</Grid>
											<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
												<div className="order-summary">
													<div className="order-summary-title">
														<h2>Order Summary</h2>
													</div>
													<div className="order-summary-list">
														{extrachargesLabel && <>
															<ul>
																<li className="sub-total">Sub Total</li>
																<li>₹{selectedProduct.selling_price}</li>
															</ul>
															{extrachargesLabel !== "0" && (
																<div>
																	{/* <ul>
																		<li className="sub-total" style={{ fontWeight: "bold", fontSize: "13px" }}>Extra charges</li>
																	</ul> */}

																	<ul>
																		<li className="sub-total">{extrachargesLabel}</li>
																		<li>₹{(selectedProduct.selling_price * extrachargesPercentage / 100).toFixed(2)}</li>
																	</ul>

																</div>
															)}
														</>}
														<ul>
															<li className="sub-total">Total</li>
															<li>₹{calculateTotal()}</li>
														</ul>
													</div>
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
															Your Order <span>( 1 items)</span>
														</Typography>
														<div className="">
														</div>
														<div className="select-delivery-address">
															<div className="deliver-address-content">
																<div className="deliver-address-title">
																	<h3>Select Delivery Address</h3>
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
																					onChange={() => setSelectedAddressId(address.id)}
																				/>
																				<h3>{address.address_name}</h3>
																			</div>
																			<p>
																				{`${address.fname}, ${address.lname}`}
																				{address.address_1},
																				{address.address_2},

																				{address.city ? address.city.name : ''},
																				{address.state ? address.state.name : ''},
																				{address.country ? address.country.name : ''}
																			</p>
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
																						<FormLabel>First Name<span style={{ color: 'red' }}>*</span></FormLabel>
																						<TextField id="name"
																							// placeholder="Akash"
																							value={fname}
																							onChange={(e) => setFname(e.target.value)}
																							error={fieldErrors.fname}

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
																						<FormLabel>Phone No<span style={{ color: 'red' }}>*</span></FormLabel>
																						<TextField value={phone_no} onChange={(e) => setPhoneNo(e.target.value)} id="outlined-number" type="tel"
																							// placeholder="+91 82107 16196"
																							error={fieldErrors.phone_no}

																							InputLabelProps={{ shrink: true, }} />
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
																					<div className="myfamily-forms-1">
																						<FormLabel>Email ID<span style={{ color: 'red' }}>*</span></FormLabel>
																						<TextField value={email}
																							error={fieldErrors.email}
																							onChange={(e) => setEmail(e.target.value)} id="email"
																						// placeholder="akashgupta@gmail.com"
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={12} md={6} lg={12} xl={12}>
																					<div className="myfamily-forms-1">
																						<FormLabel>Address Line 1<span style={{ color: 'red' }}>*</span></FormLabel>
																						<TextField value={address_1}
																							error={fieldErrors.address_1}
																							onChange={(e) => setAddress1(e.target.value)} id="demo-helper-text-aligned"
																						// placeholder="KPHB Phase 1, Kukatpally, Hyderabad"
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
																						<FormLabel>State<span style={{ color: 'red' }}>*</span></FormLabel>
																						<Select
																							id="state"
																							value={selectedState}
																							error={fieldErrors.selectedState}
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
																						<FormLabel>City<span style={{ color: 'red' }}>*</span></FormLabel>
																						<TextField
																							id="city"
																							value={selectedCity}
																							error={fieldErrors.selectedCity}
																							onChange={(e) => setSelectedCity(e.target.value)}
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
																					<div className="myfamily-forms-1">
																						<FormLabel>Pin Code<span style={{ color: 'red' }}>*</span></FormLabel>
																						<TextField value={pincode}
																							error={fieldErrors.pincode}
																							onChange={(e) => setPincode(e.target.value)} id="number"
																						// placeholder="500072"
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
																					<div className="myfamily-forms-1">
																						<FormLabel>Whatsapp No<span style={{ color: 'red' }}>*</span></FormLabel>
																						<TextField value={whatsup_no}
																							error={fieldErrors.whatsup_no}
																							onChange={(e) => setWhatsupNo(e.target.value)}
																							id="number"
																						// placeholder="+91 82107 16196"
																						/>
																					</div>
																				</Grid>
																				<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

																					<div className="myfamily-forms-1">
																						<FormLabel>Address Name <span style={{ color: 'red' }}>*</span></FormLabel>
																						{/* Dropdown for known address names */}
																						<Select
																							id="addressName"
																							value={address_name}
																							error={fieldErrors.address_name}
																							onChange={handleAddressNameChange}
																						>
																							<MenuItem disabled value="">
																								Select an Address Name
																							</MenuItem>
																							{addressNameOptions.map((option) => (
																								<MenuItem key={option.id} value={option.id}>
																									{option.name}
																								</MenuItem>
																							))}
																						</Select>
																						{/* Text field for "Other" */}
																						{address_name === 'other' && (
																							<TextField
																								value={otherAddressName}
																								onChange={(e) => setOtherAddressName(e.target.value)}
																								id="otherAddressName"
																								placeholder="Enter Address Name"
																							/>
																						)}
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
														<Button onClick={handleCheckout} disableRipple disableElevation>
															<VerifiedUserIcon />
															<div className='log-in confirmation-btn'>
																<Button className='login-btn' variant="outlined" >
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
													</div>
													<div className="order-summary-title">
														<h2>Order Summary</h2>
													</div>
													<div className="order-summary-list">
														{extrachargesLabel && <>
															<ul>
																<li className="sub-total">Sub Total</li>
																<li>₹{selectedProduct.selling_price}</li>
															</ul>
															{extrachargesLabel !== "0" && (
																<div>
																	{/* <ul>
																		<li className="sub-total" style={{ fontWeight: "bold", fontSize: "13px" }}>Extra charges</li>
																	</ul> */}

																	<ul>
																		<li className="sub-total">{extrachargesLabel}</li>
																		<li>₹{(selectedProduct.selling_price * extrachargesPercentage / 100).toFixed(2)}</li>
																	</ul>

																</div>
															)}
														</>}
														<ul>
															<li className="sub-total">Total</li>
															<li>₹{calculateTotal()}</li>
														</ul>
													</div>
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
	)
}

export default NonLinearHorizontalStepper2
