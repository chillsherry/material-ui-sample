import React, { Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { Route, NavLink as RouterLink, Switch } from "react-router-dom";

//パーツ
import Header from "./Header";
import Footer from "./Footer";
//スタイル
import useStyles from "./style";
//メニュー
import routes from "../config/routes";

function Layout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {routes.map((item, index) => (
          <ListItem key={index} button component={props => <RouterLink {...props} to={item.path} />} >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header toggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* ナビメニュー */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {/**コンテンツエリア */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg" >
          <div>
            <Suspense fallback={loading}>
              <Switch>
                {routes.map((route, index) => {
                  return route.component ? (
                    <Route key={index} path={route.path} exact={route.exact} render={(props) => <route.component />} />
                  ) : null;
                })}
              </Switch>
            </Suspense>
          </div>
        <Footer />
        </Container>
      </main>
    </div>
  );
}

export default Layout;