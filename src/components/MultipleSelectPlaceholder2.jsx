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
import prashadPic from "../images/black-line-art-laddu-on-plate-in-flat-style-vector.jpg"
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
  paddingTop:"0px"
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
 
 const handleClick = (newPrice ,id)=> {
  setSelectedPrice(newPrice)
   console.log(id, "price")
  const selectedItem = seva.seva_prices.find((item) => item.selling_price === newPrice)

  const newSelectedPriceId = selectedItem ? selectedItem.id : null

  localStorage.setItem('newSelectedPriceId', newSelectedPriceId)
  setSelectedPriceId(newSelectedPriceId)

  setSelectedPriceTitle(selectedItem ? selectedItem.title : '')
  onPriceChange(selectedItem, seva.id)
  

   if (token) {
    navigate(`/checkout/${seva.slug ? seva.slug : seva.id}/seva/${newSelectedPriceId}`);
  } else {
    console.log(seva)
   setSevaForDialog(seva);
     openDialog();
    handleClose();
   }

 }


const handleBackdropClick = (event) => {
  event.stopPropagation()
}



  return (
    <> {isMobile ? (
      // Modal for mobile
      
      <div style={{ position: 'relative' }}>
      {/* {openModel  && ( 
        <div className="close-button-wrapper">
      
      </div>
      )} */}
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
  {/* <div style={{ display:"flex",flexDirection:"row",justifyContent:"space-between"}}><span style={{marginRight:"7px",width:"30px",height:"30px"}}><FaRegHeart style={{width:"20px",height:"20px"}}/></span><span><SlActionRedo onClick={handleClose} aria-label="Close" style={{width:"20px",height:"20px"}}/></span></div> */}
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
      onClick={() => handleClick( item.selling_price)}
    >
      <div style={{flex:"1", whiteSpace:'pre-wrap' }} >
        <div style={{fontWeight:"Bold",color:'#333'}}>{item.title}</div>
        {/* <p href="" style={{margin:'0'}}><MdVideoCameraBack /> live stream</p> */}
        <span >
       <img src={prashadPic} alt='ladu_image' style={{width:"25px",height:"25px"}}/> {item.is_prasadam_available ? ("Prashad available") :("Prashad unavailable")
            }</span>
      </div>
      <div>
        {`Rs.${item.selling_price}`}
      </div>
      
    </MenuItem>
    
    ))}
    {seva.seva_prices.length >= 4 ? null : <div className="welness_head_div"><h4 className="welness_head">|| सर्वे जन सुखिनो भवन्थु ||</h4></div>}


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
