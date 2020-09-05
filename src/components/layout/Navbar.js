import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

import MyButton from '../../util/MyButton';

//imports for material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

//imports for material ui icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

//imports for redux
import { useSelector } from 'react-redux';

//imports for custom components
import PostScream from '../scream/PostScream';

function Navbar(){
    
    const user = useSelector(state => state.user);
    const { authenticated } = user;

    return(
        <AppBar>
            <Toolbar className="nav-container">
                {
                    authenticated ? (
                        <Fragment>
                            <PostScream />
                            <MyButton tip = "Home">
                                <Link to = "/">
                                    <HomeIcon />
                                </Link>
                            </MyButton>
                            <MyButton tip = "Notifications">
                                <Notifications />
                            </MyButton>
                        </Fragment>
                    ) : 
                    (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                        </Fragment>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;