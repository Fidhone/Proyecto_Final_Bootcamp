import Swal from 'sweetalert2/dist/sweetalert2.all.js';

export const useLoginError = (res, setLoginOk, userlogin) => {
  // -------404 o un 500  en este caso --------->res.response
  // -------200 ---> entramos directos a la ---->res.data
  //! -------status: 500

  if (res?.response?.status == 500)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Interval Server Error ❎!',
      showConfirmButton: false,
      timer: 1500,
    });

  //! ---------- 200 : {token , user}
  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      check: res.data.user.check,
      gender: res.data.user.gender,
      rol: res.data.user.rol,
      _id: res.data.user._id,
      favoritos: res.data.user.favoritos,
    };

    const dataString = JSON.stringify(dataCustom);
    userlogin(dataString);
    setLoginOk(() => true);
    Swal.fire({
      icon: 'success',
      title: 'Welcome!',
      text: 'Login ok ✅',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ---------- 404: password dont match
  if (res?.response?.data?.includes('password dont match'))
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password dont match ❎',
      showConfirmButton: false,
      timer: 1500,
    });

  //! ---------- 404: User no register

  if (res?.response?.data?.includes('User no register'))
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Unregistered user ❎',
      showConfirmButton: false,
      timer: 1500,
    });
};
