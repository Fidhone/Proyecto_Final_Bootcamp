import { useEffect, useState } from 'react';

import { useAuth } from '../context/authContext';
import { useResendCodeError } from '../hooks';
import { resendCodeConfirmationUser } from '../service/API_user/user.service';

export const ButtonReSend = ({ setReloadPageError }) => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const { allUser } = useAuth();

  //! 1) ---------------LAS FUNCIONES QUE GESTIONAN LOS SUBMIT DE LOS FORMULARIOS--------

  const handleReSend = async () => {
    // / no tenemos un form data porque sacamos la info por la parte del AllUser o
    // / ... del sessionStorage
    const getEmailSessionStorage = () => {
      const local = sessionStorage.getItem('user');
      const parseUserLocal = JSON.parse(local);
      //console.log(parseUserLocal.email);
      return parseUserLocal.email;
    };
    setSend(true);
    setRes(
      await resendCodeConfirmationUser({
        email: sessionStorage.getItem('user')
          ? getEmailSessionStorage()
          : allUser?.data?.user?.email,
      }),
    );
    setSend(false);
  };

  //!2) ---------------- USEEFFECT  QUE GESTIONAN LOS ERRRORES Y EL 200 CON UN CUSTOMhook -----
  useEffect(() => {
    console.log(res);

    useResendCodeError(res, setReloadPageError, setRes);
  }, [res]);

  return (
    <button id="btnResend" className="btn" disabled={send} onClick={() => handleReSend()}>
      Resend Code
    </button>
  );
};
