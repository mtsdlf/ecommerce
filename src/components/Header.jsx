import './Header.css'

export function Header () {
  return (
  <header className="header">
    <div className="header-container">
      <h1 className="header-title">¡Bienvenidos a Mi Tienda de Juguetes!</h1>
      <nav className="header-nav">
        <a href="#" className="nav-link">Inicio</a>
        <a href="#" className="nav-link">Catálogo</a>
        <a href="#" className="nav-link">Contacto</a>
      </nav>
    </div>
  </header>

  )
}
