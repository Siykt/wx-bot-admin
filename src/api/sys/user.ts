import { defHttp } from '/@/utils/http/axios';
import { LoginParams } from './model/userModel';
import graphqlClient from '/@/graphql';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export async function loginApi(params: LoginParams) {
  const { pwdLogin } = await graphqlClient.pwdLogin(params);
  return pwdLogin;
}

/**
 * @description: getUserInfo
 */
export async function getUserInfo() {
  const { myself } = await graphqlClient.myself();
  return myself;
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
