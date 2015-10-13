var langdata = {
    认证: "认证",
    查询: "查询",
    兑奖: "兑奖",
    账号: "账号",
    名称: "名称",
    抽奖时间: "抽奖时间",
    抽奖结果: "抽奖结果",
    兑奖状态: "兑奖状态",
    兑奖时间: "兑奖时间",
    库存编辑:"库存编辑",
    总数:"总数",
    概率:"概率",
    保存:"保存",
    返回:"返回"
}

function lang() {
    $("span.lang").each(function () {
        var own = $(this);
        var txt = own.text();
        console.log(langdata[txt]);
        own.text(langdata[txt]);
    });
}