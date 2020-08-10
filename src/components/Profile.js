import React, {Fragment} from "react";
import PropTypes from "prop-types";

//react-router-dom
import { Link } from 'react-router-dom';

//Material UI Stuffs
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MaterialUiLink from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

//Icons from Material UI
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday  from '@material-ui/icons/CalendarToday';

//Redux Stuffs
import { useSelector } from "react-redux";


//dayjs
import dayjs from 'dayjs';
const styles = (theme) => ({
    paper: {
        marginTop: 20,
        marginRight: 20,
        padding: 20, 
    },
    buttons: {
        textAlign: 'center',
        margin: 10,
        "& : hover": {
            margin: '0 0 10px 0'
        }
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    }
});

const Profile = (props) => {
    const user = useSelector(state => state.user);
    const { credentials : { handle, createdAt, imageURL, bio, website, location }, loading, authenticated} = user;
//   user: {
//     credentials: { handle, createdAt, imageURL, bio, website, location },
//     loading,
//     authenticated
//     }
  const { classes } = props;

  let profileMarkUp = !loading ? (authenticated ? (
  <Paper className= {classes.paper} >
    <div className = { classes.profile } >
        <div className ="image-wrapper" >
            <img src = { imageURL } alt = "profile" className ="profile-image" />
        </div>
        <hr />
        <div className = "profile-details">
            <MaterialUiLink component = { Link } to = {`/users/${handle}`} color = "primary" variant = "h5">
                @{handle}
            </MaterialUiLink>
            <hr/>
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr/>
            {location && (
                <Fragment>
                    <LocationOn color="primary" />
                    <span>{location}</span>
                </Fragment>              
            )}
            {website && (
                <Fragment>
                    <LinkIcon color="primary" />
                    <a href = {website} target = "_blank" rel = "noopener noreferrer">
                        {' '}{website}
                    </a>
                    <hr/>
                </Fragment>
            )}
            <CalendarToday color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
    </div>
  </Paper>) : (
      <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
              No profile found, please login again
              <div >
                  <Button className={classes.buttons} variant="contained" color="primary" component = {Link} to="/login">
                      Login
                  </Button>
                  <Button className={classes.buttons} variant="contained" color="secondary" component = {Link} to="/signup">
                      Sign Up
                  </Button>
              </div>
          </Typography>
      </Paper>
  )) : (<p>Loading....</p>)
  
  return profileMarkUp;
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
