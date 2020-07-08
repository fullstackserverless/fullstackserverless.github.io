(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{140:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var o=n(1),a=n(9),i=(n(0),n(173)),r={id:"auth1-00",title:"Introduction",sidebar_label:"Introduction"},s={id:"auth1-00",title:"Introduction",description:"One of the most requested topics among the subscribers of my channel is \r",source:"@site/docs\\auth1.00.md",permalink:"/docs/auth1-00",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/auth1.00.md",sidebar_label:"Introduction",sidebar:"someSidebar",previous:{title:"UI Kit - Unicorn",permalink:"/docs/unicorn02"},next:{title:"Authentication",permalink:"/docs/auth1-01"}},c=[{value:"Authentication",id:"authentication",children:[]},{value:"Authorization",id:"authorization",children:[]},{value:"Amazon Cognito",id:"amazon-cognito",children:[]},{value:"User Pools",id:"user-pools",children:[]},{value:"Identity pools",id:"identity-pools",children:[]},{value:"How much does it all cost?",id:"how-much-does-it-all-cost",children:[]}],l={rightToc:c};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"One of the most requested topics among the subscribers of my channel is\nauthentication and authorization in the React Native application using AWS Amplify. Therefore, I decided to devote a separate post to this issue, and before we start coding, it is necessary to understand the definitions like Authentication and Authorization."),Object(i.b)("p",null,Object(i.b)("img",Object(o.a)({parentName:"p"},{src:"/img/auth/01.png",alt:"cognito"}))),Object(i.b)("p",null,"Support Patron ",Object(i.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.patreon.com/bePatron?u=34467235"}),"Chat")),Object(i.b)("h2",{id:"authentication"},"Authentication"),Object(i.b)("p",null,"is about validating your credentials such as Username/User ID and\npassword to verify your identity. "),Object(i.b)("h2",{id:"authorization"},"Authorization"),Object(i.b)("p",null,"occurs after your identity is successfully authenticated by the system, which therefore\ngives you full access to resources such as information, files, databases, funds, etc."),Object(i.b)("p",null,"Authentication means confirming your own identity,\nwhereas authorization means being allowed access to the system. Read ",Object(i.b)("a",Object(o.a)({parentName:"p"},{href:"https://medium.com/datadriveninvestor/authentication-vs-authorization-716fea914d55"}),"more")),Object(i.b)("p",null,"At the end of this article, we will make this mobile application:"),Object(i.b)("p",null,Object(i.b)("img",Object(o.a)({parentName:"p"},{src:"/img/auth/00.png",alt:"cognito"}))),Object(i.b)("p",null,"Authentication is an integral part of almost any application. Knowing who the user is, the unique identifier of the user, what permissions the user has, and whether they are logged in, allows your application to display the correct views and return the correct data for the current logged in user."),Object(i.b)("p",null,"Most applications require mechanisms for registering users, logging in to the system, processing encryption and updating passwords, as well as many other tasks related to identity management. Modern applications often require things like OAUTH (open authentication), MFA (multi-factor authentication), and TOTP (time-based time passwords)."),Object(i.b)("p",null,"In the past, developers had to manually spin all of these authentication features from scratch. This task alone can take weeks or even months from the development team to do everything right and do it safely. Fortunately, today there are fully managed authentication services like Auth0, Okta and Amazon Cognito that handle all this for us."),Object(i.b)("p",null,"In this article, you'll learn how to correctly and securely implement authentication in a React Native application using Amazon Cognito with AWS Amplify."),Object(i.b)("h2",{id:"amazon-cognito"},"Amazon Cognito"),Object(i.b)("p",null,"It is a fully managed authentication service from AWS. Cognito provides easy and secure user registration, logon, access control, token updates, and user identity management. Cognito scales to millions of users and also supports logging in with social network providers such as Facebook, Google and Amazon."),Object(i.b)("p",null,"Cognito consists of two main parts: user pools and identity pools."),Object(i.b)("h2",{id:"user-pools"},"User Pools"),Object(i.b)("p",null,"user pools provide a secure user directory that stores all of your users and scales to hundreds of millions of users. This is a fully managed service. Like serverless technology, user pools are easy to configure, without having to worry about supporting any infrastructure. User pools manage all the users who register and log in to the account and is the  main part that we will focus on in this article."),Object(i.b)("h2",{id:"identity-pools"},"Identity pools"),Object(i.b)("p",null,"identity pools allow you to authorize users who are logged into your application to access various other AWS services. Suppose you want to give a user access to a lambda function so that it can receive data from another API. You can specify this when creating the identity pool. User pools include the fact that the source of these identifiers may be the Cognito user pool, or even Facebook or Google."),Object(i.b)("p",null,"A scenario where an Amazon Cognito user pool and an identity pool are used together."),Object(i.b)("p",null,"See the diagram for a common Amazon Cognito script. The goal here is to authenticate your user and then give him access to another AWS service."),Object(i.b)("p",null,Object(i.b)("img",Object(o.a)({parentName:"p"},{src:"/img/auth/auth00.png",alt:"cognito"}))),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"At the first stage, the user of your application enters the system through the user pool\nand receives user pool tokens  after successful authentication.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Then your application exchanges user pool tokens for AWS credentials through the identity pool.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Finally, your application user can then use these AWS credentials to access other AWS services, such as Amazon S3 or DynamoDB."))),Object(i.b)("p",null,"Cognito User Pools allows your application to call various methods for a service to manage all aspects of user authentication, including things like:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"User registration"),Object(i.b)("li",{parentName:"ul"},"User login"),Object(i.b)("li",{parentName:"ul"},"User Logout"),Object(i.b)("li",{parentName:"ul"},"Change user password"),Object(i.b)("li",{parentName:"ul"},"Reset user password"),Object(i.b)("li",{parentName:"ul"},"MFA Code Verification"),Object(i.b)("li",{parentName:"ul"},"Amazon Cognito Integration with AWS Amplify")),Object(i.b)("p",null,"AWS Amplify supports Amazon Cognito in a variety of ways. First of all, you can create and configure Amazon Cognito services directly from the AWS Amplify command-line interface. By creating an authentication service through the CLI, you can call various methods (for example, signUp, signIn and signOut) from a JavaScript application using the Amplify JavaScript client library.\nAmplify also has pre-configured user interface components that allow you to build entire authentication\nflow in just a couple of lines of code for environments such as React, React Native, Vue, and Angular."),Object(i.b)("h2",{id:"how-much-does-it-all-cost"},"How much does it all cost?"),Object(i.b)("h4",{id:"pay-only-for-what-you-use-no-minimum-fees"},"Pay only for what you use. No minimum fees."),Object(i.b)("p",null,"Using Amazon Cognito Identity to create a user pool, you pay only for the number of active users per month (MAU). MAUs are users who have performed at least one identification operation during a calendar month: registration, authorization, token renewal, or password change. Subsequent sessions of active users and inactive users in this calendar month are not paid."),Object(i.b)("p",null,Object(i.b)("img",Object(o.a)({parentName:"p"},{src:"/img/auth/auth01.png",alt:"cognito"}))),Object(i.b)("p",null,"CODING TIME \ud83d\udc68\ud83c\udffc\u200d\ud83d\udcbb\ud83d\udc69\ud83c\udffb\u200d\ud83d\udcbb"),Object(i.b)("p",null,Object(i.b)("img",Object(o.a)({parentName:"p"},{src:"https://media.giphy.com/media/836HiJc7pgzy8iNXCn/giphy.gif",alt:"cognito"}))),Object(i.b)("p",null,Object(i.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.patreon.com/bePatron?u=34467235"}),Object(i.b)("img",Object(o.a)({parentName:"a"},{src:"/img/logo/patreon.png",alt:"Become a Patron!"})))))}u.isMDXComponent=!0},173:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var o=n(0),a=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,r=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(n),d=o,b=p["".concat(r,".").concat(d)]||p[d]||h[d]||i;return n?a.a.createElement(b,s({ref:t},l,{components:n})):a.a.createElement(b,s({ref:t},l))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var l=2;l<i;l++)r[l]=n[l];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);