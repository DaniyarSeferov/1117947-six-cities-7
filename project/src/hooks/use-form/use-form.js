import {useEffect, useState} from 'react';

function useForm(formRef, controls) {
  const [formFunctions, setFormFunctions] = useState([]);

  useEffect(() => {
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

    const isValid = (showErrorMessage = true) => {
      let isFormValid = true;

      Object.keys(controls).forEach((control) => {
        const validators = controls[control];
        let isValidControl = true;
        const errors = [];

        validators.forEach(({validator, error}) => {
          const isValidValidator = validator(formRef.current[control].value);
          isValidControl = isValidValidator && isValidControl;

          if (!isValidValidator) {
            errors.push(error);
          }
        });

        if (showErrorMessage) {
          isValidControl ? clearError(formRef.current[control]) : setError(formRef.current[control], errors);
        }

        isFormValid = isFormValid && isValidControl;
      });

      return isFormValid;
    };

    setFormFunctions([getValue, clear, isValid]);
  }, [formRef, controls]);

  return formFunctions;
}

function setError(control, errors) {
  const isRadio = Object.prototype.isPrototypeOf.call(RadioNodeList.prototype, control);
  clearError(control);
  let error = errors.slice(0, 1);
  error = `<p class="validation-error" style="font-size: 14px;color: red;">${error}</p>`;

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
    email: (email) => {
      const regexes = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexes.test(String(email).toLowerCase());
    },
  };
}

export {getValidators};
export default useForm;
