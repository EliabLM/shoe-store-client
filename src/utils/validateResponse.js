import Swal from 'sweetalert2';

export const validateResponse = (
  response,
  message = 'Ha ocurrido un error, por favor intentar nuevamente'
) => {
  if (response.statusCode !== 200 && response.statusCode !== 201) {
    Swal.fire({
      icon: 'error',
      text: response.message || message,
    });

    return false;
  }

  return true;
};
