import React from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../images/ape.jpg';
import Link from 'react-router-dom/Link'
//using history object
import { useHistory } from 'react-router';

//Importing axios package to send the request to server
import axios from 'axios';
//Material UI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadThis  
})
function Login(props) {
    const { classes } = props;
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        loading: false,
        errors: {}
    });
    const history = useHistory();
    function handleSubmit(event) {
        event.preventDefault();
        setFormData(prevValue => {
            return {
                email: prevValue.email,
                password: prevValue.password,
                loading: true,
                errors: ""
            }
        });
        //console.log(formData);
        const userData = {
            email: formData.email,
            password: formData.password
        }
        
        axios.post("/login", userData)
            .then(result => {
                //console.log(result.data);
                localStorage.setItem('FBIdToken', `Bearer ${result.data.token}`);
                setFormData(prevValue => {
                    return {
                        email: prevValue.email,
                        password: prevValue.password,
                        loading: false,
                        errors: ""
                    }
                });    
                history.push("/");
            })
            .catch(error => {
                setFormData(prevValue =>{
                    return {
                        email: prevValue.email,
                        password: prevValue.password,
                        loading: false,
                        errors: error.response.data
                    }
                });
            })
    }
    function handleChange(event) {
        const{ name, value } = event.target;
        if(name === "email"){
            setFormData(prevValue => {
                return {
                    email: value,
                    password: prevValue.password,
                    loading: false,
                    errors: ""
                }
            });
        }
        else if(name === "password"){
            setFormData(prevValue => {
                return {
                    email: prevValue.email,
                    password: value,
                    loading: false,
                    errors: ""
                }
            });
        }
    };
    const {errors, loading} = formData;

    return ( 
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm >
                <img src={AppIcon} alt="ape" className={classes.appIcon} />
                <Typography variant="h3" className={classes.pageTitle} >
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        name="email" type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={formData.email} 
                        onChange={handleChange} 
                        fullWidth 
                    />
                    <TextField 
                        id="password" 
                        name="password" 
                        type="password"  
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={formData.password} 
                        onChange={handleChange} 
                        fullWidth 
                    />
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                           {errors.general} 
                        </Typography>
                    )}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button} 
                        disabled ={loading}
                    >   LOGIN 
                    </Button>
                    {loading && (
                            <CircularProgress className={classes.progress} size={15}/>
                    )}
                    <br />
                    <small>Don't have an account ? Sign Up <Link to="/signup">here</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Login);