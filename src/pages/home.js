import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

//Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Reducers
import { getScreamsAction } from '../redux/actions/dataAction';

function Home(){
   const data = useSelector(state => state.data);
   const dispatch = useDispatch();
   const getScream = () => dispatch(getScreamsAction()); 
   const { loading, screams } = data;
   useEffect(() => {
       getScream();
   }, [])
   let recentScreamMarkUp = !loading ? (
       screams.map((scream) => <Scream key={scream.screamId}x scream={scream} />)
   ) : (<p style = {{marginLeft: 50}}> <ScreamSkeleton/> </p>)
   return(
        <div>
            <Grid container>
                <Grid item sm={6} xs ={12}>
                    {recentScreamMarkUp}
                </Grid>
                <Grid item sm={4} xs ={12}>
                    <Profile />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;