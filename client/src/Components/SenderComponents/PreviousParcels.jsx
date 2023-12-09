import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, CircularProgress } from '@mui/material';
import { useUser } from '../../Context/UserContext';
import { previousParcels } from '../../Services/Users/PreviousParcels';

function PreviousParcels() {
    const [loading, setLoading] = useState(true);
    const [parcelData, setParcelData] = useState({
        parcels: 0,
        previousOrders: [],
    });

    const { parcels, previousOrders } = parcelData;
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await previousParcels(user.id, user.token);
                setParcelData(result);
            } catch (error) {
                console.error('Failed to fetch parcel data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user.id, user.token]);

    return (
        <Container>
            <Container sx={{ display: 'flex' }}>
                <Grid item xs={12} md={6} lg={6} sx={{ marginTop: 3 }}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 90,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Old Orders
                        </Typography>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Typography component="p" variant="h5">
                                {parcels} Orders
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Container>
            <Grid item sx={{ margin: 3 }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 310,
                        overflowY: 'auto'
                    }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Old Orders
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
                            {parcels !== 0 ? (
                                <TableBody>
                                    {previousOrders.map((order) => (
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

export default PreviousParcels;
