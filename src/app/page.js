import Link from "next/link";
import React from "react";

const HomePage = () =>{
    return(
      <div>
        <h1>Hello Next.js with auth js</h1>
        <Link href="/about">
          <button className="about-btn">About</button>
        </Link>
      </div>
      
    );
};

export default HomePage;
