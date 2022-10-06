import { defineStore } from 'pinia';
import graphqlClient from '/@/graphql';
import { BotQuery } from '/@/graphql/generated';
import { useWait } from '/@/hooks/web/useWait';
import { store } from '/@/store';

interface BotState {
  botId?: string;
  scanQrcode?: string;
  status: number;
  botInfo: BotQuery['bot'];
}

export const useBotStore = defineStore({
  id: 'bot',
  state: (): BotState => ({
    botId: '',
    scanQrcode: undefined,
    status: 0,
    botInfo: undefined,
  }),
  actions: {
    async createBot(botName: string) {
      const { startBot } = await graphqlClient.startBot({
        // 单机器人模型
        startBotId: this.botId,
        name: botName,
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
      if (this.botInfo) return this.botInfo;
      const { bot } = await graphqlClient.bot({
        botId: this.botId,
        botContactsRefresh: true,
        botRoomsRefresh: true,
      });
      this.botInfo = bot;
      return bot;
    },
  },
});

export function useBotStoreWithOut() {
  return useBotStore(store);
}
