import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className='main'>
      <div className='main__container'>
        <div className='not-found'>
          <h2 className='not-found__header'>404</h2>
          <p className='not-found__text'>Page was not found</p>
          <div className='not-found__footer'>
            <Link to='' className='button'>
              Go Main
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
