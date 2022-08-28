<script setup lang="ts">
  import { useBotStoreWithOut } from '/@/store/modules/bot';
  import BasicButton from '/@/components/Button/src/BasicButton.vue';
  import { ref } from 'vue';
  import { BotQuery } from '/@/graphql/generated';

  const loading = ref(false);
  const bot = ref<BotQuery['bot']>();
  const botStore = useBotStoreWithOut();
  const handleCreateBot = async () => {
    loading.value = true;
    try {
      await botStore.createBot('test-admin');
      await botStore.waitingBotReady();
      bot.value = await botStore.getBotInfo();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };
</script>
<template>
  <div class="p-4">
    <div class="title">创建机器人</div>
    <div>机器人状态: {{ botStore.status }}</div>
    <div v-if="botStore.scanQrcode">
      <p>WX二维码, 请确认扫码登录</p>
      <img :src="botStore.scanQrcode" alt="scanQrcode" />
    </div>
    <BasicButton :loading="loading" @click="handleCreateBot">创建机器人</BasicButton>
    <div v-if="bot">
      <div>机器人好友</div>
      <div v-for="contacts in bot.botContacts" :key="contacts.id">
        <p>好友: {{ contacts.name }}</p>
        <p>类型: {{ contacts.type }}</p>
        <p>性别: {{ contacts.gender }}</p>
        <p>地址: {{ contacts.address }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .title {
    font-size: 30px;
  }
</style>
