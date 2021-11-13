import { AppUser } from './app-user';

export interface Carrier {
  id: string;
  companyName: string;
  maxCargoVolume: number;
  currentOccupiedVolume: number;
  appUserId: string;
  appUser: AppUser;
}
