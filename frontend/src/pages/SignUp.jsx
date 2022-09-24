import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LoginService from "../services/users.js";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [register, setRegister] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    type: 0,
  });

  const handleChange = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    const res = await LoginService.registerUser(register);
    if (res.status === 0) {
      history.push("/login");
    } else {
      console.log(res.error);
      setRegister({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        type: 0,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome / स्वागत है आपका
          <img
            src="https://c.tenor.com/eYRNL1In-ooAAAAM/namaste-covid.gif"
            height={20}
            width={20}
            alt="Hands Join"
          />
          <br />
          <hr></hr>
        </Typography>
        <Typography component="h1" variant="h5">
          <br />
          Create Account / खाता बनाएं
        </Typography>
        <ValidatorForm onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                onChange={handleChange}
                value={register.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                validators={["required"]}
                errorMessages={["This field is required"]}
                fullWidth
                id="firstName"
                label="First Name / पहला नाम"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                onChange={handleChange}
                value={register.lastName}
                variant="outlined"
                validators={["required"]}
                errorMessages={["This field is required"]}
                fullWidth
                id="lastName"
                label="Last Name / सरनेम"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                onChange={handleChange}
                value={register.email}
                variant="outlined"
                validators={["required", "isEmail"]}
                errorMessages={["This field is required", "email is not valid"]}
                fullWidth
                id="email"
                label="Email Address / ईमेल पता"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                onChange={handleChange}
                value={register.password}
                variant="outlined"
                validators={["required"]}
                errorMessages={["This field is required"]}
                fullWidth
                name="password"
                label="Password / पासवर्ड"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">
                  Type / कार्य का प्रकार
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name="type"
                  value={register.type}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Maid / नौकरानी</MenuItem>
                  <MenuItem value={1}>HouseOwner / मकानदार</MenuItem>
                </Select>
                <FormHelperText>Select / चुने</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
                <br />
                खाता मौजूद है? लॉग इन करें
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

const App = () => {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
};

export default App;
