import React from 'react';
import { Alert, Snackbar } from '@mui/material';


function Snackbaralert({ open, severity, message }) {

    const [openm, setOpenm] = React.useState(open);

  
    let handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenm(false);
    };
    return (
        <Snackbar open={setOpenm} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Snackbaralert;
