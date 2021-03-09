const keys = require('../../config/keys');
module.exports = (survey) => {

    return `
    <html>
        <body>
            <div style="text-align:center">
                <h3> We are looking forward to hear your opinion!</h3>
                <p>This is a little survey to know what you think about our service. yo just have to answer yes or no by clicking in the links below.</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                </div>
            </div>
        </body>
    </html>
    `;
};