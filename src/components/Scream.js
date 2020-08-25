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

import MyButton from '../util/MyButton';

//Material UI Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavouriteIcon from '@material-ui/icons/Favorite';
import FavouriteBorder from '@material-ui/icons/FavoriteBorder';

//Redux
import { useSelector, useDispatch } from 'react-redux';

//Scream Actions
import { likeScreamsAction, unlikeScreamAction} from '../redux/actions/dataAction';

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
    const dispatch = useDispatch();

    //dayjs plugin use
    dayjs.extend(relativeTime);

    //fetching state
    const user = useSelector(state => state.user);
    const { authenticated } = user;
    const likeScream = (screamId) => dispatch(likeScreamsAction(screamId));
    const unlikeScream = (screamId) => dispatch(unlikeScreamAction(screamId));

    const hasLiked = () => {
      if(user.likes && user.likes.find(like => like.screamId === screamId)) 
        return true;
      else 
        return false;
    }
    const handleOnLike = () => {
      likeScream(screamId);
    }
    const handleOnUnlike = () => {
      unlikeScream(screamId);
    }
    const likeButton = !authenticated ? (
      <MyButton tip = "Like">
        <Link to = "/login">
          <FavouriteBorder color = "primary" />
        </Link>
      </MyButton>
    ) : (
      hasLiked() ? (
        <MyButton tip = "Undo Like" onClick = {handleOnUnlike}>
          <FavouriteIcon color = "primary" />
        </MyButton>
      ) : (
        <MyButton tip = "Like" onClick = {handleOnLike}>
          <FavouriteBorder color = "primary" />
        </MyButton>
      )
    )

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
                {likeButton}
                <span> {likeCount} likes </span>
                <MyButton tip ="comments">
                  <ChatIcon color = "primary" />
                </MyButton>
                <span> {commentCount} comments</span>
            </CardContent>
       </Card> 
    )
}

export default Scream;