import React from 'react';

const Like = ({ onLike, movie }) => {
  return (
    <i
      className={!movie.like ? 'fa fa-heart-o' : 'fa fa-heart'}
      style={{ cursor: 'pointer' }}
      aria-hidden="true"
      onClick={onLike}
    ></i>
  );
}

export default Like;