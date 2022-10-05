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
  JSON: any;
  Upload: any;
};

/** 自动化配置模型 */
export type AutoReplyConfig = {
  __typename?: 'AutoReplyConfig';
  /** 机器人实例id */
  botId: Scalars['String'];
  /** 需要执行的内容 */
  content: Scalars['String'];
  /** 创建时间 */
  createdAt: Scalars['DateTime'];
  /** 配置描述 */
  description?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['String'];
  /** 配置名称 */
  name: Scalars['String'];
  /** 优先级 */
  priority: Scalars['Float'];
  /** 表达式 */
  triggerExpr: Scalars['JSON'];
  /** 运行日志 */
  triggerLog: Array<AutoReplyTriggerLog>;
  /** 触发周期 */
  triggerPeriod?: Maybe<TriggerPeriod>;
  /** 触发频率 */
  triggerRate: TriggerRate;
  /** 触发类型 */
  triggerType: TriggerType;
  /** 更新时间 */
  updatedAt: Scalars['DateTime'];
};

export type AutoReplyConfigInput = {
  botId: Scalars['String'];
  /** 自动回复内容 */
  content: Scalars['String'];
  /** 自动化脚本描述 */
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  /** 自动化脚本名称 */
  name: Scalars['String'];
  /** 优先级 */
  priority: Scalars['Float'];
  /** 表达式, Auto为{name: string | RegExp} / {alias: string | RegExp}; Event为 "JSONLogic" */
  triggerExpr: Scalars['JSON'];
  /** 触发周期 */
  triggerPeriod?: InputMaybe<TriggerPeriod>;
  /** 触发频率 */
  triggerRate: TriggerRate;
  /** 触发类型 */
  triggerType: TriggerType;
};

/** 自动化配置日志 */
export type AutoReplyTriggerLog = {
  __typename?: 'AutoReplyTriggerLog';
  /** 自动化配置模型 */
  autoReplyConfigId: Scalars['String'];
  /** 创建时间 */
  createdAt: Scalars['DateTime'];
  /** ID */
  id: Scalars['String'];
  /** 更新时间 */
  updatedAt: Scalars['DateTime'];
};

/** 机器人模型 */
export type Bot = {
  __typename?: 'Bot';
  /** 机器人的联系人信息 */
  botContacts: Array<BotContact>;
  /** 机器人的所有群信息 */
  botRooms: Array<BotRoom>;
  /** 获取机器人状态 */
  botStatus: Scalars['Float'];
  /** 创建时间 */
  createdAt: Scalars['DateTime'];
  /** 机器人实例id */
  id: Scalars['String'];
  /** 机器人账号名称 */
  name?: Maybe<Scalars['String']>;
  /** 登录的二维码 */
  scanQrcode?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updatedAt: Scalars['DateTime'];
  /** 用户ID */
  userId: Scalars['String'];
};

/** 机器人模型 */
export type BotBotContactsArgs = {
  refresh?: InputMaybe<Scalars['Boolean']>;
};

/** 机器人模型 */
export type BotBotRoomsArgs = {
  refresh?: InputMaybe<Scalars['Boolean']>;
};

/** 机器人联系人模型 */
export type BotContact = {
  __typename?: 'BotContact';
  /** 地址 */
  address?: Maybe<Scalars['String']>;
  /** 别名(备注) */
  alias?: Maybe<Scalars['String']>;
  /** 机器人实例id */
  botId: Scalars['String'];
  /** 创建时间 */
  createdAt: Scalars['DateTime'];
  /** 性别 */
  gender: BotContactGender;
  /** 联系人id */
  id: Scalars['String'];
  /** 联系人名称 */
  name: Scalars['String'];
  /** 个人/公众号 */
  type: BotContactType;
  /** 更新时间 */
  updatedAt: Scalars['DateTime'];
};

/** 性别 */
export enum BotContactGender {
  /** 女 */
  Female = 'Female',
  /** 男 */
  Male = 'Male',
  /** 未知 */
  Unknown = 'Unknown',
}

/** 账号类型 */
export enum BotContactType {
  /** 团体 */
  Corporation = 'Corporation',
  /** 个人 */
  Individual = 'Individual',
  /** 公众号 */
  Official = 'Official',
  /** 未知 */
  Unknown = 'Unknown',
}

/** 机器人群模型 */
export type BotRoom = {
  __typename?: 'BotRoom';
  /** 机器人在群中的别名 */
  alias?: Maybe<Scalars['String']>;
  /** 群公告 */
  announce?: Maybe<Scalars['String']>;
  /** 机器人实例id */
  botId: Scalars['String'];
  /** 创建时间 */
  createdAt: Scalars['DateTime'];
  /** 群id */
  id: Scalars['String'];
  /** 群名称 */
  topic: Scalars['String'];
  /** 更新时间 */
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 密码登录 */
  pwdLogin: Scalars['String'];
  removeAutoConfig: Scalars['Boolean'];
  /** 创建/更新自动化配置 */
  saveAutoStartConfig: AutoReplyConfig;
  /** 启动/创建机器人 */
  startBot: Bot;
  /** 上传文件 */
  upload: Scalars['String'];
};

export type MutationPwdLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationRemoveAutoConfigArgs = {
  id: Scalars['String'];
};

export type MutationSaveAutoStartConfigArgs = {
  input: AutoReplyConfigInput;
};

export type MutationStartBotArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MutationUploadArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  /** 自动化配置详情 */
  autoReplyConfig: AutoReplyConfig;
  /** 获取机器人 */
  bot?: Maybe<Bot>;
  /** 查询自身 */
  myself: User;
};

