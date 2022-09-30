// import IUser from '../interfaces/IUser';
// import User from '../database/models/User';
// import IModel from '../interfaces/IModel';
// import IUserLogin from '../interfaces/IUserLogin';

// abstract class SequelizeModel implements IModel<User> {
//   protected model = User;

//   async findOne(userLogin: IUserLogin): Promise<IUser | null> {
//       return this.model.findOne({ where: { userLogin.email } });
//   }
// }

// export default SequelizeModel;