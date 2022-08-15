import { Injectable } from "@nestjs/common";
import axios from "axios";
import { TokenDataResponse } from "../types";

const apiUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD";

@Injectable()
export class TokenService {
  async getTokenData(): Promise<TokenDataResponse | Error> {
    try {
      const { data, status } = await axios.get<TokenDataResponse>(apiUrl, {
        headers: {
          Accept: "application/json",
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async manageGuess(guess, timeRemaining, initialPrice, callback) {
    const onCompletion = async () => {
      const result = (await this.getTokenData()) as TokenDataResponse;
      const finalPrice = parseInt(result.bitcoin.usd);

      let winnings = -1; // default to loss
      switch (guess) {
        case 1:
          if (initialPrice < finalPrice) winnings = 1;
          break;
        case -1:
          if (initialPrice > finalPrice) winnings = 1;
          break;
        default:
          break;
      }
      callback(winnings, finalPrice);
    };

    await new Promise((resolve) => setTimeout(onCompletion, timeRemaining));
  }
}
