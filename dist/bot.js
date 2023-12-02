var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { account, walletClient } from "./clients.js";
import { parseEther } from "viem";
const bot = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield walletClient.sendTransaction({
      account,
      to: "0x6054e3483307fe791B2Db6cDD5f8b351Ff6f46E5",
      value: parseEther("1"),
    });
    console.log(hash);
  });
const runBotWithRetry = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    let retryCount = 0;
    const maxRetries = 3;
    while (retryCount < maxRetries) {
      try {
        yield bot();
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        retryCount++;
        yield new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }
    if (retryCount === maxRetries) {
      console.error(`La transaction a échoué après ${maxRetries} tentatives.`);
    }
  });
setInterval(
  () =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield runBotWithRetry();
    }),
  30000
);
