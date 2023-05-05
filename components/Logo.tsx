import Image from "next/image";
import React from "react";



const Logo = (props:any) => {

    const {renderDefault, title} = props
  return <div className="flex items-center space-x-2">
    <Image
    className="rounded-full object-cover"
    src={"https://links.papareact.com/1m8"}
    height={50}
    width={50}
    alt="" />
    {renderDefault && <>{renderDefault(props)}</>}
  </div>;
};

export default Logo;
