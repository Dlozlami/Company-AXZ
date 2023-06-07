export default function Navbar() {
    return(
      <nav>
        <div style={{width:'60vw'}}>
            <button id="logo">AXZ</button>
        </div>
        <div style={{width:'10vw'}}>
            <button className="w3-btn w3-border w3-border-black w3-round-large">Our Story</button>
        </div>
        <div style={{width:'10vw'}}>
            <button className="w3-btn w3-border w3-border-black w3-round-large">Blog</button>
        </div>
        <div style={{width:'10vw'}}>
            <button className="w3-btn w3-border w3-border-black w3-round-large">Pricing</button>
        </div>
        <div style={{width:'10vw'}}>
            <button className="w3-btn w3-border w3-border-black w3-round-large">Contact us</button>
        </div>
      </nav>
    );
  }