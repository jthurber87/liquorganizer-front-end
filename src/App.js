import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ItemLists from './components/ItemLists';
import NewForm from './components/NewForm';
import EditForm from './components/EditForm';
import NavBar from './components/NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/bottles" component={ItemLists} />
          <Route exact path="/bottles/new" render={(routerProps)=><NewForm {...routerProps}/>}/>
          <Route exact path="/bottles/:id/edit" component={EditForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
