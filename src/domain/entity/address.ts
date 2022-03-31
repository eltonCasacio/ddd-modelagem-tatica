export class Address {
  private _street: string = "";
  private _number: number = 0;
  private _cep: string = "";
  private _city: string = "";

  constructor(street:string, number:number, cep:string, city:string) {
    this._street = street;
    this._number = number;
    this._cep = cep;
    this._city = city;
    this.validate();
  }

  validate() {
    if (!this._street) throw new Error("Street is required");
    if (!this._number) throw new Error("Number is required");
    if (!this._cep) throw new Error("Cep is required");
    if (!this._city) throw new Error("City is required");
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city} - ${this._cep}`;
  }
}
