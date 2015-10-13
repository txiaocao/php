WinJS.UI.Pages.define("pages/admin/newhtml3.html", {
    ready: function (el,option) {
        lang();
        var data = {};
        data.action = "getGiftItem";
        data.id = option.modid;
        $.ajax({url:"../server/public/admin.php",data:data}).done(function(result){
            var data = result.data;
            $("#name").val(data.name);
            $("#total").val(data.total);
            $("#use").val(data.use);
            $("#rate").val(data.rate);
            console.log(result);
        });
        
        $("#save").on("click",function(){
            var data = {};
            data.action = "setGiftItem";
            data.id = option.modid;
            data.total = $("#total").val();
            data.rate = $("#rate").val();
            
            $.ajax({url:"../server/public/admin.php",data:data}).done(function(){
                $("#back").trigger("click");
            });
            
        });
        
        $("#back").on("click", function () {
            document.getElementById("render").innerHTML = "";
            new WinJS.UI.HtmlControl(document.getElementById("render"), { uri: "pages/admin/newhtml2.html" });
        });
    }
});