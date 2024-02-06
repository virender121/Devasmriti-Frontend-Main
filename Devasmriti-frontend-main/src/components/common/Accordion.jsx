import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from "@mui/material";
import instance, { noauthinstance } from '../../utils/Api';
import { useState } from 'react';
import { useEffect } from 'react';


export default function BasicAccordion() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchFAQ = async () => {
    try {
      const response = await noauthinstance.get("api/home/faqs");
      // console.log(response.data.data)
      setData(response.data.data.data);
    } catch (err) {
      setError(err);
      console.log(err)
    }
  };

  useEffect(() => {
    fetchFAQ()
  }, [])

  return (
    <div className='accordion'>
      {data && data.map((item, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography className='main-content'>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='mini-content'>{item.sub_title}</Typography>
            </AccordionDetails>
          </Accordion>

        )

      })}
    </div>
  );
}
