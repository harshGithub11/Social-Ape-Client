import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//imports for Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//imports for Material UI Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Mark Notification Read Action
import { markNotificationsReadAction } from '../../redux/actions/userAction';

const Notification = (props) => {

    const { notifications } = useSelector(state => state.user); 
    const dispatch = useDispatch();

    let unreadNotifications;

    const markNotificationsRead = (unreadNotifications) => dispatch(markNotificationsReadAction(unreadNotifications));

    dayjs.extend(relativeTime);

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleClose = () => {
        setAnchorEl(null);
    }

    const onMenuOpened = () => {
        unreadNotifications = notifications.filter(not => !not.read).map(not => not.notificationId);
        markNotificationsRead(unreadNotifications);
    }

    let notificationsIcon;
    
    if(notifications && notifications.length > 0){
        const notificationsLength = notifications.filter(not => not.read === false).length ;
        notificationsIcon = notificationsLength > 0
            ? (
                <Badge badgeContent = { notificationsLength } color = "secondary" >
                    <NotificationsIcon />
                </Badge> 
            ) : (
                <NotificationsIcon/>
            ) 
    }
    else{
         notificationsIcon = <NotificationsIcon />
    } 

    let notificationMarkUp = notifications && notifications.length > 0 ? (
        notifications.map(not => {
            const verb = not.type === 'like' ? 'liked' : 'commented on';
            const time = dayjs(not.createdAt).fromNow();
            const iconColor = not.read ? 'primary' : 'secondary';
            const icon = not.type ==='like' ? (
                <FavoriteIcon color = { iconColor } style = { { marginRight: 10 } } />
            ) : (
                <ChatIcon color = { iconColor } style = { { marginRight: 10 } }  />
            )
            return (
                <MenuItem key = { not.createdAt } onClick = { handleClose } >
                    { icon }
                    <Typography 
                        component = { Link } 
                        color = "textPrimary" 
                        variant = "body1"
                        to = {`/users/${not.recipient}/scream/${not.screamId}`}
                    >
                        { not.sender } { verb } your scream { time } 
                    </Typography>
                </MenuItem>
            )
        })
    ) : (
        <MenuItem onClick = { handleClose } >
            You have no notifications yet
        </MenuItem>
    )

    return (
        <Fragment>
            <ToolTip placement = "top" title = "Notifications">
                <IconButton aria-owns = { anchorEl ? 'simple-menu' : undefined } aria-haspopup = "true" onClick = { handleOpen } >
                    { notificationsIcon }
                </IconButton>
            </ToolTip>
            <Menu anchorEl = {anchorEl} open = { Boolean(anchorEl) } onClose = { handleClose } onEntered = { onMenuOpened } >
                { notificationMarkUp }
            </Menu>
        </Fragment>
    )
};

export default Notification;