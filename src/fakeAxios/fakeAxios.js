import FakeAxiosError from './FakeAxiosError';

class FakeAxios {
  constructor(item) {
    this.item = item;

    try {
      const storage = JSON.parse(localStorage.getItem(this.item));

      if (storage === 'null' || !Array.isArray(storage)) {
        throw new Error();
      }
    } catch (e) {
      localStorage.setItem(this.item, '[]');
    }
  }

  static getRandomDelay(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  get() {
    const storage = JSON.parse(localStorage.getItem(this.item));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (storage === null) {
          return reject(
            new FakeAxiosError(
              true,
              'There is no a relevant dataObject in localStorage',
            ),
          );
        }

        return resolve({ data: storage });
      }, this.constructor.getRandomDelay(2000, 5000));
    });
  }

  post(url, data) {
    const storage = JSON.parse(localStorage.getItem(this.item));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (storage === null) {
          return reject(
            new FakeAxiosError(
              true,
              'There is no a relevant dataObject in localStorage',
            ),
          );
        }
        // Create unique id for new data
        const postData = { ...data, id: Date.now() };
        // Add new data to the storage
        storage.push(postData);
        localStorage.setItem(this.item, JSON.stringify(storage));

        return resolve({ data: postData });
      }, this.constructor.getRandomDelay(100, 1000));
    });
  }

  put(id, data) {
    const storage = JSON.parse(localStorage.getItem(this.item));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (storage === null) {
          return reject(
            new FakeAxiosError(
              true,
              'There is no a relevant dataObject in localStorage',
            ),
          );
        }

        const index = storage.findIndex((each) => each.id === +id);

        if (index === -1) {
          return reject(
            new FakeAxiosError(
              true,
              'There is no a relevant dataObject in localStorage',
            ),
          );
        }

        Object.assign(storage[index], data);

        localStorage.setItem(this.item, JSON.stringify(storage));

        return resolve({ data: storage[index] });
      }, this.constructor.getRandomDelay(100, 1000));
    });
  }

  delete(id) {
    const storage = JSON.parse(localStorage.getItem(this.item));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (storage === null) {
          return reject(
            new FakeAxiosError(
              true,
              'There is no a relevant dataObject in localStorage',
            ),
          );
        }

        const index = storage.findIndex((each) => each.id === +id);

        if (index === -1) {
          return reject(
            new FakeAxiosError(
              true,
              'There is no a relevant dataObject in localStorage',
            ),
          );
        }

        storage.splice(index, 1);

        localStorage.setItem(this.item, JSON.stringify(storage));

        return resolve({ data: storage[index] });
      }, this.constructor.getRandomDelay(100, 1000));
    });
  }
}

const axios = {
  create: () => new FakeAxios('todos'),
};

export default axios;
