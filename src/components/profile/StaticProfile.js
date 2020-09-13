import React , { Fragment } from 'react';

//React Router DOM 
import { Link } from 'react-router-dom';

//Material UI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialUiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'; 
import Typography from '@material-ui/core/Typography';

//Material UI Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

//dayjs
import dayjs from 'dayjs';

const styles = (theme) => ({
    paper: {
      marginTop: 20,
      marginRight: 20,
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: theme.palette.primary.main,
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0", 
      },
    },
  });

  const StaticProfile = (props) => {
    
    const { classes, profile: {handle, createdAt, imageURL, bio, website, location } } = props;

    return(
        <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageURL} alt="profile" className="profile-image" />
            
          </div>
          <hr />
          <div className="profile-details">
            <MaterialUiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MaterialUiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    )

  };

 export default withStyles(styles)(StaticProfile); 
