import React, { Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { useTheme } from '@material-ui/core/styles';
import { Route, NavLink as RouterLink, Switch } from "react-router-dom";

//パーツ
import Header from "./Header";
import Footer from "./Footer";
//スタイル
import useStyles from "./style";
//メニュー
import routes from "../config/routes";

//ナビメニュー
const ListItemDropDown = (props) => {
  const { item } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => setOpen(!open);
  const classes = useStyles();

  return (
    <>
      {item.display ? (
        <ListItem button onClick={handleClick} to={item.path} component={React.forwardRef((props, ref) => <RouterLink {...props} />)} >
          <ListItemText primary={item.name} />
          {item.child ? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
      ) : null}
      {
        item.child ? (
          <>
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                {item.child.map((subitem) => {
                  return subitem.display ?
                    <ListItem button key={`${item.name}-${subitem.name}`} to={subitem.path} component={React.forwardRef((props, ref) => <RouterLink {...props} />)} >
                    <ListItemText primary={subitem.name} className={classes.nested} />
                  </ListItem> : null;
                })}
              </List>
            </Collapse>
          </>
        ) : null}
    </>

  )
}

function Layout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {routes.map((item, index) => (
          <ListItemDropDown key={index} item={item}/>
        )
        )}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <Header toggle={handleDrawerToggle} />
      <nav className={classes.drawer}>
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
            <Suspense fallback={<div>loading...</div>}>
              <Switch>
                {routes.map((route, index) => {
                  return route.component ? (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      render={() => <route.component/>}
                    />
                  ) : null
                })}
                {routes.map((route, index) => {
                  return route.child && route.child.map((subroute, subindex) => subroute.component ?
                    <Route key={`sub-${subindex}`} path={subroute.path} exact={subroute.exact} render={() => <subroute.component />} />
                    : null
                  )
                })}
                </Switch>
            </Suspense>
        <Footer />
        </Container>
      </main>
      </div>
      </>
  );
}

export default Layout;