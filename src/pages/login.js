import React, {useState, useEffect} from 'react';
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

//Redux Stuff
import { useDispatch } from 'react-redux';
    //importing from userAction
import { loginUserAction } from '../redux/actions/userAction';
    //importing useSelector
import { useSelector } from 'react-redux';

const styles = (theme) => ({
    ...theme.spreadThis  
})

function Login(props) {
    const UI = useSelector(state => state.UI);
    //console.log(UI);
    const { loading } = UI;
    const { classes } = props;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        errors: {}
    });
    const history = useHistory();
    
    const dispatch = useDispatch();

    //const loginUser = useActions((userData, history) => loginUserAction(userData, history)); ------useActions has been removed
    const loginUser = (userData, history) => dispatch(loginUserAction(userData, history));
    
    useEffect(() => {
        if(UI.errors)
            setFormData(prevValue => ({...prevValue, errors: UI.errors}))
    }, [UI.errors])

    function handleSubmit(event) {
        event.preventDefault();
        //console.log(formData);
        const userData = {
            email: formData.email,
            password: formData.password
        }
        loginUser(userData, history);
    }
    function handleChange(event) {
        const{ name, value } = event.target;
        if(name === "email"){
            setFormData(prevValue => {
                return {
                    email: value,
                    password: prevValue.password,
                    errors: ""
                }
            });
        }
        else if(name === "password"){
            setFormData(prevValue => {
                return {
                    email: prevValue.email,
                    password: value,
                    errors: ""
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