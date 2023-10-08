import { SSTConfig } from 'sst'
import { StorageStack } from './stacks/StorageStack'
import { ApiStack } from './stacks/ApiStack'
import { AuthStack } from './stacks/AuthStack';

export default {
  config(_input) {
    return {
      name: 'may-notes',
      region: 'us-west-2',
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(AuthStack)
  }
} satisfies SSTConfig
