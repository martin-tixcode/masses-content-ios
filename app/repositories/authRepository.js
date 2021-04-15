import Repository from './Repository';
const resource = '/auth';

export default {
  getTokenWithGoogle(email, user_id) {
    const DTO = {
      email,
      user_id
    };
    return Repository.post(`${resource}/login/google`, DTO);
  },
  getTokenWithFacebook(name, user_id) {
    const DTO = {
      name,
      user_id
    };
    return Repository.post(`${resource}/login/facebook`, DTO);
  },

  async signIn(DTO) {
    let response = await Repository.post(`${resource}/login`, DTO);

    return response;
  },

  async signUp(DTO) {
    let response = await Repository.post(`${resource}/signup`, DTO);

    return response;
  },

  async userData() {
    let response = await Repository.get(`${resource}/user`);

    return response;
  },
};
