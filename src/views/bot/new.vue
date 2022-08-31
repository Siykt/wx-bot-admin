<script setup lang="ts">
  import { useBotStoreWithOut } from '/@/store/modules/bot';
  import BasicButton from '/@/components/Button/src/BasicButton.vue';
  import { ref } from 'vue';
  import { BotQuery } from '/@/graphql/generated';
  import { Table } from 'ant-design-vue';

  const loading = ref(false);
  const bot = ref<BotQuery['bot']>();
  const botStore = useBotStoreWithOut();
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const status = ['未初始化', '等待扫码', '用户已存在', '已暂停'];

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
    <div>机器人状态: {{ status[botStore.status] }}</div>
    <div v-if="botStore.scanQrcode">
      <p>WX二维码, 请确认扫码登录</p>
      <img :src="botStore.scanQrcode" alt="scanQrcode" />
    </div>
    <div style="display: flex; justify-content: space-between; margin: 10px 0">
      <BasicButton :loading="loading" @click="handleCreateBot">创建机器人</BasicButton>
      <div class="search">
        <input placeholder="请输入查找类型..." />
        <BasicButton :loading="loading" @click="handleCreateBot">查找</BasicButton>
      </div>
    </div>
    <Table :dataSource="bot?.botContacts ?? []" :columns="columns" />
  </div>
</template>

<style lang="less" scoped>
  div {
    margin: 10px 0;
  }

  .title {
    font-size: 30px;
  }

  .search {
    display: flex;
    margin-right: 50px;

    input {
      margin-right: 10px;
      padding-left: 5px;
      height: 30px;
    }
  }
</style>
