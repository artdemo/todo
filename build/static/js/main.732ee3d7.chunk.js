(this["webpackJsonptodo-list"]=this["webpackJsonptodo-list"]||[]).push([[0],{75:function(e,t,r){},84:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(9),o=r.n(c),i=(r(75),r(60)),s=r(19),l=r(125),u=r(120),d=r(121),j=r(115),b=r(118),h=r(126),f=r(122),O=r(5),m=Object(j.a)({form:{marginBotton:"12px"},progress:{display:"block",margin:"auto"},button:{color:"green",height:"100%"}}),g=function(e){var t=e.createData,r=m(),a=Object(n.useState)(""),c=Object(s.a)(a,2),o=c[0],i=c[1],l=Object(n.useState)(!1),u=Object(s.a)(l,2),j=u[0],g=u[1];return Object(O.jsx)("form",{onSubmit:function(e){e.preventDefault(),""===o.trim()||j||(g(!0),t({text:o.trim(),isChecked:!1}).then((function(e){g(!1),void 0!==e&&e.isAxiosError||i("")})))},className:r.form,children:Object(O.jsxs)(b.a,{container:!0,spacing:2,children:[Object(O.jsx)(b.a,{item:!0,xs:9,children:Object(O.jsx)(h.a,{variant:"outlined",margin:"none",size:"small",fullWidth:!0,label:"Task",autoFocus:!0,value:o,onChange:function(e){i(e.currentTarget.value)}})}),Object(O.jsx)(b.a,{item:!0,xs:3,children:j?Object(O.jsx)(d.a,{color:"secondary",className:r.progress}):Object(O.jsx)(f.a,{type:"submit",variant:"outlined",fullWidth:!0,className:r.button,color:"inherit",children:"Add"})})]})})},p=function(e){var t=e.children;return Object(O.jsx)("ul",{children:t})},x=r(13),v=r(127),y=r(123),S=r(45),k=r.n(S),w=Object(j.a)({item:{flexGrow:1},checkbox:{padding:"12px"},field:{"&::before":{borderBottomColor:"transparent"}}}),E=function(e){var t=e.id,r=e.text,a=e.isChecked,c=e.updateData,o=e.deleteData,i=w(),l=Object(n.useState)({text:r,isChecked:a}),u=Object(s.a)(l,2),j=u[0],f=u[1],m=Object(n.useState)(!1),g=Object(s.a)(m,2),p=g[0],S=g[1];return Object(O.jsx)("form",{onSubmit:function(e){e.preventDefault(),c(t,j).then((function(e){e&&e.isAxiosError&&f({text:r,isChecked:a})}))},children:Object(O.jsxs)(b.a,{container:!0,alignItems:"center",spacing:2,children:[Object(O.jsx)(b.a,{item:!0,children:Object(O.jsx)(v.a,{onChange:function(e){f(Object(x.a)(Object(x.a)({},j),{},{isChecked:e.currentTarget.checked})),c(t,Object(x.a)(Object(x.a)({},j),{},{isChecked:e.currentTarget.checked})).then((function(e){e&&e.isAxiosError&&f({text:r,isChecked:a})}))},checked:j.isChecked,className:i.checkbox})}),Object(O.jsx)(b.a,{item:!0,className:i.item,children:Object(O.jsx)(h.a,{onChange:function(e){f(Object(x.a)(Object(x.a)({},j),{},{text:e.currentTarget.value}))},value:j.text,fullWidth:!0,InputProps:{className:i.field}})}),Object(O.jsx)(b.a,{item:!0,children:p?Object(O.jsx)(d.a,{color:"secondary"}):Object(O.jsx)(y.a,{color:"secondary",onClick:function(){S(!0),o(t).then((function(e){e&&e.isAxiosError&&f({text:r,isChecked:a}),S(!1)}))},children:Object(O.jsx)(k.a,{})})})]})})},N=r(124),C=Object(j.a)({wrapper:{position:"fixed",left:0,right:0,top:0,bottom:0,backgroundColor:"rgba(128, 128, 128, 0.5)",zIndex:1e3,visibility:function(e){return e?"visible":"hidden"}},item:{width:"50%"},popup:{padding:"50px",position:"relative"},button:{position:"absolute",right:0,top:0}}),I=function(e){var t=e.errorState,r=e.setError,a=C(t.isError),c=function(e){27===e.keyCode&&r(Object(x.a)(Object(x.a)({},t),{},{isError:!1}))};Object(n.useEffect)((function(){return window.addEventListener("keydown",c),function(){window.removeEventListener("keydown",c)}}),[]);return o.a.createPortal(Object(O.jsx)(b.a,{container:!0,alignItems:"center",justify:"center",className:a.wrapper,onClick:function(e){e.target.closest("#error-paper")&&!e.target.closest("#error-button")||r(Object(x.a)(Object(x.a)({},t),{},{isError:!1}))},children:Object(O.jsx)(b.a,{item:!0,className:a.item,children:Object(O.jsxs)(u.a,{id:"error-paper",square:!0,className:a.popup,children:[Object(O.jsx)(y.a,{id:"error-button",color:"secondary",className:a.button,children:Object(O.jsx)(k.a,{})}),Object(O.jsx)(N.a,{variant:"h6",align:"center",children:t.errorMsg})]})})}),document.body)},D=r(46),T=r(58),A=r(59),J=r(61),M=r(62),P=function(e){Object(A.a)(r,e);var t=Object(J.a)(r);function r(e){var n;Object(D.a)(this,r);for(var a=arguments.length,c=new Array(a>1?a-1:0),o=1;o<a;o++)c[o-1]=arguments[o];return(n=t.call.apply(t,[this].concat(c))).name="FakeAxiosError",n.isAxiosError=e,n.date=new Date,n}return r}(Object(M.a)(Error)),R=function(){function e(t){Object(D.a)(this,e),this.item=t;try{var r=JSON.parse(localStorage.getItem(this.item));if("null"===r||!Array.isArray(r))throw new Error}catch(n){localStorage.setItem(this.item,"[]")}}return Object(T.a)(e,[{key:"get",value:function(){var e=this,t=JSON.parse(localStorage.getItem(this.item));return new Promise((function(r,n){setTimeout((function(){return null===t?n(new P(!0,"There is no a relevant dataObject in localStorage")):r({data:t})}),e.constructor.getRandomDelay(2e3,5e3))}))}},{key:"post",value:function(e,t){var r=this,n=JSON.parse(localStorage.getItem(this.item));return new Promise((function(e,a){setTimeout((function(){if(null===n)return a(new P(!0,"There is no a relevant dataObject in localStorage"));var c=Object(x.a)(Object(x.a)({},t),{},{id:Date.now()});return n.push(c),localStorage.setItem(r.item,JSON.stringify(n)),e({data:c})}),r.constructor.getRandomDelay(100,1e3))}))}},{key:"put",value:function(e,t){var r=this,n=JSON.parse(localStorage.getItem(this.item));return new Promise((function(a,c){setTimeout((function(){if(null===n)return c(new P(!0,"There is no a relevant dataObject in localStorage"));var o=n.findIndex((function(t){return t.id===+e}));return-1===o?c(new P(!0,"There is no a relevant dataObject in localStorage")):(Object.assign(n[o],t),localStorage.setItem(r.item,JSON.stringify(n)),a({data:n[o]}))}),r.constructor.getRandomDelay(100,1e3))}))}},{key:"delete",value:function(e){var t=this,r=JSON.parse(localStorage.getItem(this.item));return new Promise((function(n,a){setTimeout((function(){if(null===r)return a(new P(!0,"There is no a relevant dataObject in localStorage"));var c=r.findIndex((function(t){return t.id===+e}));return-1===c?a(new P(!0,"There is no a relevant dataObject in localStorage")):(r.splice(c,1),localStorage.setItem(t.item,JSON.stringify(r)),n({data:r[c]}))}),t.constructor.getRandomDelay(100,1e3))}))}}],[{key:"getRandomDelay",value:function(e,t){return Math.round(Math.random()*(t-e)+e)}}]),e}(),W={create:function(){return new R("todos")}}.create({baseURL:"http://localhost:3010/todos/"}),q="It seems you are offline or something went wrong during request. Please reload the page.",z="Something went wrong during request. Please try again.",B="We can't delete your task now. Please try again later",F=Object(j.a)({progress:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%, -50%)"},paper:{padding:"10px"}}),L=function(){var e=F(),t=Object(n.useState)([]),r=Object(s.a)(t,2),a=r[0],c=r[1],o=Object(n.useState)(!0),j=Object(s.a)(o,2),b=j[0],h=j[1],f=Object(n.useState)({isError:!1,errorMsg:""}),m=Object(s.a)(f,2),x=m[0],v=m[1],y=function(e,t){return W.put("".concat(e),t).catch((function(e){return console.dir(e),v({isError:!0,errorMsg:z}),e}))},S=function(e){return W.delete("".concat(e)).then((function(){var t=a.filter((function(t){return t.id!==e}));c(t)})).catch((function(e){return console.dir(e),v({isError:!0,errorMsg:B}),e}))};return Object(n.useEffect)((function(){W.get().then((function(e){c(e.data),b&&h(!1)})).catch((function(e){console.dir(e),h(!1),v({isError:!0,errorMsg:q})}))}),[]),b?Object(O.jsx)("div",{className:e.progress,children:Object(O.jsx)(d.a,{color:"secondary",size:80})}):Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(l.a,{maxWidth:"sm",children:Object(O.jsxs)(u.a,{elevation:3,className:e.paper,children:[Object(O.jsx)(g,{createData:function(e){return W.post("",e).then((function(e){c([].concat(Object(i.a)(a),[e.data]))})).catch((function(e){return console.dir(e),v({isError:!0,errorMsg:z}),e}))}}),Object(O.jsx)(p,{children:a.map((function(e){var t=e.id,r=e.text,n=e.isChecked;return Object(O.jsx)("li",{children:Object(O.jsx)(E,{text:r,isChecked:n,updateData:y,deleteData:S,id:t})},t)}))})]})}),Object(O.jsx)(I,{errorState:x,setError:v})]})};o.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(L,{})}),document.getElementById("root"))}},[[84,1,2]]]);
//# sourceMappingURL=main.732ee3d7.chunk.js.map