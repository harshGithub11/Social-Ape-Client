import React, { Fragment } from "react";
import PropTypes from "prop-types";

//importing a Component
import EditProfile from "./EditProfile";

//react-router-dom
import { Link } from "react-router-dom";

//Material UI Stuffs
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MaterialUiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//Icons from Material UI
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

//Redux Stuffs
import { useSelector, useDispatch } from "react-redux";

//importing from useraction
import { uploadImageAction, logOutUserAction } from "../redux/actions/userAction"; 

//dayjs
import dayjs from "dayjs";
import MyButton from "../util/MyButton";

const styles = (theme) => ({
  paper: {
    marginTop: 20,
    marginRight: 20,
    padding: 20,
  },
  buttons: {
    textAlign: "center",
    margin: 10,
    "& : hover": {
      margin: "0 0 10px 0",
    },
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
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
});

const Profile = (props) => {
  const user = useSelector((state) => state.user);
  const { credentials: {
    handle,
    createdAt,
    imageURL,
    bio,
    website,
    location,
  }, loading, authenticated } = user;
  //   user: {
  //     credentials: { handle, createdAt, imageURL, bio, website, location },
  //     loading,
  //     authenticated
  //     }
  const { classes } = props;

  const dispatch = useDispatch();

  const uploadImage = (formData) => dispatch(uploadImageAction(formData)); 

  const handleImageChange = (event) => {
    console.log(event.target.files);
    const image = event.target.files[0];
    console.log(image);
    console.log(image.name);
    const formData = new FormData();
    formData.append('image', image, image.name); 
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const logOut = () => dispatch(logOutUserAction());
  const handleLogOut = () =>{
    logOut();
  }

  let profileMarkUp = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageURL} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <MyButton tip = "Edit Profile Picture" onClick = {handleEditPicture} btnClassName = "button">
              <EditIcon color = "primary" />
            </MyButton>
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
          <MyButton tip = "Logout" onClick = {handleLogOut}>
            <KeyboardReturn color="primary" />
            </MyButton>
          <EditProfile />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
          <div>
            <Button
              className={classes.buttons}
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              className={classes.buttons}
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </div>
        </Typography>
      </Paper>
    )
  ) : (
    <p>Loading....</p>
  );

  return profileMarkUp;
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
