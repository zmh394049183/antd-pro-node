const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true },
    password: {
      type: String,
      trim: true,
      // set(val) {
      //   return bcrypt.hashSync(val, 10);
      // },
    },
    name: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        'https://zmh-1301925867.cos.ap-beijing.myqcloud.com/web%2Favatar.png',
    },
    role: {
      type: Number,
      // 0:管理员，1:普通用户
      enum: [0, 1],
      default: 1,
      required: true,
    },
  },
  { timestamps: true },
);
UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);
module.exports = { User };
