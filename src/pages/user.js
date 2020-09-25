import React, { useEffect, useState } from 'react';

//Material UI Stuff
import Grid from '@material-ui/core/Grid';

//Custom Components
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
//Axios
import axios from 'axios';

//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';

//Get User Data action
import { getUserDataAction } from '../redux/actions/dataAction';

const User = (props) => {
    
    const data = useSelector(state => state.data);

    const dispatch = useDispatch();

    const getUserData = (handle) => dispatch(getUserDataAction(handle));

    const [profile, setProfile] = useState(null);

    const [screamIdParam, setScreamIdParam] = useState(null);    

    useEffect(() => {
        
        const { match: { params: { handle} } } = props;
        const screamId = props.match.params.screamId;
        
        if(screamId)    
            setScreamIdParam(screamId);

        getUserData(handle);

        axios.get(`/user/${handle}`)
            .then(res => {
                setProfile(res.data.user)        
            })
            .catch(err => console.log(err));
    
    },[]);

    const {screams, loading} = data;

    const screamsMarkUp = loading ? (
        <p style = {{marginLeft: 50}}> <ScreamSkeleton /> </p>
    ) : (screams === null ? (
        <p style = {{marginLeft: 50}}> No screams for this user </p>
    ) : (!screamIdParam ? (
        screams.map(scream => <Scream key = {scream.screamId}x scream = {scream} />)
    ) : (
        screams.map(scream => {
            if(scream.screamId !== screamIdParam)
                return <Scream key = {scream.screamId}x scream = {scream} />
            else 
                return <Scream key = {scream.screamId}x scream = {scream} openDialog = {true} />
        })
    )))

    return(
        <div>
            <Grid container>
                <Grid item sm={6} xs ={12}>
                    {screamsMarkUp}
                </Grid>
                <Grid item sm={4} xs ={12}>
                    {
                        profile === null ? (
                            <p style = {{marginLeft: 50}}> <ProfileSkeleton /> </p>
                        ) : (
                            <StaticProfile profile = {profile} />
                        )
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default User;