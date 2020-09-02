import React, {Fragment} from 'react';

import MyButton from '../util/MyButton';

//Material UI 
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

//Material UI Icons
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

//Redux Stuffs
import { postScreamAction, clearErrorsAction } from "../redux/actions/dataAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TextField } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadThis,
    postButton: {
        margin: '10px 10px 10px 0',
        position: 'relative',
        float: 'right'
    },
    progress: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    }
  });

const PostScream = (props) => {
    const UI = useSelector(state => state.UI);
    const dispatch = useDispatch();
    
    const { classes } = props;
    const { loading, errors } = UI;
    
    const [post, setPost] = React.useState({
        open: false,
        body: ""
    })

    const postScream = (newScream) => dispatch(postScreamAction(newScream));
    const clearErrors = () => dispatch(clearErrorsAction());
    const handleOpen = () => {
        setPost(prevValue => ({...prevValue, open: true}));
    }

    const handleClose = () => {
        clearErrors();
        setPost(prevValue => ({...prevValue, open: false}));
    }

    const handleChange = (event) => {
        const { value } = event.target
        setPost(prevValue => ({...prevValue, body: value}));        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postScream({body: post.body});
    }
    return(
        <Fragment>
            <MyButton tip = "Post a Scream!" onClick = {handleOpen}>
                <AddIcon color = "primary" />
            </MyButton>
            <Dialog open = {post.open} onClose = {handleClose} fullWidth >
                <MyButton tip = "Close" onClick = {handleClose} tipClassName = {classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogTitle> Post New Scream </DialogTitle>
                <DialogContent>
                    <form onSubmit = {handleSubmit}>
                        <TextField
                            name = "body"
                            label = "SCREAM!!"
                            type = "text"
                            value = {post.body}
                            placeholder = "Scream at your fellow apes!"
                            error = {errors && errors.body ? true : false}
                            helperText = {errors && errors.body}
                            className = {classes.textField}
                            onChange = {handleChange}
                            fullWidth
                            color = "primary"
                        />
                        <Button type = "submit" variant = "contained" color = "primary" className = {classes.postButton} disabled={loading}>
                            Post
                            {loading && (
                                <CircularProgress className = {classes.progress} size = {15} />
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )

};

export default withStyles(styles)(PostScream);