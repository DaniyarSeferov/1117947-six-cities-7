function useForm(formRef, controls) {

  const getValue = () => {
    const value = {};
    Object.keys(controls).forEach((control) => {
      value[control] = formRef.current[control].value;
    });
    return value;
  };

  const clear = () => {
    Object.keys(controls).forEach((control) => {
      const isRadio = Object.prototype.isPrototypeOf.call(RadioNodeList.prototype, formRef.current[control]);
      if (isRadio) {
        Array.from(formRef.current[control]).forEach((radio) => {
          radio.checked = false;
        });
      } else {
        formRef.current[control].value = '';
      }
    });
  };

  const isValid = () => {
    let isFormValid = true;

    Object.keys(controls).forEach((control) => {
      const validators = controls[control];
      let isValidControl = true;
      const errors = [];

      validators.forEach(({validator, error}) => {
        isValidControl = validator(formRef.current[control].value) && isValidControl;
        errors.push(error);
      });

      isValidControl ? clearError(formRef.current[control]) : setError(formRef.current[control], errors);

      isFormValid = isFormValid && isValidControl;
    });

    return isFormValid;
  };

  return [getValue, clear, isValid];
}

function setError(control, errors) {
  const isRadio = Object.prototype.isPrototypeOf.call(RadioNodeList.prototype, control);
  clearError(control);
  let error = errors.slice(0, 1);
  error = `<p class="validation-error">${error}</p>`;

  if (!isRadio) {
    control.classList.add('invalid');
    control.insertAdjacentHTML('afterend', error);
  } else {
    control[0].closest('.form-control').insertAdjacentHTML('beforeend', error);
  }
}

function clearError(control) {
  const isRadio = Object.prototype.isPrototypeOf.call(RadioNodeList.prototype, control);

  if (!isRadio) {
    control.classList.remove('invalid');

    if (control.nextSibling) {
      control.closest('.form-control').removeChild(control.nextSibling);
    }
  } else if (control[0].parentNode.nextSibling) {
    control[0].closest('.form-control').removeChild(control[0].parentNode.nextSibling);
  }
}

function getValidators() {
  return {
    required: (value = '') => value && value.trim(),
    length: (minLength, maxLength) => (value) => {
      value = value.trim();
      return value.length >= minLength && value.length <= maxLength;
    },
  };
}

export {getValidators};
export default useForm;
