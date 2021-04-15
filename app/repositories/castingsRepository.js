import Repository from './Repository';
import {castingsMapper} from './mappers/castingMappers';

import {store} from 'app/store/index';
import {BaseSetting} from '@config';
const resource = '/castings';

export default {
  async getCastings() {
    return castingsMapper(await Repository.get(`${resource}`));
  },

  async joinCasting(data) {
    return await Repository.post(`${resource}/application`, data);
  },

  async sendVideo(data) {
    return await Repository.post(`${resource}/application/video`, data);
  },



  async getActiveCastings() {
    return castingsMapper(await Repository.get(`${resource}/active`));
  },

  async getPendingCastings() {
    return castingsMapper(await Repository.get(`${resource}/pending`));
  },

  async getFinishCastings() {
    return castingsMapper(await Repository.get(`${resource}/finish`));
  },

};
