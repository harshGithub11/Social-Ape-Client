import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

//Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//Redux Stuffs
import { useSelector, useDispatch } from 'react-redux';

//Submit Comment Action
import { submitCommentAction } from '../../redux/actions/dataAction';

const styles = (theme) => ({
    ...theme.spreadThis
});

const CommentForm = (props) => {
    
    const { errors } = useSelector(state => state.UI);
    const { authenticated } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const { classes, screamId } = props;

    const [body, setBody] = useState({body: ""});

    const submitComment = (screamId, body) => dispatch(submitCommentAction(screamId, body)); 

    const handleChange = (event) => {
        const { value } = event.target;
        setBody({
            body: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submitComment(screamId, body);
    }

    const commentFormMarkUp = authenticated ? (
        <Grid item sm = { 12 } style = {{ textAlign: 'center' }} >
            <form onSubmit = { handleSubmit }>
                <TextField 
                    name = "body" 
                    type = "text" 
                    label = "Comment on Scream" 
                    error = { errors && errors.comment ? true : false }
                    helperText = {errors && errors.comment }
                    value = { body.body }
                    onChange = { handleChange }
                    fullWidth
                    className = { classes.textField}
                />
                <Button 
                    type = "submit"
                    variant = "contained"
                    color = "primary"
                    className = { classes.commentButton }
                > 
                Comment
                </Button>    
            </form>
            <hr className = { classes.visibleSeparator } />
        </Grid>
    ) : null;

    return commentFormMarkUp;
};

export default withStyles(styles)(CommentForm);