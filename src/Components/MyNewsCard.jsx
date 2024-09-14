import React from 'react'
const MyNewsCard = (props) => {
  return (<>
    <div className="newsCard">
      {
        props.img == null ?
          <div className="imgContainer"></div> :
          <img src={props.img} alt="img.png" />
      }
      <p>{props.date}</p>
      <h4>{props.heading}</h4>
      <h5>{(props.description).replace(/<[^>]*>/g, '')}</h5>
    </div>
  </>
  )
}

export default MyNewsCard