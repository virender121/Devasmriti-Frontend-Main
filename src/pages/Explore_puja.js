import { Button, Container } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import om from "../images/banner/om-lg-left.svg";
import om2 from "../images/banner/om-sm-right.svg";
import Grid from "@mui/material/Grid";
import cloud from "../images/banner/cloud.svg";
import footerbg from "../images/footer-bg.svg";
import puja from "../images/explore-puja/puja.svg";
import annadham from "../images/explore-puja/annadanam.svg";
import gausea from "../images/explore-puja/gau-seva.svg";
import temple from "../images/explore-puja/temple-construction.svg";
import others from "../images/explore-puja/others.svg";
import durgamata from "../images/discover-more/durgamatha.svg";
import strip from "../images/discover-more/durgamatha-strip.svg";
// import CustomTabPanel from '../components/common/CustomTabPanel';
import footerlogo from "../images/devasmriti-logo.svg";
import { Link, useSearchParams } from "react-router-dom";
import instance from "../utils/Api";
import { useEffect, useState } from "react";
import Footer from "./Footer";

import api from "../config/backend";
import axios from "axios";

function Explore_puja() {
    const token = localStorage.getItem("token");
    const ns = "app-page-home";
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const [searchParams, setSearchParams] = useSearchParams();
    const [eventdata, setEventData] = useState([]);
    const [sevadata, setSevaData] = useState([]);
    const [data, setData] = useState([]);
    const [sevaerror, setSevaError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState((searchParams.get("category") === "All" || !searchParams.get("category")) ? "All" : Number(searchParams.get("category")));
    const [sevaTypeDynamic, setSevaTypeDynamic] = useState([]);


    // useEffect(() => {
    //     setSelectedCategory(searchParams.get("category") === "All" ? "All" : Number(searchParams.get("category")))
    // },[searchParams])

    // console.log(sevadata)

    // const fetchEventData = async () => {
    //     try {
    //         const response = await instance.get("api/events");
    //         setEventData(response.data.data.data);
    //         console.log(response.data.data.data)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    const [filteredSevas, setFilteredSevas] = useState([]);
    // const fetchSevasData = async () => {
    //     try {
    //         const response = await instance.get("api/sevas");
    //         console.log(response.data.data.data);
    //         const allSevas = response.data.data.data;
    //         setData(allSevas);
    //     } catch (err) {
    //         setSevaError(err);
    //         console.log(err);
    //     }
    // };

    // console.log(filteredSevas)
    // const [category, setCategory] = useState(null);

    const [category, setCategory] = useState(0);
    // const [sevaTypeDynamic,setSevaTypeDynamic]=useState(0);
    // const Explore = async () => {
    //     const responseSevas = await axios.get(`${api}/api/seva_types`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //             'paginate': '0',
    //         }
    //     });
    // }
    // const sevaTypes = responseSevas.data;



    const Explore = async () => {
        try {
            const { data, status } = await axios.get(`${api}/api/seva_types`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    paginate: "0",
                },
            });
            const filterdSevas = data.data.data.filter(item=>item.is_active === true) ;
            // console.log("active",data.data.data)

            setSevaTypeDynamic(filterdSevas);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchData = async () => {
        const sevalink =
            selectedCategory === "All"
                ? `${api}/api/sevas`
                : `${api}/api/sevas?seva_type_id=${selectedCategory}`;
        const eventlink =
            selectedCategory === "All" ? `${api}/api/events` : `${api}/api/events?seva_type_id=${selectedCategory}`;

        try {
            const responseSevas = await axios.get(sevalink, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    paginate: "0",
                },
            });

            const responseEvents = await axios.get(eventlink, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    paginate: "0",
                },
            });

            // const sevaData = responseSevas.data.data.data;
            // console.log("sevas",responseSevas.data.data.data)
            // const eventData = responseEvents.data.data.data;
            // console.log("events",responseEvents.data.data.data)
            const filteredSevaData = responseSevas.data.data.data.filter(seva => seva.is_active === true)
            const filteredEventData = responseEvents.data.data.data.filter(event => event.is_active === true)
            console.log("sevas", filteredSevaData)
            console.log("events", filteredEventData)
            setEventData(filteredEventData.map(item => {
                return {
                    ...item,
                    isevent: true
                }
            }));
            setSevaData(filteredSevaData.map(item => {
                return {
                    ...item,
                    isevent: false
                }
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            setSevaError(error);
        }
    };

    useEffect(() => {
        Explore();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedCategory, category]);


    const handleButtonClick = (value) => {
        setCategory(value);
    };

    let filtereditems = [];

    if (category === 0) {
        filtereditems = [...sevadata, ...eventdata];
    } else if (category === 1) {
        filtereditems = [...sevadata];
    } else if (category === 2) {
        filtereditems = [...eventdata];
    }

    const html = "<h1>Test</h1>"

    return (
        <>
            <div className={`${ns}`}>
                <div className={`${ns}__header`}>
                    <Header />
                </div>
                <div id="EXPLORE_BG">
                    <div className="categories">
                        <Container>
                            <div className="categories-content">
                                <h2>Categories</h2>
                            </div>
                            <div className="categories-gallery" style={{ marginTop: "20px" }}>

                                <div className="categories-gallery-css">
                                    <Button
                                        style={{
                                            borderRadius: "20px",
                                            borderColor: "#ff5b00",
                                            border: "1px solid #ff5b00",
                                            backgroundColor:
                                                "All" === selectedCategory ? "#ff5b00" : "white",
                                            color: "All" === selectedCategory ? "white" : "#ff5b00",
                                        }}
                                        // className={`categories-gallery-content app-new-categories-gallery-content ${selectedCategory === 'All' ? 'selected' : ''}`}
                                        onClick={() => setSelectedCategory("All")}
                                    >
                                        <img
                                            style={{
                                                width: "65px",
                                                height: "65px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                                marginRight: "8px",
                                            }}
                                            src={others}
                                        />
                                        <span style={{ fontWeight: 600 }}>All</span>
                                    </Button>
                                    {sevaTypeDynamic.map((item) => {

                                        return (
                                            <Button
                                                style={{
                                                    borderRadius: "20px",
                                                    borderColor: "#ff5b00",
                                                    border: "1px solid #ff5b00",
                                                    backgroundColor:
                                                        item.id === selectedCategory ? "#ff5b00" : "white",
                                                    color:
                                                        item.id === selectedCategory ? "white" : "#ff5b00",
                                                }}
                                                variant="contained"
                                                onClick={() => { setSelectedCategory(item.id); console.log(item) }}
                                            >
                                                <img
                                                    style={{
                                                        width: "65px",
                                                        height: "65px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                        marginRight: "8px",
                                                    }}
                                                    src={`${item.image.domain}${item.image.url}`}
                                                />
                                                <span style={{ textAlign: "left", fontWeight: 600 }}>{item.name}</span>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </Container>
                    </div>

                    {/* <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "175px",
                            marginTop: "20px",
                        }}
                    >
                        <Button
                            style={{
                                borderRadius: "20px",
                                borderColor: "#ff5b00",
                                border: "2px solid #ff5b00",
                                backgroundColor: category === 0 ? "#ff5b00" : "white",
                                color: category === 0 ? "white" : "#ff5b00",
                            }}
                            variant="contained"
                            className="app-btn-text"
                            onClick={() => handleButtonClick(0)}
                        >
                            <span className="app-btn-text">Both</span>
                        </Button>
                        <Button
                            style={{
                                marginLeft: "10px",
                                borderColor: "#ff5b00",
                                border: "2px solid #ff5b00",
                                backgroundColor: category === 1 ? "#ff5b00" : "white",
                                color: category === 1 ? "white" : "#ff5b00",
                                borderRadius: "20px",
                            }}
                            variant="outlined"
                            className="btn warning"
                            onClick={() => handleButtonClick(1)}
                        >
                            <span className="app-btn-text">Sevas</span>
                        </Button>
                        <Button
                            style={{
                                marginLeft: "10px",
                                borderColor: "#ff5b00",
                                border: "2px solid #ff5b00",
                                borderRadius: "20px",
                                backgroundColor: "white",
                                backgroundColor: category === 2 ? "#ff5b00" : "white",
                                color: category === 2 ? "white" : "#ff5b00",
                            }}
                            variant="outlined"
                            className="btn warning"
                            onClick={() => handleButtonClick(2)}
                        >
                            <span className="app-btn-text">Events</span>
                        </Button>
                    </div> */}

                    <div className="categories-tabs">
                        <Container>
                            <div className="categories-tabs-content">
                                <div className="discover-more-boxs">
                                    <Grid container columnSpacing={2} rowSpacing={5}>
                                        {filtereditems.map((seva, index) => {
                                            // console.log({ seva })
                                            return (<Grid
                                                key={index}
                                                item
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                            >
                                                <div className="nava-chandi-bg add-new-strip-box p-0"
                                                    style={{ backgroundImage: `url(${seva.background_image_id.domain}${seva.background_image_id.url})` }}
                                                >
                                                    <div className="traditional-strip">
                                                        <p>
                                                            {seva.expairy_date_time
                                                                ? new Date(seva.expairy_date_time).toDateString()
                                                                : new Date(seva.expairy_date).toDateString()}
                                                        </p>
                                                    </div>

                                                   

                                                    {/* <div className="readmore-desc" >
                                                        <p className="read-more-link description-scroll"style={{width:"335px",height:"150px",margin:"5px"}} dangerouslySetInnerHTML={{ __html : seva.description}}></p>
                                                    </div> */}
                                                    {/* <p className="read-more-link" onClick={() => toggleReadMore(index)}>
                                                            {readMoreStates[index] ? item.description : item.description.slice(0, readMoreLimit)}
                                                            <span> {readMoreStates[index] ? "Read Less" : "Read More..."}</span>
                                                        </p> */}
                                                    <div style={{ marginTop: "20px" }} className="sevacard-img" >
                                                        <img src={`${seva.feature_image_id.domain}${seva.feature_image_id.url}`} />
                                                        {/* <div className='strip'>
                                                            <img src={strip} />
                                                            <div className='date-time'>
                                                                <p>{new Date(seva.start_date).toDateString()}</p>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <div className="seva-title" style={{ height: "120px" }}>
                                                        <h4 style={{ color: "black" }}>{seva.title.length > 65 ? seva.title.slice(0, 65) + "..." : seva.title}</h4>
                                                        <p style={{ color: "black", padding: "0 20px" }}><b style={{ color: "#212121" }}>Event</b>: {seva.event}</p>
                                                    </div>
                                                    <div className="book-seva" >
                                                        <Link style={{ width: "100%", padding: "0 10px" }}
                                                            to={seva.isevent ? `/sevas/${seva.slug ? seva.slug : seva.id}` : `/seva/${seva.slug ? seva.slug : seva.id}`}
                                                        >
                                                            {/* <Button
                                                                disableRipple
                                                                disableElevation
                                                                className={`book-seva-btn ${seva.is_expaired ? "disabled" : "highlight"
                                                                    }`}
                                                                disabled={seva.is_expaired}
                                                            >
                                                                Book Seva
                                                            </Button> */}
                                                            <Button disableRipple disableElevation
                                                                className="book-seva-btn" style={{ width: "100%", marginTop: "20px" }}>
                                                                {seva.is_expaired ? 'View Details' : 'Book Now'}
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Grid>)
                                        })}
                                    </Grid>
                                </div>
                                {/* <CustomTabPanel /> */}
                            </div>
                        </Container>
                    </div>
                    <div className="nama-bg"></div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Explore_puja;
