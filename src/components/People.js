import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

function People(props) {
  let { id } = useParams();
  const {setValid} = props;
  const URL = `https://swapi.dev/api/people/${id}/`;
  const [detail, setDetail] = useState({});
  const [home, setHome] = useState(null);
  const [homename, setHomename] = useState('');
  const [loading, setLoading] = useState(true);
  console.log(id);
  
  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        if (data.detail) {
          setValid(false);
        } else {
          setValid(true);
          setDetail(data);
          let arr = data.homeworld.split('/');
          setHome(arr[arr.length-2]);
        }
        setLoading(false);
      })
      .catch(console.log);
  }, [URL, setValid, setLoading]);
  
  useEffect(()=>{
    if(detail) {
      fetch(detail.homeworld)
      .then(res => res.json())
      .then(data => {
        setHomename(data.name)
      })
      .catch(setHomename('Not Found'));
    }

  },[detail]);

  return (
    <>
      {
        loading ? <h2>loading...</h2> :
        <ul>
          <h2>{detail.name}</h2>
          <li> Height:&nbsp; {detail.height}</li>
          <li> Mass:&nbsp; {detail.mass}</li>
          <li> Eye Color:&nbsp; {detail.eye_color}</li>
          <li> Skin Color:&nbsp; {detail.skin_color}</li>
          <li>Homeworld:&nbsp;{homename}</li>
          <Link to={"/planets/" + home}>Home World</Link>
        </ul>
      }
    </>
  );
}

export default People;