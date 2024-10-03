import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { Loader } from 'lucide-react';

function ConfirmationDialog({ open, handleClose, handleConfirm, message, title, loading ,loadingmessage}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title" color="error">

                {loading ? null : title} {/* Hide title while loading */}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px', width: '100%' }}>
                            {loadingmessage}   <Loader className="ml-1 animate-spin" />
                        </div>
                    ) : (
                        message
                    )}
                </DialogContentText>
            </DialogContent>


            {/* <DialogActions>
                <Button autoFocus onClick={handleClose} >
                    Cancel
                </Button>
                <Button onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions> */}

            {!loading && ( // Hide buttons while loading
                <DialogActions>
                    <Button onClick={handleClose}  variant="outlined"  size="medium">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="error" variant="outlined"  size="medium">
                        Confirm
                    </Button>
                </DialogActions>
            )}


        </Dialog>
    );
}

export default ConfirmationDialog;
