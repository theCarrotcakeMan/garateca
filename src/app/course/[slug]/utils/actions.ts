import axios from 'axios';

const getCourseDetail = async (slug, setCourseDetail) => {

  // TODO: Define baseUrl as env variable
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}course/${slug}`;

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
