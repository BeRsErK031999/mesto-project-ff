/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-10",headers:{authorization:"c3ad8653-2826-4356-9a74-654ec4ba0e04"}};function e(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}function r(r){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:t.headers}).then(e)}function n(r){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:t.headers}).then(e)}function o(t,e,o,a,i){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__image"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__delete-button"),p=c.querySelector(".card__like-count");return u.src=t.link,u.alt=t.name,c.querySelector(".card__title").textContent=t.name,p.textContent=t.likes.length,u.addEventListener("click",(function(){return a(u)})),l.addEventListener("click",(function(){(l.classList.contains("card__like-button_is-active")?n:r)(t._id).then((function(t){p.textContent=t.likes.length,l.classList.toggle("card__like-button_is-active")})).catch((function(t){console.error("Ошибка при обработке лайка:",t)}))})),t.owner._id===i?(s.classList.add("card__delete-button_visible"),s.addEventListener("click",(function(){e(c,t._id)}))):s.remove(),c}function a(t){t.remove()}function i(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function c(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(t){if("Escape"===t.code){var e=document.querySelector(".popup_is-opened");e&&c(e)}}function l(t){document.querySelectorAll(t.formSelector).forEach((function(e){e.addEventListener("input",(function(){e.querySelectorAll(t.inputSelector).forEach((function(r){!function(t,e,r){if(t.setCustomValidity(""),t.validity.valueMissing)t.setCustomValidity("Это обязательное поле");else if("name"!==t.name&&"place-name"!==t.name||/^[а-яА-ЯёЁa-zA-Z-\s]+$/.test(t.value))"link"!==t.name||/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(t.value)?"name"===t.name&&(t.value.length<2||t.value.length>40)?t.setCustomValidity("Должно быть от 2 до 40 символов"):"description"===t.name&&(t.value.length<2||t.value.length>200)?t.setCustomValidity("Должно быть от 2 до 200 символов"):"place-name"===t.name&&(t.value.length<2||t.value.length>30)&&t.setCustomValidity("Должно быть от 2 до 30 символов"):t.setCustomValidity("Введите корректный URL");else{var n=t.getAttribute("data-error")||"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";t.setCustomValidity(n)}var o=r.querySelector(".".concat(t.name,"-input-error"));o?(o.textContent=t.validationMessage,t.validationMessage?(t.classList.add(e.inputErrorClass),o.classList.add(e.errorClass)):(t.classList.remove(e.inputErrorClass),o.classList.remove(e.errorClass))):console.error("Element for ".concat(t.name," validation message not found"))}(r,t,e)})),function(t,e){var r=t.querySelector(e.submitButtonSelector);r.disabled=!t.checkValidity(),r.classList.toggle(e.inactiveButtonClass,!t.checkValidity())}(e,t)}));var r=e.closest(".popup");r&&r.addEventListener("click",(function(t){t.target.classList.contains("popup__open")&&s(r)}))}))}function s(t,e){var r=Array.from(t.querySelectorAll(e.inputSelector)),n=Array.from(t.querySelectorAll(".".concat(e.errorClass)));r.forEach((function(t){t.classList.remove(e.inputErrorClass),t.setCustomValidity("")})),n.forEach((function(t){t.classList.remove(e.errorClass),t.textContent=""}));var o=t.querySelector(e.submitButtonSelector);o.disabled=!0,o.classList.add(e.inactiveButtonClass)}function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function f(){f=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var a=e&&e.prototype instanceof g?e:g,i=Object.create(a.prototype),c=new z(n||[]);return o(i,"_invoke",{value:k(t,r,c)}),i}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=s;var h="suspendedStart",y="suspendedYield",v="executing",m="completed",_={};function g(){}function b(){}function w(){}var S={};l(S,i,(function(){return this}));var L=Object.getPrototypeOf,E=L&&L(L(P([])));E&&E!==r&&n.call(E,i)&&(S=E);var C=w.prototype=g.prototype=Object.create(S);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function q(t,e){function r(o,a,i,c){var u=d(t[o],t,a);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==p(s)&&n.call(s,"__await")?e.resolve(s.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(s).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function k(e,r,n){var o=h;return function(a,i){if(o===v)throw new Error("Generator is already running");if(o===m){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=A(c,n);if(u){if(u===_)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var l=d(e,r,n);if("normal"===l.type){if(o=n.done?m:y,l.arg===_)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=m,n.method="throw",n.arg=l.arg)}}}function A(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,A(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),_;var a=d(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,_;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,_):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,_)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function z(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function P(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(p(e)+" is not iterable")}return b.prototype=w,o(C,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:b,configurable:!0}),b.displayName=l(w,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,l(t,u,"GeneratorFunction")),t.prototype=Object.create(C),t},e.awrap=function(t){return{__await:t}},x(q.prototype),l(q.prototype,c,(function(){return this})),e.AsyncIterator=q,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new q(s(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(C),l(C,u,"Generator"),l(C,i,(function(){return this})),l(C,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,z.prototype={constructor:z,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(O),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,_):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),_},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),_}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),_}},e}function d(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function h(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){d(a,n,o,i,c,"next",t)}function c(t){d(a,n,o,i,c,"throw",t)}i(void 0)}))}}var y=document.querySelector(".profile__image"),v=document.querySelector(".header__logo"),m=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_image"),b=document.querySelector(".profile__edit-button"),w=document.querySelector(".profile__add-button"),S=document.querySelectorAll(".popup__close"),L=document.querySelector('.popup__form[name="edit-profile"]'),E=document.querySelector(".popup__input_type_name"),C=document.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),k=document.querySelector('.popup__form[name="new-place"]'),A=document.querySelector(".popup__input_type_card-name"),j=document.querySelector(".popup__input_type_url"),O=document.querySelector(".places__list"),z=g.querySelector(".popup__image"),P=g.querySelector(".popup__caption"),T=(document.querySelector(".profile__image-edit-button"),document.querySelector(".popup_type_update-avatar")),N=document.querySelector('.popup__form[name="update-avatar"]'),U=document.querySelector('.popup__input[name="avatar-link"]'),V=null,Z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function B(t,e){t.forEach((function(t){var r=o(t,I,0,D,e);O.appendChild(r)}))}function D(t){i(g),z.src=t.src,z.alt=t.alt,P.textContent=t.alt}function G(t){x.textContent=t.name,q.textContent=t.about,y.style.backgroundImage="url('".concat(t.avatar,"')")}l(Z),document.addEventListener("DOMContentLoaded",h(f().mark((function r(){var n,o;return f().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return v.src="0863e5bc26221680f1e2.svg",l({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),r.prev=2,r.next=5,fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(e).then((function(t){if(t&&t._id)return t;throw new Error("Не удалось извлечь ID пользователя из ответа API")})).catch((function(t){throw console.error("Ошибка при получении данных пользователя:",t),t}));case 5:return n=r.sent,r.next=8,fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(e);case 8:o=r.sent,G(n),B(o,n._id),V=n._id,console.log("ID текущего пользователя:",V),r.next=18;break;case 15:r.prev=15,r.t0=r.catch(2),console.error("Ошибка при получении данных:",r.t0);case 18:case"end":return r.stop()}}),r,null,[[2,15]])})))),b.addEventListener("click",(function(){s(m,Z),E.value=x.textContent,C.value=q.textContent,i(m)})),w.addEventListener("click",(function(){s(_,Z),i(_)})),S.forEach((function(t){var e=t.closest(".popup");t.addEventListener("click",(function(){return c(e)}))})),L.addEventListener("submit",(function(r){r.preventDefault();var n,o,a=r.target.querySelector(".popup__button");a.textContent="Сохранение...",(n=E.value,o=C.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"},body:JSON.stringify({name:n,about:o})}).then(e)).then((function(){x.textContent=E.value,q.textContent=C.value,c(m)})).catch((function(t){console.error("Ошибка при обновлении профиля:",t)})).finally((function(){a.textContent="Сохранить"}))})),k.addEventListener("submit",(function(r){r.preventDefault();var n,i,u=r.target.querySelector(".popup__button"),l=u.textContent;u.textContent="Сохранение...",(n=A.value,i=j.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"},body:JSON.stringify({name:n,link:i})}).then(e)).then((function(t){var e=o(t,a,0,D);O.prepend(e),c(_),k.reset()})).catch((function(t){console.error("Ошибка при добавлении карточки на сервер:",t)})).finally((function(){u.textContent=l}))})),document.querySelectorAll(".popup").forEach((function(t){t.addEventListener("click",(function(e){e.target===t&&c(t)}))}));var I=function(e,r){(function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then((function(t){if(!t.ok)throw new Error("Не удалось удалить карточку на сервере");return console.log("Карточка успешно удалена с сервера"),t.json()})).catch((function(t){console.error("Ошибка при удалении карточки:",t)}))})(r).then((function(){a(e),console.log("Карточка удалена: ",r)})).catch((function(t){console.error("Ошибка при удалении карточки: ",t),alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.")}))};y.addEventListener("click",(function(){i(T)})),N.addEventListener("submit",(function(r){r.preventDefault();var n,o=N.querySelector(".popup__button");o.textContent="Сохранение...",(n=U.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"},body:JSON.stringify({avatar:n})}).then(e)).then((function(t){y.style.backgroundImage="url('".concat(U.value,"')"),c(T)})).catch((function(t){console.error("Ошибка при обновлении аватара:",t)})).finally((function(){o.textContent="Сохранить"}))})),l(Z)})();