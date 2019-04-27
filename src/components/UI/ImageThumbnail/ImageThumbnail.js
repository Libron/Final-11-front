import React from 'react';
import {apiURL} from "../../../constants";

const ImageThumbnail = props => {
  if (props.image) {
    let image = apiURL + '/uploads/' + props.image;
    return <img src={image} style={props.style} className="img-thumbnail Image" alt="Post" />;
  }

  return null;
};

export default ImageThumbnail;