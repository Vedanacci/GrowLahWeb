import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import { deepPurple } from "@material-ui/core/colors";
import logo from './logo.png';
const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button style={{
            color: "green",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "20px",
            boxShadow: "3px 3px 4px 2px #999",
            alignItems: "center",
          }} color="transparent" href="#" className={classes.title}>
            <div style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}
            >GrowLah Dashboard</div>
            <div style={{
              fontWeight: "400",
              display: "flex",
              alignItems: "center",
            }}>GrowLah
              <div>
                <img style={{
                  width: "50px",
                  marginLeft: "5px",
                }} src={logo} />
              </div>
            </div>


          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
