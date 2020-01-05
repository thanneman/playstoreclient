import React from 'react';

export default function Apps(props) {
  return (
    <div className="playstore_app">
      <h2>{ props.App }</h2>
      <div className="app_price">Price: ${ props.Price }</div>
      <div className="app_cat">Category: { props.Category }</div>
      <div className="app_genre">Genres: { props.Genres }</div>
      <div className="app_rating">Rating: {props.Rating}</div>
    </div>
  );
}