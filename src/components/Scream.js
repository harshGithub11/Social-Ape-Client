import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//MaterialUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import MyButton from "../util/MyButton";

//Material UI Icons
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { useSelector } from "react-redux";

//Component import for deleting a scream
import DeleteScream from "./DeleteScream";

//Component import for viewing a scream
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginLeft: 50,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    maxWidth: 600,
    maxHeight: 200,
    position: "relative",
  },
  media: {
    minWidth: 160,
    padding: 10,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
});

function Scream(props) {
  const {
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount,
    },
  } = props;
  const classes = useStyles();

  //dayjs plugin use
  dayjs.extend(relativeTime);

  //fetching state
  const user = useSelector((state) => state.user);
  const {
    credentials: { handle },
    authenticated,
  } = user;

  //Delete Button
  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={userImage}
        title="Profile image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span> {likeCount} likes </span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span> {commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
}

export default Scream;
