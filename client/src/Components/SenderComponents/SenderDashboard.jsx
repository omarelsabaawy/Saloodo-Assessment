import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useUser } from '../../Context/UserContext';
import { getParcels } from '../../Services/Users/GetParcels';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

function SenderDashboard() {
    const [parcelData, setParcelData] = useState({
        currentParcels: 0,
        totalParcels: 0,
        recentOrders: [],
    });
    const [loading, setLoading] = useState(false);

    const { currentParcels, totalParcels, recentOrders } = parcelData;
    const { user } = useUser();

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
                                    <TableCell sx={{ fontWeight: "bold" }}>Captain name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Captain phone number</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Parcel status</TableCell>
                                </TableRow>
                            </TableHead>
                            {recentOrders.length !== 0 ? (
                                <TableBody>
                                    {recentOrders.map((order) => (
                                        <TableRow key={order.parcelId}>
                                            <TableCell>{order.pickUpAddress}</TableCell>
                                            <TableCell>{order.dropOffAddress}</TableCell>
                                            <TableCell>{order.biker}</TableCell>
                                            <TableCell>{order.bikerPhoneNumber}</TableCell>
                                            <TableCell>{order.currentStatus}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableCell>No item</TableCell>
                                    <TableCell>No item</TableCell>
                                    <TableCell>No item</TableCell>
                                    <TableCell>No item</TableCell>
                                    <TableCell>No item</TableCell>
                                </TableBody>
                            )}
                        </Table>
                    )}
                </Paper>
            </Grid>
        </Container>
    );
}

export default SenderDashboard;
