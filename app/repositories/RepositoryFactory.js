import AuthRepository from './authRepository';
import UsersRepository from './usersRepository';
import castingsRepository from './castingsRepository';
import InterestsRepository from './InterestRepository';
import VideoCallRepository from './VideoCallRepository';

const repositories = {
  auth: AuthRepository,
  users: UsersRepository,
  castings: castingsRepository,
  interests: InterestsRepository,
  videocall: VideoCallRepository

};

export const RepositoryFactory = {
  get: name => repositories[name],
};
