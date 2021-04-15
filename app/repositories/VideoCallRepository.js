import Repository from './Repository';

import axios from 'axios';
import { store } from 'app/store/index';
import { BaseSetting } from '@config';

const resource = '/videocall';

export default {
  async joinCall(data) {
    return await Repository.post(`${resource}/join`, data);
  },
  async endCall(data) {
    return await Repository.post(`${resource}/disconnect`, data);
  },

};
