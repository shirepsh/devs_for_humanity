import axios from 'axios'
import React, { useState  } from 'react'
import { useAppSelector } from '../../app/hooks'
import { MYSERVER } from '../../env'
import { selectToken} from '../../slicers/developer/developerSlice'

function AddDeveloper() {

  const token = useAppSelector(selectToken)

  const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
};

    const [full_name, setFullname] = useState("")
    const [contact_phone_number, setContactPhoneNumber] = useState("")
    const [email_from_reg, setEmail] = useState("")
    const [profile_picture, setProfilePicture] = useState<File | null>(null)
    const [years_of_experience, setYearsOfExperience] = useState("");
    const [description, setDescription] = useState("")
    const [linkdin_url, setLinkdinUrl] = useState("")
    const [GitHub_url, setGitHubUrl] = useState("")

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFullname(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setContactPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfilePicture(event.target.files![0]);
    };
  
    const handleYearsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setYearsOfExperience(event.target.value);
    };
  
    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    };
  
    const handleLinkDinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLinkdinUrl(event.target.value);
    };
  
    const handleGitHubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setGitHubUrl(event.target.value);
    };
  
    const handleImageUpload = async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('full_name', full_name);
      formData.append('contact_phone_number', contact_phone_number);
      formData.append('email_from_reg', email_from_reg);
      formData.append('profile_picture', profile_picture!);
      formData.append('years_of_experience', years_of_experience);
      formData.append('description', description);
      formData.append('linkdin_url', linkdin_url);
      formData.append('GitHub_url', GitHub_url);

      const res = await axios.post(MYSERVER + "dev ", formData, config)}

  return (
    <div> 
      <h4>create your profile </h4><br/>

    <form onSubmit={handleImageUpload}>   
    your full name: <input type="text"  placeholder="full name" value={full_name} onChange={handleNameChange}></input> <br/>
    email from register:  <input type="text"  placeholder="email from reg" value={email_from_reg} onChange={handleEmailChange}></input> <br/>
    phone number:  <input type="text"  placeholder="contact phone number" value={contact_phone_number} onChange={handlePhoneChange}></input> <br/>
    profile picture:  <input type="file" onChange={handleImageChange}></input> <br/>
    description:  <input type="text"  placeholder="description" value={description} onChange={handleDescChange}></input> <br/>
    your experience: <input type="text" placeholder="years of experience" value={years_of_experience} onChange={handleYearsChange}></input> <br/>
    gitHub url:  <input type="text"  placeholder="linkdin url" value={linkdin_url} onChange={handleLinkDinChange}></input> <br/>
    linkdin url:  <input type="text"  placeholder="GitHub url" value={GitHub_url} onChange={handleGitHubChange}></input> <br/>

    <button onClick={()=>console.log(token)}>stam</button>
    <button type="submit">Upload Image</button>  <br/>
      </form>

    </div>
  )
}

export default AddDeveloper

