export default function Home(){
    return(
        <div style={{color:'black',alignItems:'center',height:'85vh', width:'90vw',justifyContent:'space-around',display:'flex'}}>
            <div style={{alignItems:'center',display:'flex',flexDirection:'column'}}>
                <h1 id="logoTitle" style={{fontWeight:'500',fontSize:'4em'}}>AXZ</h1><br/>
                <hr></hr>
                <p>Welcome to AXZ. Now with Reduxjs/Toolkit, Express.js  &amp; MongoDB. Join the team leading the revolution.</p>
                <p>We will keep you on track with your goals.</p>
            </div>
        </div>
    );
}