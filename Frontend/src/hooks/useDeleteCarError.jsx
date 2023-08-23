import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const deleteAlertMessages = {
  200: {
    icon: 'success',
    title: 'Vehicle deleted!',
    text: 'Deletion successful ✅',
  },
  404: {
    icon: 'error',
    title: 'Oops...',
    text: 'Vehicle not found ❎',
  },
  500: {
    icon: 'error',
    title: 'Oops...',
    text: 'Internal Server Error ❎',
  },
  'Error deleting Car': {
    icon: 'error',
    title: 'Oops...',
    text: 'Error deleting Car ❎',
  },
};

export const useDeleteCarError = (res) => {
  const { status, data } = res?.response || res;
  const alertConfig = deleteAlertMessages[status] || deleteAlertMessages[data] || null;
  if (alertConfig) {
    Swal.fire({
      ...alertConfig,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
