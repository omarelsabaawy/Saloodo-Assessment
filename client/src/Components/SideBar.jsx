import React from 'react';
import { Paper, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';

function SideBar({ userType }) {
    const navigate = useNavigate();
    const { logout } = useUser();

    return (
        userType === 'sender' ? (
            <Paper sx={{ backgroundColor: "#fcfcfc" }}>
                <ListItemButton sx={{ padding: 6 }} onClick={() => navigate('/User/dashboard')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <Divider />
                <ListItemButton sx={{ padding: 6 }} onClick={() => navigate('/User/createNewOrder')}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create new Order" />
                </ListItemButton>
                <Divider />
                <ListItemButton sx={{ padding: 6 }} onClick={() => navigate('/User/previousOrders')}>
                    <ListItemIcon>
                        <MarkunreadMailboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Previous Orders" />
                </ListItemButton>
                <Divider />
                <ListItemButton sx={{ padding: 6 }} onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
                <Divider />
            </Paper>
        ) : (
            <Paper sx={{ backgroundColor: "#fcfcfc" }}>
                <ListItemButton sx={{ padding: 6 }} onClick={() => navigate('/Captain/dashboard')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <Divider />
                <ListItemButton sx={{ padding: 6 }} onClick={() => navigate('/Captain/inprogress')}>
                    <ListItemIcon>
                        <LocalShippingIcon />
                    </ListItemIcon>
                    <ListItemText primary="In progress" />
                </ListItemButton>
                <Divider />
                <ListItemButton sx={{ padding: 6 }} onClick={() => navigate('/Captain/pastOrders')}>
                    <ListItemIcon>
                        <MarkunreadMailboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Past orders" />
                </ListItemButton>
                <Divider />
                <ListItemButton sx={{ padding: 6 }} onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
                <Divider />
            </Paper>
        )
    );
}

export default SideBar