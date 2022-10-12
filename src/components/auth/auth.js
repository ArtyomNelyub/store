export default function Auth() {
  return (
    <div className='modal'>
      <div className='modal__window'>
        <div className='modal__close'>X</div>
        <div className='modal__error'>Неверный логи или пароль</div>
        <div className='modal__data'>
          <div className='modal__field'>
            <label htmlFor='login'>Login</label>
            <input type='text' name='login' id='login' />
          </div>
          <div className='modal__field'>
            <label htmlFor='login'>Password</label>
            <input type='text' name='login' id='login' />
          </div>
        </div>

        <button className='button'>log in</button>
        <button className='button button_delete'>cancel</button>
      </div>
    </div>
  );
}
