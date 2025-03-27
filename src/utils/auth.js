class Auth {
  constructor({ baseURL }) {
    this._baseURL = baseURL;
  }

  async register(path, { email: userEmail, password: userPassword }) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: `${userPassword}`,
          email: `${userEmail}`,
        }),
      });

      if (res.status !== 201) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async authorize(path, { email: userEmail, password: userPassword }) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: `${userPassword}`,
          email: `${userEmail}`,
        }),
      });

      if (res.status !== 201) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new Auth({
  baseURL: 'https://se-register-api.en.tripleten-services.com/v1',
});
