import React from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Start from './components/StartPage/index';
import LogInPage from './components/LogInPage/index';
import SignUpPage from './components/SignUpPage/index';
import NotFound from './components/NotFoundPage/index';

import NewQuestion from './components/Questions/NewQuestion';
import QuestionList from './components/Questions/QuestionList';
import QuestionReview from './components/Questions/QuestionReview';

import TopMenu from './components/TopMenu';
import NavBar from './components/NavBar';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Router>
                    <TopMenu />

                    <Switch>
                        <Route exact path='/' component={Start} />
                        <Route exact path='/auth/login'
                            render={(props) => (<LogInPage {...props}/>)} />
                        <Route exact path='/auth/register'
                            render={(props) => (<SignUpPage {...props}/>)} />
                        <Route path='/questions'
                            render={(props) => (<QuestionList {...props}/>)} />
                        <Route exact path='/create_question' component={NewQuestion} />
                        <Route path='/question/:id'
                            render={(props) => (<QuestionReview {...props}/>)} />

                        <Route component={NotFound}/>
                    </Switch>

                    <NavBar />
                </Router>
            </div>
        </BrowserRouter>
    );
}

export default App;