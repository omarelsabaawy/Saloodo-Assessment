import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useUser } from '../../Context/UserContext';
import { createNewParcel } from '../../Services/Users/CreateParcel';
import { useNavigate } from 'react-router-dom';
import ws from '../../Socket';


function CreateNewParcel() {
    const [pickUpAddress, setPickUpAddress] = useState("");
    const [dropOffAddress, setDropOffAddress] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state

    const { user } = useUser();
    const navigate = useNavigate();

    console.log(ws.id)

    const handleCreateParcel = async (e) => {
        e.preventDefault();

        try {
            setLoading(true); // Set loading to true when request starts

            const parcelData = {
                pickUpAddress,
                dropOffAddress,
            }

            const result = await createNewParcel(parcelData, user.token);

            if (result.success) {

                ws.emit('createdParcel', result.newParcel);

                navigate('/User/dashboard');
            }

        } catch (error) {
            console.error('Failed to create a new parcel:', error);
        } finally {
            setLoading(false); // Set loading to false when request completes (either success or error)
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, backgroundColor: '#fcfcfc' }}>
                    <LocalShippingIcon fontSize='medium' style={{ color: 'black' }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    New parcel
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="pickUpAddress"
                    label="Pick up address"
                    name="pickUpAddress"
                    type='text'
                    value={pickUpAddress}
                    autoComplete="pickUpAddress"
                    onChange={(e) => setPickUpAddress(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dropOffAddress"
                    label="Drop Off address"
                    name="dropOffAddress"
                    type='text'
                    value={dropOffAddress}
                    autoComplete="dropOffAddress"
                    onChange={(e) => setDropOffAddress(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color='primary'
                    sx={{ mt: 1, mb: 2 }}
                    onClick={handleCreateParcel}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : <><AddIcon /> new Parcel</>}
                </Button>
            </Box>
        </Container>
    );
}

export default CreateNewParcel;
