import axios from 'axios';

const getCourseDetail = async (slug, setCourseDetail) => {

  // TODO: Define baseUrl as env variable
  const apiUrl = `http://localhost:3000/api/course/${slug}`;

  try {
    await axios.get(apiUrl)
      .then(response => {
        setCourseDetail(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  } catch (error) {
    console.log(error);

  }

}

export { getCourseDetail };
