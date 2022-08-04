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
    data: null,
    success: (res) => {
      const { status, message, data } = res;
      if (status !== 0) return layer.msg(message);
      //   console.log(res);
      form.val("formUserInfo", data);
    },
  });
};
initUserInfo();

$("#resetBtn").click(function (e) {
  e.preventDefault();
  initUserInfo();
});

$(".layui-form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/userinfo",
    data: form.val("formUserInfo"),
    success: (res) => {
      const { message, status } = res;
      if (status !== 0) return layer.msg(message);
      window.parent.getUserInfo();
    },
  });
});
