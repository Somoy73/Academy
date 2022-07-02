import { createTheme, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Profile from "../../components/Profile";

const DashboardLayout = (authType) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Header />
      </Grid>
      <Grid item xs={12} md={3} lg={3} sm={3}>
        <Profile />
      </Grid>
      <Grid item xs={12} md={9} lg={9} sm={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
