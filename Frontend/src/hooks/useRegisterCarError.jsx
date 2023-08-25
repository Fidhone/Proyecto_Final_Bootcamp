import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const alertMessages = {
  200: {
    icon: 'success',
    title: 'Vehiculo registrado!',
    text: 'Registro ok ✅',
  },
  500: {
    icon: 'error',
    title: 'Oops...',
    text: 'Internal Server Error ❎!',
  },
  'Error creating Car': {
    icon: 'error',
    title: 'Oops...',
    text: 'Error creating Car ❎',
  },
  404: {
    icon: 'error',
    title: 'Oops...',
    text: 'Error unexpected ❎',
  },
};

export const useRegisterCarError = (res, setRes, setClear) => {
  const { status, data } = res?.response || res;

  const alertConfig = alertMessages[status] || alertMessages[data] || null;
  if (alertConfig) {
    Swal.fire({
      ...alertConfig,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (res.status === 200) {
    setClear(() => true);
  }
};
