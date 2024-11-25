import React from "react";

const Footer = () => {
    return (
        <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
            <div className="container p-12 flex justify-between">
                <div>
                    <img src={"/images/footer.png"} alt={"logo image"} className={"w-20 h-20 "}/>
                </div>
                <p className="text-slate-600">All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;