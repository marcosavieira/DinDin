import axios from "axios";
import { useEffect, useState } from "react";

function RequestApi({ name, email, password }) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function requestData() {
      try {
        const response = await axios.post(
          "https://reqres.in/api/users",
          {
            name,
            email,
            password,
          }
        );
        
        setData(response.data);
        
      } catch (error) {
        setError(error);
      }
    }
    requestData();
  }, [name, email, password]);
  
  return console.log(data)
  
    
}

export default RequestApi;
