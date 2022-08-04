function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    data: null,
    success: function (res) {
      //   console.log(res);
      const { status, message } = res;
      if (status !== 0) return layer.msg(message);
      renderAvatar(res.data);
    },
  });
};
const renderAvatar = (data) => {
  let name = data.nickname || data.username;
  // console.log(name);
  // 设置欢迎文本
  $("#welcome").html("欢迎" + name);
  // 按需渲染用户头像
  if (data.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", data.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }
};
getUserInfo();
$("#exitBtn").click(() => {
  layer.confirm("确定退出?", { icon: 3, title: "提示" }, function (index) {
    //do something
    // 清空本地存储里面的 token
    localStorage.removeItem("token");
    // 重新跳转到登录页面
    location.href = "/login.html";
    layer.close(index);
  });
});
