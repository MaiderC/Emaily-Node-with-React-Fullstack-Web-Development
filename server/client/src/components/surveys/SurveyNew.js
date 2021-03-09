import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm, Field } from 'redux-form';

// SurveyNew contains the form component inside of it 
class SurveyNew extends Component {
    state = { showFormReview: false};

    renderContent(){
        if(this.state.showFormReview)
        {
            return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})}/>;
        }
        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>;
    }

    render(){
        return(
            <div>{this.renderContent()}</div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);