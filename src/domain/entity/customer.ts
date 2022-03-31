import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  validate() {
    if (!this._id) throw new Error("Id is required!");
    if (!this._name) throw new Error("Name is required!");
  }

  activate() {
    if (!this._address) throw new Error("Address is required!");
    this._active = true;
  }

  diactivate() {
    this._active = false;
  }

  addAddress(address: Address) {
    if (!address) throw new Error("Address could not be empty!");
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(value: number): void {
    this._rewardPoints += value;
  }
}
