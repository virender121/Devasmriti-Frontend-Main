import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'
import instance from '../utils/Api'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../pages/CartContext'
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

export default function MultipleSelectPlaceholder({ onPriceChange, seva }) {
  // console.log(productDetails)

  const theme = useTheme()

  let defaultitem = seva.seva_prices.find(option => option.is_default)

  if (defaultitem === undefined) {
    console.log({ p: seva.seva_prices })
    defaultitem = seva.seva_prices[0]
  }
  console.log(seva)
  const [selectedPrice, setSelectedPrice] = useState(defaultitem.selling_price)

  const { selectedPriceId, setSelectedPriceId } = useCart()
  const [selectedPriceTitle, setSelectedPriceTitle] = useState(defaultitem.title)


  console.log(selectedPrice)

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


  return (
    <>
      <FormControl sx={{ m: 1, width: '100%', mt: 3,}}>
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
    </>
  )
}
