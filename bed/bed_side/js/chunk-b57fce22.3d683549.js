(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b57fce22"],{"088b":function(t,i,c){"use strict";var e=c("d906"),d=c.n(e);d.a},a56a:function(t,i,c){"use strict";c.r(i);var e=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"main-div",staticStyle:{display:"flex","flex-direction":"column","align-items":"center","background-color":"white"}},[e("div",{staticClass:"header-div"},[e("div",{staticClass:"close",on:{click:function(i){return t.$router.go(-1)}}},[e("img",{attrs:{src:c("cd5c")}}),t._v("关闭 ")]),e("span",{staticClass:"title"},[t._v("检验报告详情")])]),e("div",{staticStyle:{padding:"30px 60px",width:"100%",height:"990px",overflow:"auto"}},[e("div",{staticStyle:{"font-size":"36px","line-height":"1.3","margin-bottom":"20px"}},[t._v(t._s(t.test.title))]),e("div",{staticStyle:{"font-size":"24px",color:"#90909E","padding-bottom":"30px","border-bottom":"1px solid #D7D7D7"}},[t._v("报告时间："+t._s(t.test.time))]),e("div",{staticStyle:{"font-size":"24px","line-height":"1.3","margin-top":"30px","padding-bottom":"30px","border-bottom":"1px solid #e7e7e7"}},[e("table",{staticStyle:{width:"100%","text-align":"center"}},[t._m(0),e("tbody",t._l(t.test.testList,(function(i){return e("tr",{key:i.code},[e("td",[t._v(t._s(i.code))]),e("td",[t._v(t._s(i.name))]),e("td",[t._v(t._s(i.ration))]),e("td",{staticStyle:{color:"red"}},[t._v(t._s("L"===i.abnormal?"↓":"H"===i.abnormal?"↑":""))]),e("td",{domProps:{innerHTML:t._s(t.formatUnit(i.rationUnit))}}),e("td",[t._v(t._s(i.range))])])})),0)])])])])},d=[function(){var t=this,i=t.$createElement,c=t._self._c||i;return c("thead",[c("tr",{staticStyle:{"border-top":"1px solid black","border-bottom":"1px solid black"}},[c("td",{staticStyle:{width:"10%"}},[t._v("编号")]),c("td",{staticStyle:{width:"35%"}},[t._v("检验项目")]),c("td",{staticStyle:{width:"15%"}},[t._v("结果")]),c("td",{staticStyle:{width:"15%"}},[t._v("报警")]),c("td",{staticStyle:{width:"10%"}},[t._v("单位")]),c("td",{staticStyle:{width:"15%"}},[t._v("参考范围")])])])}],o=(c("99af"),c("c975"),c("ac1f"),c("1276"),c("3835")),a={name:"check-detail",data:function(){return{test:{title:"",time:"",testList:[]}}},mounted:function(){var t=this;this.api.post("report/getTest",{reportId:this.$route.query.reportId}).then((function(i){1===i.data.code&&(t.test=i.data.data)}))},methods:{formatUnit:function(t){if(t.indexOf("/")>=0&&t.indexOf("`")>=0){var i=t.split("/"),c=i[0].split("`"),e=Object(o["a"])(c,2),d=e[0],a=e[1];return"".concat(d,"<sup>").concat(a,"</sup>/").concat(i.pop())}return t}}},n=a,l=(c("088b"),c("2877")),A=Object(l["a"])(n,e,d,!1,null,"65651d68",null);i["default"]=A.exports},cd5c:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA4LTAyVDE4OjA2OjUyKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wOC0xMlQxNDozOToxNiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wOC0xMlQxNDozOToxNiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZWUzYWQ2OS1jMTAyLTY0NDQtYjVlNS05Njc1NDU0Zjk1NzIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNWVjYmVkNi1lYTVhLWU5NDAtOWUwMS05ODg2ODk5YWM5NzUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MGU4ZDdjMC1mMjM2LWYzNDAtYTRkMi04OTIxMjhiY2ZmZTciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwZThkN2MwLWYyMzYtZjM0MC1hNGQyLTg5MjEyOGJjZmZlNyIgc3RFdnQ6d2hlbj0iMjAxOS0wOC0wMlQxODowNjo1MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MzkwYWI3Mi02ZDNlLWZhNDUtYTNkZC02MzgzNDMzMmEwOTMiIHN0RXZ0OndoZW49IjIwMTktMDgtMDVUMTY6MTA6MjcrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2VlM2FkNjktYzEwMi02NDQ0LWI1ZTUtOTY3NTQ1NGY5NTcyIiBzdEV2dDp3aGVuPSIyMDE5LTA4LTEyVDE0OjM5OjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+55vXzwAAAzZJREFUaIHtmE1IVUEUx39GuRBJBIVEcaNByCuwwhZhkA8UQVplECl4l7mZTeImV7YR28zGljcQCcKVCFGgRdKisIISCbJNFLUQRIkEBW0xJ4rnuTr3I17C+23em/mfOWfO/ZozU7a7u8th5kixJ5CWUgLFppRAsSklUGxKCRSboz5G1oangEngPLAEDBgTvBYt1QSMCbA2PAfcB3LAItBvTPDBZ7zvHZjCTR4JMmdteDrmXFXEz5z4ReJM+Y73TeBsQbsKmLc2bPENFEELMC/+9osXiW8C75S+GuAJ0OwbrIBmGV/jGU/FN4EbwJrSX4+7/Q2+AYUGGVevaGsSzwuvBIwJloBuYEORG4FnQJ1nzDqxb1S0DaBb4nnh/Rk1JngJ9ACbityEexxqD3BTK3ZNirYJ9Egcb2KtA8YEC7gkthQ5Bzxm7wv5myrRc4q2hZv8Qpz5QIKFzJhgHugFthW5FXeFKwv6K6W/VRmzDfSK39gkWomNCWaAPmBHkduAGaBC2hXSblNsd4A+8ZeIxKWEMcFDYCBCvgxM4678tLQ1BsRPYlLVQsYEk8BghNwNfJRfjUFceZKKLIq5e8BQhHYion9IxqUmq2r0LjDiaTsi9pmQZTl9Bxg7wGZM7DLj0O8HskzgNjB8gM2w2GVGVgncAkY9bUfFPhOySOAmMB6hfY/oH5dxqUmVgLVhPzARIT8CTsqvxgTQnyY+QFnS02lrw2vAA/SL8BRX9P3ElRKz6KvxDnA9zWqcKAFrwyu4EuGYIr8C8sCPv/oqcRsYrR7aBq4mrYdiJ2Bt2IF7LMoV+S3uSq8rWhXuzmgV6RZuIxO7Io31DlgbtuMeB23yS0AX+uSR/i6xK6QcmBX/sfC+A9aGF3A1/XFF/gS0A988XNUBC+i7sg2gM86uzCsBa8Mc8ByoVuTPwEXgi29Q3Kb+Bfq+eA245LsvjnOwpU3+K+6FjTN5xD4v4wup5h8cbJ1R+laBTmDFN1gBKzJ+1TOeim8Cbwra60CHMcGyb6AIloEO9r74hfEiiXOwtSj/l4C8McF73yD7IX7y/Pk6LRLjYCvxSvy/UNoPFJtSAsWmlECxOfQJ/AIlLc/FqOmvCAAAAABJRU5ErkJggg=="},d906:function(t,i,c){}}]);
//# sourceMappingURL=chunk-b57fce22.3d683549.js.map