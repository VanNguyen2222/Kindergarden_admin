import React from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle
} from '@mui/material';

function Confirm(props) {
    const { handleOke, handleClose, open, content, title } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title ? title : "Confirm"}
            </DialogTitle>
            <DialogContent>
                {content ?
                    content :
                    <DialogContentText id="alert-dialog-description">
                        "Are you sure about that ?"
                    </DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleOke} autoFocus color="error">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirm;