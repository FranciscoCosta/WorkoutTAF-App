import {ID, Account, Client} from 'appwrite';

import Config from 'react-native-config';

import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;

const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

export default class AppWriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(appwriteClient);
  }

  createAccount = async ({email, password, name}: CreateUserAccount) => {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount.$id) {
        return this.login({email, password});
      }
      return userAccount;
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  login = async ({email, password}: LoginUserAccount) => {
    try {
      const loginUser = await this.account.createEmailSession(email, password);
      return loginUser;
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  getCurrentUser = async () => {
    try {
      const currentUser = await this.account.get();
      return currentUser;
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  logout = async () => {
    try {
      const logoutUser = await this.account.deleteSession('current');
      return logoutUser;
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };
}
