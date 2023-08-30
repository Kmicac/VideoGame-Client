import './App.css';
import Landing from './Views/Landing/Landing.jsx';
import VideogameDetail from './Views/GameDetail/VideogameDetail.jsx';
import Home from './Views/Home/Home.jsx';
import Form from './Views/Form/Form.jsx';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = "https://videogame-api-production-2626.up.railway.app/";


function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Route exact path="/" component={Landing}/>
          <Switch>
            <Route path="/Home" component={Home}/>
            <Route path="/videogame/:id" component={VideogameDetail}/>
            <Route path="/Form" component={Form}/>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
