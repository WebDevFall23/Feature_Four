import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import GrassIcon from '@mui/icons-material/Grass';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { checkUser} from "../Auth/AuthService";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import {
    getAllPlants,
  } from "../../Common/Services/PlantService";
import UserLogOut from "../Auth/AuthLogout"

const titleTheme = createTheme({
    typography: {
    letterSpacing: 20,
      fontFamily: [
        'Satisfy',
        'cursive',
      ].join(','),
    },});
const backgroundTheme = createTheme({
    palette: {
        background: {
            default: "#c4c9a6"
        }
    },
});
const buttonTheme = createTheme({
    palette: {
        purple: {
            main: '#491965',
            light: '#9f4a9d',
            dark: '#550f5d',
            contrastText: '#fff',
        },
    },
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Plant Finder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.


export default function Album() {
    const defaultTheme = createTheme();
  const [plants, setPlants] = useState([]);
  const [plant, setPlant] = useState([]);
  const [name, setName] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(checkUser);
// UseEffect to run when the page loads to
// obtain async data and render
useEffect(() => {
  getAllPlants().then((plants) => {
    console.log(plants);
    setPlants(plants);
  });
}, []);
  return (
    <ThemeProvider theme={backgroundTheme}>
      <CssBaseline />
      <ThemeProvider theme={buttonTheme}>
      <AppBar position="relative" color="purple" >
        <Toolbar>
          <GrassIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="white" sx={{ flexGrow: 1 }} noWrap>
            Home
          </Typography>
          <ThemeProvider theme={buttonTheme}>
            <UserLogOut />
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: '#76866a',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
          <ThemeProvider theme={titleTheme}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="white"
              fontWeight = "Bold"
              gutterBottom
            >
              Plant Finder
            </Typography>
            </ThemeProvider>
            <Typography variant="h5" align="center" color="white" paragraph>
              Browse plant dictionary
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            <ThemeProvider theme={buttonTheme}>
            <Button component={Link} to="/auth/login" variant="contained" color="purple" disabled={userLoggedIn}>
                Login
            </Button>
            <Button component={Link} to="/auth/register" variant="contained" color="purple" disabled={userLoggedIn}>
                Register
            </Button>
            <Button component={Link} to="/profile" variant="contained" color="purple">
                Profile
            </Button>
            </ThemeProvider>
            </Stack>

          </Container>
        </Box>
        <div>
      <div>
        {plants.length > 0 && (
          <ul>
            {plants.map((plant, index) => (
              <div>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {plants.map((plant) => (
              <Grid item key={plant.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={plant.get('imageLink')}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" fontWeight = "Bold">
                      {plant.get("name")}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h3" color = "GrayText">
                      {plant.get("scientificName")}
                    </Typography>
                    <Typography>
                      {plant.get('description')}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* Link to the plant's individual page at the bottom of the card */}
                  <ThemeProvider theme={buttonTheme}>
                  <Link to={`/plant/${plant.id}`}>
                    View
                  </Link>
                  </ThemeProvider>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Plant Finder
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Find your perfect plant
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}