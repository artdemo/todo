export default class FakeAxiosError extends Error {
  constructor(isAxiosError, ...params) {
    super(...params);

    this.name = 'FakeAxiosError';
    this.isAxiosError = isAxiosError;
    this.date = new Date();
  }
}
