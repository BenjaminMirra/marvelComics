import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ alertCode, alertMessage, open, setOpen }: any) {


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {alertCode === 400 ? (
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="error">{alertMessage}</Alert>
                </Snackbar>
            ) :
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="success">{alertMessage}</Alert>
                </Snackbar>
            }
        </Stack>
    );
}