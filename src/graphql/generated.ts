import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

/** 机器人联系人模型 */
export type BotContactInfo = {
  __typename?: 'BotContactInfo';
  /** 地址 */
  address: Scalars['String'];
  /** 别名(备注) */
  alias?: Maybe<Scalars['String']>;
  /** 市 */
  city: Scalars['String'];
  /** 性别 */
  gender: Scalars['String'];
  /** 联系人id */
  id: Scalars['String'];
  /** 是否为好友 */
  isFriend: Scalars['Boolean'];
  /** 联系人名称 */
  name: Scalars['String'];
  /** 省 */
  province: Scalars['String'];
  /** 是否为常用联系人 */
  star?: Maybe<Scalars['Boolean']>;
  /** 个人/公众号 */
  type: Scalars['String'];
};

/** 机器人模型 */
export type BotModel = {
  __typename?: 'BotModel';
  /** 机器人的联系人信息 */
  botContacts: Array<BotContactInfo>;
  /** 机器人的所有群信息 */
  botRooms: Array<BotRoomInfo>;
  /** 机器人实例id */
  id: Scalars['String'];
  /** 登录二维码 */
  scanQrcode: Scalars['String'];
};

/** 机器人群信息 */
export type BotRoomInfo = {
  __typename?: 'BotRoomInfo';
  /** 机器人在群中的别名 */
  alias: Scalars['String'];
  /** 群公共 */
  announce: Scalars['String'];
  /** 群id */
  id: Scalars['String'];
  /** 群成员 */
  member: Array<BotContactInfo>;
  /** 群名称 */
  topic: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 创建机器人 */
  createBot: BotModel;
  /** 上传文件 */
  upload: Scalars['String'];
};

export type MutationCreateBotArgs = {
  botId: Scalars['String'];
};

export type MutationUploadArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  /** 获取机器人 */
  bot?: Maybe<BotModel>;
  /** 查询自身 */
  myself: User;
};

export type QueryBotArgs = {
  id: Scalars['String'];
};

/** 用户模型 */
export type User = {
  __typename?: 'User';
  /** 头像 */
  avatar?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createdAt: Scalars['DateTime'];
  /** ID */
  id: Scalars['String'];
  /** 手机号 */
  mobilePhoneNumber?: Maybe<Scalars['String']>;
  /** 是否验证手机号 */
  mobilePhoneVerified: Scalars['Boolean'];
  /** 昵称 */
  nickname?: Maybe<Scalars['String']>;
  /** 用户的角色 */
  roles: Array<UserRoleType>;
  /** 更新时间 */
  updatedAt: Scalars['DateTime'];
  /** 用户名 */
  username: Scalars['String'];
};

/** 用户角色 */
export enum UserRoleType {
  /** 管理员 */
  Admin = 'Admin',
  /** 系统管理员 */
  SystemAdmin = 'SystemAdmin',
}

export type CreateBotMutationVariables = Exact<{
  botId: Scalars['String'];
}>;

export type CreateBotMutation = {
  __typename?: 'Mutation';
  createBot: { __typename?: 'BotModel'; id: string; scanQrcode: string };
};

export type BotQueryVariables = Exact<{
  botId: Scalars['String'];
}>;

export type BotQuery = {
  __typename?: 'Query';
  bot?: {
    __typename?: 'BotModel';
    id: string;
    scanQrcode: string;
    botContacts: Array<{
      __typename?: 'BotContactInfo';
      id: string;
      name: string;
      gender: string;
      alias?: string | null;
      isFriend: boolean;
      star?: boolean | null;
      type: string;
      province: string;
      city: string;
      address: string;
    }>;
    botRooms: Array<{
      __typename?: 'BotRoomInfo';
      id: string;
      topic: string;
      announce: string;
      alias: string;
      member: Array<{
        __typename?: 'BotContactInfo';
        id: string;
        name: string;
        gender: string;
        alias?: string | null;
        isFriend: boolean;
        star?: boolean | null;
        type: string;
        province: string;
        city: string;
        address: string;
      }>;
    }>;
  } | null;
};

export const CreateBotDocument = gql`
  mutation createBot($botId: String!) {
    createBot(botId: $botId) {
      id
      scanQrcode
    }
  }
`;
export const BotDocument = gql`
  query bot($botId: String!) {
    bot(id: $botId) {
      id
      scanQrcode
      botContacts {
        id
        name
        gender
        alias
        isFriend
        star
        type
        province
        city
        address
      }
      botRooms {
        id
        topic
        announce
        alias
        member {
          id
          name
          gender
          alias
          isFriend
          star
          type
          province
          city
          address
        }
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createBot(
      variables: CreateBotMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateBotMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateBotMutation>(CreateBotDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createBot',
        'mutation',
      );
    },
    bot(
      variables: BotQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<BotQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BotQuery>(BotDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'bot',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
