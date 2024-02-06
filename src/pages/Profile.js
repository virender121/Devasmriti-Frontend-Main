import { Button, Container } from "@mui/material";

import Header from "../components/common/Header";

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';

import footerlogo from '../images/devasmriti-logo.svg';

import profile from '../images/profile/profile.svg'

import Datepicker from "../components/common/CustomDatepicker.jsx";

import footerbg from '../images/footer-bg.svg'

import { Link } from "react-router-dom";

import BasicAccordion2 from "../components/common/Accordion2";

import { useEffect, useState } from "react";

import instance, { noauthinstance } from "../utils/Api";
import Footer from "./Footer";
import { Email } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import api from "../config/backend.js";
import axios from 'axios';
import ProfileSidebar from "../components/ProfileSidebar.jsx";
import { AiFillEdit } from "react-icons/ai";




function Profile() {
    const token = localStorage.getItem("token")
    const ns = "app-page-home";

    const Item = styled(Paper)(({ theme }) => ({

        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',

        ...theme.typography.body2,

        padding: theme.spacing(1),

        textAlign: 'center',

        color: theme.palette.text.secondary,

    }));



    const [profiledata, setProfiledata] = useState([])

    const [error, setError] = useState("")

    const [cancle, setCancle] = useState(false)

    // console.log(profiledata)

    const [profilePictureData, setProfilePictureData] = useState(null);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`${api}/api/user/profile`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'paginate': '0',
                }
              });
            // console.log("Profile Data Response:", response.data);
            const name = response.data.data.fname;
            localStorage.setItem('name', name || ''); 
            const number = response.data.data.mobile_number;
            localStorage.setItem('number', number);
            setProfiledata(response.data.data);
            if (response.data.data.image) {
                setProfilePictureData(response.data.data.image);
            }
        } catch (err) {
            setError(err);
        }
    };




    const [isEditing, setIsEditing] = useState(false);

    const [firstName, setFirstName] = useState("");

    // const [lastName, setLastName] = useState("");

    const [phone, setPhone] = useState("");

    const [email, setEmail] = useState("")

    const [isSaving, setIsSaving] = useState(false);

    const name = localStorage.getItem("name")
    const number = localStorage.getItem("number")

    useEffect(() => {

        if (profiledata) {

            setFirstName(profiledata.fname || "");

            setEmail(profiledata.email || "");

            setPhone(profiledata.mobile_number || "");

        }



    }, [profiledata, cancle]);



    useEffect(() => {

        fetchProfileData()

    }, [])





    const handleEditClick = () => {
        setCancle(prev => !prev)
        setIsEditing(!isEditing);
        setProfilePic("");
        setProfilePicUrl();

    };

    const uploadProfilePicture = async (formData) => {
        try {
            const { data } = await axios.post(`${api}/api/user/profile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
                
            });
            
            if (data.success === 1){
                // console.log(data)
                const response = await axios.put(`${api}/api/user/profile`, 
                    {
                    "profile_pic_id": data.data.id
                    },  {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }});
                if (response.status === 200) {
                    setProfiledata(response.data.data);
                    if (response.data.data.image) {
                        setProfilePictureData(response.data.data.image);
                    }
                }
            }

            
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    const [profilepic, setProfilePic] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState();

    const handleProfilePictureChange = () => {
        const selectedFile = profilepic
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            uploadProfilePicture(formData);
        }
    };

    const fetchProfilePicture = async () => {
        try {
            const response = await axios.get(`${api}/api/user/profile`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'paginate': '0',
                }
              });
            if (response.data.data.image) {
                setProfilePictureData(response.data.data.image);
            }
        } catch (error) {
            console.error("Error fetching profile picture data:", error);
        }
    };

    useEffect(() => {
        fetchProfilePicture();
    }, []);



    const saveProfileData = async () => {
        
        handleProfilePictureChange();
        console.log("Save button clicked");
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

        if (email && !emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!firstName.match(nameRegex)) {
            toast.error("Name should contain only alphabets and spaces");
            return;
          }
        try {
            setIsSaving(true);
            const updatedProfileData = {
                fname: firstName,
                // lname: lastName,
                mobile_number: phone,
                email,
                // profile_pic_id: profilePictureData.id,
            };
            const response = await axios.put(`${api}/api/user/profile`, updatedProfileData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
            // console.log("API Response:", response.data);
            if (response.status === 200) {
                setProfiledata(response.data.data);
                setIsEditing(false);

            } else {
                console.error("Failed to update profile data");
            }
        } catch (error) {
            console.error("Failed to update profile data:", error);
        } finally {
            setIsSaving(false);
        }
    };




    return (

        <>

            <div className={`${ns}`}>
                <div className={`${ns}__header`}>
                    <Header />
                </div>

                <div className="profile">
                    <div className="profile-container">

                        <div className="profile-content">

                            <ProfileSidebar profiledata={profiledata}/>

                            <div className="profile-information">

                            <h2>Namaskaram {name !== null && name !== '' ? name : ''}</h2>



                                <div className="profile-information-box">

                                    <div className="personal-information">

                                        <div className="personal-information-content">

                                            <h2> Personal Information</h2>

                                        </div>

                                        <div className="edit-btn">

                                            {isEditing ? (

                                                <>

                                                    <Button className="save"

                                                        onClick={saveProfileData}

                                                        disabled={isSaving}

                                                    >

                                                        {isSaving ? "Saving..." : "Save"}

                                                    </Button>

                                                    <Button className="cancel" onClick={handleEditClick}>Cancel</Button>

                                                </>

                                            ) : (

                                                <Button onClick={handleEditClick}>Edit</Button>

                                            )}

                                        </div>

                                    </div>

                                    <div className="personal-information-form">
                                    <div item alignItems="center" style={{display:"flex", justifyContent:"center", position:"relative"}}>
                                                <label htmlFor="profile-picture">
                                                    {/* <p className={isEditing ? "img-edit": "img-edit-f"} style={{position:"absolute",borderRadius:"50%",width:"200px", height:"200px", top:"0px" }}><span style={{position:"absolute", top:"50px", left:"35px", fontSize:"25px"}}>Edit</span></p> */}
                                                    <div style={{ position: "relative" }} className={isEditing ? "img-edit": undefined}>
                                                        <img
                                                            src={profilePictureData ? (profilePicUrl ? profilePicUrl : `${profilePictureData.domain}${profilePictureData.url}`): "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                                                            alt="Profile"
                                                            style={{border: isEditing ?"solid #ff5b00 2px":"solid #686868 0.5px",borderRadius:"50%", objectFit:'cover',width:"150px", height:"150px"}}
                                                        />
                                                        {isEditing &&
                                                        <div style={{ position: "absolute", padding:"3px 5px", right: "8px", bottom: "18px", borderRadius:"50%", backgroundColor:"#ff5b00", color:"white" }}>
                                                            <AiFillEdit />
                                                        </div> 
                                                        }
                                                    </div>  
                                                </label>
                                                {isEditing && 
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="profile-picture"
                                                    style={{ display: "none" }}
                                                    onChange={(event) => {setProfilePic(event.target.files[0]); 
                                                        let fileReader = new FileReader();
                                                        fileReader.onload = (e) => {
                                                            const { result } = e.target;
                                                            setProfilePicUrl(result)
                                                            
                                                        }
                                                        fileReader.readAsDataURL(event.target.files[0]);
                                                    }}
                                                />
                                            }
                                        </div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                                                <div className="form-group">

                                                    <label>Name</label>

                                                    {isEditing ? (

                                                        <input

                                                            type="text"

                                                            id="fname"

                                                            value={firstName}

                                                            onChange={(e) => setFirstName(e.target.value)}
                                                           

                                                        />

                                                    ) : (



                                                        <input type="text"

                                                            id="fname"

                                                            value={firstName}
                                                            readOnly={!isEditing}
                                                        />

                                                    )}

                                                </div>

                                            </Grid>

                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                                                <div className="form-group">

                                                    <label>Email</label>

                                                    {isEditing ? (

                                                        <input

                                                            type="text"

                                                            id="email"

                                                            value={email}

                                                            onChange={(e) => setEmail(e.target.value)}

                                                        />

                                                    ) : (

                                                        <input type="text"

                                                            id="lname"

                                                            value={email}
                                                            readOnly={!isEditing}
                                                        />

                                                    )}

                                                </div>

                                            </Grid>

                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                                                <div className="form-group">

                                                    <label>Phone</label>

                                                    {isEditing ? (

                                                        <input

                                                            type="text"

                                                            id="phone"

                                                            value={phone}

                                                            // onChange={(e) => setPhone(e.target.value)}

                                                        />

                                                    ) : (

                                                        <input type="text"

                                                            id="phone"

                                                            value={phone}
                                                            readOnly={!isEditing}
                                                        />

                                                    )}

                                                </div>

                                            </Grid>

                                        </Grid>

                                    </div>

                                </div>

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



export default Profile;