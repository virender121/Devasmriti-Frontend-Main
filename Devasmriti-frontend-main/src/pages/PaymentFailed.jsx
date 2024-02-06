import { CircularProgress } from "@mui/material"
import Header from "../components/common/Header"
import PaymentCancelled from "../images/PaymentCancelled.jpg"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PaymentFailed = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 4000)
    }, [])

    return (
        <div className="_6kln">
            <Header />
            <div className="amylase-mil" style={{ height: "calc(100vh - 135px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <img style={{ width: "400px", height: "400px", marginTop: "180px" }} src={PaymentCancelled} alt="" />
                <h3 style={{ color: "#C70039" }}>Payment failed</h3>
                <CircularProgress />
                <div style={{ marginTop: "50px", fontSize: "12px", color: "grey" }}>Redirecting to Homepage</div>
            </div>
        </div>
    )
}

export default PaymentFailed
