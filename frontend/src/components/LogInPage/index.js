import React from 'react';
import styles from './index.module.css';
import {loginAction} from "../../actions/user_actions";
import Button from '../Button';
import Input from '../Input';

import {connect} from "react-redux";

class LogInPage extends React.Component {
    state = {
      username: '',
      password: '',
      usernameError: "false",
      passwordError: "false",
      errorText: '',
    };

    render() {
      const {
        username,
        password,
        usernameError,
        passwordError,
        errorText,
      } = this.state;
  
      return (
        <form className={styles.form}>
            <h2>Welcome</h2>
            <Input name="username" placeholder="Username"
                onChange={this.onChangeUsername} value={username} error={usernameError} />

            <Input name="password" type="password" placeholder="Password"
                onChange={this.onChangePassword} value={password}
                error={passwordError} />

            <div className={styles.buttons}>
                <Button onClick={this.onToLogin}>Log in</Button>
            </div>
            <p>{errorText}</p>
        </form>
      );
    }
  
    onChangeUsername = (event) => {
      console.log('onChangeUsername()');
      this.resetAllErrors();
      this.setState({username: event.target.value});
    };
  
    onChangePassword = (event) => {
      this.resetAllErrors();
      this.setState({password:  event.target.value});
    };
  
    resetAllErrors = () => {
      this.setState({
        usernameError: "false",
        passwordError: "false",
        errorText: '',
      });
    };

    onToLogin = (event) => {
      event.preventDefault();
    
      const {
        username,
        password,
      } = this.state;

      this.props.login(username, password).then(() => {
        const error = this.props.error;
        console.log('in login: error value: ' + error);

        if (error) {
          this.setState({
              errorText: error,
            });

          return;
        } else {
          this.props.history.push('/questions');
        }
      });
    };
}

const mapStateToProps = (state) => {
  return {
    error: state.userReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: loginDispatch(dispatch),
  };
};

function loginDispatch(dispatch) {
  return (...args) => {
      return new Promise((resolve) => { 
          const dispatchCaller = loginAction(...args);
          dispatchCaller(dispatch).then(() => {resolve();});
      });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);