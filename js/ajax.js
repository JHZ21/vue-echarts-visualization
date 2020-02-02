//
function requestChartData(data, url) {
    // if(!url) url = 'json/chartData.json';
    if(!url) url = './json/chartData0.json';
   // alert(url+"dddssds");
    // if(!url) url = '../js';

    $.ajax({
        // type: "POST",
        type: 'GET',
        url,
        data,
        // data:{
        //     id: '1',
        //     // da:"daf"7
        // },
        dataType:"JSON",
        success: function(response) {
            // var js = JSON.stringify(data);
            // alert("info:"+js);
            // $('#text').text("info:"+js);
            console.log(data);
            // console.log(js);
            vue.dataset.storage.chartData = response.data;
            //开始更新图表数据工作
            vue.updateDataset();

            // return data;
        },
        error: function(response) {
            var js = JSON.stringify(response);

            alert("error:"+js);
            // $('#text').text("error:"+js);
            return '';
            //后台反馈数据必须json格式的字符串
        }
    });
}


//Ajax返回message 非Success情况处理方式
function otherMessageHandle(response) {
    if (response.message === 'Login') {
        //返回登陆界面
        let preUrl = window.location.href;
        let loginUrl = "./index.html";
        window.location.href = loginUrl+"?preUrl="+preUrl;
    }
}

function oOrdinaryJqueryAjax({url, data, type="POST",dataType="JSON"},func=function(e){}){
    $.ajax({
        type,
        url,
        data,
        dataType,
        xhrFields: {withCredentials: true},
        crossDomain: true,
        success: function(response) {
            if(response.message === "Success"){
                func(response);
            }else {
                otherMessageHandle(response);
            }

        },
        error: function(response) {
           func(response)
        }
    });
}
