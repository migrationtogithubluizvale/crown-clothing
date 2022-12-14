import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {  connect } from 'react-redux';
import './App.css'


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header-component/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
 
class App extends React.Component {

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  unsubscribeFromAuth = null 

  render(){
  return (
    <div>
      <Header/>
    <Switch>
      <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to = '/'></Redirect>) : 
                      (<SignInAndSignOutPage></SignInAndSignOutPage>)} />

      <Route exact path='/' component={HomePage} />
      <Route exact path='/shop' component={ShopPage} />
    </Switch>
    </div>
  );
}
}

const mapStateToProps = ({  user }) => ({
  currentUser: user.currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))  
})
export default connect(
    mapStateToProps, 
    mapDispatchToProps)(App);
