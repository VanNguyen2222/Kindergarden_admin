import InboxIcon from "@mui/icons-material/Inbox";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import PropTypes from "prop-types";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

// const routeLinkConfig = [
//   {
//     to: "/courses",
//     icon: <InboxIcon />,
//   },
//   {
//     to: "/classes",
//     icon: <DraftsIcon />,
//   },
//   {
//     to: "/students",
//     icon: <DraftsIcon />,
//   },
//   {
//     to: "/teachers",
//     icon: <DraftsIcon />,
//   },
// ];

function ListItemLink(props) {
  const { icon, primary, to, onListItemClick, selectedIndex, index } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem
        button
        component={renderLink}
        onClick={(e) => {
          onListItemClick(e, index);
        }}
        selected={selectedIndex === index}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function ListRouter() {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <Box sx={{ width: 360 }}>
      <Paper elevation={0}>
        <List aria-label="main mailbox folders">
          <ListItemLink
            onListItemClick={handleListItemClick}
            selectedIndex={selectedIndex}
            index={0}
            to="/courses"
            primary="COURSES"
            icon={<InboxIcon />}
          />
          <ListItemLink
            onListItemClick={handleListItemClick}
            selectedIndex={selectedIndex}
            index={1}
            to="/classes"
            primary="CLASSES"
            icon={<CameraIndoorIcon />}
          />
        </List>
        <Divider />
        <List aria-label="secondary mailbox folders">
          <ListItemLink
            onListItemClick={handleListItemClick}
            selectedIndex={selectedIndex}
            index={2}
            to="/students"
            primary="STUDENTS"
            icon={<SchoolIcon />}
          />
          <ListItemLink
            onListItemClick={handleListItemClick}
            selectedIndex={selectedIndex}
            index={3}
            to="/teachers"
            primary="TEACHERS"
            icon={<AccountCircleIcon />}
          />
        </List>
        <Divider />
        <List>
          <ListItemLink
            onListItemClick={handleListItemClick}
            selectedIndex={selectedIndex}
            index={3}
            to="/contacts"
            primary="CONTACTS"
            icon={<ContactSupportIcon />}
          />
        </List>
      </Paper>
    </Box>
  );
}
