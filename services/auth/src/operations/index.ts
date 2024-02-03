import * as auth from './auth.js';
import * as login_logout from './login_logout.js';
import * as token from './token.js';
import * as users from './users.js';

export default {
  ...users,
  ...login_logout,
  ...auth,
  ...token,
};
