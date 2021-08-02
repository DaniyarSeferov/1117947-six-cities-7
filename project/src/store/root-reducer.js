import {combineReducers} from 'redux';
import {user} from './user/user';
import {applicationData} from './application-data/application-data';
import {applicationProcess} from './application-process/application-process';

export const NameSpace = {
  DATA: 'DATA',
  APPLICATION: 'APPLICATION',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.DATA]: applicationData,
  [NameSpace.APPLICATION]: applicationProcess,
  [NameSpace.USER]: user,
});
