import React, { useEffect, useState } from 'react';
import { Button, Container, FormLabel, MenuItem, Select, Typography } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import footerlogo from '../images/devasmriti-logo.svg';
import profile from '../images/profile/profile.svg'
import footerbg from '../images/footer-bg.svg';
import eclipse from '../images/profile/god.svg';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import BasicAccordion2 from "../components/common/Accordion2";
import Footer from './Footer';
import instance from '../utils/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import api from '../config/backend';
import axios from 'axios';
import ProfileSidebar from '../components/ProfileSidebar';



function Address() {
    const token = localStorage.getItem("token")
    const ns = "app-page-home";
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const name = localStorage.getItem("name")
    const number = localStorage.getItem("number")
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

    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [cityData, setCityData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [citiesInSelectedState, setCitiesInSelectedState] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [addressNameOptions, setAddressNameOptions] = useState([
        { id: 'home', name: 'Home' },
        { id: 'office', name: 'Office' },
        { id: 'other', name: 'Other' },
    ]);

    const [otherAddressName, setOtherAddressName] = useState('');

    const handleAddressNameChange = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue === 'other') {
            // If "Other" is chosen, reset otherAddressName
            setOtherAddressName('');
        }

        setAddressName(selectedValue);
    };
    const [editedData, setEditedData] = useState({
        id: null,
        fname: "",
        lname: "",
        email: "",
        phone_no: "",
        whatsup_no: "",
        country_id: "",
        state_id: "",
        city_id: "",
        address_1: '',
        address_2: "",
        pincode: "",
        address_name: "",
    });
    const [profiledata, setProfiledata] = useState([])

    const [error, setError] = useState("")

    // console.log(profiledata)

    const fetchProfileData = async () => {

        try {

            const response = await axios.get(`${api}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'paginate': '0',
                }
            });
            const name = response.data.data.fname;
            localStorage.setItem('name', name || '');
            // console.log("7777", response.data.data)

            setProfiledata(response.data.data);

        } catch (err) {

            setError(err);

            console.log(err)

        }

    };
    useEffect(() => {
        fetchProfileData();
    }, [])


    const startEdit = (data) => {
        // console.log("===========>>>>", data)
        setEditedData({
            id: data.id,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            phone_no: data.phone_no,
            whatsup_no: data.whatsup_no,
            country_id: data.country_id,
            state_id: data.state_id,
            city_id: data.city_id,
            address_1: data.address_1,
            address_2: data.address_2,
            pincode: data.pincode,
            address_name: data.address_name,
        });
        setEditMode(true);
    };



    const handleEditAddress = async () => {
        console.log({ phone_no: editedData.phone_no })
        if (editedData.phone_no.length !== 10) {
            toast.error("Phone number should be 10 digits");
            return;
        }
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

        if (!emailRegex.test(editedData.email)) {
            toast.error("Please enter a valid email address");
            return;

        }
        if (editedData.whatsup_no.length != 10) {
            toast.error("Whatsup number should be 10 digits")
            return
        }
        if (!editedData.address_1) {
            toast.error("Please enter a address_1")
            return
        }
        if (!editedData.address_2) {
            toast.error("Please enter a address_2")
            return
        }

        if (!editedData.state_id) {
            toast.error("Please select a state")
            return
        }
        if (!editedData.city_id) {
            toast.error("Please select a city ")
            return
        }
        if (!editedData.pincode) {
            toast.error("Please enter the pincode")
            return
        }
        if (!editedData.address_name) {
            toast.error("Please enter the address name")
            return
        }
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!editedData.fname.match(nameRegex)) {
            toast.error("First name should contain only alphabets and spaces");
            return;
        }


        const Regex = /^[a-zA-Z\s]+$/;
        if (editedData.lname.trim() !== "" && !editedData.lname.match(Regex)) {
            toast.error("Last name should contain only alphabets and spaces");
            return;
        }
        try {
            // Prepare the edited data for the PUT request
            const putData = {
                id: editedData.id,
                fname: editedData.fname,
                lname: editedData.lname,
                email: editedData.email,
                phone_no: editedData.phone_no,
                whatsup_no: editedData.whatsup_no,
                country_id: editedData.country_id,
                state_id: editedData.state_id,
                city_id: editedData.city_id,
                address_1: editedData.address_1,
                address_2: editedData.address_2,
                pincode: editedData.pincode,
                address_name: editedData.address_name,
            };

            const response = await axios.put(`${api}/api/address/${editedData.id}`, putData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Address updated successfully:', response.data);

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
            setEditMode(false);
            fetchData()
        } catch (error) {
            console.error('Error updating address:', error);
        }
    }




    const toggleForm = () => {
        setShowForm(!showForm);
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
        //     console.log({phone_no: phone_no})
        //     if (phone_no.length !== 10) {
        //         toast.error("Phone number should be 10 digits");
        //         return;
        //       }
        // const nameRegex = /^[a-zA-Z\s]+$/;
        // if (!fname.match(nameRegex)) {
        // toast.error("First name should contain only alphabets and spaces");
        //  return;
        //       }

        // const Regex = /^[a-zA-Z\s]+$/;
        // if (lname.trim() !== "" &&!lname.match(Regex)) {
        // toast.error("Last name should contain only alphabets and spaces");
        //  return;
        //       }

        // const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

        // if (!emailRegex.test(email)) {
        //     toast.error("Please enter a valid email address");
        //     return;
        // }
        // if (whatsup_no.length != 10) {
        //     toast.error("Whatsup number should be 10 digits")
        //     return
        //   }
        //   if (!address_1) {
        //     toast.error("Please enter a address_1")
        //     return
        //   }
        //   if (!address_2) {
        //     toast.error("Please enter a address_2")
        //     return
        //   }

        //   if (!selectedState) {
        //     toast.error("Please select the state")
        //     return
        //   }
        //   if (!selectedCity) {
        //     toast.error("Please select the city")
        //     return
        //   }
        //   if (!pincode) {
        //     toast.error("Please enter the pincode")
        //     return
        //   }
        //   if (!address_name) {
        //     toast.error("Please enter the address name")
        //     return
        //   }

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
            };
            const response = await axios.post(`${api}/api/address`, postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            //   console.log(response.status)
            // if(response.status === 400){
            //     toast.error(response.data.message)
            // }
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
            fetchData();
            setSelectedCity("");
            setSelectedState("");
            // handleCloseAddAddressModal()
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
            toggleForm()
        } catch (error) {
            console.error('Error saving address:', error);
            toast.error(error.response.data.message)
        }

    };


    const [apiData, setApiData] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`${api}/api/address`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'paginate': '0',
                }
            });
            // console.log(response.data.data.data)
            setApiData(response.data.data.data);
        } catch (error) {
            console.error('Error fetching data from the API:', error);
        }
    };




    const handleDeleteAddress = async (addressId) => {
        try {

            const response = await axios.delete(`${api}/api/address/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Address deleted successfully:', response.data);

            setApiData(apiData.filter(data => data.id !== addressId));
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };






    const fetchCityData = async () => {
        try {
            const response = await axios.get(`${api}/api/city`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'paginate': '0',
                }
            });
            if (response.status === 200) {
                const responseData = response.data;
                if (responseData.success === 1) {
                    const citiesData = responseData.data.data;
                    setCityData(citiesData)
                    // console.log('City Data:', citiesData);
                } else {
                    console.error('API Error:', responseData.message);
                }
            } else {
                console.error('API Error: Unexpected status code', response.status);
            }
        } catch (error) {
            console.error('API Error:', error.message);
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
                    console.error('API Error:', responseData.message);
                }
            } else {
                console.error('API Error: Unexpected status code', response.status);
            }
        } catch (error) {
            console.error('API Error:', error.message);
        }
    };

    useEffect(() => {
        fetchCityData()
        fetchStateData()
        fetchData();
    }, [])

    useEffect(() => {
        if (selectedState) {
            const cities = cityData.filter((city) => city.state_id === selectedState);
            setCitiesInSelectedState(cities);
        }
    }, [selectedState, cityData]);

    // const handleCitySelection = (cityId) => {
    //     console.log(`Selected city ID: ${cityId}`);
    //     // Find the selected city data based on cityId and update the selectedCity state
    //     const city = cityData.find((city) => city.id === cityId);

    //     setSelectedCity(city);
    // };



    return (
        <>
            <div className={`${ns}`}>
                <div className={`${ns}__header`}>
                    <Header />
                </div>
                <div className="profile">
                    <div className="profile-container">
                        <div className="profile-content">
                            <ProfileSidebar profiledata={profiledata} />
                            <div className="profile-information">
                                <h2 className="abhishek-title">Namaskaram {name !== null ? name : number}</h2>
                                {editMode ? (
                                    <div className="profile-information-box">
                                        <div className='billing-box'>
                                            <Typography variant='h6'>Address Details</Typography>
                                            <div className='billing-forms'>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>First Name<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <TextField id="name"
                                                                // placeholder="Akash"
                                                                value={editedData.fname}
                                                                onChange={(e) => setEditedData({ ...editedData, fname: e.target.value })}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>Last Name</FormLabel>
                                                            <TextField
                                                                id="name"
                                                                value={editedData.lname}
                                                                onChange={(e) => setEditedData({ ...editedData, lname: e.target.value })}
                                                            // placeholder="Gupta" 
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>Phone No<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <TextField value={editedData.phone_no}
                                                                onChange={(e) => {
                                                                    if (isNaN(e.target.value) === false) {
                                                                        setEditedData({ ...editedData, phone_no: e.target.value })
                                                                    }

                                                                }
                                                                }

                                                                id="outlined-number" type="tel"
                                                                //  placeholder="+91 82107 16196" 
                                                                InputLabelProps={{ shrink: true, }} required />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>Email ID <span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <TextField value={editedData.email}
                                                                onChange={(e) =>
                                                                    setEditedData({ ...editedData, email: e.target.value })
                                                                } id="email"
                                                            //  placeholder="akashgupta@gmail.com" 
                                                            />


                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={12} xl={12}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>Address Line 1<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <TextField value={editedData.address_1}
                                                                onChange={(e) =>
                                                                    setEditedData({ ...editedData, address_1: e.target.value })
                                                                } id="demo-helper-text-aligned"
                                                            // placeholder="KPHB Phase 1, Kukatpally, Hyderabad" 
                                                            />

                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={12} xl={12}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>Address Line 2</FormLabel>
                                                            <TextField value={editedData.address_2}
                                                                onChange={(e) =>
                                                                    setEditedData({ ...editedData, address_2: e.target.value })
                                                                }
                                                                id="demo-helper-text-aligned"
                                                            // placeholder="KPHB Phase 1, Kukatpally, Hyderabad" 
                                                            />

                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-2">
                                                            <FormLabel>State<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <Select
                                                                id="state"
                                                                value={editedData.state_id}
                                                                onChange={(e) =>
                                                                    setEditedData({ ...editedData, state_id: e.target.value })
                                                                }
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
                                                            {/* <Select
                                                                value={editedData.city_id}
                                                                onChange={(e) =>
                                                                    setEditedData({ ...editedData, city_id: e.target.value })
                                                                }
                                                                id="city">
                                                                <MenuItem disabled value="">Select ur city</MenuItem>
                                                                {citiesInSelectedState.map((city) => (
                                                                    <MenuItem key={city.id} value={city.id}>
                                                                        {city.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select> */}
                                                            <TextField value={editedData.city_id ?
                                                                cityData.find(city => city.id === editedData.city_id)?.name : ""}
                                                                onChange={(e) => {
                                                                    setEditedData({ ...editedData, city_id: e.target.value })
                                                                    console.log(e.target.value)
                                                                }
                                                                } id="city" placeholder="city" />

                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>Pin Code<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <TextField value={editedData.pincode}
                                                                onChange={(e) =>
                                                                    setEditedData({ ...editedData, pincode: e.target.value })
                                                                } id="number" placeholder="500072" />

                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>Whatsapp No<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <TextField value={editedData.whatsup_no}
                                                                onChange={(e) => {
                                                                    if (isNaN(e.target.value) === false) {
                                                                        setEditedData({ ...editedData, whatsup_no: e.target.value })
                                                                    }

                                                                }


                                                                }
                                                                id="tel"
                                                            //  placeholder="+91 82107 16196"
                                                            />

                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className='myfamily-forms-btn'>
                                                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                                                <Button onClick={handleEditAddress}>Save Address</Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            apiData && apiData.map((item, index) => {
                                                console.log("=============>", item)
                                                return (
                                                    <div className='profile-information-box' key={index}>
                                                        <div className="personal-information">
                                                            <div className="personal-information-content personal-information-content-2">
                                                                {/* <img src={eclipse} /> */}
                                                                <h2>{item.fname} {item.lname} </h2>
                                                            </div>
                                                            <div className="edit-btn">
                                                                <Button onClick={() => handleDeleteAddress(item.id)}>Delete</Button>
                                                                <Button onClick={() => startEdit(item)}>Edit</Button>
                                                            </div>
                                                        </div>
                                                        <div className='relation-content'>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>First Name</h5>
                                                                        <p>{item.fname}</p>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>Last Name</h5>
                                                                        <p>{item.lname}</p>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>Phone No</h5>
                                                                        <p>{item.phone_no}</p>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>Email ID</h5>
                                                                        <p>{item.email}</p>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>Address Line 1</h5>
                                                                        <p>{item.address_1}</p>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>Address Line 2</h5>
                                                                        <p>{item.address_2}</p>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                        <div className='relation-content'>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>State</h5>
                                                                        <p>{item.state.name}</p>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>City</h5>
                                                                        {item.city ? <p>{item.city.name}</p> : <p></p>}
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                                                                    <div className='relation'>
                                                                        <h5>PIN code</h5>
                                                                        <p>{item.pincode}</p>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                )}
                                <div className='addmore-btn-content'>
                                    <p>Add Address </p>
                                    <Button onClick={toggleForm}>Add<AddIcon /></Button>
                                </div>
                                {showForm && (
                                    <div className="profile-information-box">
                                        <div className='billing-box'>
                                            <Typography variant='h6'>Address Details</Typography>

                                            <div className='billing-forms'>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>First Name<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <TextField id="name"
                                                                // placeholder="Akash"
                                                                value={fname}
                                                                error={fieldErrors.fname}
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
                                                            <FormLabel>Phone No<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <TextField value={phone_no} onChange={(e) => setPhoneNo(e.target.value)} id="outlined-number" type="tel"
                                                                //  placeholder="+91 82107 16196"
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
                                                            //  placeholder="akashgupta@gmail.com"
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
                                                            // placeholder="KPHB Phase 1, Kukatpally, Hyderabad" 
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-2">
                                                            <FormLabel>State<span style={{ color: 'red' }}>*</span></FormLabel>
                                                            <Select
                                                                id="state"
                                                                value={selectedState}
                                                                onChange={(e) => setSelectedState(e.target.value)}
                                                                error={fieldErrors.selectedState}
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
                                                            {/* <MenuItem disabled value="">Select ur city</MenuItem>
                                                                {citiesInSelectedState.map((city) => (
                                                                    <MenuItem key={city.id} value={city.id}>
                                                                        {city.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField> */}
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
                                                                id="tel"
                                                            // placeholder="+91 82107 16196"
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className="myfamily-forms-1">
                                                            <FormLabel>Address Name<span style={{ color: 'red' }}>*</span></FormLabel>
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <ToastContainer />
            </div>
        </>
    )
}

export default Address;
