(()=>{"use strict";var e={};function t(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__image");c.src=e.link,c.alt=e.name,c.addEventListener("click",(function(){return o(c)})),r.querySelector(".card__title").textContent=e.name;var u=r.querySelector(".card__like-button");return u.addEventListener("click",(function(){return n(u)})),r.querySelector(".card__delete-button").addEventListener("click",(function(){return t(r)})),r}function n(e){e.remove()}function o(e){e.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){if("Escape"===e.code){var t=document.querySelector(".popup_is-opened");t&&c(t)}}e.p="";const p=e.p+"0863e5bc26221680f1e2.svg",d=e.p+"6666407ac3aa5af1d5de.jpg";var a=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],i=document.querySelector(".profile__image"),l=document.querySelector(".header__logo"),s=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_image"),y=document.querySelector(".profile__edit-button"),f=document.querySelector(".profile__add-button"),v=document.querySelectorAll(".popup__close"),k=document.querySelector('.popup__form[name="edit-profile"]'),q=document.querySelector(".popup__input_type_name"),S=document.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),E=document.querySelector('.popup__form[name="new-place"]'),L=document.querySelector(".popup__input_type_card-name"),b=document.querySelector(".popup__input_type_url"),x=document.querySelector(".places__list"),C=m.querySelector(".popup__image"),j=m.querySelector(".popup__caption");function w(e){r(m),C.src=e.src,C.alt=e.alt,j.textContent=e.alt}document.addEventListener("DOMContentLoaded",(function(){l.src=p,i&&(i.style.backgroundImage="url('".concat(d,"')")),a.forEach((function(e){var r=t(e,n,o);x.appendChild(r)}))})),y.addEventListener("click",(function(){q.value=g.textContent,S.value=h.textContent,r(s)})),f.addEventListener("click",(function(){return r(_)})),v.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return c(t)}))})),k.addEventListener("submit",(function(e){e.preventDefault(),g.textContent=q.value,h.textContent=S.value,c(s)})),E.addEventListener("submit",(function(e){e.preventDefault();var r=t({name:L.value,link:b.value},n,o,w);x.prepend(r),c(_),E.reset()})),a.forEach((function(e){var r=t(e,n,o,w);x.appendChild(r)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&c(e)}))}))})();