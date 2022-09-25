import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const bot: AppRouteModule = {
  path: '/bot',
  name: 'Bot',
  component: LAYOUT,
  redirect: '/bot/new',
  meta: {
    orderNo: 11,
    icon: 'ant-design:android-outlined',
    title: '自动化机器人',
  },
  children: [
    {
      path: 'new',
      name: 'BotNew',
      component: () => import('/@/views/bot/new.vue'),
      meta: {
        title: '创建机器人',
      },
    },
    {
      path: 'auto-reply',
      name: 'BotAutoReply',
      component: () => import('/@/views/bot/autoReply.vue'),
      meta: {
        title: '自动化脚本',
      },
    },
  ],
};

export default bot;
