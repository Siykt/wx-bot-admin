<script setup lang="ts">
  import { Form, Button, Tag, Input, Select, SelectOption } from 'ant-design-vue';
  import { reactive, ref } from 'vue';
  import {
    AutoReplyConfigInput,
    TriggerType,
    TriggerRate,
    TriggerPeriod,
  } from '/@/graphql/generated';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useBotStoreWithOut } from '/@/store/modules/bot';
  import { PageWrapper } from '/@/components/Page';
  import graphqlClient from '/@/graphql';

  type FromData = AutoReplyConfigInput & {
    keywords: string;
    description: string;
    triggerPeriod?: TriggerPeriod;
    triggerName: string;
  };

  const keywordList = ref<string[]>([]);
  const botStore = useBotStoreWithOut();
  const FormItem = Form.Item;
  const formData = reactive<FromData>({
    botId: botStore.botId,
    priority: 1,
  } as FromData);
  const { createMessage } = useMessage();
  const loading = ref(false);
  const formRef = ref<typeof Form>();
  const handleSubmit = async () => {
    if (!botStore.botId) return createMessage.error('请先创建机器人!');
    try {
      loading.value = true;
      await formRef.value?.validate();
      if (!keywordList.value.length) return createMessage.error('请添加关键词!');
      const triggerExpr =
        formData.triggerType === TriggerType.Auto
          ? { name: formData.triggerName, alias: formData.triggerName }
          : { in: [{ var: 'content' }, keywordList.value] };
      await graphqlClient.SaveAutoStartConfig({
        input: {
          ...formData,
          keywords: undefined,
          triggerName: undefined,
          triggerExpr,
        } as AutoReplyConfigInput,
      });
      handleReset();
      createMessage.success('添加成功!');
    } catch (error) {
      console.log('error ->', error);
    } finally {
      loading.value = false;
    }
  };
  const handleReset = () => {
    formRef.value?.resetFields();
    keywordList.value = [];
  };
  const handleClose = (index: number) => {
    const keywordListTemp = keywordList.value.slice(0);
    keywordListTemp.splice(index, 1);
    keywordList.value = keywordListTemp;
  };
  const handleAddKeyword = () => {
    if (!formData.keywords) return;
    keywordList.value.push(formData.keywords);
    formData.keywords = '';
  };
</script>
<template>
  <PageWrapper>
    <div class="title">创建自动化脚本</div>
    <Form
      class="form"
      autocomplete="off"
      :model="formData"
      :label-col="{ style: { width: '180px' } }"
      ref="formRef"
      @keypress.enter="handleSubmit"
    >
      <FormItem
        :rules="[{ required: true, message: '请输入自动化脚本名称' }]"
        label="自动化脚本名称"
        name="name"
      >
        <Input v-model:value="formData.name" placeholder="请输入自动化脚本名称" />
      </FormItem>
      <FormItem label="自动化描述" name="description">
        <Input v-model:value="formData.description" placeholder="请输入自动化描述" />
      </FormItem>
      <FormItem
        :rules="[{ required: true, message: '请选择自动化脚本触发频率' }]"
        label="触发频率"
        name="triggerRate"
      >
        <Select placeholder="请选择自动化脚本触发频率" v-model:value="formData.triggerRate">
          <SelectOption :value="TriggerRate.Always">每次都触发</SelectOption>
          <SelectOption :value="TriggerRate.Once">仅触发一次</SelectOption>
          <SelectOption disabled :value="TriggerRate.Custom">自定义</SelectOption>
        </Select>
      </FormItem>
      <FormItem
        :rules="[{ required: true, message: '请选择自动化脚本触发器类型' }]"
        label="触发器类型"
        name="triggerType"
      >
        <Select placeholder="请选择自动化脚本触发器类型" v-model:value="formData.triggerType">
          <SelectOption :value="TriggerType.Auto">定时触发</SelectOption>
          <SelectOption :value="TriggerType.Event">关键词触发</SelectOption>
        </Select>
      </FormItem>
      <FormItem
        :rules="[{ required: true, message: '请输入执行对象名称' }]"
        v-if="formData.triggerType === TriggerType.Auto"
        label="执行对象(用户名/别名)"
        name="triggerName"
      >
        <Input v-model:value="formData.triggerName" placeholder="请输入执行对象名称" />
      </FormItem>
      <FormItem
        :rules="[{ required: true, message: '请选择触发周期' }]"
        v-if="formData.triggerType === TriggerType.Auto"
        label="触发周期"
        name="triggerPeriod"
      >
        <Select v-model:value="formData.triggerPeriod">
          <SelectOption :value="TriggerPeriod.Minute">每分钟</SelectOption>
          <SelectOption :value="TriggerPeriod.Hour">每小时</SelectOption>
          <SelectOption :value="TriggerPeriod.Day">每一天</SelectOption>
          <SelectOption :value="TriggerPeriod.Week">每一周</SelectOption>
          <SelectOption :value="TriggerPeriod.Month">每一月</SelectOption>
        </Select>
      </FormItem>
      <FormItem v-if="formData.triggerType === TriggerType.Event" label="关键词" name="keywords">
        <Input
          style="width: calc(100% - 200px)"
          v-model:value="formData.keywords"
          placeholder="请输入触发自动回复的关键词"
        />
        <Button style="width: 200px" type="primary" block @click="handleAddKeyword">添加</Button>
        <div v-if="keywordList.length" class="mt-2">
          <Tag
            v-for="(keyword, index) in keywordList"
            :key="keyword"
            color="cyan"
            class="mt-2 mb-2"
            closable
            @close="handleClose(index)"
          >
            {{ keyword }}
          </Tag>
        </div>
      </FormItem>
      <FormItem
        :rules="[{ required: true, message: '请输入自动回复的内容' }]"
        label="自动回复的内容"
        name="content"
      >
        <Input v-model:value="formData.content" placeholder="请输入自动回复的内容" />
      </FormItem>
      <FormItem>
        <div class="flex pl-30 pr-30">
          <Button
            class="ml-auto mr-8"
            type="primary"
            block
            @click="handleSubmit"
            :loading="loading"
          >
            提交
          </Button>
          <Button class="mr-auto" type="default" block @click="handleReset"> 重置 </Button>
        </div>
      </FormItem>
    </Form>
  </PageWrapper>
</template>

<style lang="less" scoped>
  .title {
    font-size: 30px;
  }
</style>
