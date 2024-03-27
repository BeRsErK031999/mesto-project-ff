function hideInputError(input, settings, errorElement) {
  input.classList.remove(settings.inputErrorClass);
  if (errorElement) {
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  }
}

function validateInput(input, settings, form) {
  input.setCustomValidity("");
  if (input.validity.valueMissing) {
      input.setCustomValidity("Это обязательное поле");
  } else if (!input.validity.valid) {
      // Сообщение об ошибке уже задано через атрибут title в HTML
      input.setCustomValidity(input.title);
  }

  const errorElement = form.querySelector(`.${input.name}-input-error`);
  if (errorElement) {
    errorElement.textContent = input.validationMessage;
    if (input.validationMessage) {
      input.classList.add(settings.inputErrorClass);
      errorElement.classList.add(settings.errorClass);
    } else {
      hideInputError(input, settings, errorElement);
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
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const errorList = Array.from(form.querySelectorAll(`.${settings.errorClass}`));
    inputList.forEach((inputElement) => {
      const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
      hideInputError(inputElement, settings, errorElement);
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