export type QueryAutoReplyConfigArgs = {
  id: Scalars['String'];
};

export type QueryBotArgs = {
  id: Scalars['String'];
};

/** 触发周期 */
export enum TriggerPeriod {
  /** 每天 */
  Day = 'Day',
  Hour = 'Hour',
  /** 每分钟 */
  Minute = 'Minute',
  /** 每月 */
  Month = 'Month',
  /** 每周 */
  Week = 'Week',
}

/** 触发频率 */
export enum TriggerRate {
  /** 每次 */
  Always = 'Always',
  /** 自定义 */
  Custom = 'Custom',
  /** 一次 */
  Once = 'Once',
}

/** 触发类型 */
export enum TriggerType {
  /** 自动触发 */
  Auto = 'Auto',
  /** 事件触发 */
  Event = 'Event',
}

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

export type PwdLoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;

export type PwdLoginMutation = { __typename?: 'Mutation'; pwdLogin: string };

export type StartBotMutationVariables = Exact<{
  startBotId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}>;

export type StartBotMutation = {
  __typename?: 'Mutation';
  startBot: { __typename?: 'Bot'; scanQrcode?: string | null; id: string };
};

export type SaveAutoStartConfigMutationVariables = Exact<{
  input: AutoReplyConfigInput;
}>;

export type SaveAutoStartConfigMutation = {
  __typename?: 'Mutation';
  saveAutoStartConfig: {
    __typename?: 'AutoReplyConfig';
    name: string;
    content: string;
    description?: string | null;
    priority: number;
    triggerType: TriggerType;
    triggerRate: TriggerRate;
    triggerPeriod?: TriggerPeriod | null;
    createdAt: any;
    updatedAt: any;
    botId: string;
    id: string;
  };
};

export type MyselfQueryVariables = Exact<{ [key: string]: never }>;

export type MyselfQuery = {
  __typename?: 'Query';
  myself: {
    __typename?: 'User';
    id: string;
    mobilePhoneNumber?: string | null;
    username: string;
    avatar?: string | null;
    mobilePhoneVerified: boolean;
    nickname?: string | null;
    createdAt: any;
    updatedAt: any;
    roles: Array<UserRoleType>;
  };
};

export type BotStatusQueryVariables = Exact<{
  botId: Scalars['String'];
}>;

export type BotStatusQuery = {
  __typename?: 'Query';
  bot?: { __typename?: 'Bot'; botStatus: number } | null;
};

export type BotQueryVariables = Exact<{
  botId: Scalars['String'];
  botContactsRefresh?: InputMaybe<Scalars['Boolean']>;
  botRoomsRefresh?: InputMaybe<Scalars['Boolean']>;
}>;

export type BotQuery = {
  __typename?: 'Query';
  bot?: {
    __typename?: 'Bot';
    id: string;
    name?: string | null;
    scanQrcode?: string | null;
    botStatus: number;
    botContacts: Array<{
      __typename?: 'BotContact';
      id: string;
      name: string;
      gender: BotContactGender;
      alias?: string | null;
      address?: string | null;
      type: BotContactType;
      botId: string;
    }>;
    botRooms: Array<{
      __typename?: 'BotRoom';
      id: string;
      topic: string;
      announce?: string | null;
      alias?: string | null;
    }>;
  } | null;
};

export const PwdLoginDocument = gql`
  mutation pwdLogin($password: String!, $username: String!) {
    pwdLogin(password: $password, username: $username)
  }
`;
export const StartBotDocument = gql`
  mutation startBot($startBotId: String, $name: String) {
    startBot(id: $startBotId, name: $name) {
      scanQrcode
      id
    }
  }
`;
export const SaveAutoStartConfigDocument = gql`
  mutation SaveAutoStartConfig($input: AutoReplyConfigInput!) {
    saveAutoStartConfig(input: $input) {
      name
      content
      description
      priority
      triggerType
      triggerRate
      triggerPeriod
      createdAt
      updatedAt
      botId
      id
    }
  }
`;
export const MyselfDocument = gql`
  query myself {
    myself {
      id
      mobilePhoneNumber
      username
      avatar
      mobilePhoneVerified
      nickname
      createdAt
      updatedAt
      roles
    }
  }
`;
export const BotStatusDocument = gql`
  query botStatus($botId: String!) {
    bot(id: $botId) {
      botStatus
    }
  }
`;
export const BotDocument = gql`
  query bot($botId: String!, $botContactsRefresh: Boolean, $botRoomsRefresh: Boolean) {
    bot(id: $botId) {
      id
      name
      scanQrcode
      botStatus
      botContacts(refresh: $botContactsRefresh) {
        id
        name
        gender
        alias
        address
        type
        botId
      }
      botRooms(refresh: $botRoomsRefresh) {
        id
        topic
        announce
        alias
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
    pwdLogin(
      variables: PwdLoginMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<PwdLoginMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PwdLoginMutation>(PwdLoginDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'pwdLogin',
        'mutation',
      );
    },
    startBot(
      variables?: StartBotMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<StartBotMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<StartBotMutation>(StartBotDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'startBot',
        'mutation',
      );
    },
    SaveAutoStartConfig(
      variables: SaveAutoStartConfigMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<SaveAutoStartConfigMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SaveAutoStartConfigMutation>(SaveAutoStartConfigDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SaveAutoStartConfig',
        'mutation',
      );
    },
    myself(
      variables?: MyselfQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<MyselfQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MyselfQuery>(MyselfDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'myself',
        'query',
      );
    },
    botStatus(
      variables: BotStatusQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<BotStatusQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BotStatusQuery>(BotStatusDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'botStatus',
        'query',
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
