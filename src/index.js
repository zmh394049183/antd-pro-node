const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { User, Mate } = require("./models");

const api = express.Router();
const app = express();
const SECRET = "xingdaorong0815";
app.use(express.json());
app.use(cors());
app.use("/api", api);
const auth = async (req, res, next) => {
  const raw = String(req.headers.authorization).split(" ").pop();
  if (raw && raw !== "undefined") {
    const { id } = jwt.verify(raw, SECRET);
    const reslut = await User.findById(id); // 这里需要添加一些错误处理，不执行next
    if (reslut) {
      req.user = reslut;
      next();
    } else {
      next(new Error("请登录"));
    }
  } else {
    next(new Error("请登录"));
  }
};

api.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.send({
      code: 500,
      message: "用户不存在",
    });
  }
  const isPasswordValid = req.body.password === user.password;
  if (!isPasswordValid) {
    return res.send({
      code: 500,
      message: "密码错误",
    });
  }
  if (!isPasswordValid) {
    return res.send({
      code: 500,
      message: "密码错误",
    });
  }
  const token = jwt.sign(
    {
      id: String(user._id), // 密码不要放进来，放一个唯一的东西就可以了
    },
    SECRET
  );
  res.send({
    code: 200,
    data: token,
  });
});

api.post("/register", async (req, res) => {
  const { username, password, name } = req.body;
  const user = await User.findOne({
    username: req.body.username,
  });
  if (user) {
    return res.send({
      code: 500,
      message: "用户已存在",
    });
  }
  await User.create({
    username,
    password,
    name: name ?? username,
  });
  res.send({
    code: 200,
    data: true,
  });
});
api.get("/getUserList", async (req, res, next) => {
  const { current, pageSize, username, name } = req.query;
  const result = await User.paginate(
    {
      username: new RegExp(username, "i"),
      name: new RegExp(name, "i"),
      role: 1,
    },
    {
      page: +current,
      limit: +pageSize,
      select: "-__v -password",
    }
  );
  res.send({
    code: 200,
    data: result.docs,
    success: true,
    total: result.totalDocs,
  });
});
// 修改用户
api.post("/updateUser", async (req, res) => {
  const { username, password, name, _id } = req.body;
  await User.findByIdAndUpdate(_id, {
    username,
    name,
    password,
  });
  res.send({
    code: 200,
    data: true,
  });
});
// 删除用户
api.post("/removeUser", async (req, res) => {
  const { key } = req.body;
  await User.deleteMany({
    _id: {
      $in: key,
    },
    role: 1,
  });
  res.send({
    code: 200,
    data: true,
  });
});
api.use(auth);

api.get("/getUserInfo", async (req, res) => {
  res.send({
    code: 200,
    data: req.user,
  });
});

api.use((err, req, res, next) => {
  res.send({ code: 500, message: err.message });
});
app.listen(8080, () => {
  console.log("[ listen on 8080] >");
});
