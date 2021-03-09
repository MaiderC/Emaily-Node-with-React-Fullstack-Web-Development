import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from "react-router-dom";
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

    renderFields()
    {
        return _.map(formFields, ({label, name}) => {
                return(
                    <Field
                        key={name}
                        type="text"
                        name={name}
                        component={SurveyField}
                        label={label}
                    /> 
                );
                 
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat white-text right" type="submit">
                        Submit
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');
    _.each(formFields, ({name}) => {
        if(!values[name])
        {
            errors[name] = "You must provide a value";
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);