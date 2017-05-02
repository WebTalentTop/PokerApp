import User from '../models/user.model';
import BaseCtrl from './base';

export default class UsersCtrl extends BaseCtrl {
  model = User;
}