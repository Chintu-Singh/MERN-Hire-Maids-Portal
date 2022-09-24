import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LoginService from "../services/users.js";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1647381518264-97ff1835026f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    const res = await LoginService.loginUser(login);
    if (res.status === 0) {
      window.localStorage.setItem("Authorization", "Bearer " + res.token);
      history.push("/");
    } else {
      setLogin({
        email: "",
        password: "",
      });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Welcome / स्वागत है आपका
            <img
              src="https://c.tenor.com/eYRNL1In-ooAAAAM/namaste-covid.gif"
              height={50}
              width={50}
              alt="Hands Join"
            />
            <br />
            <hr></hr>
          </Typography>
          <Typography component="h1" variant="h5">
            <br />
            Login / लॉग इन करें
          </Typography>
          <ValidatorForm onSubmit={handleSubmit} className={classes.form}>
            <TextValidator
              variant="outlined"
              margin="normal"
              validators={["required", "isEmail"]}
              errorMessages={["This field is required", "email is not valid"]}
              value={login.email}
              onChange={handleChange}
              fullWidth
              id="email"
              label="Email Address / ईमेल पता"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextValidator
              variant="outlined"
              margin="normal"
              validators={["required"]}
              errorMessages={["This field is required"]}
              value={login.password}
              onChange={handleChange}
              fullWidth
              name="password"
              label="Password / पासवर्ड"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Login
            </Button>

            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account yet? Create account "}
                <br />
                <br />
                {"खाता नहीं है? खाता बनाएं"}
              </Link>
            </Grid>
          </ValidatorForm>
        </div>
      </Grid>
    </Grid>
  );
};

const App = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
