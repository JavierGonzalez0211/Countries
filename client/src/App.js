import './Styles/App.css';
import { Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from "./components/Home"
import Detail from './components/Detail';
import CreateActivity from './components/CreateActivity'


function App() {
  return (

      <div className="App">
    <Switch>
        <Route exact path  = "/" component ={LandingPage}/>    
        <Route path = "/home" component = {Home}/>
        <Route path="/detail/:id" render={({match})=> <Detail id={match.params.id} />}/>
        <Route path="/activityCreate" component={CreateActivity} />
    </Switch>
      </div>
 
  );
}

export default App;
