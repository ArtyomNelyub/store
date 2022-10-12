export default function Header() {
  return (
    <header className="header">
    <div className="header__container">
      <nav className="header__navigation navigation">
        <div className="navigation__link">Items</div>
        <div className="navigation__link">About us</div>
      </nav>
      <div className="header__auth auth">
        {/* <div className="auth__link">Willigund</div>
        <div className="auth__link">Log-out</div>  */}
        <div className="auth__link">Log in</div>
      </div>
    </div>
  </header>
  )
}