import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useUser } from '../../Context/UserContext';
import { getParcels } from '../../Services/Users/GetParcels';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import ParcelDetails from '../ParcelDetails';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:5000";
var socket;

function SenderDashboard() {
    const [parcelData, setParcelData] = useState({
        currentParcels: 0,
        totalParcels: 0,
        recentOrders: [],
    });
    const [loading, setLoading] = useState(false);

    const [viewOrder, setViewOrder] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);


    const handleOpen = (order) => {
        setViewOrder(order);
    };

    const handleClose = () => {
        setViewOrder(null);
    };

    const { currentParcels, totalParcels, recentOrders } = parcelData;
    const { user } = useUser();

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("senderConnected", user.id);
        socket.on("connection", () => setSocketConnected(true));
    }, []);

    useEffect(() => {
        socket.emit("senderConnected", user.id);
        const handleUpdateOrders = (parcelData) => {
            setParcelData(parcelData);
        };
        socket.on('update recent orders for sender after biker selection', handleUpdateOrders)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getParcels(user.id, user.token);
                setParcelData(result);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch parcel data:', error);
                // Log the entire error object, including response data
                console.error('Error details:', error.response);
            }
        };
        fetchData();
    }, [user.id, user.token]);


    return (
        <Container>
            <Container sx={{ display: 'flex' }}>
                <Grid item xs={12} md={6} lg={6} sx={{ marginTop: 3, marginRight: 3 }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 90,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Current Orders
                        </Typography>
                        <Typography component="p" variant="h5">
                            {loading ? (<CircularProgress />) : (<>{currentParcels} parcels</>)}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ marginTop: 3, marginLeft: 3 }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 90,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Total Orders
                        </Typography>
                        <Typography component="p" variant="h5">
                            {loading ? (<CircularProgress />) : (<>{totalParcels} parcels</>)}
                        </Typography>
                    </Paper>
                </Grid>
            </Container>
            <Grid item sx={{ margin: 3 }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 315,
                        overflowY: 'auto'
                    }}
                >
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Recent Orders
                    </Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>Pick up address</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Drop off address</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Pick Up Date</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Delivery Date</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Order status</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Open Order</TableCell>
                                </TableRow>
                            </TableHead>
                            {recentOrders.length !== 0 ? (
                                <TableBody>
                                    {recentOrders.map((order) => (
                                        <TableRow key={order.parcelId}>
                                            <TableCell>{order.pickUpAddress}</TableCell>
                                            <TableCell>{order.dropOffAddress}</TableCell>
                                            <TableCell>{!order.parcelTimeStamps.pickUpDate ? "Not Assigned" : order.parcelTimeStamps.pickUpDate}</TableCell>
                                            <TableCell>{!order.parcelTimeStamps.deliveryDate ? "Not Assigned" : order.parcelTimeStamps.deliveryDate}</TableCell>
                                            <TableCell>{order.currentStatus}</TableCell>
                                            <TableCell>
                                                <Button color='info' variant='contained' size="small" onClick={() => handleOpen(order)}>Show Order</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell>No item</TableCell>
                                        <TableCell>No item</TableCell>
                                        <TableCell>No item</TableCell>
                                        <TableCell>No item</TableCell>
                                        <TableCell>No item</TableCell>
                                        <TableCell>No item</TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    )}
                    {viewOrder && (
                        <ParcelDetails open={true} handleClose={handleClose} order={viewOrder} />
                    )}
                </Paper>
            </Grid>
        </Container>
    );
}

export default SenderDashboard;
