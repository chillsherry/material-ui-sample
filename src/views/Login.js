import React, { useContext, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {Redirect} from "react-router-dom";
import useStyles from "../Layout/style";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { UserContext } from "../store/userStore";
import { firebase } from "../config/firebase";

//アラート
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

//バリデーションスキーマ
const validationSchema = yup.object().shape({
  email: yup.string().email("メールアドレスの形式で入力してください").required("入力してください"),
  password: yup.string().required("入力してください")
});

const Login = () => {
  const classes = useStyles();
  const defaultValues = {
    email: "",
    password: ""
  }
  const { handleSubmit, formState: { errors }, control } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onTouched", //"onSubmit"は送信時,"onChange"に変更すると入力のたびにvalidate
    reValidateMode: "onChange"
  });
  const { state } = useContext(UserContext);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState("error");
  const [display, setDisplay] = useState(false);

  if (state.uid) {
    return <Redirect to="/" />
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDisplay(false);
  }

  const onSubmit = async (data) => {
    try {
      const authret = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      if (authret.user) {
        return <Redirect to="/" />
      } else {
        setMessage("ログインできません。ログイン情報を確認してください。");
        setSeverity("error");
        setDisplay(true);
      }
    } catch(e) {
      setMessage(`ログイン中にエラーが発生しました。${e.message}`);
      setSeverity("error");
      setDisplay(true);
    } 
  }


  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.loginbase}>
          <Typography component="h2" variant="h5">
            ログイン
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) =>
                <TextField
                  {...field}
                  label="メールアドレス"
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) =>
                <TextField
                  {...field}
                  label="パスワード"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />}
            /><Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.formcontrol}
            >
              サインイン
        </Button>
          </form>
        </div>
        <Snackbar
          open={display}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
      </Container>
    </div>
  )
}

export default Login;
