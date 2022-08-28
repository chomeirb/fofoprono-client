import logo from '../../images/fplogo.png';

export default function Header() {
  return (
    <header className="text-2xl text-secondary w-full flex flex-row justify-center gap-20 items-center h-[var(--header-height)]">
      <a href="/" className="h-[70%]">
        <img src={logo} alt="logo" className="h-full" />
      </a>
      <nav className="flex flex-row items-center justify-center max-w-7xl h-[90%]">
        <ul className="flex flex-row gap-5 h-full items-center">
          <li className="bg-primary rounded-full px-5 py-1">
            <a href="/">Home</a>
          </li>
          <li className="bg-primary rounded-full px-5 py-1">
            <a href="/Pronostiques">Pronostiques</a>
          </li>
          <li className="bg-primary rounded-full px-5 py-1">
            <a href="/Classement">Classement</a>
          </li>
          <li className="bg-primary rounded-full px-5 py-1">
            <a href="/Règles">Règles</a>
          </li>
          <li className="bg-primary rounded-full px-5 py-1">
            <a href="/Connexion">Connexion/Inscription</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}