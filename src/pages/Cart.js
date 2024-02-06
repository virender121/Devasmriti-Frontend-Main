import { Button, Container } from "@mui/material";
import Header from "../components/common/Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import cartimage from '../images/cart/cart-image.svg'
import { Link } from "react-router-dom";
import footerbg from '../images/footer-bg.svg'
import footerlogo from '../images/devasmriti-logo.svg'
import Footer from "./Footer";
import instance from "../utils/Api";
import { useState } from "react";
import { useEffect } from "react";
import api from "../config/backend";
import axios from 'axios';

import { useCart } from '../pages/CartContext';
function Cart({ triggerRefresh1, setTriggerRefresh }) {
    const token = localStorage.getItem("token")
    // console.log(setTriggerRefresh)
    const ns = "app-page-home";
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const { decrementCartTotal } = useCart();
    const [cartData, setCartData] = useState([]);
    const [error, setError] = useState(null);

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

                // console.log({ t: response.data.data.data })
                setCartData(response.data.data);
                // setCartCountRefresh(prev => prev + 1)
                setError(null);
            } catch (err) {
                setError(err);
                console.error(err);
            }
        };

        fetchData();
    }, []);
    const removeItemFromCart = async (id) => {
       
        try {
            // await instance.delete(`api/cart/${id}`);
            const response = await axios.delete(`${api}/api/cart/${id}`, {
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
            console.error(err);
        }
    };


    const calculateTotal = () => {
        let total = 0;
        if (Array.isArray(cartData.data)) {
            cartData.data.forEach(item => {
                total += item.seva_price.selling_price;
            });
        }
        return total;
    };

    const handleCheckboxChange = (e, index) => {
        const updatedCartData = [...cartData.data];
        updatedCartData[index].is_prasadam_available = e.target.checked;
    };

    // console.log({ test: 1 })

    return (
        <>
            <div className={`${ns}`}>
                <div className={`${ns}__header`}>
                    <Header />
                </div>
                <div className={`${ns}__banner`} id="AppBanner">
                    <Container>
                        <div className="add-to-cart app-new-add-to-cart">
                            <div className="add-to-cart-title">
                                <h2>My Cart</h2>
                            </div>
                            <div className="add-to-cart-content">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                        {Array.isArray(cartData && cartData.data) && cartData.data.length > 0 ? (
                                            cartData.data.map((item, index) => {
                                                // console.log(item)
                                                return (
                                                    <div className="add-to-cart-box">
                                                        <div className="add-to-cart-box-content">
                                                            <div className="add-to-cart-box-main-content">
                                                                <div className="cart-image">
                                                                    {/* <img src={cartimage}></img> */}
                                                                </div>
                                                                <div className="add-to-cart-box-mini-content app-new-sm-cart-box">
                                                                    <h4>Seva Name - {item.seva.title}</h4>
                                                                    <p>{new Date(item.seva.start_date).toDateString()}</p>
                                                                    <h6>Puja Variant <span>01 Devotee</span></h6>
                                                                    <div className="preference-form app-new-preference-form">
                                                                        <form action="/action_page.php">
                                                                            <input
                                                                                type="checkbox"
                                                                                id=""
                                                                                name=""
                                                                                value=""
                                                                                checked={item.is_prasadam_available}
                                                                                onChange={(e) => handleCheckboxChange(e, index)}
                                                                                style={{ display: item.is_prasadam_available ? "block" : "none" }}
                                                                            />
                                                                            <label htmlFor="">
                                                                                {item.is_prasadam_available ? "Prasadam" : ""}
                                                                            </label>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="add-cart-price-remove-btn">
                                                                <div className="add-to-cart-price">
                                                                    <h4>₹{item.seva_price.selling_price}</h4>
                                                                </div>
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
                                                )
                                            })
                                        ) : (
                                            <div className="no-items-in-cart">No items in cart</div>
                                        )}

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <div className="order-summary">
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
                                                    <li>{Array.isArray(cartData && cartData.data) && cartData.data.length === 0 ? "₹0" : "₹80"}</li>
                                                </ul> */}
                                                <ul>
                                                    <li className="sub-total">Total</li>
                                                    <li>{Array.isArray(cartData && cartData.data) && cartData.data.length === 0 ? "₹0" :`₹${calculateTotal()}`}</li>
                                                </ul>
                                            </div>
                                            {Array.isArray(cartData && cartData.data) && cartData.data.length === 0 ? (<Link to='#'>
                                                <div className="proceed-to-pay">
                                                    <Button variant="contained" className="app-btn app-btn-primary has-icon-end">
                                                        <span className="app-btn-text">Checkout</span>
                                                    </Button>
                                                </div>
                                            </Link>) : (<Link to='/checkout'>
                                                <div className="proceed-to-pay">
                                                    <Button variant="contained" className="app-btn app-btn-primary has-icon-end">
                                                        <span className="app-btn-text">Checkout</span>
                                                    </Button>
                                                </div>
                                            </Link>)}
                                            {/* <div className="coupons">
                                                <div className="coupons-content">
                                                    <div className="coupons-content-title">
                                                        <h4>Coupons</h4>
                                                    </div>
                                                    <div className="coupons-btn">
                                                        <Button>View All
                                                            <span><img className="app-btn-img" src="/images/icons/arrow-right-orange.svg" /></span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="coupons-main-btns">
                                                    <Button className="coupon-name">AJDNSAJNNJ</Button>
                                                    <Button>Apply</Button>
                                                </div>
                                            </div> */}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Cart;
