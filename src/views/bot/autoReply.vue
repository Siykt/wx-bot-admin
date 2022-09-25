<script setup lang="ts">
  import { Form, Button, Tag, Input } from 'ant-design-vue';
  import { reactive, ref } from 'vue';
  import { AutoReplyConfigInput } from '/@/graphql/generated';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useBotStoreWithOut } from '/@/store/modules/bot';
  import { PageWrapper } from '/@/components/Page';
  import graphqlClient from '/@/graphql';

  type FromData = AutoReplyConfigInput & { keywords: string; description: string };

  const keywordList = ref<string[]>([]);
  const botStore = useBotStoreWithOut();
  const FormItem = Form.Item;
  const formData = reactive<FromData>({
    botId: botStore.botId,
    priority: 1,
    triggerType: 'Event',
    triggerRate: 'Always',
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
      await graphqlClient.SaveAutoStartConfig({
        input: {
          ...formData,
          keywords: undefined,
          triggerExpr: {
            in: [
              {
                var: 'content',
              },
              keywordList.value,
            ],
          },
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
        :rules="[{ required: true, message: '请输入自动回复的内容' }]"
        label="自动回复的内容"
        name="content"
      >
        <Input v-model:value="formData.content" placeholder="请输入自动回复的内容" />
      </FormItem>

      <FormItem label="关键词" name="keywords">
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
  // something
</style>
