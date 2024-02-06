import { Button, Container } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import footerbg from '../images/footer-bg.svg'
import footerlogo from '../images/devasmriti-logo.svg'
import { Link } from "react-router-dom";
import Footer from "./Footer";


function AboutUs() {
    const ns = "app-page-home";
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <>
            <div className={`${ns}`}>
                <div className={`${ns}__header`}>
                    <Header />
                </div>
                <div className={`${ns}__banner`}></div>
                <div className="ananta-padmanabu" id="ANANTA_BG">
                    <Container maxWidth="lg">
                        <div className="about-us-banner">
                            <div className="about-us-banner-content">
                                {/* <h2>Lorem Epson </h2>
                                <p>Lorem Epson is a dummy text to fill the sentencesLorem Epson is a dummy text to fill the sentences</p> */}
                            </div>
                        </div>
                        <div className="about-us-content">
                            <div className="about-us-main-content">
                                <p>We at devasmriti, are collaborating with renowned temple priests, ensuring that every ritual and offering adhered to the sacred scriptures. Using technology, we aim to create a platform that allows individuals to participate in live-streamed puja ceremonies from the comfort of their homes.</p>
                                <div className="about-us-main-content-1">
                                    <p>पत्रं पुष्पं फलं तोयं यो मे भक्त्य‍ा प्रयच्छति ।<br></br>
                                        तदहं भक्त्य‍ुपहृतमश्न‍ामि प्रयतात्मन: ॥ 9.26 ॥</p>
                                    <p> (patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati<br></br>
                                        tad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ)</p>
                                </div>
                                <p>
                                    “If offered with devotion, even a leaf, a flower, a fruit, or water brings me great delight, I happily accept these offerings from my devoted followers who offer them with pure consciousness and love.” Inspired by Lord Krishna’s teachings in the Bhagavad Gita, we embarked on a remarkable journey to establish “devasmriti” with the aim to recreate the sanctity and spiritual experience of temple worship through online puja services.</p>

                            </div>
                        </div>
                        {/* <div className="about-us-content">
                            <div className="about-us-main-content">
                                <h3>Why Devasmriti</h3>
                                <p>Experience the sacred rituals with Devasmriti simply book tour spiritual journey, Take part in Sevas, Poojas, Annadanam, Gau Poojas and more, All from your Home. Experience the sacred rituals with Devasmriti simply book tour spiritual journey, Take part in Sevas, Poojas, Annadanam, Gau Poojas and more, All from your Home.</p>
                            </div>
                        </div> */}
                    </Container>
                    <div className="nama-bg"></div>
                </div >
                <Footer />
            </div >
        </>
    )
}

export default AboutUs;
