import './App.css';
// Component Import
import Header from './components/Header';
// Material Import
import { Grid } from '@mui/material';
import router from "./router";
import Footer from './components/Footer';


function App() {

  return (
    <div className="App">
        <Grid sx={{height: "100%"}}>
          <Grid xs={12} item={true}>
            <Header/>
          </Grid>
          <Grid xs={12} sx={{height: "calc(100% - 56px)"}} item={true}>
            {/* <Main/> */}
            {/* <Login /> */}
            {router()}
          </Grid>
        </Grid>
    </div>
  );
}

export default App;
