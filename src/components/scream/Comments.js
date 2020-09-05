import React , { useState , Fragment } from 'react';

import Link from 'react-router-dom/Link';

import PropTypes from 'prop-types';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//dayjs
import dayjs from 'dayjs';

const styles = (theme) => ({
    ...theme.spreadThis,     
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
});

const Comments = (props) => {

    const { classes } = props;

    let comments = null;

    if(props.comments)
        comments = props.comments;

    const commentsMarkUp = comments ? (
        props.comments.map((comment, index) => {
            const { body, createdAt, userImage, userHandle } = comment;
            return (
                <Fragment key = { createdAt }>
                    <Grid item sm = { 12 }>
                        <Grid container>
                            <Grid item sm = { 2 }>
                                <img src = { userImage } alt = "comment" className = { classes.commentImage } />
                            </Grid>       
                            <Grid item sm = { 9 }>
                                <div className = { classes.commentData }>
                                    <Typography variant = "h5" component = { Link } to = { `/users/${userHandle}`} color = "primary" >
                                        { userHandle }
                                    </Typography>
                                    <Typography variant = "body2" color = "textSecondary">
                                        { dayjs(createdAt).format('h:mm a, MMMM DD YYYY') }
                                    </Typography>
                                    <hr className = { classes.invisibleSeparator } />
                                    <Typography variant = "body1" > { body.body }</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    {index !== props.comments.length - 1 && (
                        <hr className = { classes.visibleSeparator } />
                    )}
                </Fragment>
            )
        })
    ) : null ;

    return(
        <Grid container>
            { commentsMarkUp }
        </Grid>
    )

};

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);