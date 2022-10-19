import Auth from '../auth/auth';
import Header from '../header/header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function Layout():JSX.Element {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <>
      <Header {...{ setIsModal }} />

      <div className='main'>
        {isModal && <Auth setIsModal={setIsModal} />}

        <div className='main__container'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
