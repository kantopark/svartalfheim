import moment from "moment";

type Expiry<R> = {
  __value: R;
  __expiry: string;
};

class Storage {
  private dateFormat = "YYYY-MM-DD HH:mm:ss";

  getItem<R>(key: string) {
    const json = localStorage.getItem(key);
    if (json === null) return null;
    const { __value, __expiry } = JSON.parse(json) as Expiry<R>;

    // if expiry is after now, return value. Otherwise, return null
    return moment.utc(__expiry, this.dateFormat).isAfter(moment.utc()) ? __value : null;
  }

  setItem<R>(key: string, value: R, hoursValid: number = 24) {
    const payload: Expiry<R> = {
      __value: value,
      __expiry: moment
        .utc()
        .add(hoursValid, "hours")
        .format(this.dateFormat)
    };
    localStorage.setItem(key, JSON.stringify(payload));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export const storage = new Storage();
