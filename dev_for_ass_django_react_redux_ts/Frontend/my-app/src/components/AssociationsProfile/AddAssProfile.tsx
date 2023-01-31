import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { MYSERVER } from '../../env'
import { selectAssEmailLogged } from '../../slicers/developer/Association/associationSlice'
import { selectToken } from '../../slicers/developer/developerSlice'
import { useNavigate } from 'react-router-dom'

function AddAssProfile() {

  const token = useAppSelector(selectToken)
  const email = useAppSelector(selectAssEmailLogged)

  const navigate = useNavigate()
  const [flagk, setFlagk] = useState(false)

  useEffect(() => {
    if (flagk) {navigate('/AssPersonalProfile')}
  }, [flagk])

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  // UNCHANGEABLE
  const [email_from_reg, setEmail] = useState(email)

  const [association_name, setAssociationName] = useState("")
  const [profile_picture, setProfilePicture] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssociationName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(event.target.files![0]);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleImageUpload = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('association_name', association_name);
    formData.append('email_from_reg', email_from_reg);
    formData.append('description', description);
    formData.append('location', location);

    if (profile_picture) {
      formData.append('profile_picture', profile_picture)
    }

    axios.post(MYSERVER + "ass", formData, config).then(()=> setFlagk(true))
  }

  return (
    <div>
      <h4>create your profile </h4><br />

      <h6>By doing this you will be able to present your association <br/> for the developers to choose from</h6> <br/>

      <form onSubmit={handleImageUpload}>
        your association name: <input type="text" placeholder="association name" value={association_name} onChange={handleNameChange} required></input> <br/><br/>
        <h6>we accepy only BMP, EPS, GIF, ICO, IM, JPEG, JPG, MSP, PCX, PNG, PPM, SGI, SPIDER, TIFF, WebP, and XBM fiels</h6> 
        profile picture:  <input type="file" onChange={handleImageChange}></input> <br/>
        description:  <input type="text" placeholder="description" value={description} onChange={handleDescChange}></input> <br />
        location:  <input type="text" placeholder="location" value={location} onChange={handleLocationChange}></input> <br />

        <button type="submit">send</button>

      </form>
      

    </div>
  )
}

export default AddAssProfile


