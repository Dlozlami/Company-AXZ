export default function Navbar() {
    return(
      <nav>
        <div style={{width:'60vw'}}>
            <button id="logo" className="modernButton">AXZ</button>
        </div>
        <div style={{width:'10vw'}}>
            <button className="modernButton navLink">Our Story</button>
        </div>
        <div style={{width:'10vw'}}>
            <button className="modernButton navLink">Blog</button>
        </div>
        <div style={{width:'10vw'}}>
            <button className="modernButton navLink">Pricing</button>
        </div>
        <div style={{width:'10vw'}}>
            <button className="modernButton navLink">Contact us</button>
        </div>
      </nav>
    );
  }