import User from '../models/User';

class UserController{
    async store(require, response){
        const user = await User.create(require.body);
        return response.json(user);
    }
}

export default new UserController();