const form = layui.form;
form.verify({
  nickname: (val) => {
    if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
  },
});
const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: (res) => {
      if (res.status !== 0) return layer.msg("获取用户信息失败！");
      console.log(res);
    },
  });
};
