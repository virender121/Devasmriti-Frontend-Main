import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'
import instance from '../utils/Api'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../pages/CartContext'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useAuth } from '../utils/Auth'
import { Diversity1 } from '@mui/icons-material';
import prashadPic from "../images/black-line-art-laddu-on-plate-in-flat-style-vector.jpg";
import { Button, Radio } from '@mui/material';
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 'auto',
    },
  },
}

const style = {
  position: 'absolute',
  bottom: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
  bgcolor: '#fef9f3',
  boxShadow: 24,
  p: 4,
  height:"550px",
  width:"400px",
  borderRadius: '10px',
  paddingTop:"0px",
  overflow:'visibile'
};
function getStyles(name, selectedPrice, theme) {
  return {
    fontWeight:
      selectedPrice === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  }
}

export default function MultipleSelectPlaceholder({ onPriceChange, seva,  handleClose , setSevaForDialog,openDialog
,openModel}) {
  // console.log(productDetails)
  const navigate = useNavigate()
  const theme = useTheme()
 
  let defaultitem = seva.seva_prices.find(option => option.is_default)

  if (defaultitem === undefined) {
    console.log({ p: seva.seva_prices })
    defaultitem = seva.seva_prices[0]
  }
  console.log(seva)
  
  const token = localStorage.getItem("token");
  const [selectedPrice, setSelectedPrice] = useState(defaultitem.selling_price)
//  const [selectedItem, setSelectedItem] = useState(defaultitem.id)
  const { selectedPriceId, setSelectedPriceId } = useCart()
  const [selectedPriceTitle, setSelectedPriceTitle] = useState(defaultitem.title)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // const [selectedPriceList, setSelectedPriceList] = useState([]);
  console.log(selectedPrice)
 console.log(selectedPriceId)
  const handleChange = (event) => {
    const newPrice = event.target.value
    setSelectedPrice(newPrice)

    const selectedItem = seva.seva_prices.find((item) => item.selling_price === newPrice)

    const newSelectedPriceId = selectedItem ? selectedItem.id : null

    // console.log("Selected Price Id:", newSelectedPriceId)
    localStorage.setItem('newSelectedPriceId', newSelectedPriceId)
    setSelectedPriceId(newSelectedPriceId)

    setSelectedPriceTitle(selectedItem ? selectedItem.title : '')
    onPriceChange(selectedItem, seva.id)
  }
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 
 const handleClick = (newPrice )=> {
  setSelectedPrice(newPrice)
   
  const selectedItem = seva.seva_prices.find((item) => item.selling_price === newPrice)

  const newSelectedPriceId = selectedItem ? selectedItem.id : null

  localStorage.setItem('newSelectedPriceId', newSelectedPriceId)
  setSelectedPriceId(newSelectedPriceId)

  setSelectedPriceTitle(selectedItem ? selectedItem.title : '')
  onPriceChange(selectedItem, seva.id)

 }


const handleBackdropClick = (event) => {
  event.stopPropagation()
}

const handleNavigate = (selectedPriceId) => {
  if (token) {
    navigate(`/checkout/${seva.slug ? seva.slug : seva.id}/seva/${selectedPriceId}`);
  } else {
    console.log(seva)
   setSevaForDialog(seva);
     openDialog();
    handleClose();
   }
}


  return (
    <> {isMobile ? (
      // Modal for mobile
      
      <div style={{ position: 'relative' }}>
      <Modal
        open={openModel === seva.id} 
        onClose={() => setIsMobile(null)}
        aria-labelledby="mobile-modal"
        aria-describedby="mobile-modal-description"
        closeAfterTransition={false}
        BackdropProps = {{
          onClick : handleBackdropClick
        }}
      >
      <Box sx={{ ...style, overflowY: 'auto'}} >
      
        <span  className="title-pooja" style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center", marginBottom:"9px",padding:"10px",backgroundColor:"#fff"}}>

        <h4 className="choose-seva-name" >
          {seva.title}
        </h4>
        <button
          className="modal-button"
          onClick={handleClose}
          aria-label="Close"
        >
           ✖
        </button>
         </span>
  
  {seva.seva_prices

    .filter(item => item.is_active)
    .map((item) => (
      <MenuItem
      key={item.id}
      value={item.selling_price}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #e2dfdf",
        borderRadius:'8px',
        marginBottom:'10px',
       backgroundColor:"#fff"
       
      }} 
      onClick={()=> handleClick(item.selling_price)}
    >
      <div style={{flex:"1", whiteSpace:'pre-wrap' }} >
             
     
        <div style={{fontWeight:"Bold",color:'#333',marginLeft:"22px"}}>{item.title}</div>
        {/* <p href="" style={{margin:'0'}}><MdVideoCameraBack /> live stream</p> */}
        <Radio
  checked={selectedPrice === item.selling_price}
  inputProps={{ 'aria-label': 'item-radio' }}
  style={{position:'absolute',left:"-4px",top: seva.id=== 28 ? "13px" : "28px"}}
/>
        
      
        <span >
       
               <img src={prashadPic} alt='ladu_image' style={{width:"25px",height:"25px",marginLeft:"18px"}}/> {item.is_prasadam_available ? ("Prashad available") :("Prashad unavailable")
            }</span>
      </div>
      <div style={{fontWeight:"bold"}}>
        {`Rs.${item.selling_price}`}
      </div>
      
    </MenuItem>
    
    ))}
    {seva.seva_prices.length >= 4 ? null : <div className="welness_head_div"><h4 className="welness_head">|| सर्वे जन सुखिनो भवन्थु ||</h4></div>}

    <Button variant="contained" disableRipple disableElevation className="app-btn app-btn-primary "
    style={{position: seva.id=== 28 ? "sticky": "absolute",bottom:seva.id=== 28 ? "1px": "18px",left:"23%", zIndex:seva.id=== 28 ? "9999" : "0",fontWeight:"bold"}} onClick={()=>handleNavigate(selectedPriceId)}>Continue with ₹{selectedPrice}</Button>
</Box>
      </Modal>
      
      </div>
    ) : (
      <FormControl sx={{ m: 1, width: '100%', mt: 3,}} >
        <Select
          displayEmpty
          value={selectedPriceTitle}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(value) => {
            if (!value) {
              return selectedPriceTitle
            }
            return `${value}`
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value=""></MenuItem>
          {seva.seva_prices
            .filter(item => item.is_active)
            .map((item) => (
              <MenuItem
                key={item.id}
                value={item.selling_price}
                style={{
                  ...getStyles(item.selling_price, selectedPrice, theme),
                  whiteSpace: 'nowrap',
                }}
              >
                {`${item.title} - Rs.${item.selling_price}`}
                {/* {`${item.title.length > 15 ? `${item.title.slice(0, 22)}...` : item.title} - Rs.${item.selling_price}`} */}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    )}
    </>
  )
}
