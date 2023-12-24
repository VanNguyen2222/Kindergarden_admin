import AddAlertIcon from "@mui/icons-material/AddAlert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { ClassesContex } from "context/ClassesProvider";
// import { StudentsContext } from "context/StudentsProvider";
import * as React from "react";
// import { useNavigate } from "react-router-dom";
import { PaymentsContext } from "../context/PaymentsProvider";
import "./Dashboard.scss";
import ListRouter from "./ListRouter";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent({ children }) {
  const paymentsContext = React.useContext(PaymentsContext);
  // const studentsContext = React.useContext(StudentsContext);
  // const classesContext = React.useContext(ClassesContex);
  const [open, setOpen] = React.useState(true);
  // const navigate = useNavigate();
  const [openAlert, setOpenAlert] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // React.useEffect(()=>{
  //   const time=new Date();
  //   if(paymentsContext){

  //     const countPay=paymentsContext.length;
  //      setPresentAlert(item=>({...item,countPay,time}));
  //     localStorage.setItem('presentAlert', JSON.stringify(presentAlert,time));
  //     console.log(time,"time");
  //   }
  // },[countAlert,presentAlert,newAlert,paymentsContext])
  React.useEffect(() => {
    if (paymentsContext) {
      const sortDate = paymentsContext
        .slice()
        .sort((a, b) => (a.time = b.time));
      console.log(sortDate, "sortDate");
    }
  }, [paymentsContext]);
  // const handleIMG = (item, index) => {
  //   if (studentsContext && item) {
  //     const map = studentsContext.find((student) => {
  //       if (student.id === item.studentId) return student;
  //       return "";
  //     });
  //     return map;
  //   }
  // };
  // const handleClass = (item, index) => {
  //   if (classesContext && item) {
  //     const map = classesContext.find((clas) => {
  //       if (clas.id === item.classId) return clas;
  //       return "";
  //     });
  //     return map;
  //   }
  // };
  // const handleCLickLink = (e, id) => {
  //   e.preventDefault();
  //   navigate(`/classes/${id}`);
  //   setOpenAlert(false);
  // };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton
              color="inherit"
              className="icon-alert"
              onClick={() => setOpenAlert(true)}
            >
              <Badge badgeContent={1} color="secondary">
                <AddAlertIcon />
              </Badge>
            </IconButton>
            {openAlert && (
              <div
                className="header__notify"
                onBlur={() => setOpenAlert(false)}
              >
                <header className="header__notify-header">
                  <h3>New notification received</h3>
                </header>
                {/* <ul className="header__notify-list">
                  {paymentsContext &&
                    paymentsContext.map((item, index) => (
                      <li
                        className="header__notify-item header__notify-item--viewed"
                        key={index}
                      >
                        <a
                          onClick={(e) => handleCLickLink(e, item.classId)}
                          href="#"
                          className="header__notify-link"
                        >
                          <img
                            src={handleIMG(item, index).photoURL}
                            alt=""
                            className="header__notify-img"
                          />
                          <div className="header__notify-info">
                            <span className="header__notify-name">
                              {handleIMG(item, index).name} has signed up for{" "}
                              {handleClass(item, index).name} class
                            </span>
                            <span className="header__notify-description">
                              Request is pending approval
                            </span>
                          </div>
                        </a>
                      </li>
                    ))}
                </ul> */}
                {/* <footer className="header__notify-footer">
                  <a href="" className="header__notify-footer-btn">
                    Xem tất cả
                  </a>
                </footer> */}
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ overflow: "hidden" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <ListRouter />
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {children}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                ></Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard({ children }) {
  return <DashboardContent>{children}</DashboardContent>;
}
