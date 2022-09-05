import { defineStore } from 'pinia';
import graphqlClient from '/@/graphql';
import { useWait } from '/@/hooks/web/useWait';
import { store } from '/@/store';

interface BotState {
  botId?: string;
  scanQrcode?: string;
  status: number;
}

export const useBotStore = defineStore({
  id: 'bot',
  state: (): BotState => ({
    botId: localStorage.getItem('botId') ?? '',
    scanQrcode: undefined,
    status: 0,
  }),
  actions: {
    async createBot(startBotId: string) {
      // 单机器人模型
      if (this.botId) return false;
      const { startBot } = await graphqlClient.startBot({
        startBotId,
      });

      this.botId = startBot.id;
      localStorage.setItem('botId', this.botId);
      this.scanQrcode = startBot.scanQrcode ?? '';
      return true;
    },
    async waitingBotReady() {
      if (!this.botId || this.status === 2) return;
      const { bot } = await graphqlClient.botStatus({ botId: this.botId });
      if (!bot) return;
      this.status = bot.botStatus;
      await useWait(800);
      await this.waitingBotReady();
    },
    async getBotInfo() {
      if (!this.botId) return;
      const { bot } = await graphqlClient.bot({
        botId: this.botId,
        botContactsRefresh: true,
        botRoomsRefresh: true,
      });
      return bot;
    },
  },
});

export function useBotStoreWithOut() {
  return useBotStore(store);
}
