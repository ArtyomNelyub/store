import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '../header/header';
import Auth from '../auth/auth';

export default function Layout() {
  const [isModal, setIsModal] = useState(false);

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
