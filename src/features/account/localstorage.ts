import moment from "moment";

type Expiry<R> = {
  __value: R;
  __expiry: string;
};

class Storage {
  getItem<R>(key: string) {
    const json = localStorage.getItem(key);
    if (json === null) return null;
    const { __value, __expiry } = JSON.parse(json) as Expiry<R>;

    if (moment(__expiry).isAfter(moment.utc())) {
      return null;
    }
    return __value;
  }

  setItem<R>(key: string, value: R, hoursValid: number = 24) {
    const payload: Expiry<R> = {
      __value: value,
      __expiry: moment
        .utc()
        .add(hoursValid, "hours")
        .toISOString()
    };

    localStorage.setItem(key, JSON.stringify(payload));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export const storage = new Storage();
