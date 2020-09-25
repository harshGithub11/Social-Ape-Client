import React, { Fragment } from 'react';
import NoImg from '../images/noImage.png';

//Material UI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

//Material UI Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
    ...theme.spreadThis,
    handle: {
        height: 15,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100%',
        marginBottom: 10
    }
})

const ProfileSkeleton = (props) => {
    
    const { classes } = props;
    
    return(
        <Paper className = { classes.paper } >
            <div className = { classes.profile }>
                <div className = "image-wrapper">
                    <img src = { NoImg } alt = "profile" className = "profile-image" />
                </div>
                <hr />
                <div className = "profile-details">
                        <div className = { classes.handle }></div>
                        <div className = { classes.fullLine }></div>
                        <div className = { classes.fullLine }></div>
                        <LocationOn color = "primary" /> <span>Location</span>
                        <hr />
                        <LinkIcon color = "primary" /> https://website.com
                        <hr />
                        <CalendarToday color = "primary" /> Joined Date
                </div>
            </div>
        </Paper>
    )
};

export default withStyles(styles)(ProfileSkeleton);