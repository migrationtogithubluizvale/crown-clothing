import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component'

const TopicDetail = (props) => {
  console.log(props)
  return <div>
    <h1>Topic Details</h1>
  </div>
}
const TopicsList = () => {
  return <div>
    <h1>Topic List Pages</h1>
  </div>
}

function App() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/topics/:topicId' component={TopicDetail} />
      <Route exact path='/topics' component={TopicsList} />
    </Switch>
  );
}

export default App;
