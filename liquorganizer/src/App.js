import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ItemDetail from './components/ItemDetail';
import ItemLists from './components/ItemLists';
import NewForm from './components/NewForm';
import EditForm from './components/EditForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Liquor App</h1>
      <Router>
        <Switch>
          <Route exact path="/bottles" component={ItemLists} />
          <Route exact path="/bottles/new" render={(routerProps)=><NewForm {...routerProps}/>}/>
          <Route exact path="/bottles/:id/edit" component={EditForm} />
          <Route exact path="/bottles/:id" component={ItemDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
