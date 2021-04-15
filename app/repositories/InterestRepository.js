import Repository from './Repository';
import {interestMapper, interestsMappers } from './mappers/InterestsMappers';
const resource = '/interests';

export default {

  async getInterests() {
    return interestsMappers(await Repository.get(`${resource}`));
  },

 

  async setInterests(DTO) {
    let response = await Repository.post(`${resource}`, DTO);

    return response;
  },
};

