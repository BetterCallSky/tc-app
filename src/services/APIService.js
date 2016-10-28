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

  static fetchChallenges(handle) {
    return request
      .post(`/api/users/${handle}/challenges`)
      .end();
  }

  static getChallenge(id) {
    return request
      .get(`/api/challenges/${id}`)
      .end()
      .then((res) => res.body);
  }
}
