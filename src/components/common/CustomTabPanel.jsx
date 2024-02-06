// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import durgamata from '../../images/discover-more/durgamatha.svg';
// import strip from '../../images/discover-more/durgamatha-strip.svg'
// import Grid from '@mui/material/Grid';
// import { Button, Container } from "@mui/material";
// import { Link } from "react-router-dom";



// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab disableRipple disableElevation label="All" {...a11yProps(0)} />
//           <Tab disableRipple disableElevation label="Active" {...a11yProps(1)} />
//           <Tab disableRipple disableElevation label="Closed" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//       <div className="discover-more-boxs">
//           <Grid container spacing={2}>
//              <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                  <div className="nava-chandi-bg">
//                       <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                          <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                          <div className="durgamata">
//                             <img src={durgamata} />
//                               <div className='strip'>
//                                 <img src={strip} />
//                                   <div className='date-time'>
//                                     <p>10 Oct 10:00 Am</p>
//                                     </div>
//                                       </div>
//                                   </div>
//                                 <div className="book-seva">
//                                 <Link to='/individual'>
//                                 <Button disableRipple disableElevation  className="book-seva-btn">Book Seva</Button>
//                                 </Link>
//                               </div>
//                           </div>
//                      </Grid>
//                      <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                          <div className="nava-chandi-bg">
//                               <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                                    <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                                    <div className="durgamata">
//                                     <img src={durgamata} />
//                                       <div className='strip'>
//                                         <img src={strip} />
//                                           <div className='date-time'>
//                                             <p>10 Oct 10:00 Am</p>
//                                             </div>
//                                               </div>
//                                          </div>
//                                     <div className="book-seva">
//                                     <Link to='/individual'>
//                                     <Button disableRipple disableElevation className="book-seva-btn">Book Seva</Button>
//                                     </Link>
//                                       </div>
//                                     </div>
//                                 </Grid>
//                         <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                           <div className="nava-chandi-bg">
//                                <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                                   <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                                   <div className="durgamata">
//                                   <img src={durgamata} />
//                                     <div className='strip'>
//                                       <img src={strip} />
//                                         <div className='date-time'>
//                                           <p>10 Oct 10:00 Am</p>
//                                           </div>
//                                             </div>
//                                        </div>
//                                      <div className="book-seva">
//                                      <Link to='/individual'>
//                                       <Button disableRipple disableElevation className="book-seva-btn">Book Seva</Button>
//                                       </Link>
//                                     </div>
//                                    </div>
//                              </Grid>
//                        </Grid>
//                    </div>
//                </CustomTabPanel>
//                       <CustomTabPanel value={value} index={1}>
//                       <div className="discover-more-boxs">
//                           <Grid container spacing={2}>
//                             <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                                 <div className="nava-chandi-bg">
//                                       <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                                         <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                                         <div className="durgamata">
//                                         <img src={durgamata} />
//                                           <div className='strip'>
//                                             <img src={strip} />
//                                               <div className='date-time'>
//                                                 <p>10 Oct 10:00 Am</p>
//                                                 </div>
//                                                   </div>
//                                               </div>
//                                                 <div className="book-seva">
//                                                 <Link to='/individual'>
//                                                 <Button disableRipple disableElevation className="book-seva-btn">Book Seva</Button>
//                                                 </Link>                                              
//                                                 </div>
//                                           </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                                         <div className="nava-chandi-bg">
//                                               <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                                                   <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                                                   <div className="durgamata">
//                                                   <img src={durgamata} />
//                                                     <div className='strip'>
//                                                       <img src={strip} />
//                                                         <div className='date-time'>
//                                                           <p>10 Oct 10:00 Am</p>
//                                                           </div>
//                                                             </div>
//                                                         </div>
//                                                       <div className="book-seva">
//                                                       <Link to='/individual'>
//                                                       <Button disableRipple disableElevation className="book-seva-btn">Book Seva</Button>
//                                                       </Link>                                              
//                                                       </div>
//                                                     </div>
//                                                 </Grid>
//                                         <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                                           <div className="nava-chandi-bg">
//                                               <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                                                   <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                                                   <div className="durgamata">
//                                                 <img src={durgamata} />
//                                                   <div className='strip'>
//                                                     <img src={strip} />
//                                                       <div className='date-time'>
//                                                         <p>10 Oct 10:00 Am</p>
//                                                         </div>
//                                                           </div>
//                                                       </div>
//                                                     <div className="book-seva">
//                                                     <Link to='/individual'>
//                                                     <Button disableRipple disableElevation className="book-seva-btn">Book Seva</Button>
//                                                     </Link>                                              
//                                                     </div>
//                                                   </div>
//                                             </Grid>
//                                       </Grid>
//                               </div>
//                       </CustomTabPanel>
//                       <CustomTabPanel value={value} index={2}>
//                       <div className="discover-more-boxs">
//                           <Grid container spacing={2}>
//                             <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                                 <div className="nava-chandi-bg">
//                                       <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                                         <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                                         <div className="durgamata">
//                                           <img src={durgamata} />
//                                             <div className='strip'>
//                                               <img src={strip} />
//                                                 <div className='date-time'>
//                                                   <p>10 Oct 10:00 Am</p>
//                                                   </div>
//                                                     </div>
//                                                 </div>
//                                               <div className="book-seva">
//                                                 <Link to='/individual'>
//                                                 <Button disableRipple disableElevation className="book-seva-btn">Book Seva</Button>
//                                                 </Link>                                              
//                                                 </div>
//                                           </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                                         <div className="nava-chandi-bg">
//                                               <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                                                   <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                                                   <div className="durgamata">
//                                                 <img src={durgamata} />
//                                                   <div className='strip'>
//                                                     <img src={strip} />
//                                                       <div className='date-time'>
//                                                         <p>10 Oct 10:00 Am</p>
//                                                         </div>
//                                                           </div>
//                                                       </div>
//                                                       <div className="book-seva">
//                                                       <Link to='/individual'>
//                                                       <Button disableRipple disableElevation className="book-seva-btn">Book Seva</Button>
//                                                       </Link>                                              
//                                                       </div>
//                                                     </div>
//                                                 </Grid>
//                                         <Grid item xs={12} sm={12}md={4} lg={4} xl={4}>
//                                           <div className="nava-chandi-bg">
//                                               <h4>Perform Nava Chandi Homa on Sept 6th</h4>
//                                                   <p>The Nava Chandi Homa is performed to seek blessing and divine grace. Veda Pandits will perform this Nava <span>Read more..</span></p>
//                                                   <div className="durgamata">
//                                                         <img src={durgamata} />
//                                                     </div>
//                                                     <div className="book-seva">
//                                                     <Link to='/individual'>
//                                                     <Button disableRipple disableElevation className="book-seva-btn">Book Seva</Button>
//                                                     </Link>                                              
//                                                     </div>
//                                                   </div>
//                                             </Grid>
//                                       </Grid>
//                               </div>
//                       </CustomTabPanel>
//     </Box>
//   );
// }
