import React, { useState } from 'react';
import { useUser } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, Grid, TextField } from '@mui/material';
import { selectOrderAndSetTimeStamps } from '../Services/Captains/SelectParcelAndSetTimeStamps';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 320,
    backgroundColor: "#1976D2",
    borderColor: "#1976D2",
    color: 'white',
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
};

function SelectParcel({ open, handleClose, order }) {
    const [pickUpDate, setPickUpDate] = useState("");
    const [dropOffDate, setDropOffDate] = useState("");

    const { user } = useUser();

    const navigate = useNavigate();

    const handleSelectOrder = async (e) => {
        e.preventDefault();
        try {
            const timeStamps = {
                pickUpDate: pickUpDate.split("-").reverse().join("-"),
                deliveryDate: dropOffDate.split("-").reverse().join("-")
            }

            const result = await selectOrderAndSetTimeStamps(timeStamps, order.parcelId, user.token);

            if (result) {
                navigate('/Captain/inProgress');
            }

        } catch (error) {
            console.error("Failed to select this order " + error);
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" sx={{ textAlign: 'center' }} variant="h5">
                        Select This Order
                    </Typography>
                    <Typography id="transition-modal-title" sx={{ textAlign: 'center', marginTop: '20px' }} variant="h6">
                        Order Id {order.parcelId}
                    </Typography>
                    <Grid container sx={{ marginTop: '30px' }}>
                        <Grid sx={{ fontSize: '18px', marginTop: '5px' }} item xs={6} md={6}>
                            Pick up date:
                        </Grid>
                        <Grid sx={{ fontSize: '18px' }} item xs={6} md={6}>
                            <TextField type='date' size="small" value={pickUpDate} onChange={(e) => setPickUpDate(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '30px' }}>
                        <Grid sx={{ fontSize: '18px', marginTop: '5px' }} item xs={6} md={6}>
                            Delivery date:
                        </Grid>
                        <Grid sx={{ fontSize: '18px' }} item xs={6} md={6}>
                            <TextField type='date' size="small" value={dropOffDate} onChange={(e) => setDropOffDate(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '30px', justifyContent: 'center' }}>
                        <Button color="info" variant="contained" onClick={handleSelectOrder}>Select Order</Button>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
}

export default SelectParcel;
