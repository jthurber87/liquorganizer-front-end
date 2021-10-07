import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ItemLists from './components/ItemLists';
import NewForm from './components/NewForm';
import EditForm from './components/EditForm';
import NavBar from './components/NavBar';
import AboutUs from './components/AboutUs';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/bottles" component={ItemLists} />
          <Route exact path="/bottles/new" render={(routerProps)=><NewForm {...routerProps}/>}/>
          <Route exact path="/bottles/:id/edit" component={EditForm} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
