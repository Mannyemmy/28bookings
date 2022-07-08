import React, {useState, useEffect} from "react";
import ReadMore from "./ReadMore";


const ProductDescription = ({ description, path }) => {
  const [paths, setPaths]  = useState([])


  useEffect(() => {
    var newPath = [].concat(path).reverse();
    setPaths(newPath)
  }, [path])
  
 
 
  
  return (
    <div className="product-description px-1 px-md-2 md:!tw-pl-5">
      <div className="description">
        <h5> Description </h5>
        <p>{paths.join(' | ')}</p>
        <h4> * PLEASE CHECK AVAILABILITY BEFORE BOOKING * </h4>
        <ReadMore byWords={true} length={100} ellipsis="...">
          {description}
        </ReadMore>
      </div>
 
    </div>
  );
};

export default ProductDescription;
