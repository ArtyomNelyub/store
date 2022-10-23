import { logOutAction } from '../../app-store/userReducer';
import {
  clearItemsAction,
  updateSmallCartAction,
} from '../../app-store/itemsReducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

type HeaderAuthProps = {
  setIsModal: (a: boolean) => void;
};

export default function HeaderAuth(props: HeaderAuthProps): JSX.Element {
  const { setIsModal } = props;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className='header__auth auth'>
      {user === null ? (
        <div
          className='auth__link'
          onClick={() => setIsModal(true)}
          data-testid='login-text'
        >
          Log in
        </div>
      ) : (
        <>
          <div className='auth__link' data-testid='user-name-in-header'>{user.name}</div>
          <div
            className='auth__link'
            onClick={() => {
              dispatch(logOutAction());
              dispatch(clearItemsAction());
              dispatch(updateSmallCartAction());
            }}
          >
            Log-out
          </div>
        </>
      )}
    </div>
  );
}
