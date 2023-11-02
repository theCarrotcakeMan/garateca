import axios from 'axios';

const getCoursesListing = async (setCoursesListing) => {

  // TODO: Define baseUrl as env variable
  const apiUrl = 'http://localhost:3000/api/courses';

  try {
    await axios.get(apiUrl)
      .then(response => {
        setCoursesListing(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  } catch (error) {
    console.log(error);

  }

}

export { getCoursesListing };
