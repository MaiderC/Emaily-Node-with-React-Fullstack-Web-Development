import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyLits extends Component{
    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return(
                <div class="card blue-grey lighten-5" key={survey.id}>
                    <div class="card-content">
                        <span class="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
                    </div>
                    <div class="card-action">
                        <a href="#">Yes: {survey.yes}</a>
                        <a href="#">No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }

    render()
    {
        return(
            <div>{this.renderSurveys()}</div>
        );
    }
}

function mapStateToProps({surveys}){
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyLits);