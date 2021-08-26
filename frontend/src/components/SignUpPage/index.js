import React from 'react';
import styles from './index.module.css';
import {signupAction} from "../../actions/index";
import Button from '../Button'
import Input from '../Input'

import {connect} from "react-redux";

function isCorrectUserData(data) {
    return data.length > 0
  }

class SignUpPage extends React.Component {
    state = {
      username: '',
      name: '',
      surname: '',
      password: '',
      repeatPassword: '',
      usernameError: "false",
      nameError: "false",
      surnameError: "false",
      passwordError: "false",
      repeatPasswordError: "false",
      errorText: '',
    };

    render() {
      const {
        username,
        name,
        surname,
        password,
        repeatPassword,
        errorText,
        usernameError,
        nameError,
        surnameError,
        passwordError,
        repeatPasswordError,
      } = this.state;

      return (
        <form className={styles.wrapper}>
            <h2>Welcome</h2>
            <Input name="username" placeholder="Username"
                onChange={this.onChangeUsername} value={username} error={usernameError} />

            <Input name="name" placeholder="Name"
                onChange={this.onChangeName} value={name} error={nameError} />

            <Input name="surname" placeholder="Surname"
                onChange={this.onChangeSurname} value={surname} error={surnameError} />

            <Input name="password" type="password" placeholder="Password"
                onChange={this.onChangePassword} value={password}
                error={passwordError} />

            <Input name="repeatPassword" type="password"
                placeholder="Repeat password"
                onChange={this.onChangeRepeatPassword}
                value={repeatPassword} error={repeatPasswordError}/>

            <div className={styles.buttons}>
                <Button onClick={this.onSignUp}>Sign up</Button>
            </div>
            <p>{errorText}</p>
        </form>
      )
    }
  
    onChangeUsername = (event) => {
      console.log('onChangeUsername()');
      this.resetAllErrors();
      this.setState({username: event.target.value})
    };

    onChangeName = (event) => {
      console.log('onChangeName()');
      this.resetAllErrors();
      this.setState({name: event.target.value})
    };

    onChangeSurname = (event) => {
      console.log('onChangeSurname()');
      this.resetAllErrors();
      this.setState({surname: event.target.value})
    };
  
    onChangePassword = (event) => {
      this.resetAllErrors();
      this.setState({password:  event.target.value})
    };
  
    onChangeRepeatPassword = (event) => {
      this.resetAllErrors();
      this.setState({repeatPassword:  event.target.value})
    };
  
    resetAllErrors = () => {
      this.setState({
        usernameError: "false",
        passwordError: "false",
        repeatPasswordError: "false",
        errorText: ''
      })
    };
  
    onSignUp = (event) => {
      event.preventDefault();

      const {
        name,
        surname,
        username,
        password,
        repeatPassword,
      } = this.state;
  
      if (!isCorrectUserData(username)) {
        this.setState({
            usernameError: true,
            errorText: 'Type the username!',
        });
  
        return
      }

      if (!isCorrectUserData(name)) {
        this.setState({
            nameError: true,
            errorText: 'Type the name!',
        });
  
        return
      }

      if (!isCorrectUserData(surname)) {
        this.setState({
            surnameError: true,
            errorText: 'Type the surname!',
        });
  
        return
      }
  
      if (!isCorrectUserData(password)) {
        this.setState({
          passwordError: true,
          errorText: 'Type the password!',
        });
  
        return
      }
  
      if (password !== repeatPassword) {
        this.setState({
          passwordError: true,
          repeatPasswordError: true,
          errorText: 'Password are not the same!'
        });
  
        return
      }
  
      this.props.signup(name, surname, username, password).then(() => {
        const error = this.props.error;
        console.log('in signup: error value: ' + error);

        if (error) {
          this.setState({
              errorText: error
            });

          return;
        } else {
          this.props.history.push('/');
        }
      })
    };
}

  const mapStateToProps = (state) => {
    return {
      error: state.userReducer.error
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      signup: signupDispatch(dispatch),
    }
  };

  function signupDispatch(dispatch) {
    console.log('signupDispatch');

    return (...args) => {
        return new Promise((resolve) => { 
            console.log('in promise before signupAction');

            const dispatchCaller = signupAction(...args);
            dispatchCaller(dispatch).then(() => {resolve();});
        });
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);