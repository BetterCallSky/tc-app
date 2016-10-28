import React, { PropTypes } from 'react';
import classes from './DetailsView.scss';
import { Tag } from 'reactstrap';
import moment from 'moment';

const getDeadline = (challenge) => {
  if (challenge.currentPhaseName === 'Stalled') {
    return '';
  }
  let result;
  if (challenge.currentPhaseName === 'Registration' || challenge.currentPhaseName === 'Submission') {
    result = moment(challenge.submissionEndDate).fromNow();
  } else {
    result = moment.duration(challenge.currentPhaseRemainingTime, 'seconds').humanize('in')
  }
  return `(deadline ${result})`;
};

export const DetailsView = ({ challenge }) => (
  <div className={'container ' + classes.detailsView}>
    <div className="jumbotron">
      <h1 className="display-5">
        <Tag color="primary">{challenge.challengeType}</Tag>
        {' '}
        {challenge.challengeName}
      </h1>
      <h3>Prizes: {challenge.prize.map((prize) => `$${prize}`).join(' / ')}</h3>
      <h3>Phase: {challenge.currentPhaseName} {getDeadline(challenge)}</h3>
      {challenge.event && <Tag color="info">{challenge.event.shortDescription}</Tag>}
      {' '}
      {challenge.technology.map((tech, i) => <span key={i}><Tag>{tech}</Tag> </span>)}

      <br/>
      <a rel="noopener noreferrer" target="_blank"
         href={`https://www.topcoder.com/challenge-details/${challenge.id}/?type=develop`} className="">TC</a>
      {' | '}
      <a rel="noopener noreferrer" target="_blank"
         href={`https://software.topcoder.com/review/actions/ViewProjectDetails?pid=${challenge.id}`}
         className="">OR</a>
      {' | '}
      <a rel="noopener noreferrer" target="_blank" href={challenge.forumLink} className="">FORUM</a>
      
      <hr/>
      <div className="mt-2">

        <div dangerouslySetInnerHTML={{__html: challenge.detailedRequirements.replace(/style=".+?"/g, '')}}>
        </div>

        <div dangerouslySetInnerHTML={{__html: challenge.finalSubmissionGuidelines.replace(/style=".+?"/g, '')}}>
        </div>
      </div>
    </div>
  </div>
);

DetailsView.propTypes = {
  challenge: PropTypes.object.isRequired,
};

export default DetailsView;
