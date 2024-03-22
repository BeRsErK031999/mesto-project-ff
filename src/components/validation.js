function validateInput(input, settings, form) {
    input.setCustomValidity("");
    const nameAndPlaceNameRegex = /^[а-яА-ЯёЁa-zA-Z-\s]+$/;
    const urlRegex =
      /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
  
    if (input.validity.valueMissing) {
      input.setCustomValidity("Это обязательное поле");
    } else if (
      (input.name === "name" || input.name === "place-name") &&
      !nameAndPlaceNameRegex.test(input.value)
    ) {
      const customMessage =
        input.getAttribute("data-error") ||
        "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
      input.setCustomValidity(customMessage);
    } else if (input.name === "link" && !urlRegex.test(input.value)) {
      input.setCustomValidity("Введите корректный URL");
    } else if (
      input.name === "name" &&
      (input.value.length < 2 || input.value.length > 40)
    ) {
      input.setCustomValidity("Должно быть от 2 до 40 символов");
    } else if (
      input.name === "description" &&
      (input.value.length < 2 || input.value.length > 200)
    ) {
      input.setCustomValidity("Должно быть от 2 до 200 символов");
    } else if (
      input.name === "place-name" &&
      (input.value.length < 2 || input.value.length > 30)
    ) {
      input.setCustomValidity("Должно быть от 2 до 30 символов");
    }
  
    const errorElement = form.querySelector(`.${input.name}-input-error`);
    if (errorElement) {
      errorElement.textContent = input.validationMessage;
      if (input.validationMessage) {
        input.classList.add(settings.inputErrorClass);
        errorElement.classList.add(settings.errorClass);
      } else {
        input.classList.remove(settings.inputErrorClass);
        errorElement.classList.remove(settings.errorClass);
      }
    } else {
      console.error(`Element for ${input.name} validation message not found`);
    }
  }
  
  function updateSaveButtonState(form, settings) {
    const submitButton = form.querySelector(settings.submitButtonSelector);
    submitButton.disabled = !form.checkValidity();
    submitButton.classList.toggle(
      settings.inactiveButtonClass,
      !form.checkValidity()
    );
  }
  
  function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach((form) => {
      form.addEventListener("input", function () {
        const inputs = form.querySelectorAll(settings.inputSelector);
        inputs.forEach((input) => {
          validateInput(input, settings, form);
        });
        updateSaveButtonState(form, settings);
      });
  
      // При открытии формы сбросить состояние валидации
      const popup = form.closest(".popup");
      if (popup) {
        popup.addEventListener("click", (event) => {
          if (event.target.classList.contains("popup__open")) {
            clearValidation(popup);
          }
        });
      }
    });
  }

  function clearValidation(form, settings) {
    // Очищаем ошибки валидации для всех полей формы
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const errorList = Array.from(form.querySelectorAll(`.${settings.errorClass}`));
    inputList.forEach((inputElement) => {
      inputElement.classList.remove(settings.inputErrorClass);
      inputElement.setCustomValidity("");
    });
  
    errorList.forEach((errorElement) => {
      errorElement.classList.remove(settings.errorClass);
      errorElement.textContent = "";
    });
    // Делаем кнопку отправки формы неактивной
    const submitButton = form.querySelector(settings.submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(settings.inactiveButtonClass);
  }
  
  export { validateInput, updateSaveButtonState, enableValidation, clearValidation };