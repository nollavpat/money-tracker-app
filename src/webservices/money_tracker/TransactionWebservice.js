import {MONEY_TRACKER_TOKEN, MONEY_TRACKER_URL} from '@env';

class TransactionWebservice {
  static #path = `${MONEY_TRACKER_URL}/txns`;

  static async getTransactions(from, to) {
    try {
      const response = await fetch(TransactionWebservice.#path, {
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
