import React, {useEffect, useState} from 'react';
// import { Link, useParams } from "react-router-dom";
import { useParams } from "react-router";

function Planets(props) {
  let { id } = useParams();
  const URL = `https://swapi.dev/api/planets/${id}/`;
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  
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
        }
        setLoading(false);
      })
      .catch(console.log);
  }, [URL, setLoading]);
  console.log(detail);
  return (
    <>
      {
        loading ? <h2>loading...</h2> :
        <ul>
          <h2>{detail.name}</h2>
          <li> Climate:&nbsp; {detail.climate}</li>
          <li> Terrain:&nbsp; {detail.terrain}</li>
          <li> Surface Water:&nbsp; {detail.surface_water}</li>
          <li> population:&nbsp; {detail.population}</li>
        </ul>
      }
    </>
  );
}

export default Planets;