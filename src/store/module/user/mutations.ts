import { USER_REQUEST } from './mutation-types';
import { USER_SUCCESS } from './mutation-types';
import { USER_ERROR } from './mutation-types';
import { AUTH_LOGOUT } from './mutation-types';
import { IState, IUser } from './types';
import Vue from "vue";
import { IMutation, IMutationWithoutPayload } from '@/store/types/mutation';



const userRequest: IMutationWithoutPayload<IState> = (state) => {
  state.status = 'loading'
}

const userSuccess: IMutation<IState, IUser> = (state, resp) => {
  state.status = "success";
  state.userProfile = resp;
}

const userError: IMutationWithoutPayload<IState> = (state) => {
  state.status = "error";
}

const authLogout: IMutationWithoutPayload<IState> = (state) => {
  state.userProfile = {}
}

export default {
  [USER_REQUEST]: userRequest,
  [USER_SUCCESS]: userSuccess,
  [USER_ERROR]: userError,
  [AUTH_LOGOUT]: authLogout,
 }