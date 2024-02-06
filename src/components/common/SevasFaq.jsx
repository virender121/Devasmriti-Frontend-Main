import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from "@mui/material";
import instance, { noauthinstance } from '../../utils/Api';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SevasFaq() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  const fetchFAQ = async () => {
    try {
      const response = await noauthinstance.get(`api/seva/faqs/${productId}`);
      setData(response.data.data.data);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFAQ();
  }, []);

  return (
    <div className='accordion'>
      {data.length === 0 ? (
        <Typography variant="h5" className='main-content'>There are no FAQs for this seva</Typography>
      ) : (
        data.map((item, index) => (
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
        ))
      )}
    </div>
  );
}
