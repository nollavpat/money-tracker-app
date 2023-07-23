import {MONEY_TRACKER_TOKEN, MONEY_TRACKER_URL} from '@env';
import dayjs from 'dayjs';

class TransactionWebservice {
  static #path = `${MONEY_TRACKER_URL}/txns`;

  static async getTransactions(from, to) {
    try {
      const url = new URL(TransactionWebservice.#path);

      if (from) {
        url.searchParams.append('from', dayjs(from).toISOString());
      }

      if (to) {
        url.searchParams.append('to', dayjs(to).toISOString());
      }

      const response = await fetch(url.href, {
        method: 'GET',
        headers: {
          Authorization: `Token ${MONEY_TRACKER_TOKEN}`,
        },
      });
      const data = await response.json();

      return [null, data];
    } catch (error) {
      return [error, null];
    }
  }
}

export default TransactionWebservice;
