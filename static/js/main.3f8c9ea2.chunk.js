(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,t,n){"use strict";n.r(t),t.default={usefulContent:{description:"React Native 0.57 includes 599 commits by 73 different contributors, it has improvements to Accessibility APIs, Babel 7 stable support and more.",links:[{title:"Tutorial on upgrading to React Native 0.57",url:"https://reactnative.thenativebits.com/courses/upgrading-react-native/upgrade-to-react-native-0.57/"}]}}},115:function(e,t,n){"use strict";n.r(t),t.default={usefulContent:{description:"React Native 0.58 is the first release of 2019, it includes work for modernizing and strengthening flow types for core components and  numerous crash fixes and resolutions for unexpected behaviors.",links:[{title:"Tutorial on upgrading to React Native 0.58",url:"https://reactnative.thenativebits.com/courses/upgrading-react-native/upgrade-to-react-native-0.58/"}]}}},116:function(e,t,n){"use strict";n.r(t),t.default={usefulContent:{description:"React Native 0.59 includes React Hooks, performance gains on Android and lots of cool stuff.",links:[{title:"Official blog post about the major changes on React Native 0.59",url:"https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059"},{title:"Tutorial on upgrading to React Native 0.59",url:"https://reactnative.thenativebits.com/courses/upgrading-react-native/upgrade-to-react-native-0.59/"}]}}},117:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(2);t.default={usefulContent:{description:"React Native 0.60 includes Cocoapods integration by default, AndroidX support, auto-linking libraries, a brand new Start screen and more.",links:[{title:"Official blog post about the major changes on React Native 0.60",url:"https://facebook.github.io/react-native/blog/2019/07/03/version-60"},{title:"Tutorial on upgrading to React Native 0.60",url:"https://reactnative.thenativebits.com/courses/upgrading-react-native/upgrade-to-react-native-0.60/"}]},comments:[{fileName:"ios/Podfile",lineNumber:4,lineChangeType:"add",content:Object(r.c)(a.Fragment,null,"All these libraries below have been removed from the Xcode project file and now live in the Podfile. Cocoapods handles the linking now. Here you can add more libraries with native modules.")},{fileName:"ios/RnDiffApp.xcodeproj/project.pbxproj",lineNumber:9,lineChangeType:"neutral",content:Object(r.c)(a.Fragment,null,"Click [here](https://github.com/react-native-community/upgrade-helper/issues/47) for an explanation and some help with upgrading this file.")}]}},118:function(e,t,n){"use strict";n.r(t),t.default={usefulContent:{description:"React Native 0.61 includes Fast Refresh and more.",links:[{title:"Official blog post about the major changes on React Native 0.61",url:"https://facebook.github.io/react-native/blog/2019/09/18/version-0.61"},{title:"Tutorial on upgrading to React Native 0.61",url:"https://reactnative.thenativebits.com/courses/upgrading-react-native/upgrade-to-react-native-0.61/"}]}}},119:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(2);t.default={usefulContent:{description:"React Native 0.62 includes built-in integration with Flipper.",links:[]},comments:[{fileName:".gitignore",lineNumber:23,lineChangeType:"add",content:Object(r.c)(a.Fragment,null,"This line should not be here. Please ignore this. It will be removed on an upcoming release. Because of this line, the files `ios/RnDiffApp.xcodeproj/xcshareddata/xcschemes/RnDiffApp.xcscheme` and `ios/RnDiffApp.xcodeproj/xcshareddata/xcschemes/RnDiffApp-tvOS.xcscheme` appear as deleted. They should not be deleted from your project. Ignore these two changes as well.")}]}},150:function(e){e.exports={a:"https://react-native-community.github.io/upgrade-helper"}},151:function(e,t,n){e.exports=n.p+"static/media/logo.74ebf3f4.svg"},159:function(e,t,n){e.exports=n(264)},164:function(e,t,n){},202:function(e,t,n){var a={"./":62,"./0.57":114,"./0.57.js":114,"./0.58":115,"./0.58.js":115,"./0.59":116,"./0.59.js":116,"./0.60":117,"./0.60.js":117,"./0.61":118,"./0.61.js":118,"./0.62":119,"./0.62.js":119,"./__mocks__":67,"./__mocks__/":67,"./__mocks__/index":67,"./__mocks__/index.js":67,"./index":62,"./index.js":62};function r(e){var t=o(e);return n(t)}function o(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=o,e.exports=r,r.id=202},264:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),i=n.n(o),c=(n(164),n(40)),s=n(14),l=n(17),u=n(4),f=n(266),p=n(137),d=n(108),b=n(44),g=n.n(b),h=n(270),m=n(109),j=n(15),O=n.n(j),v=n(138),y=n.n(v),x=n(62),w="react-native-community/rn-diff-purge",C="https://raw.githubusercontent.com/".concat(w,"/master/RELEASES"),V=function(e){var t=e.fromVersion,n=e.toVersion;return"https://raw.githubusercontent.com/".concat(w,"/diffs/diffs/").concat(t,"..").concat(n,".diff")},k=function(e){var t=e.version,n=e.path;return"https://github.com/".concat(w,"/raw/release/").concat(t,"/").concat(n)},D=function(e,t){return e.replace(new RegExp("".concat(t||"RnDiffApp","/")),"")},N=function(e){var t=e.fromVersion,n=e.toVersion,a=O.a.valid(O.a.coerce(n));return x.default.filter(function(e){var n=e.version,r=O.a.coerce(n);return-1!==O.a.compare(a,r)&&![0,-1].includes(O.a.compare(r,t))})},S=function(e){var t=e.version;return"https://github.com/react-native-community/releases/blob/master/CHANGELOG.md#".concat(t.replace(".",""))},R="Show latest release candidates",z=n(16),T=n(269),A=n(2);var E=T.a.Option,q=Object(u.a)("div",{target:"e8azqbf0"})({name:"8atqhb",styles:"width:100%;"}),_=Object(u.a)(T.a,{target:"e8azqbf1"})({name:"8atqhb",styles:"width:100%;"}),P=function(e){var t=e.title,n=e.options,a=Object(l.a)(e,["title","options"]);return Object(A.c)(q,null,Object(A.c)("h4",null,t),Object(A.c)(_,Object(z.a)({size:"large"},a),n.map(function(e){return Object(A.c)(E,{key:e,value:e},e)})))};var I=Object(u.a)("div",{target:"e1kwjzpc0"})({name:"gg4vpm",styles:"display:flex;justify-content:space-between;"}),F=Object(u.a)(P,{target:"e1kwjzpc1"})({name:"uux7qa",styles:"padding-right:5px;"}),L=Object(u.a)(function(e){var t=e.popover,n=Object(l.a)(e,["popover"]);return t?r.a.cloneElement(t,{children:Object(A.c)(P,n)}):Object(A.c)(P,n)},{target:"e1kwjzpc2"})({name:"1sugwtq",styles:"padding-left:5px;"}),B=Object(u.a)("div",{target:"e1kwjzpc3"})({name:"1shcrr",styles:"display:flex;justify-content:center;height:auto;overflow:hidden;margin-top:25px;"}),M=function(e){var t=e.version,n=e.versionToCompare;return["prerelease","prepatch",null].includes(O.a.diff(t,n))},K=function(e){var t=e.releasedVersions,n=e.toVersion,a=e.latestVersion,r=e.showReleaseCandidates,o=null!==O.a.prerelease(n),i=null!==O.a.prerelease(a);return t.filter(function(e){return r&&function(e){var t=e.version,n=e.latestVersion;return O.a.prerelease(t)&&M({version:n,versionToCompare:t})}({version:e,latestVersion:a})||null===O.a.prerelease(e)||o&&M({version:n,versionToCompare:e})||i&&M({version:a,versionToCompare:e})})},U=function(e){var t=e.releasedVersions,n=e.minVersion,a=e.maxVersion,r=function(e){return O.a.valid(O.a.coerce(e.find(function(e){return!O.a.prerelease(e)&&0===O.a.patch(e)})))}(t);return t.filter(function(e){return e.length>0&&(a&&O.a.lt(e,a)||n&&O.a.gt(e,n)&&!((t=e).includes("rc")&&O.a.valid(O.a.coerce(t))===r));var t})},W=function(e){var t=e.releasedVersions,n=e.versionToCompare;return t.find(function(e){return O.a.lt(e,n)&&"minor"===O.a.diff(O.a.valid(O.a.coerce(e)),O.a.valid(O.a.coerce(n)))})},Y=function(e){var t=e.version,n=e.allVersions,a=e.minVersion;try{return t&&n.includes(t)&&(!a||a&&O.a.gt(t,a))}catch(r){return!1}},G=function(e){var t=e.showDiff,n=e.showReleaseCandidates,r=Object(a.useState)(!0),o=Object(s.a)(r,2),i=o[0],c=o[1],l=Object(a.useState)([]),u=Object(s.a)(l,2),f=u[0],p=u[1],d=Object(a.useState)([]),b=Object(s.a)(d,2),j=b[0],O=b[1],v=Object(a.useState)([]),x=Object(s.a)(v,2),w=x[0],V=x[1],k=Object(a.useState)(!1),D=Object(s.a)(k,2),N=D[0],S=D[1],R=Object(a.useState)(""),z=Object(s.a)(R,2),T=z[0],E=z[1],q=Object(a.useState)(""),_=Object(s.a)(q,2),P=_[0],M=_[1],G=Object(a.useRef)(null);Object(a.useEffect)(function(){var e=function(){var e=y.a.parse(window.location.search);return{fromVersion:e.from,toVersion:e.to}}();!function(){var t,a,r,o,i,s,l,u,f;g.a.async(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,g.a.awrap(fetch(C));case 2:return t=d.sent,d.next=5,g.a.awrap(t.text());case 5:a=d.sent.split("\n"),r=Y({version:e.fromVersion,allVersions:a}),o=Y({version:e.toVersion,allVersions:a,minVersion:e.fromVersion}),i=a[0],s=o?e.toVersion:i,l=K({releasedVersions:a,toVersion:s,latestVersion:i,showReleaseCandidates:n}),p(l),u=r?e.fromVersion:W({releasedVersions:l,versionToCompare:s}),O(U({releasedVersions:l,maxVersion:s})),V(U({releasedVersions:l,minVersion:u})),E(u),M(s),c(!1),S(f=r&&o),f&&G.current.props.onClick();case 21:case"end":return d.stop()}})}()},[E,M,n]),Object(a.useEffect)(function(){i||(O(U({releasedVersions:f,maxVersion:P})),V(U({releasedVersions:f,minVersion:T})))},[i,f,T,P,N,n]);var H=function(e){var n=e.fromVersion,a=e.toVersion;t({fromVersion:n,toVersion:a}),function(e){var t=e.fromVersion,n=e.toVersion,a=window.location.href.replace(window.location.search,""),r="?from=".concat(t,"&to=").concat(n);window.history.replaceState(null,null,"".concat(a).concat(r))}({fromVersion:T,toVersion:P})};return Object(A.c)(a.Fragment,null,Object(A.c)(I,null,Object(A.c)(F,{title:"What's your current React Native version?",loading:i,value:T,options:j,onChange:function(e){return E(e)}}),Object(A.c)(L,{title:"To which version would you like to upgrade?",loading:i,value:P,options:w,popover:"0.60.1"===P&&Object(A.c)(h.a,{visible:!0,placement:"topLeft",content:"We recommend using the latest 0.60 patch release instead of 0.60.1."}),onChange:function(e){return M(e)}})),Object(A.c)(B,null,Object(A.c)(m.a,{ref:G,type:"primary",size:"large",onClick:function(){return H({fromVersion:T,toVersion:P})}},"Show me how to upgrade!")))},H=n(79),J=n(267),X=n(36),$=(n(248),n(273)),Q=n(278),Z=n(277),ee=n(282),te=n(281);var ne=Object(u.a)(Q.a,{target:"e1bx3rr90"})({name:"terggw",styles:"font-size:10px;margin:0 5px;color:#f78206;"}),ae=function(e){var t=e.oldPath,n=e.newPath,a=e.type,r=e.appName,o=D(t,r),i=D(n,r);return"delete"===a?Object(A.c)("span",null,o):o!==i&&"add"!==a?Object(A.c)("span",null,o," ",Object(A.c)(ne,null)," ",i):Object(A.c)("span",null,i)},re=function(e){var t=e.type,n=Object(l.a)(e,["type"]);return Object(A.c)($.a,Object(z.a)({},n,{color:{add:"blue",modify:"green",delete:"red",rename:"orange"}[t]}),{add:"ADDED",modify:"MODIFIED",delete:"DELETED",rename:"RENAMED"}[t])},oe=function(e){var t=e.visible,n=Object(l.a)(e,["visible"]);return t?Object(A.c)($.a,Object(z.a)({},n,{color:"cyan"}),"BINARY"):null},ie=Object(u.a)(function(e){return Object(A.c)("div",e)},{target:"e1bx3rr91"})({name:"146q31f",styles:"float:right;"}),ce=Object(u.a)(function(e){var t=e.visible,n=e.version,a=e.path,r=Object(l.a)(e,["visible","version","path"]);return t?Object(A.c)(m.a,Object(z.a)({},r,{type:"ghost",shape:"circle",icon:Object(A.c)(Z.a,null),target:"_blank",href:k({version:n,path:a})})):null},{target:"e1bx3rr92"})({name:"cnzq6",styles:"color:#24292e;font-size:12px;border-width:0;&:hover,&:focus{color:#24292e;}"}),se=Object(u.a)(function(e){var t=e.visible,n=e.version,a=e.path,r=Object(l.a)(e,["visible","version","path"]);return t?Object(A.c)(m.a,Object(z.a)({},r,{type:"link",target:"_blank",href:k({version:n,path:a})}),"View file"):null},{target:"e1bx3rr93"})({name:"jskc3k",styles:"font-size:12px;color:#24292e;"}),le=Object(u.a)(function(e){var t=e.visible,n=e.onClick,a=Object(l.a)(e,["visible","onClick"]);return t?Object(A.c)(h.a,{content:"\u21a9\ufe0f"},Object(A.c)(m.a,Object(z.a)({},a,{type:"ghost",shape:"circle",icon:Object(A.c)(ee.a,null),onClick:n}))):Object(A.c)(m.a,Object(z.a)({},a,{type:"ghost",shape:"circle",icon:Object(A.c)(ee.a,null),onClick:n}))},{target:"e1bx3rr94"})("font-size:13px;line-height:0;border-width:0px;width:20px;height:20px;margin:5px 8px 0;&,&:hover,&:focus{color:",function(e){return e.isDiffCompleted?"#52c41a":"#24292e"},";}"),ue=Object(u.a)(function(e){var t=e.visible,n=(e.isDiffCollapsed,Object(l.a)(e,["visible","isDiffCollapsed"]));return t?Object(A.c)(m.a,Object(z.a)({},n,{type:"link",icon:Object(A.c)(te.a,null)})):null},{target:"e1bx3rr95"})("color:#24292e;margin-right:2px;font-size:10px;transform:",function(e){return e.isDiffCollapsed?"rotate(-90deg)":"initial"},";transition:transform 0.2s ease-in-out;transform-origin:center;line-height:0;height:auto;&:hover,&:focus{color:#24292e;}"),fe=Object(u.a)(function(e){var t=e.oldPath,n=e.newPath,r=e.toVersion,o=e.type,i=e.diffKey,c=e.hasDiff,s=e.isDiffCollapsed,u=e.setIsDiffCollapsed,f=e.isDiffCompleted,p=e.onCompleteDiff,d=e.appName,b=Object(l.a)(e,["oldPath","newPath","toVersion","type","diffKey","hasDiff","isDiffCollapsed","setIsDiffCollapsed","isDiffCompleted","onCompleteDiff","appName"]);return Object(A.c)("div",b,Object(A.c)(ue,{visible:c,isDiffCollapsed:s,onClick:function(e){var t=e.altKey;return u(!s,t)}}),Object(A.c)(ae,{oldPath:t,newPath:n,type:o,appName:d})," ",Object(A.c)(re,{type:o}),Object(A.c)(oe,{visible:!c}),Object(A.c)(ie,null,Object(A.c)(a.Fragment,null,Object(A.c)(se,{visible:c&&"delete"!==o,version:r,path:n}),Object(A.c)(ce,{visible:!c&&"delete"!==o,version:r,path:n}),Object(A.c)(le,{visible:f,onClick:function(){return p(i)}}))))},{target:"e1bx3rr96"})({name:"r4gb5v",styles:"font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;font-size:12px;color:#24292e;line-height:32px;background-color:#fafbfc;border-bottom:1px solid #e1e4e8;border-top-left-radius:2px;border-top-right-radius:2px;padding:5px 10px;"}),pe=n(43),de=n(283),be=n(276),ge=n(144);var he=Object(u.a)(function(e){return Object(A.c)("a",Object(z.a)({target:"_blank"},e,{rel:"noopener"}))},{target:"e1eys6y60"})({name:"mr5ph2",styles:"text-decoration:none;color:#045dc1;"}),me=Object(u.a)("em",{target:"e1eys6y61"})({name:"j8y7sr",styles:"font-style:normal;background-color:rgba(27,31,35,0.07);border-radius:3px;font-size:85%;margin:0;padding:0.2em 0.4em;"}),je=function(e){var t=e.forceBlock,n=void 0!==t&&t,a=e.options,r=void 0===a?{}:a,o=Object(l.a)(e,["forceBlock","options"]);return Object(A.c)(ge.a,Object(z.a)({},o,{options:Object(pe.a)({},r,{forceBlock:n,overrides:Object(pe.a)({},r.overrides,{a:he,em:me,code:me,p:Object(u.a)("p",{target:"e1eys6y62"})({name:"gx0lhm",styles:"margin-bottom:0;"})})})}))};var Oe=Object(u.a)("div",{target:"e1qcg9nb0"})({name:"79elbk",styles:"position:relative;"}),ve=Object(u.a)("div",{target:"e1qcg9nb1"})({name:"wts65a",styles:"margin:10px;border:1px solid #ddd;padding:16px;border-radius:3px;color:#000;"}),ye=Object(u.a)(m.a,{target:"e1qcg9nb2"})({name:"p0s5fv",styles:"min-width:initial;width:20px;height:20px;position:absolute;top:-1px;left:5px;font-size:8px;cursor:'pointer';"}),xe={ADD:"I",DELETE:"D",NEUTRAL:"N"},we=function(e){var t=e.newPath,n=e.fromVersion,a=e.toVersion,r=e.appName,o=D(t,r);return N({fromVersion:n,toVersion:a}).filter(function(e){var t=e.comments;return t&&t.length>0&&t.some(function(e){return e.fileName===o})}).reduce(function(e,t){var n=t.comments.reduce(function(e,t){var n=t.fileName,a=t.lineChangeType,r=t.lineNumber,i=t.content;return n!==o?e:Object(pe.a)({},e,Object(c.a)({},function(e){var t=e.lineChangeType,n=e.lineNumber;return"".concat(xe[t.toUpperCase()]).concat(n)}({lineChangeType:a,lineNumber:r}),Object(A.c)(Ce,{content:i})))},{});return Object(pe.a)({},e,{},n)},{})},Ce=function(e){var t=e.content,n=Object(a.useState)(!0),r=Object(s.a)(n,2),o=r[0],i=r[1];return Object(A.c)(Oe,null,Object(A.c)(ye,{shape:"circle",type:"primary",onClick:function(){return i(!o)},icon:o?Object(A.c)(de.a,null):Object(A.c)(be.a,null)}),o&&Object(A.c)(ve,null,Object(A.c)(je,null,t.props.children)))};var Ve=Object(u.a)("div",{target:"ei7z45h0"})({name:"dd9piy",styles:"border:1px solid #ddd;border-radius:3px;margin-bottom:16px;margin-top:16px;"}),ke=Object(u.a)("div",{target:"ei7z45h1"})({name:"roblq6",styles:"background-color:#f1f8ff;margin-left:30px;padding-left:4px;color:'#1b1f23b3';"}),De=Object(u.a)(X.a,{target:"ei7z45h2"})({name:"pon55n",styles:"background-color:#dbedff;"}),Ne=Object(u.a)(X.b,{target:"ei7z45h3"})({name:"k66cdi",styles:".diff-gutter-col{width:30px;}tr.diff-line{font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;}td.diff-gutter{color:rgba(27,31,35,0.3);padding:0;text-align:center;font-size:12px;cursor:auto;}td.diff-gutter .diff-line-normal{background-color:#cdffd8;border-color:#bef5cb;}td.diff-gutter:hover{cursor:pointer;color:rgba(27,31,35,0.6);}td.diff-code{font-size:12px;color:#24292e;}td.diff-code-insert .diff-code-edit{background-color:#acf2bd;}td.diff-gutter-omit:before{width:0;background-color:transparent;}"}),Se=r.a.memo(function(e){var t=e.oldPath,n=e.newPath,r=e.type,o=e.hunks,i=e.fromVersion,c=e.toVersion,l=e.diffKey,u=e.isDiffCompleted,f=e.onCompleteDiff,p=e.selectedChanges,d=e.onToggleChangeSelection,b=e.areAllCollapsed,g=e.setAllCollapsed,h=e.diffViewStyle,m=e.appName,j=Object(a.useState)(function(e){var t=e.type,n=e.hunks;return"delete"===t||n.length>5||void 0}({type:r,hunks:o})),O=Object(s.a)(j,2),v=O[0],y=O[1];return void 0!==b&&b!==v?y(b):u&&void 0===v&&y(!0),Object(A.c)(Ve,null,Object(A.c)(fe,{oldPath:t,newPath:n,toVersion:c,type:r,diffKey:l,hasDiff:o.length>0,isDiffCollapsed:v,setIsDiffCollapsed:function(e,t){if(t)return g(e);g(void 0),y(e)},isDiffCompleted:u,onCompleteDiff:f,appName:m}),!v&&Object(A.c)(Ne,{viewType:h,diffType:r,hunks:o,widgets:we({newPath:n,fromVersion:i,toVersion:c,appName:m}),optimizeSelection:!0,selectedChanges:p},function(e){var t={enhancers:[Object(X.d)(e)]},n=Object(X.f)(e,t);return e.map(function(e){return[Object(A.c)(De,{key:"decoration-"+e.content},Object(A.c)(ke,null,e.content)),Object(A.c)(X.c,{key:e.content,hunk:e,tokens:n,gutterEvents:{onClick:d}})]})}))},function(e,t){return e.isDiffCompleted===t.isDiffCompleted&&e.areAllCollapsed===t.areAllCollapsed&&e.diffViewStyle===t.diffViewStyle});var Re=Object(u.a)("h1",{target:"e1jqko7g0"})({name:"l2z0vi",styles:"margin-top:0.5em;"}),ze=function(e){var t=e.diff,n=e.getDiffKey,r=e.title,o=e.completedDiffs,i=e.isDoneSection,c=e.fromVersion,l=e.toVersion,u=e.handleCompleteDiff,f=e.selectedChanges,p=e.onToggleChangeSelection,d=e.diffViewStyle,b=e.appName,g=Object(a.useState)(void 0),h=Object(s.a)(g,2),m=h[0],j=h[1];return Object(A.c)("div",null,r&&o.length>0&&Object(A.c)(Re,null,r),t.map(function(e){var t=n(e),a=o.includes(t);return i!==a?null:Object(A.c)(Se,Object(z.a)({key:"".concat(e.oldRevision).concat(e.newRevision)},e,{type:"new"===e.type?"add":e.type,diffKey:t,diffViewStyle:d,fromVersion:c,toVersion:l,isDiffCompleted:o.includes(t),onCompleteDiff:u,selectedChanges:f,onToggleChangeSelection:p,areAllCollapsed:m,setAllCollapsed:j,appName:b}))}))},Te=n(55),Ae=n(56),Ee=n(58),qe=n(57),_e=n(59),Pe=n(106);var Ie=function(){return Object(A.c)(Pe.a,{speed:1,backgroundColor:"#eee",foregroundColor:"#e6e6e6",viewBox:"0 0 400 100"},Object(A.c)("rect",{width:"250",height:"6",rx:"1.5"}))},Fe=function(){return Object(A.c)(Pe.a,{speed:1,backgroundColor:"#eee",foregroundColor:"#e6e6e6",viewBox:"0 0 400 100"},Object(A.c)("rect",{x:"0",y:"10",width:"47%",height:"6",rx:"1.5"}),Object(A.c)("rect",{x:"200",y:"10",width:"41%",height:"6",rx:"1.5"}),Object(A.c)("rect",{x:"0",y:"18",width:"43%",height:"6",rx:"1.5"}),Object(A.c)("rect",{x:"200",y:"34",width:"40%",height:"6",rx:"1.5"}),Object(A.c)("rect",{x:"200",y:"42",width:"45%",height:"6",rx:"1.5"}),Object(A.c)("rect",{x:"0",y:"42",width:"40%",height:"6",rx:"1.5"}),Object(A.c)("rect",{x:"0",y:"50",width:"44%",height:"6",rx:"1.5"}))},Le=Object(u.a)("div",{target:"e1q7zk9m0"})({name:"h9hnq2",styles:"margin-top:16px;border:1px solid #e8e8e8;border-radius:3px;"}),Be=Object(u.a)("div",{target:"e1q7zk9m1"})({name:"1rk6upi",styles:"color:#24292e;background-color:#fafbfc;padding:10px;height:40px;"}),Me={name:"10nze3y",styles:"padding:5px 10px;"},Ke=function(e){function t(){return Object(Te.a)(this,t),Object(Ee.a)(this,Object(qe.a)(t).apply(this,arguments))}return Object(_e.a)(t,e),Object(Ae.a)(t,[{key:"render",value:function(){return Object(A.c)(Le,null,Object(A.c)(Be,null,Object(A.c)(Ie,null)),Object(A.c)("div",{css:Me},Object(A.c)(Fe,null)))}}]),t}(a.Component);var Ue=Object(u.a)("div",{target:"e1n00l3l0"})("position:relative;",function(e){return e.isVisible&&"margin-top: 16px;"}," color:rgba(0,0,0,0.65);",function(e){return e.isVisible?"max-height: 800px;":"max-height: 0px;"}," overflow:hidden;transition:max-height 0.4s ease-out,margin-top 0.4s ease-out 0.2s;"),We=Object(u.a)("div",{target:"e1n00l3l1"})({name:"1nq9zh6",styles:"padding:24px;color:rgba(0,0,0,0.65);border:1px solid #e8e8e8;border-radius:3px;"}),Ye=Object(u.a)(function(e){return Object(A.c)("span",Object(z.a)({},e,{role:"img","aria-label":"Close useful content section"}),"\ud83d\udce3")},{target:"e1n00l3l2"})({name:"9g4yx1",styles:"margin:0px 10px;"}),Ge=Object(u.a)(function(e){var t=e.toggleVisibility,n=Object(l.a)(e,["toggleVisibility"]);return Object(A.c)(m.a,Object(z.a)({},n,{type:"link",icon:Object(A.c)(de.a,null),onClick:t}))},{target:"e1n00l3l3"})({name:"1y62o49",styles:"float:right;position:absolute;top:11px;right:12px;font-size:12px;border-width:0px;width:20px;height:20px;margin-right:8px;color:rgba(0,0,0,0.45);&:hover,&:focus{color:#24292e;}"}),He=Object(u.a)("hr",{target:"e1n00l3l4"})({name:"94b9fp",styles:"margin:15px 0;background-color:#e1e4e8;height:0.25em;border:0;"}),Je=Object(u.a)("ol",{target:"e1n00l3l5"})({name:"jbbt8s",styles:"padding-inline-start:18px;margin:10px 0 0;"}),Xe=function(e){function t(){var e,n;Object(Te.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(Ee.a)(this,(e=Object(qe.a)(t)).call.apply(e,[this].concat(r)))).state={isVisible:!0},n.handleToggleVisibility=function(){return n.setState(function(e){return{isVisible:!e.isVisible}})},n}return Object(_e.a)(t,e),Object(Ae.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){var n=this.props.isLoading&&!e.isLoading,a=this.state.isVisible&&!t.isVisible;return n||a}},{key:"render",value:function(){var e=this.props,t=e.fromVersion,n=e.toVersion,r=this.state.isVisible,o=N({fromVersion:t,toVersion:n});if(!o.some(function(e){return!!e.usefulContent}))return null;var i=o.length>1;return Object(A.c)(Ue,{isVisible:r},Object(A.c)(We,null,Object(A.c)("h2",null,Object(A.c)(Ye,null)," Useful content for upgrading"),Object(A.c)(Ge,{toggleVisibility:this.handleToggleVisibility}),o.map(function(e,t){var n=e.usefulContent,r=e.version.slice(0,4),o=[].concat(Object(H.a)(n.links),[{title:"React Native ".concat(r," changelog"),url:S({version:r})}]);return Object(A.c)(a.Fragment,{key:t},t>0&&Object(A.c)(He,null),i&&Object(A.c)("h3",null,"Release ",r),Object(A.c)("span",null,n.description),Object(A.c)(Je,null,o.map(function(e,t){var n=e.url,a=e.title;return Object(A.c)("li",{key:"".concat(n).concat(t)},Object(A.c)(he,{href:n},a))})))})))}}]),t}(a.Component),$e=n(271);var Qe=Object(u.a)("div",{target:"end0ift0"})({name:"14dwkoc",styles:"position:relative;border-width:1px;margin-top:16px;flex-direction:row-reverse;display:flex;"}),Ze=Object(u.a)(function(e){var t=e.handleViewStyleChange,n=e.diffViewStyle;return Object(A.c)(Qe,null,Object(A.c)($e.a.Group,{value:n},Object(A.c)($e.a.Button,{value:"split",onChange:function(){return t("split")}},"Split"),Object(A.c)($e.a.Button,{value:"unified",onChange:function(){return t("unified")}},"Unified")))},{target:"end0ift1"})({name:"zejs5o",styles:"float:right;position:absolute;top:10px;right:10px;font-size:12px;border-width:0px;width:20px;height:20px;margin-right:8px;&,&:hover,&:focus{color:#24292e;}"}),et=n(146),tt=n(147),nt=n.n(tt);function at(){var e=Object(et.a)(["\n  0% {\n    transform: translate(0, 0);\n  }\n\n  10%, 90% {\n    transform: translate(0, -2px);\n  }\n\n  20%, 80% {\n    transform: translate(0, 3px);\n  }\n\n  30%, 50%, 70% {\n    transform: translate(0, -5px);\n  }\n\n  40%, 60% {\n    transform: translate(0, 5px);\n  }\n"]);return at=function(){return e},e}var rt=Object(A.d)(at()),ot=Object(u.a)(function(e){var t=e.completed,n=e.total,a=Object(l.a)(e,["completed","total"]);return Object(A.c)("div",a,Object(A.c)("span",{className:"completedAmount"},0===t?1:t)," /",n,Object(A.c)(nt.a,{active:t===n,config:{elementCount:200,angle:130,startVelocity:30}}))},{target:"eqjubm30"})("position:fixed;bottom:20px;right:20px;background:#d5eafd;padding:10px;border:1px solid #1890ff;border-radius:20px;color:#7dadda;transform:",function(e){return e.completed?"translateY(0px)":"translateY(70px)"},";display:flex;align-self:flex-end;transition:transform 0.3s;",function(e){return e.completed===e.total&&Object(A.b)("transform:translateY(70px);animation:",rt,";animation-duration:1.5s;")}," .completedAmount{color:#1890ff;}");var it=Object(u.a)("div",{target:"epty4bk0"})({name:"f6mhdk",styles:"width:100%;margin-top:16px;"}),ct=function(){return Object(A.c)(it,null,Object(A.c)(J.a,{message:Object(A.c)(je,null,"Keep in mind that `RnDiffApp` and `rndiffapp` are placeholders. When upgrading, you should replace them with your actual project's name. You can also provide your app name by clicking the settings icon on the top right."),type:"info",closable:!0}))};var st=Object(u.a)("div",{target:"exsbni10"})({name:"7822g1",styles:"width:90%;"}),lt=function(e){var t=e.oldRevision,n=e.newRevision;return"".concat(t).concat(n)},ut=Object(X.g)({multiple:!0})(function(e){var t=e.showDiff,n=e.fromVersion,r=e.toVersion,o=e.selectedChanges,i=e.onToggleChangeSelection,c=e.appName,l=Object(a.useState)(!0),u=Object(s.a)(l,2),f=u[0],p=u[1],d=Object(a.useState)(null),b=Object(s.a)(d,2),h=b[0],m=b[1],j=Object(a.useState)([]),O=Object(s.a)(j,2),v=O[0],y=O[1],x=Object(a.useState)(localStorage.getItem("viewStyle")||"split"),w=Object(s.a)(x,2),C=w[0],k=w[1],D=Object(a.useCallback)(function(e){return c?e.replace(/RnDiffApp/g,c).replace(/rndiffapp/g,c.toLowerCase()):e},[c]);if(Object(a.useEffect)(function(){if(t){var e=setTimeout(function(){!function(){var e;g.a.async(function(t){for(;;)switch(t.prev=t.next){case 0:return p(!0),t.t0=g.a,t.next=4,g.a.awrap(fetch(V({fromVersion:n,toVersion:r})));case 4:return t.t1=t.sent.text(),t.next=7,t.t0.awrap.call(t.t0,t.t1);case 7:e=t.sent,m(Object(X.e)(D(e)).sort(function(e){return e.newPath.includes("package.json")?-1:1})),y([]),p(!1);case 11:case"end":return t.stop()}})}()},750);return function(){clearTimeout(e)}}},[c,n,D,t,r]),!t)return null;if(f)return Object(A.c)(st,null,Object(A.c)(Ke,null));var N={diff:h,getDiffKey:lt,completedDiffs:v,fromVersion:n,toVersion:r,handleCompleteDiff:function(e){if(v.includes(e))return y(function(t){return t.filter(function(t){return t!==e})});y(function(t){return[].concat(Object(H.a)(t),[e])})},selectedChanges:o,onToggleChangeSelection:i};return Object(A.c)(st,null,Object(A.c)(Xe,{isLoading:f,fromVersion:n,toVersion:r}),Object(A.c)(ct,null),Object(A.c)(Ze,{handleViewStyleChange:function(e){k(e),localStorage.setItem("viewStyle",e)},diffViewStyle:C}),Object(A.c)(ze,Object(z.a)({},N,{isDoneSection:!1,diffViewStyle:C,appName:c})),function(e){var t=e.diff,n=e.completedDiffs;return t.length===n.length&&Object(A.c)(J.a,{style:{marginTop:16},message:"Your upgrade is done \ud83c\udf89\ud83c\udf89",type:"success",showIcon:!0,closable:!0})}({diff:h,completedDiffs:v}),Object(A.c)(ze,Object(z.a)({},N,{isDoneSection:!0,title:"Done",appName:c})),Object(A.c)(ot,{completed:v.length,total:h.length}))}),ft=n(275),pt=n(272),dt=n(268);var bt=Object(u.a)("div",{target:"eg18p4w0"})({name:"1yuhvjn",styles:"margin-top:16px;"}),gt=function(e){var t=e.handleSettingsChange,n=e.appName,o=e.setAppName,i=Object(a.useState)(!1),c=Object(s.a)(i,2),l=c[0],u=c[1];return Object(A.c)(h.a,{placement:"bottomRight",content:Object(A.c)(r.a.Fragment,null,Object(A.c)(pt.a.Group,{onChange:function(e){return t(e)}},Object(A.c)("div",null,Object(A.c)(pt.a,{value:R},R))),Object(A.c)(bt,null,Object(A.c)("h4",null,"What's your app name?"),Object(A.c)(dt.a,{value:n,onChange:function(e){o(e.target.value)},placeholder:"MyAwesomeApp"}))),trigger:"click",visible:l,onVisibleChange:function(e){return u(e)}},Object(A.c)(m.a,{icon:Object(A.c)(ft.a,null)}))},ht=n(150),mt=n(151),jt=n.n(mt);var Ot=Object(u.a)("div",{target:"el8swy00"})({name:"cqyjk8",styles:"display:flex;align-items:center;justify-content:center;flex-direction:column;padding-top:30px;"}),vt=Object(u.a)(f.a,{target:"el8swy01"})({name:"140qzpr",styles:"width:90%;border-radius:3px;"}),yt=Object(u.a)("div",{target:"el8swy02"})({name:"70qvj9",styles:"display:flex;align-items:center;"}),xt=Object(u.a)("img",{target:"el8swy03"})({name:"9f1yi3",styles:"width:100px;margin-bottom:15px;"}),wt=Object(u.a)("h1",{target:"el8swy04"})({name:"7kez8b",styles:"margin:0;margin-left:15px;"}),Ct=Object(u.a)(function(e){var t=e.className,n=Object(l.a)(e,["className"]);return Object(A.c)("div",{className:t},Object(A.c)(p.a,n))},{target:"el8swy05"})({name:"z6j3nc",styles:"margin-top:10px;margin-left:15px;margin-right:auto;"}),Vt=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(""),i=Object(s.a)(o,2),l=i[0],u=i[1],f=Object(a.useState)(!1),p=Object(s.a)(f,2),b=p[0],g=p[1],h=Object(a.useState)(Object(c.a)({},"".concat(R),!1)),m=Object(s.a)(h,2),j=m[0],O=m[1],v=Object(a.useState)(""),y=Object(s.a)(v,2),x=y[0],w=y[1];Object(a.useEffect)(function(){d.a.initialize("UA-136307971-1"),d.a.pageview("/")},[]);return Object(A.c)(Ot,null,Object(A.c)(vt,null,Object(A.c)(yt,null,Object(A.c)(xt,{alt:"React Native upgrade helper logo",title:"React Native upgrade helper logo",src:jt.a}),Object(A.c)("a",{href:ht.a},Object(A.c)(wt,null,"React Native upgrade helper")),Object(A.c)(Ct,{href:"https://github.com/react-native-community/upgrade-helper","data-icon":"octicon-star","data-show-count":"true","aria-label":"Star react-native-community/upgrade-helper on GitHub"},"Star"),Object(A.c)(gt,{handleSettingsChange:function(e){var t=e.reduce(function(e,t){return e[t]=!0,e},{});O(t)},appName:x,setAppName:w})),Object(A.c)(G,{showDiff:function(e){var t=e.fromVersion,n=e.toVersion;t!==n&&(r(t),u(n),g(!0))},showReleaseCandidates:j[R]})),Object(A.c)(ut,{showDiff:b,fromVersion:n,toVersion:l,appName:x}))},kt=function(e){return Object(A.c)(Vt,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(A.c)(kt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},62:function(e,t,n){"use strict";n.r(t);var a=n(43);t.default=["0.62","0.61","0.60","0.59","0.58","0.57"].map(function(e){return Object(a.a)({},n(202)("./".concat(e)).default,{version:e})})},67:function(e,t){jest.setMock("../index.js",["0.59","0.58","0.57","0.56"].map(function(e){return{version:e}}))}},[[159,1,2]]]);
//# sourceMappingURL=main.3f8c9ea2.chunk.js.map