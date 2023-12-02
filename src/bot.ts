import { account, publicClient, walletClient } from "./clients";
import { parseEther } from "viem";

const bot = async () => {
  const hash = await walletClient.sendTransaction({
    account,
    to: "0x6054e3483307fe791B2Db6cDD5f8b351Ff6f46E5" as `0x${string}`,
    value: parseEther("1"),
  });

  console.log(hash);
};

const runBotWithRetry = async () => {
  let retryCount = 0;
  const maxRetries = 3;

  while (retryCount < maxRetries) {
    try {
      await bot();
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  if (retryCount === maxRetries) {
    console.error(`La transaction a échoué après ${maxRetries} tentatives.`);
  }
};

setInterval(async () => {
  await runBotWithRetry();
}, 30000);
