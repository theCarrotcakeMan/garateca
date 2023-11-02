import axios from 'axios';

const getLessonDetail = async (slug, setLessonDetail, setContents) => {

  // TODO: Define baseUrl as env variable
  const apiUrl = `http://localhost:3000/api/lesson/${slug}`;

  try {
    await axios.get(apiUrl)
      .then(response => {
        setLessonDetail(response.data);
        const responseContent = { ...response.data };
        console.log("hey",responseContent);
        setContents(responseContent.contents);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  } catch (error) {
    console.log(error);

  }

}

export { getLessonDetail };
