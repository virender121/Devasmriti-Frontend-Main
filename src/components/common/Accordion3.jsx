import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import instance from "../../utils/Api"
import { useEffect, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs"
import {
	Dialog,
	DialogContent,
	FormLabel,
	Grid,
	MenuItem,
	Select,
	TextField,
} from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import axios from "axios"
import { json } from "react-router-dom"
import "dayjs/locale/en"
import EditFamilyDetails from "../../pages/EditFamilyDetails"
import { useDateField } from "@mui/x-date-pickers/DateField/useDateField"
import api from "../../config/backend"
export default function BasicAccordion3({
	familyData,
	setFamilyData,
	handleCheckout,
	seva,
	selectedFamily,
	isSelectedFamily,
	setSelectedFamily,
	setIsSelectedFamily,
	setFamilyCheck,
	familycheck,
	setRefresh
}) {
	dayjs.extend(customParseFormat)
	dayjs.locale("en")

	const [error, setError] = useState(null)
	const [profileData, setProfileData] = useState({})
	const [familydatacart, setFamilyDatacart] = useState([])
	const [triggerRefresh, setTriggerRefresh] = useState(0)
	const token = localStorage.getItem("token")
	const [familyEditedRefresh, setFamilyEditedRefresh] = useState(0)
	const [full_name, setFull_name] = useState("")
	const [relationId, setRelationId] = useState("")
	const [gotram, setGotram] = useState("")
	const [nakshatram, setNakshatram] = useState("")
	const [rasiId, setRasiId] = useState("")
	const [notes, setNotes] = useState("")
	const [relationOptions, setRelationOptions] = useState([])
	const [rasiOptions, setRasiOptions] = useState([])
	const [selectedDate, setSelectedDate] = useState(null)
	const [dontKnow, setDontKnow] = useState(1)
	const [profiledata, setProfiledata] = useState([])
	const [profilePictureData, setProfilePictureData] = useState(null)
	const [open, setOpen] = useState(false)
	const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [firstName, setFirstName] = useState("")
	const [phone, setPhone] = useState("")
	const [email, setEmail] = useState("")
	const [editFamilyModal, setEditFamilyModal] = useState(false)
	const [familyMemberData, setFamilyMemberData] = useState()

	console.log(seva)

	const sevafamilytype = seva.family_type

	const fetchData = async () => {
		try {
			const profileResponse = await axios.get(
				`${api}/api/user/profile`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						paginate: "0",
					},
				}
			)

			setProfileData(profileResponse.data.data)

			const familyResponse = await axios.get(
				`${api}/api/myfamily`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						paginate: "0",
					},
				}
			)

			setFamilyData(familyResponse.data.data.data)

			console.log({ m: familyResponse.data.data.data })

			setFamilyDatacart(
				familyResponse.data.data.data.map((item) => {
					return {
						...item,
						cartindex: seva && seva.seva_id,
						selected: false,
					}
				})
			)

			setError(null)
		} catch (err) {
			setError(err)
			console.error(err)
		}
	}

	const handleDateChange = (date) => {
		const selectedDate = dayjs(date)
		const today = dayjs()

		// Check if the selected date is before today
		if (selectedDate.isBefore(today) || selectedDate.isSame(today, "day")) {
			setSelectedDate(selectedDate.format("YYYY-MM-DD"))
		} else {
			alert("Invalid date. Please select a date on or before today.")
			setSelectedDate("")
		}
	}

	const fetchRasiData = async () => {
		try {
			const response = await axios.get(
				`${api}/api/rasi`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						paginate: "0",
					},
				}
			)
			// console.log(response.data.data.data)
			if (response.status === 200) {
				setRasiOptions(response.data.data.data)
			} else {
				console.error("Failed to fetch data from the API.")
			}
		} catch (error) {
			console.error("An error occurred while fetching data:", error)
		}
	}

	const fetchrelationData = async () => {
		try {
			const response = await axios.get(
				`${api}/api/relation`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						paginate: "0",
					},
				}
			)

			if (response.status === 200) {
				setRelationOptions(response.data.data.data)
			} else {
				console.error("Failed to fetch data from the API.")
			}
		} catch (error) {
			console.error("An error occurred while fetching data:", error)
		}
	}

	const handleCloseAddAddressModal = () => {
		setAddAddressModalOpen(false)
		setFieldErrors({
			full_name: false,

		});
	};

	const handleClickOpen = () => {
		setOpen(true)
		setIsEditing(true)
	}

	const handleClose = () => {
		setOpen(false)
		setEmailError({
			
			email: false,
			
		  });
	}

	const fetchProfileData = async () => {
		try {
			const response = await axios.get(`${api}/api/user/profile`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						paginate: "0",
					},
				}
			)

			const name = response.data.data.fname
			localStorage.setItem("name", name || "")
			setProfiledata(response.data.data)
			if (response.data.data.image) {
				setProfilePictureData(response.data.data.image)
			}
		} catch (err) {
			setError(err)
		}
	}
	const [emailError, setEmailError] = useState({
		email: false,

	});

	const validateEmail = () => {
		if (email.trim() !== '') {
		  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		  const isValid = emailRegex.test(email);
	
		  setEmailError({ email: !isValid });
	
		  return isValid;
		}
	
		setEmailError({ email: false });
		return true;
	  };
	const saveProfileData = async () => {
		if (!validateEmail()) {
			return;
		  }
	  
		try {
			const updatedProfileData = {
				fname: firstName,
				mobile_number: phone,
				email
			}
			const response = await axios.put(
				`${api}/api/user/profile`,
				updatedProfileData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			)

			if (response.status === 200) {
				setProfiledata(response.data.data)
				setIsEditing(false)
				handleClose()
				setTriggerRefresh(prev => prev + 1)
			} else {
				console.error("Failed to update profile data")
			}
		} catch (error) {
			console.error("Failed to update profile data:", error)
		}
	}

	const handleChange = (familyMember) => {
		const selected = familydatacart.map((item) => {
			return {
				...item,
				selected: familyMember.id === item.id ? !item.selected : item.selected,
			}
		})

		const ischecked = selected.some((item) => item.selected)

		const famids = selected
			.filter((item) => item.selected)
			.map((item) => item.id)

		setFamilyCheck(famids)

		setIsSelectedFamily((prev) => {

			const copy = JSON.parse(JSON.stringify(prev))

			const fixed = copy.map((item) => {
				const key = Object.keys(item)[0]

				// console.log({ key, test: seva.id })
				if (key == seva.id) {
					const test = {}

					test[key] = ischecked

					return test
				}

				return item
			})

			return fixed
		})

		setFamilyDatacart(selected)
	}

	function editFamilyHandler(familyMember) {
		setFamilyMemberData(familyMember)
		setEditFamilyModal(true)
	}
	function closeEditFamilyModal() {
		setEditFamilyModal(false)
		setFamilyData(undefined)
	}
	const [fieldErrors, setFieldErrors] = useState({
		full_name: false,

	});
	const validateForm = () => {
		const errors = {};

		if (!full_name) {
			errors.full_name = true;
		}

		setFieldErrors(errors);

		if (Object.values(errors).some((error) => error)) {
			return false;
		}

		return true;
	};
	const handleSaveProfile = async () => {
		if (!validateForm()) {
			toast.error('Please fill in all required fields');
			return;
		}

		const familyData = {
			full_name,
			dob: selectedDate,
			relation_id: relationId,
			rasi_id: rasiId,
			gothram: gotram,
			nakshatram,
			description: notes,
			family_type: sevafamilytype,
		}

		try {
			const response = await axios.post(`${api}/api/myfamily`, familyData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			)

			if (response.data.success === 1) {
				const newFamilyMember = {
					...response.data.data,
					selected: true
				}

				setFamilyDatacart((prevFamilyDatacart) => {
					const copy = JSON.parse(JSON.stringify(prevFamilyDatacart))
					const addedfamily = [...copy, newFamilyMember]
					return addedfamily
				})

				setFamilyCheck(prev => {
					const copy = prev
					copy.push(response.data.data.id)
					return [...copy]
				})

				setDontKnow((prev) => prev + 1)
				setFull_name("")
				setSelectedDate(null)
				setRelationId("")
				setRasiId("")
				setGotram("")
				setNakshatram("")
				setNotes("")
				handleCloseAddAddressModal()
			} else {
				console.error("Error saving family data:", response.data.message)
			}
		} catch (error) {
			console.error("Error saving family data:", error)
		}
	}

	useEffect(() => {
		fetchRasiData()
		fetchrelationData()
	}, [])

	useEffect(() => {
		fetchData()
	}, [familyEditedRefresh])

	useEffect(() => {
		if (profiledata) {
			setFirstName(profiledata.fname || "")

			setEmail(profiledata.email || "")

			setPhone(profiledata.mobile_number || "")
		}
	}, [profiledata])

	useEffect(() => {
		fetchProfileData()
	}, [triggerRefresh])

	return (
		<div className="check-out-panel">
			<div className="chech-box-panel-main">
				<Accordion defaultExpanded>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<div className="add-family-content">
							<h5>Add {sevafamilytype == 'self' ? "Family" : sevafamilytype} Details</h5>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						{dontKnow &&
							Array.isArray(familydatacart) &&
							familydatacart.length > 0 ? (
							familydatacart
								.filter((familyMember) => {
									if (sevafamilytype === null || sevafamilytype === "") {
										return true
									}
									return sevafamilytype == familyMember.family_type
								})
								.map((familyMember) => {

									return (
										<Typography className="menu-icon" key={familyMember.id}>
											<div className="chechout-checkbox-details">
												<div className="checkout-label-details">
													<Checkbox
														checked={familyMember.selected}
														onChange={() => handleChange(familyMember)}
													/>
													<p>
														<span>{familyMember.full_name}</span>{" "}
														<span>{familyMember.family_type}</span>{" "}
														{familyMember.relation &&
															`- ${familyMember.relation.name}`}
													</p>
												</div>
												<div className="chechout-checkbox-details-btn">
													<div className="edit-btn">
														<Button onClick={() => editFamilyHandler(familyMember)}>Edit</Button>
													</div>
												</div>
											</div>
										</Typography>
									)
								})
						) : (
							<Typography>No data available</Typography>
						)}
					</AccordionDetails>
				</Accordion>
			</div>
			<EditFamilyDetails open={editFamilyModal} onClose={closeEditFamilyModal} data={familyMemberData} setFamilyEditedRefresh={setFamilyEditedRefresh} />
			<div className="add-new-address app-new-address-2">
				{sevafamilytype && sevafamilytype !== "kartha_ancestors" && <Button
					disableRipple
					disableElevation
					onClick={() => setAddAddressModalOpen(true)}
				>
					<span>
						<AddIcon />
					</span>
					Add {sevafamilytype == 'self' ? "Family" : sevafamilytype}
				</Button>}
			</div>
			<Dialog
				open={isAddAddressModalOpen}
				onClose={handleCloseAddAddressModal}
				fullWidth
				maxWidth="md"
			>
				<DialogContent style={{ padding: "20px" }}>
					<div>
						<div>
							{/* <Typography variant="h6">Family Details</Typography> */}
							<div>
								<div>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={12} md={6} lg={12} xl={6}>
											<div className="myfamily-forms-1">
												<FormLabel>
													Full Name<span style={{ color: 'red' }}>*</span>
												</FormLabel>
												<TextField
													id="fullName"
													name="full_name"
													value={full_name}
													required
													onChange={(e) => setFull_name(e.target.value)}
													error={fieldErrors.full_name}
												/>
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="myfamily-forms-1">
												<FormLabel>DOB</FormLabel>
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<DatePicker
														maxDate={dayjs()}
														type="date"
														id="datepicker"
														value={selectedDate}
														onChange={handleDateChange}
														label=""
														// maxDate={maxDate}
														// // You can also provide a custom error message when the date is beyond the maxDate
														// maxDateMessage="Date cannot be in the future"
														renderInput={(params) => (
															<TextField {...params} type="date" I />
														)}
														autoFocus={true}
													/>
												</LocalizationProvider>
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="myfamily-forms-2">
												<FormLabel>Relation</FormLabel>
												<Select
													id="nakshatram"
													name="Relation"
													value={relationId}
													onChange={(e) => setRelationId(e.target.value)}
												>
													<MenuItem disabled value="">
														Select your Relation
													</MenuItem>
													{Array.isArray(relationOptions) &&
														relationOptions.map((option, index) => {
															return (
																<MenuItem key={option.id} value={option.id}>
																	{option.name}
																</MenuItem>
															)
														})}
												</Select>
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="myfamily-forms-1">
												<FormLabel>Gotram</FormLabel>
												<TextField
													id="gotram"
													name="gotram"
													value={gotram}
													onChange={(e) => setGotram(e.target.value)}
												/>
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="myfamily-forms-2">
												<FormLabel>Nakshatram</FormLabel>
												<Select
													id="nakshatram"
													name="nakshatram"
													value={nakshatram}
													onChange={(e) => setNakshatram(e.target.value)}
												>
													<MenuItem disabled value="">
														Select your Nakshatram
													</MenuItem>
													<MenuItem value={"Aswini/Aswathi Nakshatra"}>
														Aswini/Aswathi Nakshatra
													</MenuItem>
													<MenuItem value={"Bharani/Bharani Nakshatra"}>
														Bharani/Bharani Nakshatra
													</MenuItem>
													<MenuItem
														value={"Krithika/Karthigai/Kaarthika Nakshatra"}
													>
														Krithika/Karthigai/Kaarthika Nakshatra
													</MenuItem>
													<MenuItem value={"Rohini Nakshatra"}>
														Rohini Nakshatra
													</MenuItem>
													<MenuItem
														value={
															"Mrigashiras/Mrigasheersham/Makeeryam Nakshatra"
														}
													>
														Mrigashiras/Mrigasheersham/Makeeryam Nakshatra
													</MenuItem>
													<MenuItem
														value={"Aardhra/Arudra/Thiruvaathirai Nakshatra"}
													>
														Aardhra/Arudra/Thiruvaathirai Nakshatra
													</MenuItem>
													<MenuItem
														value={"Punarvasu/Punarpoosam/Punartham Nakshatra"}
													>
														Punarvasu/Punarpoosam/Punartham Nakshatra
													</MenuItem>
													<MenuItem value={"Pushyami/Poosam/Pooyyam Nakshatra"}>
														Pushyami/Poosam/Pooyyam Nakshatra
													</MenuItem>
													<MenuItem value={"Ashlesha/Aayilyam Nakshatra"}>
														Ashlesha/Aayilyam Nakshatra
													</MenuItem>
													<MenuItem value={"Magha/Makha/Makham Nakshatra"}>
														Magha/Makha/Makham Nakshatra
													</MenuItem>
													<MenuItem
														value={"PoorvaPhalguni/Pubba/Pooram Nakshatra"}
													>
														PoorvaPhalguni/Pubba/Pooram Nakshatra
													</MenuItem>
													<MenuItem value={"Uthraphalguni/Uttaram Nakshatra"}>
														Uthraphalguni/Uttaram Nakshatra
													</MenuItem>
													<MenuItem value={"Hastha/Hastham/Aastha Nakshatra"}>
														Hastha/Hastham/Aastha Nakshatra
													</MenuItem>
													<MenuItem value={"Chitra/Chithirai Nakshatra"}>
														Chitra/Chithirai Nakshatra
													</MenuItem>
													<MenuItem value={"Swathi Nakshatra"}>
														Swathi Nakshatra
													</MenuItem>
													<MenuItem value={"Vishakha/Visaakam Nakshatra"}>
														Vishakha/Visaakam Nakshatra
													</MenuItem>
													<MenuItem
														value={"Anuradha/Anusham/Anizham Nakshatra"}
													>
														Anuradha/Anusham/Anizham Nakshatra
													</MenuItem>
													<MenuItem
														value={"Jyeshta/Kettai/Thrikketta Nakshatra"}
													>
														Jyeshta/Kettai/Thrikketta Nakshatra
													</MenuItem>
													<MenuItem value={"Moola/Moolam Nakshatra"}>
														Moola/Moolam Nakshatra
													</MenuItem>
													<MenuItem value={"Poorvashaada/Pooraadam Nakshatra"}>
														Poorvashaada/Pooraadam Nakshatra
													</MenuItem>
													<MenuItem
														value={"U.Shada/Uthrashaada/Uthiraadam Nakshatra"}
													>
														U.Shada/Uthrashaada/Uthiraadam Nakshatra
													</MenuItem>
													<MenuItem value={"Shravan/Thiruvonam Nakshatra"}>
														Shravan/Thiruvonam Nakshatra
													</MenuItem>
													<MenuItem value={"Dhanishta/Avittam Nakshatra"}>
														Dhanishta/Avittam Nakshatra Nakshatra
													</MenuItem>
													<MenuItem
														value={"Shathabhisha/Chathayam/Sadayam Nakshatra"}
													>
														Shathabhisha/Chathayam/Sadayam Nakshatra
													</MenuItem>
													<MenuItem
														value={"Poorvabhadra/Poorattadhi Nakshatra"}
													>
														Poorvabhadra/Poorattadhi Nakshatra
													</MenuItem>
													<MenuItem
														value={"Uthrabhadra/Uthirattathi Nakshatra"}
													>
														Uthrabhadra/Uthirattathi Nakshatra
													</MenuItem>
													<MenuItem value={"Revathi Nakshatra"}>
														Revathi Nakshatra
													</MenuItem>
													<MenuItem value={"Not Sure "}>Not Sure</MenuItem>
												</Select>
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="myfamily-forms-2">
												<FormLabel>Rasi</FormLabel>
												<Select
													id="nakshatram"
													name="nakshatram"
													value={rasiId}
													onChange={(e) => setRasiId(e.target.value)}
												>
													<MenuItem disabled value="">
														Select your Rasi
													</MenuItem>
													{Array.isArray(rasiOptions) &&
														rasiOptions.map((option, index) => {
															return (
																<MenuItem key={index} value={option.id}>
																	{option.name}
																</MenuItem>
															)
														})}
												</Select>
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={12} xl={12}>
											<div className="myfamily-forms-1">
												<FormLabel>Notes</FormLabel>
												<TextField
													id="notes"
													name="notes"
													value={notes}
													onChange={(e) => setNotes(e.target.value)}
													placeholder="Write something which will reflect in Profile Screen"
													multiline
													rows={5}
													maxRows={5}
												/>
											</div>
										</Grid>
									</Grid>
								</div>
								<div className="myfamily-forms-btn">
									{/* <Button>Reset</Button> */}
									<Button onClick={handleSaveProfile}>Save Profile</Button>
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<div className="chech-box-panel-main chech-box-panel-main-2">
				<Accordion defaultExpanded>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<div className="add-family-content">
							<h5>Add my Details</h5>
							<div className="user-details">
								<span>{profiledata ? profiledata.fname : "null"}</span>
							</div>
						</div>
					</AccordionSummary>
					<AccordionDetails className="_8dah">
						<span>{profileData ? profileData.mobile_number : "null"}</span>
						<div className="chechout-checkbox-details">
							<div className="checkout-label-details checkout-label-details-2">
								<Button onClick={handleClickOpen}>
									<span>
										<AddIcon />
									</span>{" "}
									Edit Profile
								</Button>
							</div>
							<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
								<DialogContent style={{ padding: "20px" }}>
									<div>
										<div>
											<Typography variant="h6">Profile Details</Typography>
											<div>
												<div>
													<Grid container spacing={2}>
														<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
															<div className="myfamily-forms-1">
																<FormLabel>Full Name</FormLabel>
																{isEditing ? (
																	<TextField
																		type="text"
																		id="fname"
																		value={firstName}
																		onChange={(e) =>
																			setFirstName(e.target.value)
																		}
																	/>
																) : (
																	<TextField
																		type="text"
																		id="fname"
																		value={firstName}
																	/>
																)}
															</div>
														</Grid>
														<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
															<div className="myfamily-forms-1">
																<FormLabel>Phone Number</FormLabel>
																<TextField
																	type="text"
																	id="phone"
																	value={phone}
																	disabled={!isEditing}
																/>
															</div>
														</Grid>
														<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
															<div className="myfamily-forms-1">
																<FormLabel>Email</FormLabel>
																{isEditing ? (
																	<TextField
																		type="text"
																		id="email"
																		value={email}
																		onChange={(e) => setEmail(e.target.value)}
																		error={emailError.email}
																	/>
																) : (
																	<TextField
																		type="text"
																		id="lname"
																		value={email}
																	/>
																)}
															</div>
														</Grid>
													</Grid>
												</div>
												<div className="myfamily-forms-btn">
													<Button onClick={saveProfileData}>Save</Button>
												</div>
											</div>
										</div>
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</AccordionDetails>
				</Accordion>
				<Typography className="menu-icon"></Typography>
			</div>
			<ToastContainer />
		</div>
	)
}
