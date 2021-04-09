import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useStyles from "./style";

import {
  useHistory,
  Route,
  Switch,
  Link as RouterLink,
} from "react-router-dom";

//メニュー
import routes from "../config/routes";

function Header(props) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={props.toggle}
        className={classes.menuButton}
      >
        <MenuIcon />
        </IconButton>
        <Switch>
          {routes.map((route, index) => {
            return route.name ? (
              <Route key={index} path={route.path} exact={route.exact}>
                <Typography>{route.name}</Typography>
              </Route>
            ) : null;
          })}
        </Switch>
    </Toolbar>
  </AppBar>
  );

};

export default Header;