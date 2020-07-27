import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

//Components
import Scream from '../components/Scream';
function Home(){
   const [screamsData, setScreamsData] = React.useState([]);
    React.useEffect(() => {
       axios.get("/screams")
        .then(response => {
            setScreamsData((prevScreams) => [...prevScreams, ...response.data]);
        })
        .catch(err => console.log(err));
   }, [])
   return(
        <div>
            <Grid container>
                <Grid item sm={8} xs ={12}>
                    {screamsData.map(scream => <Scream key={scream.screamId}x scream={scream} />)}
                </Grid>
                <Grid item sm={4} xs ={12}>
                    <p>Profile.....</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;