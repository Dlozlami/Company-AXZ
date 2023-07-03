export default function NoPage(){
    return(
        <>
        <div style={{width:'95vw',height:'85vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <img src='./assets/images/404.jpg' className=" w3-card-4 w3-round-large w3-white" alt="monster holding 404 sign" width='20%'/>

            <div className=" w3-card-4 w3-round-large w3-white" style={{padding:'20px'}}>
                <p>404! Page not found.</p>
            </div>
        </div>
        </>
    );
}