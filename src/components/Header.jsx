import logoImg from '../assets/logo.jpg';

export default function Header() {
  //Implementar função pro cart
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button className="button">Cart</button>
    </header>
  );
}
