
//import DataGrid from 'react-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Toolbar, Dialog, Button, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect, useContext } from 'react';
import * as _ from 'lodash';
import { fetchData } from '../util/util';
import { LoggedContext } from "../App";


let sessionTime = new Date().getTime();
function Datagrid() {
  const { loggedIn, setLoggedIn } = useContext(LoggedContext);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  
 

  const handleCloseYes = () => {
    console.log('inside close yes fn-------------');
    sessionTime = new Date().getTime();
    
    console.log('new session--------------' + sessionTime);
    setOpen(false);
    setLoggedIn('success');
  };
  const handleCloseNo = () => {
    setOpen(false);
  };
  const MINUTE_MS = 60000;
  useEffect(() => {
    const url = 'http://localhost:8000/laptops';
    const accessToken = '';
    fetchData(url, accessToken)
      .then((res) => {
        console.log(res);
        const resKeysArr = _.keys(res.data[0]);
        const resKeys = _.without(resKeysArr, '_id', '__v');
        console.log(resKeys);
        const resKeyObjArr = [];
        for (let i = 0; i < resKeys.length; i++) {
          const resKey = resKeys[i];
          const flex = resKey === 'description' ? 3 : (resKey === 'id' || resKey === 'rating' || resKey === 'price' || resKey === 'stock') ? 0.25 : 0.75;
          const resKeyObj = {
            field: resKey,
            headerName: resKey,
            flex
          };
          resKeyObjArr.push(resKeyObj);
        }
        console.log(resKeyObjArr);
        setColumns(resKeyObjArr);
        setRows(res.data);

      })
      .catch((e) => {
        console.log(e.message)
      });
    const interval = setInterval(() => {
      console.log('Logs every minute');
      const currTime = new Date().getTime();
      console.log('currTime----------'+currTime);
      console.log('session-----------'+sessionTime);
      if((sessionTime + 120000) < currTime) { 
        console.log('inside log out');
        setLoggedIn('login');
      } else {
        console.log('inside dialog');
        setOpen(true);
      }      
    }, MINUTE_MS);

    return () => clearInterval(interval);

  }, []);
  //const res = await getData();
  if (columns && rows) {

    return (
      <div>


        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Your session will expire. Please press ok to continue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNo}>Cancel</Button>
            <Button onClick={handleCloseYes} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Box component="main" sx={{ flex: 3, flexGrow: 3, paddingLeft: '300px', paddingTop: '100px', minWidth: '500px' }}>
          <DataGrid columns={columns} rows={rows} sx={{ '& .MuiDataGrid-cell': { wordWrap: 'break-word', overflowWrap: 'break-word', width: '500px' } }} />
        </Box>
      </div>

    );
  } else {
    return <span> Loading... </span>
  }
};

export default Datagrid;
