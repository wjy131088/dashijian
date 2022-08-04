const form = layui.form;
form.verify({
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
  samePwd: (val) => {
    if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
  },
  rePwd: (val) => {
    if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
  },
});

const layer = layui.layer;

// 发送请求，重置密码
$(".layui-form").on("submit", (e) => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/updatepwd",
    data: form.val("formPassword"),
    success: (res) => {
      const { message, status } = res;
      layer.msg(message);
      if (status !== 0) return;
      $("#resetBtn").click();
      // 重置表单
      //   $(".layui-form")[0].reset();
    },
  });
});
