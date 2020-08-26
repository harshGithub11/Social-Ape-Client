import React, {Fragment} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

import MyButton from '../util/MyButton';

//Material UI 
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

//Material UI Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//Redux 
import { useDispatch } from 'react-redux';
import { deleteScreamAction } from '../redux/actions/dataAction';

const styles = (theme) => ({
    ...theme.spreadThis,
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
  });

const DeleteScream = (props) => {

    const dispatch = useDispatch();
    
    const { classes } = props;

    const deleteScream = (screamId) => dispatch(deleteScreamAction(props.screamId));

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        deleteScream(props.screamId);
        handleClose();
    }

    return (
        <Fragment>
            <MyButton tip = "Delete Scream" onClick = {handleOpen} btnClassName = {classes.deleteButton}>
                <DeleteOutline color = "secondary" />
            </MyButton>
            <Dialog open = {open} onClose = {handleClose} fullWidth>
                <DialogTitle> Delete Scream </DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this scream ?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="secondary">
                        Delete
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default withStyles(styles)(DeleteScream);