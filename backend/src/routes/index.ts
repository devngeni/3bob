import { app } from "../app";
/** Start Of User Routes */
import {
  signInRouter,
  signUpRouter,
  signOutRouter,
  currentUserRouter,
  activiteAccount,
  updateProfile,
  restPassword,
  requestPasswordRest,
} from "./users/index";
app.use([
  signInRouter,
  signUpRouter,
  signOutRouter,
  currentUserRouter,
  activiteAccount,
  updateProfile,
  requestPasswordRest,
  restPassword,
]);

import { DepositTransactionRouter } from "./transactions/deposit";
import { CurrentUserWalletRoute } from "./transactions/wallets";
app.use([DepositTransactionRouter]);
app.use([CurrentUserWalletRoute]);

import { currencyConverterRoute } from "./conversion/index";
app.use([currencyConverterRoute]);
/**End of User Routes */

/**Start Utilities Routes */
import { UploadUtilitiesRoutes } from "./utilities/index";

app.use([UploadUtilitiesRoutes]);
/** End of Utilities Routes */
