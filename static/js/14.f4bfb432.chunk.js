(this.webpackJsonpinvoicy=this.webpackJsonpinvoicy||[]).push([[14],{1262:function(e,t,a){"use strict";a.r(t);var n=a(74),r=a.n(n),c=a(87),s=a(9),l=a(10),i=a(12),o=a(11),m=a(0),u=a.n(m),p=a(592),h=(a(450),a(22)),b=a(199),v=a(86),y=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={email:"",name:"",wallet:"",companyId:0},n}return Object(l.a)(a,[{key:"signupHandler",value:function(){var e=Object(c.a)(r.a.mark((function e(t){var a,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,Object(v.n)();case 3:return e.next=5,Object(v.m)();case 5:return a=e.sent,this.setState({wallet:a}),e.next=9,Object(v.b)(this.state.name,this.state.email);case 9:if(!e.sent){e.next=19;break}return e.next=13,Object(v.k)();case 13:if(0!==(n=e.sent)){e.next=17;break}return window.alert("Something Went Wrong!"),e.abrupt("return");case 17:this.setState({companyId:n}),this.props.history.push({pathname:"/dashboard/",state:{wallet:this.state.wallet,companyId:this.state.companyId}});case 19:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleEmailChange",value:function(e){this.setState({email:e.target.value})}},{key:"handleNameChange",value:function(e){this.setState({name:e.target.value})}},{key:"render",value:function(){return u.a.createElement(h.a,null,u.a.createElement(b.a,null),u.a.createElement("div",{className:"auth-wrapper"},u.a.createElement("div",{className:"auth-content"},u.a.createElement("div",{className:"auth-bg"},u.a.createElement("span",{className:"r"}),u.a.createElement("span",{className:"r s"}),u.a.createElement("span",{className:"r s"}),u.a.createElement("span",{className:"r"})),u.a.createElement("div",{className:"card"},u.a.createElement("div",{className:"card-body text-center"},u.a.createElement("div",{className:"mb-4"},u.a.createElement("i",{className:"feather icon-user-plus auth-icon"})),u.a.createElement("h3",{className:"mb-4"},"Sign up"),u.a.createElement("div",{className:"input-group mb-3"},u.a.createElement("input",{type:"text",className:"form-control",placeholder:"Company Name",value:this.state.name,onChange:this.handleNameChange.bind(this)})),u.a.createElement("div",{className:"input-group mb-3"},u.a.createElement("input",{type:"email",className:"form-control",placeholder:"Company Email",value:this.state.email,onChange:this.handleEmailChange.bind(this)})),u.a.createElement("button",{className:"btn btn-primary shadow-2 mb-4",onClick:this.signupHandler.bind(this)},"Sign up"),u.a.createElement("p",{className:"mb-0 text-muted"},"Already have an account? ",u.a.createElement(p.a,{to:"/"},"Login")))))))}}]),a}(u.a.Component);t.default=y},592:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(1),s=a.n(c),l=a(47),i=a(314),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var u=function(e){var t=e.to,a=e.exact,n=e.strict,c=e.location,s=e.activeClassName,u=e.className,p=e.activeStyle,h=e.style,b=e.isActive,v=e["aria-current"],y=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(e,["to","exact","strict","location","activeClassName","className","activeStyle","style","isActive","aria-current"]),f="object"===("undefined"===typeof t?"undefined":m(t))?t.pathname:t,d=f&&f.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1");return r.a.createElement(l.a,{path:d,exact:a,strict:n,location:c,children:function(e){var a=e.location,n=e.match,c=!!(b?b(n,a):n);return r.a.createElement(i.a,o({to:t,className:c?[u,s].filter((function(e){return e})).join(" "):u,style:c?o({},h,p):h,"aria-current":c&&v||null},y))}})};u.propTypes={to:i.a.propTypes.to,exact:s.a.bool,strict:s.a.bool,location:s.a.object,activeClassName:s.a.string,className:s.a.string,activeStyle:s.a.object,style:s.a.object,isActive:s.a.func,"aria-current":s.a.oneOf(["page","step","location","date","time","true"])},u.defaultProps={activeClassName:"active","aria-current":"page"},t.a=u}}]);
//# sourceMappingURL=14.f4bfb432.chunk.js.map