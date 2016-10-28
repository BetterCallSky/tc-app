import React, { PropTypes } from 'react';
import { Tag } from 'reactstrap';
import cn from 'classnames';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import classes from './DashboardView.scss';

const hasSubmitted = (challenge) => _.some(challenge.registrants, ((reg) => reg.handle === localStorage.handle && reg.submissionDate));
const getSubmissionNum = (challenge) => _.filter(challenge.registrants, ((reg) => reg.submissionDate)).length;

const getSubmitters = (challenge) => {
  return _(challenge.registrants).filter(((reg) => reg.submissionDate)).map('handle').value();
};

const getDeadline = (challenge) => {
  if (challenge.currentPhaseName === 'Registration' || challenge.currentPhaseName === 'Submission') {
    return moment(challenge.submissionEndDate).fromNow();
  }
  if (challenge.currentPhaseName === 'Stalled') {
    return '';
  }
  return moment.duration(challenge.currentPhaseRemainingTime, 'seconds').humanize('in');
};

export const DashboardView = ({ activeChallenges, pastChallenges, isLoading, loadMore }) => (
  <div className={classes.dashboardView}>

    <div className="row">
      <div className="col-sm-12">
        <div className="card ">
          <h3 className="card-header">
            Active challenges
          </h3>
          <div className="card-block">
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Name</th>
                <th>Prizes</th>
                <th>Phase</th>
                <th>Deadline</th>
                <th>Users</th>
              </tr>
              </thead>
              <tbody>
              {activeChallenges.map((item) =>
                <tr key={item.id} className={cn({'table-success': hasSubmitted(item)})}>
                  <td>
                    <Link to={`/challenge/${item.id}`}>
                      {item.challengeName}
                    </Link>
                    <br />
                    <Tag color="primary">{item.challengeType}</Tag>
                    {' '}
                    {item.event && <Tag color="info">{item.event.shortDescription}</Tag>}
                    <br />
                    {item.technology.map((tech, i) => <span key={i}><Tag>{tech}</Tag> </span>)}
                  </td>
                  <td>{item.prize.map((prize) => `$${prize}`).join(' / ')}</td>
                  <td>{item.currentPhaseName}</td>
                  <td>{getDeadline(item)}</td>
                  <td>
                    {item.registrants.length} / {getSubmissionNum(item)}
                    {getSubmitters(item).map((user) => <div><a rel="noopener noreferrer" target="_blank"
                                                               href={`https://www.topcoder.com/members/${user}`}>{user}</a>
                    </div>)}
                  </td>
                  <td>
                    <a rel="noopener noreferrer" target="_blank"
                       href={`https://www.topcoder.com/challenge-details/${item.id}/?type=develop`} className="">TC</a>
                    {' | '}
                    <a rel="noopener noreferrer" target="_blank"
                       href={`https://software.topcoder.com/review/actions/ViewProjectDetails?pid=${item.id}`}
                       className="">OR</a>
                    {' | '}
                    <a rel="noopener noreferrer" target="_blank" href={item.forumLink} className="">FORUM</a>
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div className="row">
      <div className="col-sm-12">
        <div className="card ">
          <h3 className="card-header">
            Past Challenges
          </h3>
          <div className="card-block">
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Name</th>
                <th>Prizes</th>
                <th>Users</th>
              </tr>
              </thead>
              <tbody>
              {pastChallenges.map((item) =>
                <tr key={item.id} className={cn({'table-success': hasSubmitted(item)})}>
                  <td>
                    <Link to={`/challenge/${item.id}`}>
                      {item.challengeName}
                    </Link>
                    <br />
                    <Tag color="primary">{item.challengeType}</Tag>
                    {' '}
                    {item.event && <Tag color="info">{item.event.shortDescription}</Tag>}
                    <br />
                    {item.technology.map((tech) => <span><Tag>{tech}</Tag> </span>)}
                  </td>
                  <td>{item.prize.map((prize) => `$${prize}`).join(' / ')}</td>
                  <td>
                    {item.registrants.length} / {item.submissions.length}
                    {item.submissions.map((user, i) =>
                      <div>
                        <a
                          className={cn({'text-muted': user.submissionStatus !== 'Active' && user.submissionStatus !== 'Completed Without Win'})}
                          rel="noopener noreferrer"
                          target="_blank"
                          href={`https://www.topcoder.com/members/${user.handle}`}
                        >{i + 1}. {user.handle} ({user.finalScore})</a>
                      </div>)}
                  </td>
                  <td>
                    <a rel="noopener noreferrer" target="_blank"
                       href={`https://www.topcoder.com/challenge-details/${item.id}/?type=develop`} className="">TC</a>
                    {' | '}
                    <a rel="noopener noreferrer" target="_blank"
                       href={`https://software.topcoder.com/review/actions/ViewProjectDetails?pid=${item.id}`}
                       className="">OR</a>
                    {' | '}
                    <a rel="noopener noreferrer" target="_blank" href={item.forumLink} className="">FORUM</a>
                  </td>
                </tr>)}
              </tbody>
            </table>
            <button className="btn btn-primary btn-block" disabled={isLoading} onClick={loadMore}>Load more</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

DashboardView.propTypes = {
  activeChallenges: PropTypes.array.isRequired,
  pastChallenges: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default DashboardView;
