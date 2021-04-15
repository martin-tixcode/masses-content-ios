import Repository from './Repository';
import { userMapper, usersMapper, profilesMapper } from './mappers/usersMappers';
import axios from 'axios';
import { store } from 'app/store/index';
import { BaseSetting } from '@config';
const resource = '/users';

export default {
  async get() {
    return userMapper(await Repository.get(`${resource}/user`));
  },
  async getprofessions() {
    return await Repository.get(`/professions`);
  },
  async getaudiovisual() {
    return await Repository.get(`/resource_audiovisuals`);
  },
  async getstudy() {
    return await Repository.get(`/study_levels`);
  },
  async getCountries() {
    return await Repository.get(`/countries`);
  },
  async getProfile() {
    return await Repository.get(`${resource}/profile`);
  },
  async getNotifications() {
    return await Repository.get(`${resource}/notifications`);
  },
  async edit(DTO) {
    return await Repository.put(`${resource}/update`, DTO);
  },
  async createPortfolio(DTO) {
    return await Repository.post(`${resource}/portfolio`, DTO);
  },
  async postToken(DTO) {
    return await Repository.post(`${resource}/token-device`, DTO);
  },
  async editAvatar(avatar, type) {
    const data = new FormData();
    data.append('avatar', { uri: avatar, name: 'image.jpg', type });
    return await Repository.post('/user/avatar', data);
  },
  async signUp(DTO) {
    return await Repository.post(`/user/create`, DTO);
  },
  async newPassword(password, newPassword) {
    const DTO = {
      current_password: password,
      new_password: newPassword,
    };
    return await Repository.put(`${resource}/password`, DTO);
  },
  async setPayment(data) {
    return await Repository.post(`/payment`, data);
  },
  async getPaymentMethod() {
    return await Repository.get(`/payment`);
  },
  async resetPassword(email) {
    const DTO = { email };
    return await Repository.post(`/password/email`, DTO);
  },
  async sendTokenAndPassword(data) {
    return await Repository.post(`/recover/password`, data);
  },
};
