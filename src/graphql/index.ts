import { ClientError, GraphQLClient } from 'graphql-request';
import { useGlobSetting } from '../hooks/setting';
import { getSdk } from './generated';
import { getToken } from '/@/utils/auth';
import { BasicModal } from '/@/components/Modal';

const globSetting = useGlobSetting();
export const clientHeaders = new Headers();

const graphqlClient = new GraphQLClient(globSetting.apiUrl, { headers: clientHeaders });

const client = getSdk(graphqlClient, async (action) => {
  clientHeaders.set('authorization', getToken());
  try {
    const result = await action();
    return result;
  } catch (error) {
    BasicModal.error((error as ClientError).response.errors?.[0].message || '');
    throw (error as ClientError).response.errors?.[0].extensions?.exception;
  }
});

export default client;

export const clientWithoutError = getSdk(graphqlClient, async (action) => {
  try {
    const result = await action();
    return result;
    // TODO ESlint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // message.error((error as ClientError).response.errors?.[0].message || '');
    throw (error as ClientError).response.errors?.[0].extensions?.exception;
  }
});
