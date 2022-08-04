$("#link_reg").on("click", function (e) {
  $(".login-box").hide();
  $(".reg-box").show();
});
$("#link_login").on("click", function (e) {
  $(".reg-box").hide();
  $(".login-box").show();
});

const form = layui.form;
const layer = layui.layer;
form.verify({
  repass: (val) => {
    //value：表单的值
    const pwd = $(".reg-box [name=password").val();
    if (pwd !== val) return "两次密码不一致";
  },
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});

$("#form_reg").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data,
    success: (res) => {
      console.log(res);
      const { message, status } = res;
      if (status !== 0) return layer.msg(message);
      $("#link_login").click();
    },
  });
});
// 监听登录表单，发送登录请求
$("#form_login").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/api/login",
    data,
    success: (res) => {
      const { message, status, token } = res;
      console.log(res);
      if (status !== 0) return layer.msg(message);
      localStorage.setItem("token", token);
      location.href = "/index.html";
    },
  });
});