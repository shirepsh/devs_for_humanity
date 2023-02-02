import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectDevelopers, getAllDevAsync } from '../../slicers/developer/developerSlice'


export const Developer = () => {

  const devs = useAppSelector(selectDevelopers)

  const dispatch = useAppDispatch()

  useEffect(() => { dispatch(getAllDevAsync()) }, [dispatch])


  return (
    <div><h4 style={{color:"wheat"}}>our developers:</h4>

      <Row lg={4}>
        {devs.map((dev: any, index: any) =>
          <div key={index}>

            <div className="container mx-auto mt-4">
              <div className="row">
                <div className="col-md-4">
                  <div className="card" style={{ width: "15rem"}}>
                    <img style={{ height: "250px"}} src={"http://127.0.0.1:8000" + dev.profile_picture} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                      <h5 className="card-title"> {dev.full_name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{dev.email_from_reg} <br /> {dev.contact_phone_number}</h6>
                      <p className="card-text"> years of experience : {dev.years_of_experience} <br/> {dev.description}</p>
                      <p className="card-text"> <a style={{ color:"wheat" }} href={dev.linkdin_url}>Linkdin</a> <a style={{ color:"wheat", marginRight: '.5rem'}} href={dev.GitHub_url}>GitHub</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
      </Row>
      <br/><br/><br/><br/><br/><br/>
    </div>
  );
}

