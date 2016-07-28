import * as login from './login';
import * as device from './device';

import api from './api';

export default {
  ...api,
  ...device,
  ...login
}
