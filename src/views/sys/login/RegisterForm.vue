<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem name="email" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.email"
          :placeholder="t('sys.login.email')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="code" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          :sendCodeApi="handleSendCode"
          v-model:value="formData.code"
          :placeholder="t('sys.login.emailCode')"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox, message } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import graphqlClient from '/@/graphql';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState, setLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    email: '',
    code: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleSendCode() {
    if (!formData.email) {
      message.error('请输入邮箱');
      return false;
    }
    const { requestEmailCode } = await graphqlClient.requestEmailCode({ email: formData.email });
    return requestEmailCode;
  }

  async function handleRegister() {
    const data: typeof formData = await validForm();
    if (!data) return;
    await graphqlClient.signUpByEmail({
      email: data.email,
      password: data.password,
      nickname: data.account,
      code: data.code,
    });
    message.success('注册成功, 请使用账号密码登录');
    setLoginState(LoginStateEnum.LOGIN);
  }
</script>
