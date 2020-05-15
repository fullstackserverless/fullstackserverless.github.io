(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{165:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return o})),a.d(t,"rightToc",(function(){return s})),a.d(t,"default",(function(){return c}));var n=a(1),r=(a(0),a(171));const i={id:"amplify-02",title:"What is GraphQL?",sidebar_label:"GraphQL"},o={id:"amplify-02",title:"What is GraphQL?",description:"Data modeling in AWS Amplify is carried out using the GraphQL query language - it is an API specification, a query language for the API and a runtime to execute these queries with your data. It has some similarities to REST and is the best replacement for REST.",source:"@site/docs/amplify02.md",permalink:"/docs/amplify-02",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/amplify02.md",sidebar_label:"GraphQL",sidebar:"someSidebar",previous:{title:"Serverless",permalink:"/docs/amplify-01"},next:{title:"Amplify API - AppSync - CRUD (Create Read Update Delete)",permalink:"/docs/amplify-03"}},s=[{value:"Efficient and Flexible Sample",id:"efficient-and-flexible-sample",children:[]},{value:"Faster",id:"faster",children:[]},{value:"Useful analytics",id:"useful-analytics",children:[]},{value:"Works on top of any data source and transport",id:"works-on-top-of-any-data-source-and-transport",children:[]},{value:"Fetching data with a single API call",id:"fetching-data-with-a-single-api-call",children:[]},{value:"No problems with over and under extraction",id:"no-problems-with-over-and-under-extraction",children:[]},{value:"Check out of the box",id:"check-out-of-the-box",children:[]},{value:"Auto-generated documentation API",id:"auto-generated-documentation-api",children:[]},{value:"API evolution without version control",id:"api-evolution-without-version-control",children:[]},{value:"Using a single evolving version",id:"using-a-single-evolving-version",children:[]},{value:"Code Sharing",id:"code-sharing",children:[]},{value:"Detailed error messages",id:"detailed-error-messages",children:[]},{value:"Permissions",id:"permissions",children:[]},{value:"Additional operation",id:"additional-operation",children:[]},{value:"Rapid Prototyping Applications",id:"rapid-prototyping-applications",children:[]},{value:"References:",id:"references",children:[]}],l={rightToc:s};function c({components:e,...t}){return Object(r.b)("wrapper",Object(n.a)({},l,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Data modeling in AWS Amplify is carried out using the GraphQL query language - it is an API specification, a query language for the API and a runtime to execute these queries with your data. It has some similarities to REST and is the best replacement for REST."),Object(r.b)("p",null,"! ","[GraphQL]"," (",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://miro.medium.com/max/4800/1*CC4lauyfn1b2MdxqPrv1SA.png"}),"https://miro.medium.com/max/4800/1*CC4lauyfn1b2MdxqPrv1SA.png"),")"),Object(r.b)("p",null,"GraphQL was introduced by Facebook in 2015, although it has been used internally since 2012. GraphQL allows clients to determine the structure of the required data, and it is this structure that is returned from the server. Querying data in this way provides a much more efficient way for client-side applications to interact with APIs, reducing the number of incomplete samples and preventing excessive data samples."),Object(r.b)("h1",{id:"main-advantages"},"Main advantages:"),Object(r.b)("h2",{id:"efficient-and-flexible-sample"},"Efficient and Flexible Sample"),Object(r.b)("p",null,"The response returns only the requested data."),Object(r.b)("h2",{id:"faster"},"Faster"),Object(r.b)("p",null,"You can shorten your query by selecting only the fields you want to query."),Object(r.b)("h2",{id:"useful-analytics"},"Useful analytics"),Object(r.b)("p",null,"Since the client must indicate the fields explicitly in the request, the server knows exactly which fields are really needed. And this is important information for deprecation policy."),Object(r.b)("h2",{id:"works-on-top-of-any-data-source-and-transport"},"Works on top of any data source and transport"),Object(r.b)("p",null,"It is important that GraphQL allows you to work on top of any data source and any transport. In this case, HTTP is not a panacea; GraphQL can also work through WebSocket."),Object(r.b)("h2",{id:"fetching-data-with-a-single-api-call"},"Fetching data with a single API call"),Object(r.b)("p",null,"The main difference between GraphQL and REST is that the latter are centered around individual endpoints, so the developer must combine several endpoints to collect all the necessary data. While GraphQL focuses on the task itself, in this case, the developer can request the necessary data with just one API call."),Object(r.b)("h2",{id:"no-problems-with-over-and-under-extraction"},"No problems with over and under extraction"),Object(r.b)("p",null,"REST responses are known for containing too much data or not enough data, which creates a need for another request. GraphQL solves this performance problem by selecting accurate data in a single query."),Object(r.b)("h2",{id:"check-out-of-the-box"},"Check out of the box"),Object(r.b)("p",null,"The GraphQL introspection function allows you to navigate by type and determine the scheme so that applications request only what is possible and in the appropriate format. However, developers can see what the circuit can request and how the data is installed there. Based on this, they can easily add new fields to existing queries through the GraphQL IDE. There is no need to check the data format, as GraphQL will do it for you. Developers should only write resolvers - how the data will be received."),Object(r.b)("h2",{id:"auto-generated-documentation-api"},"Auto-generated documentation API"),Object(r.b)("p",null,"GraphQL synchronizes documentation with API changes. Because the GraphQL API is closely related to code, when a field, type, or query changes, documents change too. This is of direct benefit to developers as they have to spend less time documenting the API."),Object(r.b)("h2",{id:"api-evolution-without-version-control"},"API evolution without version control"),Object(r.b)("p",null,"The development of the API entails the problem of maintaining the old version until the developers move to a new one. So, with REST it is customary to offer several versions of the API. However, GraphQL eliminates the need for version control by abandoning the field-level API. Deprecated fields can later be removed from the schema without affecting existing queries. GraphQL makes this possible by creating a single API for the entire application, which is not limited to a specific storage engine."),Object(r.b)("h2",{id:"using-a-single-evolving-version"},"Using a single evolving version"),Object(r.b)("p",null,"GraphQL APIs provide applications with constant access to new features and help create more understandable and more maintainable server code."),Object(r.b)("h2",{id:"code-sharing"},"Code Sharing"),Object(r.b)("p",null,"In GraphQL, the fields used in several queries can be shared at a higher level of components for reuse. This function, called fragments, allows you to receive different data while maintaining the same field of the scheme."),Object(r.b)("h2",{id:"detailed-error-messages"},"Detailed error messages"),Object(r.b)("p",null,"In REST, we simply check the HTTP headers for the status of the response, based on which we can determine what went wrong and how to deal with it. Conversely, if an error occurs while processing GraphQL queries, the server side will provide a detailed error message that includes all resolvers and refers to a specific part of the query in case of an error.\nGraphQL error messages do not have a specific standard, so you can choose whether it is a stack trace, an error code for a specific application, or just text."),Object(r.b)("h2",{id:"permissions"},"Permissions"),Object(r.b)("p",null,"By creating a GraphQL schema, you choose which functions to expose and how they work. In turn, REST views are usually all or nothing. Thus, each view should have an idea of \u200b\u200bwhat may and cannot be disclosed in various circumstances, which is not so simple to do. Otherwise, if the request contains some personal information, the REST architecture will not even open the open parts of the requested data."),Object(r.b)("h2",{id:"additional-operation"},"Additional operation"),Object(r.b)("p",null,"In REST, APIs perform CRUD operations with the following HTTP requests:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"CREATE: generate new entries using POST"),Object(r.b)("li",{parentName:"ul"},"READ: get data based on input parameters using GET"),Object(r.b)("li",{parentName:"ul"},"UPDATE: change records with PUT"),Object(r.b)("li",{parentName:"ul"},"DELETE: erase the specified data with DELETE.")),Object(r.b)("p",null,"Thus, GraphQL introduces a new operation in the table - subscriptions, which allows clients to receive messages from the server in real time. GraphQL subscriptions can be used to automatically send notifications to a client when adding a new comment or data or receiving a message."),Object(r.b)("h2",{id:"rapid-prototyping-applications"},"Rapid Prototyping Applications"),Object(r.b)("p",null,"If the goal is to provide a prototype, CRUD operations can be time consuming. GraphQL accelerates this process by providing a single API endpoint that serves as a data proxy between the user interface and the data warehouse. In addition, the development speed is closely linked to the improved developer experience that GraphQL offers: simpler coding with data - next to the user interface, reusable fragments, less attention to error handling."),Object(r.b)("h2",{id:"references"},"References:"),Object(r.b)("p",null,Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.altexsoft.com/blog/engineering/graphql-core-features-architecture-pros-and-cons/"}),"https://www.altexsoft.com/blog/engineering/graphql-core-features-architecture-pros-and-cons/")),Object(r.b)("p",null,Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://engineering.fb.com/core-data/graphql-a-data-query-language/"}),"https://engineering.fb.com/core-data/graphql-a-data-query-language/")),Object(r.b)("p",null,Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://graphql.org/learn"}),"https://graphql.org/learn")),Object(r.b)("p",null,Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.patreon.com/bePatron?u=34467235"}),Object(r.b)("img",Object(n.a)({parentName:"a"},{src:"/img/logo/patreon.png",alt:"Become a Patron!"})))))}c.isMDXComponent=!0},171:function(e,t,a){"use strict";a.d(t,"a",(function(){return h})),a.d(t,"b",(function(){return b}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=r.a.createContext({}),d=function(e){var t=r.a.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):s({},t,{},e)),a},h=function(e){var t=d(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=Object(n.forwardRef)((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=d(a),u=n,b=h["".concat(o,".").concat(u)]||h[u]||p[u]||i;return a?r.a.createElement(b,s({ref:t},c,{components:a})):r.a.createElement(b,s({ref:t},c))}));function b(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var c=2;c<i;c++)o[c]=a[c];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"}}]);