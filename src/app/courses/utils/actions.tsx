import axios from 'axios';

const getCoursesListing = async (setCoursesListing) => {

  // TODO: Define baseUrl as env variable
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}courses`;

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
