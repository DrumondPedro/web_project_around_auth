class Api {
  constructor({ baseURL, userAuthorization }) {
    this._baseURL = baseURL;
    this._userAuthorization = userAuthorization;
  }

  async getInitialCards(path) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'GET',
        headers: {
          authorization: this._userAuthorization,
        },
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addNewCard({ title: cardName, link: cardLink }, path) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'POST',
        headers: {
          authorization: this._userAuthorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${cardName}`,
          link: `${cardLink}`,
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

  async like(path) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'PUT',
        headers: {
          authorization: this._userAuthorization,
        },
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async dislike(path) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'DELETE',
        headers: {
          authorization: this._userAuthorization,
        },
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteCard(path) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'DELETE',
        headers: {
          authorization: this._userAuthorization,
        },
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserInfo(path) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'GET',
        headers: {
          authorization: this._userAuthorization,
        },
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserEmail(path, token) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateUserInfo(path, { name: userName, about: userAbout }) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'PATCH',
        headers: {
          authorization: this._userAuthorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${userName}`,
          about: `${userAbout}`,
        }),
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateUserAvatar(path, picture) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'PATCH',
        headers: {
          authorization: this._userAuthorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: `${picture}` }),
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const client = new Api({
  baseURL: 'https://around-api.pt-br.tripleten-services.com/v1/',
  userAuthorization: '340a3ec0-6497-41ea-985c-06f3bdaa364c',
});

export const clientEmail = new Api({
  baseURL: 'https://se-register-api.en.tripleten-services.com/v1',
  userAuthorization: '340a3ec0-6497-41ea-985c-06f3bdaa364c',
});
