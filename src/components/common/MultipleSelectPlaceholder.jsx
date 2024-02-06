import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'
import instance from '../../utils/Api'
import { useParams } from 'react-router-dom'
import api from '../../config/backend'
import axios from 'axios';
import { useCart } from '../../pages/CartContext'
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


function getStyles(name, selectedPrice, theme) {
  return {
    fontWeight:
      selectedPrice === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  }
}

export default function MultipleSelectPlaceholder({ onPriceChange, productDetails }) {
  // console.log(productDetails)

  const theme = useTheme()
  const [selectedPrice, setSelectedPrice] = useState('')
  const { productId } = useParams()




  const [data, setData] = useState([])
  const token = localStorage.getItem("token")
  const { selectedPriceId, setSelectedPriceId } = useCart()
  const [selectedPriceTitle, setSelectedPriceTitle] = useState('')


  useEffect(() => {
    let optionId;

    // console.log('Product Details Slug:', productDetails.slug);
    // console.log('Product ID:', productId);

    if (productDetails.slug === productId) {
      optionId = productDetails.id;
      // console.log('Found Option ID:', optionId);

      const fetchSellingPrice = async () => {
        try {
          const response = await axios.get(`${api}/api/seva_options/${optionId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              'paginate': '0',
            }
          });

          const responseData = response.data.data.data;

          // console.log({ responseData });

          if (responseData && responseData.length > 0) {
            setData(responseData);

            const defaultPrice = responseData.find(item => item.is_default);
            if (defaultPrice) {
              setSelectedPrice(defaultPrice.selling_price);
              setSelectedPriceTitle(defaultPrice.title);
            } else {
              console.error("Default price not found in the response:", responseData);
            }
          } else {
            console.error("Empty response data:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchSellingPrice();
    } else {
      console.error('Product not found');
    }
  }, [productId, productDetails.slug, productDetails.id]);


  const handleChange = (event) => {
    const newPrice = event.target.value
    setSelectedPrice(newPrice)

    const selectedItem = data.find((item) => item.selling_price === newPrice)

    const newSelectedPriceId = selectedItem ? selectedItem.id : null

    // console.log("Selected Price Id:", newSelectedPriceId)
    localStorage.setItem('newSelectedPriceId', newSelectedPriceId)
    setSelectedPriceId(newSelectedPriceId)

    setSelectedPriceTitle(selectedItem ? selectedItem.title : '')

    onPriceChange(selectedItem)
  }


  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
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
          {data
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
              </MenuItem>
            ))}

        </Select>
      </FormControl>
    </div>
  )
}
