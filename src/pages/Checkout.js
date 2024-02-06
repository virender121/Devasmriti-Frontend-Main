import { Button, Container, Typography } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import cartimage from '../images/cart/cart-image.svg'
import footerbg from '../images/footer-bg.svg'
import footerlogo from '../images/devasmriti-logo.svg'
import HorizontalLinearStepper from "../components/HorizontalLinearStepper";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";




function Checkout({ triggerRefresh1, setTriggerRefresh }) {
    const { productId } = useParams();
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
                <div className={`${ns}__banner`} id="AppBanner">
                    <HorizontalLinearStepper setTriggerRefresh={setTriggerRefresh} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Checkout;
