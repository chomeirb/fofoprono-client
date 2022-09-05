import logo from '../../images/fplogo.png';

export default function Header() {
  return (
    <header className="flex flex-row justify-center text-2xl text-secondary w-full h-[var(--header-height)]">
      <div className="w-full h-full max-w-7xl flex flex-row justify-center gap-5 items-center">
        <a href="/" className="h-[70%] hover:-rotate-12 duration-200">
          <img src={logo} alt="logo" className="h-full" />
        </a>
        <nav className="flex flex-row items-center justify-center w-full h-[90%]">
          <ul className="flex flex-row justify-between w-full gap-5 h-full items-center">
            <div className="flex flex-row gap-5 h-full items-center">
              <li>
                <a className="bg-primary rounded-lg px-5 py-2 hover:opacity-70" href="/Pronostiques">Pronostiques</a>
              </li>
              <li>
                <a className="bg-primary rounded-lg px-5 py-2 hover:opacity-70" href="/Classement">Classement</a>
              </li>
            </div>
            <div className="text-primary text-lg underline flex flex-row">
              <li>
                <a className="px-2 hover:opacity-70" href="/Règles">Règles</a>
              </li>
              <li>
                <a className="px-2 hover:opacity-70" href="/Connexion">Connexion/Inscription</a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  )
}