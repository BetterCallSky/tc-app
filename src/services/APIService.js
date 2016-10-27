import superagent from 'superagent';
import superagentPromise from 'superagent-promise';
const request = superagentPromise(superagent, Promise);


export default class APIService {
  static searchChallenges(params) {
    return request
      .get(`/api/challenges`)
      .query(params)
      .end()
      .then((res) => res.body);
  }
}
