import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css'


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header-component/header.component';
import { auth } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super();

    this.state={
      currentUser: null
    }
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  unsubscribeFromAuth = null 

  render(){
  return (
    <div>
      <Header currentUser={this.state.currentUser} />
    <Switch>
      <Route exact path='/signin' component={SignInAndSignOutPage} />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/shop' component={ShopPage} />
    </Switch>
    </div>
  );
}
}

export default App;
