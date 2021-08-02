import {NameSpace} from '../root-reducer';

export const getStateCity = (state) => state[NameSpace.APPLICATION].city;
export const getRequestStatus = (state) => state[NameSpace.APPLICATION].isDataSent;
export const getRequestError = (state) => state[NameSpace.APPLICATION].sendError;
