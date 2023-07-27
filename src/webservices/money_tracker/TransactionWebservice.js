import {MONEY_TRACKER_TOKEN, MONEY_TRACKER_URL} from '@env';

class TransactionWebservice {
  static #path = `${MONEY_TRACKER_URL}/txns`;

  static async getTransactions(params) {
    try {
      const url = new URL(TransactionWebservice.#path);

      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });

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
