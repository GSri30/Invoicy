(this.webpackJsonpinvoicy=this.webpackJsonpinvoicy||[]).push([[17],{882:function(e,t,a){"use strict";a.r(t);var n=a(18),l=a(74),c=a.n(l),r=a(87),s=a(9),i=a(10),m=a(12),o=a(11),d=a(0),u=a.n(d),E=a(268),h=a(202),p=a(262),f=a(269),v=a(161),y=a(200),x=a(314),b=a(22),N=a(162),k=a.n(N),w=a(86),g=a(883),I=a.n(g),C=a(163),j=a.n(C),A=[{key:"50% Advance",y:40,color:"#1ddec5"},{key:"100% Advance",y:30,color:"#1dcfda"},{key:"100% Postwork",y:30,color:"#20c997"}];function O(){for(var e=[],t=[],a=0;a<10;a++)e.push({x:a,y:parseInt(15*(.25*Math.sin(a/1.5)+.5))}),t.push({x:a,y:parseInt(3/Math.abs(Math.sin(a/20)+.5))});return[{values:e,key:"Invoices Raised",color:"#239f1c",area:!0},{values:t,key:"Pending Invoices",color:"#F45d55",area:!0}]}var B=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={wallet:"",companyId:0,clients:[],topInvoices:[],isBlockedClientsCollapsed:!1},n.fetchAccount(),n}return Object(i.a)(a,[{key:"fetchAccount",value:function(){var e=Object(r.a)(c.a.mark((function e(){var t,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(w.n)();case 2:return e.next=4,Object(w.m)();case 4:return t=e.sent,this.setState({wallet:t}),e.next=8,Object(w.k)();case 8:(a=e.sent)>0?this.setState({companyId:a}):this.props.history.push("/");case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getClients",value:function(){var e=Object(r.a)(c.a.mark((function e(){var t,a=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchAccount();case 2:return t=this.state.companyId,e.prev=3,e.next=6,Object(w.e)();case 6:e.sent.forEach(function(){var e=Object(r.a)(c.a.mark((function e(l){var s,i,m,o,d;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(w.k)(l.clientAddr);case 2:return s=e.sent,e.next=5,Object(w.j)(s);case 5:return i=e.sent,e.next=8,Object(w.g)(t,l.clientId);case 8:(m=e.sent).forEach(function(){var e=Object(r.a)(c.a.mark((function e(t){var l,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(w.l)(t);case 2:l=e.sent,r={id:t,data:l},a.setState({topInvoices:[].concat(Object(n.a)(a.state.topInvoices),[r])});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),o={clientId:l.clientId,clientAddr:l.clientAddr,isBlocked:l.isBlocked,discount:l.discount,name:i.name,numInvoices:m.length},d={id:l.clientId,data:o},a.setState({clients:[].concat(Object(n.a)(a.state.clients),[d])});case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.log(e.t0);case 13:case"end":return e.stop()}}),e,this,[[3,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.getClients()}},{key:"compareFilterTopInvoices",value:function(e,t){return e.data.payment.dueAmount<t.data.payment.dueAmount?1:e.data.payment.dueAmount>t.data.payment.dueAmount?-1:0}},{key:"filterTopInvoices",value:function(){var e=this.state.topInvoices;return e.sort(this.compareFilterTopInvoices),e.slice(0,5)}},{key:"viewDetails",value:function(e){this.props.history.push({pathname:"/view-invoice/",state:{invoice:e}})}},{key:"updateWorkStatus",value:function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(w.r)(t);case 2:e.sent?(this.dialog.showAlert("Success!"),window.location.reload()):this.dialog.showAlert("Something went wrong!");case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=[],a=[],n=[];return this.filterTopInvoices().forEach((function(a){t.push(u.a.createElement("tr",{className:"unread",key:a.id},u.a.createElement("td",null,u.a.createElement("img",{className:"rounded-circle",style:{width:"40px"},src:k.a,alt:"activity-user"})),u.a.createElement("td",null,u.a.createElement("h6",{className:"mb-1"},a.data.client.name),u.a.createElement("p",{className:"m-0"},a.data.client.email)),u.a.createElement("td",null,u.a.createElement("h6",{className:"text-muted"},u.a.createElement("i",{className:"fa fa-circle text-c-green f-10 m-r-15"}),a.data.invoiceDate)),u.a.createElement("td",null,u.a.createElement("h6",{className:"text-muted"},u.a.createElement("i",{className:"fa fa-circle text-c-red f-10 m-r-15"}),a.data.dueDate)),u.a.createElement("td",null,u.a.createElement("h6",{className:"text-muted"},"Work Status: \xa0",a.data.workCompleted&&u.a.createElement("span",{className:"text-success"},"Completed"),!a.data.workCompleted&&u.a.createElement("span",{className:"text-danger"},"Not Completed"))),u.a.createElement("td",null,u.a.createElement("h6",{className:"text-muted"},w.s.utils.fromWei(a.data.payment.dueAmount)," ETH due")),u.a.createElement("td",null,u.a.createElement("button",{style:{border:0},onClick:function(){return e.viewDetails(a)},className:"label theme-bg2 text-white f-12"},"View Details"),u.a.createElement("button",{style:{border:0},onClick:function(){return e.updateWorkStatus(a.id)},className:"label theme-bg text-white f-12"},!a.data.workCompleted&&"Update Progress",a.data.workCompleted&&"Delete Progress"),u.a.createElement("button",{style:{border:0},onClick:function(){e.dialog.showAlert("Reminder sent!")},className:"label theme-bg text-white f-12"},"Remind"),u.a.createElement(j.a,{ref:function(t){e.dialog=t}}))))})),this.state.clients.forEach((function(e){e.data.isBlocked?n.push(u.a.createElement("tr",{className:"unread",key:e.id},u.a.createElement("td",null,u.a.createElement("img",{className:"rounded-circle",style:{width:"40px"},src:k.a,alt:"activity-user"})),u.a.createElement("td",null,u.a.createElement("h6",{className:"mb-1"},e.data.clientAddr),u.a.createElement("p",{className:"m-0"},e.data.name)),u.a.createElement("td",null,u.a.createElement("h6",{className:"text-muted"},e.data.numInvoices," Invoices")),u.a.createElement("td",null,u.a.createElement(x.a,{to:"/clients/"+e.data.clientId,className:"label theme-bg text-white f-12"},"View Details")))):a.push(u.a.createElement("tr",{className:"unread",key:e.id},u.a.createElement("td",null,u.a.createElement("img",{className:"rounded-circle",style:{width:"40px"},src:k.a,alt:"activity-user"})),u.a.createElement("td",null,u.a.createElement("h6",{className:"mb-1"},e.data.clientAddr),u.a.createElement("p",{className:"m-0"},e.data.name)),u.a.createElement("td",null,u.a.createElement("h6",{className:"text-muted"},e.data.numInvoices," Invoices")),u.a.createElement("td",null,u.a.createElement(x.a,{to:"/clients/"+e.data.clientId,className:"label theme-bg text-white f-12"},"View Details"))))})),u.a.createElement(b.a,null,u.a.createElement(E.a,null,u.a.createElement(h.a,{md:6,xl:4},u.a.createElement(p.a,null,u.a.createElement(p.a.Body,null,u.a.createElement("h6",{className:"mb-4"},"Total Invoices Generated"),u.a.createElement("div",{className:"row d-flex align-items-center"},u.a.createElement("div",{className:"col-9"},u.a.createElement("h3",{className:"f-w-300 d-flex align-items-center m-b-0"},u.a.createElement("i",{className:"feather icon-file-text f-30 m-r-5"}),this.state.topInvoices.length)))))),u.a.createElement(h.a,{md:6,xl:4},u.a.createElement(p.a,null,u.a.createElement(p.a.Body,null,u.a.createElement("h6",{className:"mb-4"},"Total Pending Invoices"),u.a.createElement("div",{className:"row d-flex align-items-center"},u.a.createElement("div",{className:"col-9"},u.a.createElement("h3",{className:"f-w-300 d-flex align-items-center m-b-0"},u.a.createElement("i",{className:"feather icon-file-text text-c-red f-30 m-r-5"}),t.length)))))),u.a.createElement(h.a,{xl:4},u.a.createElement(p.a,null,u.a.createElement(p.a.Body,null,u.a.createElement("h6",{className:"mb-4"},"Total Clients"),u.a.createElement("div",{className:"row d-flex align-items-center"},u.a.createElement("div",{className:"col-9"},u.a.createElement("h3",{className:"f-w-300 d-flex align-items-center m-b-0"},u.a.createElement("i",{className:"feather icon-users f-30 m-r-5"})," ",this.state.clients.length)))))),u.a.createElement(h.a,{md:6,xl:6},u.a.createElement(p.a,null,u.a.createElement(p.a.Header,null,u.a.createElement(p.a.Title,{as:"h5"},"Types of Invoices Raised ",u.a.createElement("small",null,"Distribution"))),u.a.createElement(p.a.Body,{className:"text-center"},u.a.createElement(I.a,{id:"chart",height:300,type:"pieChart",datum:A,x:"key",y:"y"})))),u.a.createElement(h.a,{md:6,xl:6},u.a.createElement(p.a,{className:"Recent-Users"},u.a.createElement(p.a.Header,null,u.a.createElement(p.a.Title,{as:"h5"},"Invoices Raised",u.a.createElement("small",null," [In last 10 days]"))),u.a.createElement(p.a.Body,{className:"text-center"},u.a.createElement("div",null,u.a.createElement(I.a,{xAxis:{tickFormat:function(e){return e},axisLabel:"Time (days)"},yAxis:{axisLabel:"Invoices Count",tickFormat:function(e){return parseFloat(e).toFixed(2)}},type:"lineChart",datum:O(),x:"x",y:"y",height:300,renderEnd:function(){console.log("renderEnd")}}))))),u.a.createElement(h.a,{md:12,xl:12},u.a.createElement(p.a,{className:"Recent-Users"},u.a.createElement(p.a.Header,null,u.a.createElement(p.a.Title,{as:"h5"},"Most Important Invoices")),u.a.createElement(p.a.Body,{className:"px-0 py-2"},u.a.createElement(f.a,{responsive:!0,hover:!0},u.a.createElement("tbody",null,t))))),u.a.createElement(h.a,{md:12,xl:12},u.a.createElement(p.a,{className:"Recent-Users"},u.a.createElement(p.a.Header,null,u.a.createElement(p.a.Title,{as:"h5"},"Clients ",u.a.createElement(x.a,{to:"/add-client/"},u.a.createElement("i",{className:"feather icon-plus-circle f-15 m-r-5"})))),u.a.createElement(p.a.Body,{className:"px-0 py-2"},u.a.createElement(f.a,{responsive:!0,hover:!0},u.a.createElement("tbody",null,a))))),u.a.createElement(h.a,{md:12,xl:12},u.a.createElement(p.a,{className:"Recent-Users justify-content-center text-center"},u.a.createElement(p.a.Header,null,u.a.createElement(v.a,{onClick:function(){return e.setState({isBlockedClientsCollapsed:!e.state.isBlockedClientsCollapsed})}},!this.state.isBlockedClientsCollapsed&&"View Blocked clients",this.state.isBlockedClientsCollapsed&&"Close Blocked clients")),u.a.createElement(y.a,{in:this.state.isBlockedClientsCollapsed},u.a.createElement("div",{id:"basic-collapse"},u.a.createElement(p.a.Body,{className:"px-0 py-2"},u.a.createElement(f.a,{responsive:!0,hover:!0},u.a.createElement("tbody",null,n)))))))))}}]),a}(u.a.Component);t.default=B}}]);
//# sourceMappingURL=17.41303aaa.chunk.js.map