import { CircularProgress } from "@mui/material"
import Header from "../components/common/Header"
import PaymentCancelled from "../images/PaymentCancelled.jpg"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import instance from "../utils/Api"
import api from "../config/backend"
import axios from 'axios';
import ganesh from '../images/confirmation/lord-ganesh.svg';
const BookingSuccessful = () => {
    const [cartItems, setCartItems] = useState(undefined)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const fetchCart = async () => {
        const response = await axios.get(`${api}/api/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              'paginate': '0',
            }
          })
        setCartItems(response.data.data)
    }

    const deleteCartItem = async (id) => {
        await axios.delete(`${api}/api/cart/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
    }

    useEffect(() => {
        fetchCart()
    }, [])

    useEffect(() => {
        if (cartItems && cartItems.data) {
            for (const item of cartItems.data) {
                deleteCartItem(item.id)
            }
        }

        setTimeout(() => {
            navigate("/")
        }, 5000)
    }, [cartItems])

    return (
        <div className="_6kln">
            <Header />
            <div className="amylase-mil" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <div className='welcome-back-content'style={{marginTop:'200px'}}>
            <img src={ganesh}/>
            <h4>Puja Booking is Successful</h4>
            <h5>We have successfully received your details</h5>
           <p>You will get a confirmation call or WhatsApp within 12 hrs of booking</p>
        </div>
                <CircularProgress />
                <div style={{ marginTop: "50px", fontSize: "12px", color: "grey" }}>Redirecting to home</div>
            </div>
        </div>
    )
}

export default BookingSuccessful
