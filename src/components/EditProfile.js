import React, { Fragment } from "react";
import PropTypes from "prop-types";

//Material UI Stuffs
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//Material UI Icons
import EditIcon from "@material-ui/icons/Edit";

//Redux Stuffs
import { editUserDetailsAction } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
      float: "right"
  }
});

const EditProfile = (props) => {
  
  const user = useSelector((state) => state.user);
  const { credentials } = user;
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    bio: "",
    website: "",
    location: "",
  });

  const dispatch = useDispatch();
  const editUserDetails = (userDetails) => dispatch(editUserDetailsAction(userDetails));

  const setUserDetailState = (credentials) => {
    setUserDetails({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  React.useEffect(() => {
    setUserDetailState(credentials);
  }, [credentials]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    if(name === "bio"){
        setUserDetails(prevValue => ({...prevValue, bio: value}));
    }
    else if(name === "website"){
        setUserDetails(prevValue => ({...prevValue, website: value}));
    }
    else if(name === "location"){
        setUserDetails(prevValue => ({...prevValue, location: value}));
    }
  }

  const handleSubmit = () => {
      const details = {
          bio: userDetails.bio,
          website: userDetails.website,
          location: userDetails.location,
      }
      editUserDetails(details);
      handleClose();
  }

  const handleOpen = () => {
    setOpen(true);
    setUserDetailState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Tooltip title="Edit Details" placement="top">
        <IconButton onClick={handleOpen} className={classes.button}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle> Edit Your Details </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={userDetails.bio}
              onChange={handleChange}
              fullWidth
              color = "primary"
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={userDetails.website}
              onChange={handleChange}
              fullWidth
              color = "primary"
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={userDetails.location}
              onChange={handleChange}
              fullWidth
              color = "primary"
            />
          </form>
        </DialogContent>
        <DialogActions>
            <Button onClick = {handleClose} color = "primary">
                Cancel
            </Button>
            <Button onClick = {handleSubmit} color = "primary">
                Save
            </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);
