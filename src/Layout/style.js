import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 200;
const useStyles = makeStyles((theme) => (
  {
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  loginbase: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formcontrol: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}
));

export default useStyles;