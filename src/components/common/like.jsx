import React from 'react';

const Like = ({ onLike, movie }) => {
  return (
    <div className="text-center">
      <i
        className={!movie.like ? 'fa fa-heart-o' : 'fa fa-heart'}
        style={{ cursor: 'pointer' }}
        aria-hidden="true"
        onClick={onLike}
      ></i>
      <div>
        {movie.like}
      </div>
    </div>
  );
}

export default Like;