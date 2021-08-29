import React from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Start from './components/StartPage/index';
import LogInPage from './components/LogInPage/index';
import SignUpPage from './components/SignUpPage/index';
import NotFound from './components/NotFoundPage/index';

import NewQuestion from './components/Questions/NewQuestion';
import QuestionList from './components/Questions/QuestionList';
import QuestionReview from './components/Questions/QuestionReview';

// import ReviewPage1 from './components/ReviewPage/question1'
// import ReviewPage2 from './components/ReviewPage/question2'
// import ReviewPage3 from './components/ReviewPage/question3'
// import ReviewPage4 from './components/ReviewPage/question4'
// import ReviewPage5 from './components/ReviewPage/question5'
// import ReviewPage6 from './components/ReviewPage/question6'

import TopMenu from './components/TopMenu'
import NavBar from './components/NavBar'

// to add and edit paths
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

                        {/* <Route path='/question_review/1' component={ReviewPage1} />
                        <Route path='/question_review/2' component={ReviewPage2} />
                        <Route path='/question_review/3' component={ReviewPage3} />
                        <Route path='/question_review/4' component={ReviewPage4} />
                        <Route path='/question_review/5' component={ReviewPage5} />
                        <Route path='/question_review/6' component={ReviewPage6} /> */}

                        <Route component={NotFound}/>
                    </Switch>

                    <NavBar />
                </Router>
            </div>
        </BrowserRouter>
    )
}

export default App