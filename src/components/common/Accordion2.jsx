import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, NavLink } from "react-router-dom";
import profile from '../../images/profile-icon.svg';
import bookedseva from '../../images/profile/booked-seva.svg'
import "../css/Accordion2.css"


export default function BasicAccordion2() {
  console.log()
  return (
    <div className="_6vei">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <NavLink to='/user/profile' >
            <Typography>
              <span className='profile-icon'><img src={profile} /></span>Profile</Typography>
          </NavLink>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to='/user/profile' className={({isActive})=> isActive ? "navLink-active": undefined}>
            <Typography className='menu-icon'>
              {/* <span><img src={profile} /></span> */}
              <span className="milord-alto">My Profile</span></Typography>
          </NavLink>
          <NavLink to='/user/myfamily' className={({isActive})=> isActive ? "navLink-active": undefined}>
            <Typography className='menu-icon'>
              {/* <span><img src={profile} /></span> */}
              <span className="milord-alto">My Family</span></Typography>
          </NavLink>
          <NavLink to='/user/kartadeatils' className={({isActive})=> isActive ? "navLink-active": undefined}>
            <Typography className='menu-icon'>
              {/* <span><img src={profile} /></span> */}
              <span className="milord-alto">Karta Details</span></Typography>
          </NavLink>
          <NavLink to='/user/ancestordeatils' className={({isActive})=> isActive ? "navLink-active": undefined}>
            <Typography className='menu-icon'>
              {/* <span><img src={profile} /></span> */}
              <span className="milord-alto">Ancestor Details</span></Typography>
          </NavLink>
          {/* <Link to='/kartaancestordeatils'>
            <Typography className='menu-icon'>
              <span><img src={profile} /></span>Karta Ancestor Details</Typography>
          </Link> */}
          <NavLink to='/user/address' className={({isActive})=> isActive ? "navLink-active": undefined}>
            <Typography className='menu-icon'>
              {/* <span><img src={profile} /></span> */}
              <span className="milord-alto">Address</span></Typography>
          </NavLink>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Link to='/bookedseva'>
            <Typography>
              <span className='profile-icon'><img src={bookedseva} /></span>Booked Seva</Typography>
          </Link>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}