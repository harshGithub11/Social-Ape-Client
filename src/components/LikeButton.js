import React from "react";

import { Link } from "react-router-dom";

//Material UI Icons
import FavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteBorder from "@material-ui/icons/FavoriteBorder";

//Redux
import { useSelector, useDispatch } from "react-redux";

//Scream Actions
import {
  likeScreamsAction,
  unlikeScreamAction,
} from "../redux/actions/dataAction";

import MyButton from "../util/MyButton";

const LikeButton = (props) => {
  const { authenticated, likes } = useSelector((state) => state.user);

  const { screamId } = props;

  const dispatch = useDispatch();

  const likeScream = (screamId) => dispatch(likeScreamsAction(screamId));
  const unlikeScream = (screamId) => dispatch(unlikeScreamAction(screamId));

  //Checking whether logged in user has liked the scream
  const hasLiked = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) return true;
    else return false;
  };
  const handleOnLike = () => {
    likeScream(screamId);
  };
  const handleOnUnlike = () => {
    unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavouriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : hasLiked() ? (
    <MyButton tip="Undo Like" onClick={handleOnUnlike}>
      <FavouriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleOnLike}>
      <FavouriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

export default LikeButton;
