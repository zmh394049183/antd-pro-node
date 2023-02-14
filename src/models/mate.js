const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const MateSchema = new mongoose.Schema(
  {
    // 姓名
    name: { type: String, trim: true },
    // 电话
    phone: { type: String, trim: true },
    // 省
    address: { type: String, trim: true },
    // 单位
    company: { type: String, trim: true },
    // 渠道
    canal: { type: String, trim: true },
    // 合作意向
    cooperate: { type: String, trim: true },
  },
  { timestamps: true },
);
MateSchema.plugin(mongoosePaginate);
const Mate = mongoose.model('Mate', MateSchema);
module.exports = { Mate };
