import { body } from "express-validator";
import { Router, Response, Request } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Transaction, User, UserDoc, Wallet } from "../../models";
import { BadRequestError } from "../../errors/bad-request-error";
import {
  accountNumber,
  ApiResponse,
  currencyConverter,
  mpesaPhoneFormat,
  sendSMS,
} from "../../utils";
import {
  initiateSTK,
  mpesaApi,
  receiveSTKPushPayloadFromCallbackURL,
} from "../../utils/mpesa";

const router = Router();

router.get(
  "/api/transactions",
  requireAuth,
  async (req: Request, res: Response) => {
    const searchQuery = req.query.search?.toString();
    let response;
    //{$or: [{ name: regexSearch }, { description: regexSearch }]}
    if (searchQuery) {
      const regexSearch = new RegExp(`${searchQuery}`, "i");
      response = new ApiResponse(
        Transaction.find({
          user: req.user?.id,
          $or: [
            { name: regexSearch },
            { code: regexSearch },
            { capital: regexSearch },
          ],
        }),
        req.query
      )
        .filter()
        .sort()
        .limitFields();
    } else {
      response = new ApiResponse(
        Transaction.find({ user: req.user?.id }),
        req.query
      )
        .filter()
        .sort()
        .limitFields();
    }

    const count = await response.query;

    const transactions = await response.paginate().query;

    res.status(200).json({
      status: "success",
      page: response?.page_info,
      count: count.length,
      transactions,
    });
  }
);

export { router as ListTransactionRoute };
