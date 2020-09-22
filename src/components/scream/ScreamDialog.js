import React , { useState , useEffect, Fragment } from 'react';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid'
import Typographpy from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

//dayjs
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//Material UI Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux Stuffs
import { useDispatch, useSelector } from 'react-redux';

//Get Scream Action
import { getScreamAction } from '../../redux/actions/dataAction';

//Custom Button Component Import
import MyButton from '../../util/MyButton';

//Custom LikeButton Component Import
import LikeButton from './LikeButton';

//Other Custom Imports
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = (theme) => ({
    ...theme.spreadThis,
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: '20'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

const ScreamDialog = (props) => {

    useEffect(() => {
        if(props.openDialog)    
            handleOpen();
    }, [])

    const UI = useSelector(state => state.UI);
    const data = useSelector(state => state.data);

    const { loading } = UI;
    const { scream } = data;

    const { classes, screamId, userHandle } = props;

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const getScream = (screamId) => dispatch(getScreamAction(screamId));

    const [oldPath, setOldPath] = useState('');

    const handleOpen = () => {

        setOldPath(window.location.pathname);

        const { userHandle, screamId } = props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        window.history.pushState(null, null, newPath);

        setOpen(true);
        getScream(screamId);
    };

    const handleClose = () => {
        window.history.pushState(null, null, oldPath);
        setOpen(false);        
    };    

    const dialogMarkUp = loading ? (
        <div className= {classes.spinnerDiv} >
            <CircularProgress size = { 200 } thickness = {2}/>
        </div>
    ) : (
        <Grid container spacing = { 16 }>
            <Grid item sm = { 5 }>
                <img src = { scream.userImage } alt = "Profile" className = { classes.profileImage } />
            </Grid>
            <Grid item sm = { 7 }>
                <Typographpy 
                    component = {Link}
                    color = "primary" 
                    variant = "h5"
                    to = {`/users/${userHandle}`}
                >
                    @{ userHandle }
                </Typographpy>
                <hr className = { classes.invisibleSeparator } />
                <Typographpy variant = "body2" color = "textSecondary">
                    {dayjs(scream.createdAt).format('h:mm a, MMMM DD YY')}
                </Typographpy>
                <hr className = {classes.invisibleSeparator} />
                <Typographpy variant = "body1">
                    { scream.body }
                </Typographpy>
                <LikeButton screamId = { screamId } />
                <span >{ scream.likeCount } likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span> {scream.commentCount} comments</span>
            </Grid>
            <hr className = {classes.visibleSeparator} />
            <CommentForm screamId = { screamId } />
            <Comments comments = {scream.comments} />
        </Grid>
    );
    
    return(
        <Fragment>
            <MyButton onClick = { handleOpen } tip = "Expand Scream" tipClassName = {classes.expandButton}>
                <UnfoldMore color = "primary" />
            </MyButton>
            <Dialog open = { open } onClose = { handleOpen } fullWidth>
                <MyButton tip ="Close" onClick = { handleClose } tipClassName = { classes.closeButton } >
                    <CloseIcon/>
                </MyButton>
                <DialogTitle> Scream </DialogTitle>
                <DialogContent className = { classes.dialogContent }>
                    { dialogMarkUp }
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(ScreamDialog);