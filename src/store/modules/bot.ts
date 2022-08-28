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
    botId: undefined,
    scanQrcode: undefined,
    status: 0,
  }),
  actions: {
    async createBot(botId: string) {
      // 单机器人模型
      if (this.botId) return false;
      const { createBot } = await graphqlClient.createBot({
        botId,
      });

      this.botId = createBot.id;
      this.scanQrcode = createBot.scanQrcode;
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
      const { bot } = await graphqlClient.bot({ botId: this.botId });
      return bot;
    },
  },
});

export function useBotStoreWithOut() {
  return useBotStore(store);
}
