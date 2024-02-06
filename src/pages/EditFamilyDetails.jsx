import React, { useEffect } from 'react';
import { Button, Container, Dialog, DialogContent, FormLabel, Typography } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import footerlogo from '../images/devasmriti-logo.svg';
import profile from '../images/profile/profile.svg'
import footerbg from '../images/footer-bg.svg';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import eclipse from '../images/profile/god.svg';
import AddIcon from '@mui/icons-material/Add';
import CustomDatepicker from '../components/common/CustomDatepicker';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import BasicAccordion2 from "../components/common/Accordion2";
import Footer from './Footer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import instance from "../utils/Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios"
import api from '../config/backend';


export default function EditFamilyDetails({open, onClose, data, setFamilyEditedRefresh}) {
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

    const [full_name, setFull_name] = useState('');
    const [relationId, setRelationId] = useState('');
    const [gotram, setGotram] = useState('');
    const [nakshatram, setNakshatram] = useState('');
    const [rasiId, setRasiId] = useState('');
    const [notes, setNotes] = useState('');
    const [relationOptions, setRelationOptions] = useState([])
    const [rasiOptions, setRasiOptions] = useState([])
    const [nakshatramOptions, setNakshatramOptions] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    // const [family_type, setFamily_type] = useState("")
    dayjs.extend(customParseFormat);
    const handleDateChange = (date) => {
        const selectedDate = dayjs(date);
        const today = dayjs();
      
        // Check if the selected date is before today
        if (selectedDate.isBefore(today) || selectedDate.isSame(today, 'day')) {
          // Perform the desired action
          console.log('Selected date is on or before today:', selectedDate.format('YYYY-MM-DD'));
          // Update the state or perform any other logic
          setSelectedDate(selectedDate.format('YYYY-MM-DD'));
        } else {
          // Display an error or perform any other action for invalid dates
          alert('Invalid date. Please select a date on or before today.');
          setSelectedDate('');
        }
      };


    const [familyData, setFamilyData] = useState([])

    // console.log(familyData)


    const fetchFamilyData = async () => {
        try {
            const response = await axios.get(`${api}/api/myfamily`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'paginate': '0',
                }
              });
            if (response.status === 200) {
                setFamilyData(response.data.data.data);
            } else {
                console.error('Failed to fetch data from the API.');
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        }
    };


    useEffect(() => {
        fetchFamilyData()
    }, [])


    // const handleSaveProfile = async () => {

    //     const nameRegex = /^[a-zA-Z\s]+$/;
    //     if (!full_name.match(nameRegex)) {
    //         toast.error("Name should contain only alphabets and spaces");
    //         return;
    //       }
    //       const Regex = /^[a-zA-Z\s]+$/;
    //       if (gotram.trim() !== "" && !gotram.match(Regex)) {
    //           toast.error("Gotram should contain only alphabets and spaces");
    //           return;
    //         }
    //     const familyData = {
    //         full_name,
    //         dob: selectedDate,
    //         relation_id: relationId,
    //         rasi_id: rasiId,
    //         gothram: gotram,
    //         nakshatram,
    //         description: notes,
    //         family_type: "self"

    //     }

    //     try {

    //         const response = await axios.post(`${api}/api/myfamily`, familyData, {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //               'Content-Type': 'application/json'
    //             }
    //           });



    //         if (response.data.success === 1) {
    //             setFull_name('');
    //             setSelectedDate(null);
    //             setRelationId('');
    //             setRasiId('');
    //             setGotram('');
    //             setNakshatram('');
    //             setNotes('');
    //             fetchFamilyData()
    //         } else {

    //             console.error('Error saving family data:', response.data.message);
    //         }
    //     } catch (error) {

    //         console.error('Error saving family data:', error);
    //     }
    // };


    useEffect(() => {
        const fetchRasiData = async () => {
            try {
                const response = await axios.get(`${api}/api/rasi`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                      'paginate': '0',
                    }
                  });
                // console.log(response.data.data.data)
                if (response.status === 200) {
                    setRasiOptions(response.data.data.data);
                } else {
                    console.error('Failed to fetch data from the API.');
                }
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };

        fetchRasiData();
    }, []);

    useEffect(() => {
        const fetchNakshatramData = async () => {
            try {
                const response = await axios.get(`${api}/api/nakshatram`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                      'paginate': '0',
                    }
                  });
                if (response.status === 200) {
                    setNakshatramOptions(response.data.data.data);
                } else {
                    console.error('Failed to fetch data from the API.');
                }
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };

        fetchNakshatramData();
    }, []);

    useEffect(() => {
        const fetchrelationData = async () => {
            try {
                const response = await axios.get(`${api}/api/relation`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                      'paginate': '0',
                    }
                  });
                if (response.status === 200) {
                    setRelationOptions(response.data.data.data);
                } else {
                    console.error('Failed to fetch data from the API.');
                }
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };

        fetchrelationData();
    }, []);

    const [editedData, setEditedData] = useState({
        id: null,
        full_name: '',
        relationId: '',
        gotram: '',
        nakshatram: '',
        rasiId: '',
        notes: '',
        dob: "",
    });
    // console.log(editedData)


    useEffect(() => {
        if (data) {
            console.log({ data })
            setEditedData({
                id: data.id,
                dob: data.dob,
                full_name: data.full_name,
                relationId: data.relation_id,
                gotram: data.gothram !== null ? data.gothram : "",
                nakshatram: data.nakshatram,
                rasiId: data.rasi_id,
                notes: data.description,
            });
            setSelectedDate(data.dob)
        }
    
    }, [data])

    console.log({ editedData, selectedDate })

    const handleSaveEditedData = async () => {
        
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!editedData.full_name.match(nameRegex)) {
            toast.error("Name should contain only alphabets and spaces");
            return;
          }
          const Regex = /^[a-zA-Z\s]+$/;
          if (editedData.gotram.trim() !== "" && !editedData.gotram.match(Regex)) {
              toast.error("Gotram should contain only alphabets and spaces");
              return;
            }
        
        

        const editedFamilyData = {
            id: editedData.id,
            full_name: editedData.full_name,
            dob: editedData.selectedDate,
            relation_id: editedData.relationId,
            rasi_id: editedData.rasiId,
            gothram: editedData.gotram,
            nakshatram: editedData.nakshatram,
            description: editedData.notes,
        };


        try {
            const response = await axios.put(`${api}/api/myfamily/${editedData.id}`, editedFamilyData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
            if (response.data.success === 1) {
                onClose()
                setFamilyEditedRefresh(prev => prev + 1)
            } else {
                console.error('Error saving family data:', response.data.message);
            }
        } catch (error) {
            console.error('Error saving family data:', error);
        }
    };

    

    // const [showForm, setShowForm] = useState(false);

    // const toggleForm = () => {
    //     setShowForm(!showForm);
    // }


    
    const [profiledata, setProfiledata] = useState([])

    const [error, setError] = useState("")

    // console.log(profiledata)

    // const fetchProfileData = async () => {

    //     try {

    //         const response = await axios.get(`${api}/api/user/profile`, {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //               'Content-Type': 'application/json',
    //               'paginate': '0',
    //             }
    //           });
    //         const name = response.data.data.fname;
    //         localStorage.setItem('name', name || ''); 
    //         // console.log("7777", response.data.data)

    //         setProfiledata(response.data.data);

    //     } catch (err) {

    //         setError(err);

    //         console.log(err)

    //     }

    // };
    // useEffect(() => {
    //     fetchProfileData();
    // }, [])


    return (

<Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogContent style={{ padding: "20px" }}>
          <div>
            <div>
              {/* <Typography variant="h6">Family Details</Typography> */}
              <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className="myfamily-forms-1">
                            <FormLabel>Full Name<span style={{ color: 'red' }}>*</span></FormLabel>
                            <TextField
                                id="fullName"
                                name="full_name"
                                value={editedData.full_name}
                                onChange={(e) => setEditedData({ ...editedData, full_name: e.target.value })}
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
                                    value={dayjs(selectedDate)}
                                    onChange={handleDateChange}
                                    label=""
                                    renderInput={(params) => <TextField {...params} />}
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
                                value={editedData.relationId}
                                onChange={(e) => setEditedData({ ...editedData, relationId: e.target.value })}
                            >
                                <MenuItem disabled value="">Select your Relation</MenuItem>
                                {Array.isArray(relationOptions) && relationOptions.map((option, index) => {
                                    // console.log(option);
                                    return (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    );
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
                                value={editedData.gotram}
                                onChange={(e) => setEditedData({ ...editedData, gotram: e.target.value })}
                            />
                        </div>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="myfamily-forms-2">
                    <FormLabel>Nakshatram</FormLabel>
                    <Select
                        id="nakshatram"
                        name="nakshatram"
                        value={familyData.nakshatram}
                        onChange ={(e)=>setFull_name(e.target.value)}
                    >
                        <MenuItem value={102}>Select your Nakshatram</MenuItem>
                        {nakshatramOptions && nakshatramOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </Grid> */}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className="myfamily-forms-2">
                            <FormLabel>Nakshatram</FormLabel>
                            <Select
                                id="nakshatram"
                                name="nakshatram"
                                value={editedData.nakshatram}
                                onChange={(e) => setEditedData({ ...editedData, nakshatram: e.target.value })}
                            >
                                <MenuItem disabled value="" >Select your Nakshatram</MenuItem>
                                <MenuItem value={"Aswini/Aswathi Nakshatra"} >Aswini/Aswathi Nakshatra</MenuItem>
                                <MenuItem value={"Bharani/Bharani Nakshatra"}>Bharani/Bharani Nakshatra</MenuItem>
                                <MenuItem value={"Krithika/Karthigai/Kaarthika Nakshatra"}>Krithika/Karthigai/Kaarthika Nakshatra</MenuItem>
                                <MenuItem value={"Rohini Nakshatra"}>Rohini Nakshatra</MenuItem>
                                <MenuItem value={"Mrigashiras/Mrigasheersham/Makeeryam Nakshatra"}>Mrigashiras/Mrigasheersham/Makeeryam Nakshatra</MenuItem>
                                <MenuItem value={"Aardhra/Arudra/Thiruvaathirai Nakshatra"}>Aardhra/Arudra/Thiruvaathirai Nakshatra</MenuItem>
                                <MenuItem value={"Punarvasu/Punarpoosam/Punartham Nakshatra"}>Punarvasu/Punarpoosam/Punartham Nakshatra</MenuItem>
                                <MenuItem value={"Pushyami/Poosam/Pooyyam Nakshatra"}>Pushyami/Poosam/Pooyyam Nakshatra</MenuItem>
                                <MenuItem value={"Ashlesha/Aayilyam Nakshatra"}>Ashlesha/Aayilyam Nakshatra</MenuItem>
                                <MenuItem value={"Magha/Makha/Makham Nakshatra"}>Magha/Makha/Makham Nakshatra</MenuItem>
                                <MenuItem value={"PoorvaPhalguni/Pubba/Pooram Nakshatra"}>PoorvaPhalguni/Pubba/Pooram Nakshatra</MenuItem>
                                <MenuItem value={"Uthraphalguni/Uttaram Nakshatra"}>Uthraphalguni/Uttaram Nakshatra</MenuItem>
                                <MenuItem value={"Hastha/Hastham/Aastha Nakshatra"}>Hastha/Hastham/Aastha Nakshatra</MenuItem>
                                <MenuItem value={"Chitra/Chithirai Nakshatra"}>Chitra/Chithirai Nakshatra</MenuItem>
                                <MenuItem value={"Swathi Nakshatra"}>Swathi Nakshatra</MenuItem>
                                <MenuItem value={"Vishakha/Visaakam Nakshatra"}>Vishakha/Visaakam Nakshatra</MenuItem>
                                <MenuItem value={"Anuradha/Anusham/Anizham Nakshatra"}>Anuradha/Anusham/Anizham Nakshatra</MenuItem>
                                <MenuItem value={"Jyeshta/Kettai/Thrikketta Nakshatra"}>Jyeshta/Kettai/Thrikketta Nakshatra</MenuItem>
                                <MenuItem value={"Moola/Moolam Nakshatra"}>Moola/Moolam Nakshatra</MenuItem>
                                <MenuItem value={"Poorvashaada/Pooraadam Nakshatra"}>Poorvashaada/Pooraadam Nakshatra</MenuItem>
                                <MenuItem value={"U.Shada/Uthrashaada/Uthiraadam Nakshatra"}>U.Shada/Uthrashaada/Uthiraadam Nakshatra</MenuItem>
                                <MenuItem value={"Shravan/Thiruvonam Nakshatra"}>Shravan/Thiruvonam Nakshatra</MenuItem>
                                <MenuItem value={"Dhanishta/Avittam Nakshatra"}>Dhanishta/Avittam Nakshatra Nakshatra</MenuItem>
                                <MenuItem value={"Shathabhisha/Chathayam/Sadayam Nakshatra"}>Shathabhisha/Chathayam/Sadayam Nakshatra</MenuItem>
                                <MenuItem value={"Poorvabhadra/Poorattadhi Nakshatra"}>Poorvabhadra/Poorattadhi Nakshatra</MenuItem>
                                <MenuItem value={"Uthrabhadra/Uthirattathi Nakshatra"}>Uthrabhadra/Uthirattathi Nakshatra</MenuItem>
                                <MenuItem value={"Revathi Nakshatra"}>Revathi Nakshatra</MenuItem>
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
                                value={editedData.rasiId}
                                onChange={(e) => setEditedData({ ...editedData, rasiId: e.target.value })}
                            >
                                <MenuItem disabled value="">Select your Rasi</MenuItem>
                                {Array.isArray(rasiOptions) && rasiOptions.map((option, index) => {
                                    // console.log(option);
                                    return (
                                        <MenuItem key={index} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    );
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
                                value={editedData.notes}
                                onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                                placeholder="Write something which will reflect in Profile Screen"
                                multiline
                                rows={5}
                                maxRows={5}
                            />
                        </div>
                    </Grid>

                </Grid>

            <div className='myfamily-forms-btn'>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSaveEditedData}>Save</Button>
            </div>
        </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
                                    
                    

                            
    )
}
