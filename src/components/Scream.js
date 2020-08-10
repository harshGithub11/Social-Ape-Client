import React from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//MaterialUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      display: 'flex',
      marginLeft: 50,
      marginTop: 20,
      marginRight: 20,
      marginBottom: 20,
      maxWidth: 600,
      maxHeight: 200
    },
    media: {
      minWidth: 100,
      padding: 20
    },
    content: {
        padding: 25,
        objectFit: "cover"
    }
  });

function Scream(props){
    const { scream:{ body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = props;
    const classes = useStyles();
    
    //dayjs plugin use
    dayjs.extend(relativeTime);

    return(
       <Card className={classes.root}>
           <CardMedia 
            className={classes.media}
            image={userImage}
            title="Profile image" 
           />
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
            </CardContent>
       </Card> 
    )
}

export default Scream;