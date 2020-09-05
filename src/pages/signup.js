import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../images/ape.jpg';
import Link from 'react-router-dom/Link'

//using history object
import { useHistory } from 'react-router';

//Material UI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//importing Redux Stuffs
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserAction } from '../redux/actions/userAction';

const styles = (theme) => ({
    ...theme.spreadThis  
})

function SignUp(props) {
    const UI = useSelector(state => state.UI);
    const { loading } = UI;

    const { classes } = props;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        handle: "",
        errors: {}
    });

    const history = useHistory();
    const dispatch = useDispatch();
    const signUpUser = (newUserData, history) => dispatch(signUpUserAction(newUserData, history));
    
    useEffect(() => {
        if(UI.errors)
            setFormData(prevValue => ({...prevValue, errors: UI.errors}))
    }, [UI.errors])

    function handleSubmit(event) {
        event.preventDefault();
        //console.log(formData);
        setFormData(prevValue => {
            return{
                ...prevValue,
                loading: true
            }
        })
        const newUserData = {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            handle: formData.handle
        }
        signUpUser(newUserData, history);
    }
    function handleChange(event) {
        const{ name, value } = event.target;
        if(name === "email"){
            setFormData(prevValue => {
                return {
                    ...prevValue,
                    email: value
                }
            });
        }
        else if(name === "password"){
            setFormData(prevValue => {
                return {
                    ...prevValue,
                    password: value,
                    
                }
            });
        }
        else if(name === "confirmPassword"){
            setFormData(prevValue => {
                return {
                    ...prevValue,
                    confirmPassword: value,
                }
            });
        }
        else if(name === "handle"){
            setFormData(prevValue => {
                return {
                    ...prevValue,
                    handle: value
                }
            });
        }
    };
    const { errors } = formData;

    return ( 
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm >
                <img src={AppIcon} alt="ape" className={classes.appIcon} />
                <Typography variant="h3" className={classes.pageTitle} >
                    Sign Up
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
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword" type="password" 
                        label="Confirm Password" 
                        className={classes.textField}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        fullWidth 
                    />
                    <TextField
                        id="handle"
                        name="handle" type="text" 
                        label="Handle" 
                        className={classes.textField}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={formData.handle} 
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
                    >   Sign Up 
                    </Button>
                    {loading && (
                            <CircularProgress className={classes.progress} size={15}/>
                    )}
                    <br />
                    <small>Already have an account ? Login <Link to="/signup">here</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(SignUp);