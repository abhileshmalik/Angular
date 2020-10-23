
export class User {
    constructor(
      public email: string,
      public id: string,
      private _token: string,   // since token can be misused so we keep it in private scope
      private _tokenExpirationDate: Date
    ) {}
  
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }
}
