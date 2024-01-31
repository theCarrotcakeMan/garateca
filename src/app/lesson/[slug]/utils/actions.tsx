import axios from 'axios';

const getLessonDetail = async (slug, setLessonDetail, setContents) => {

  // TODO: Define baseUrl as env variable
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}lesson/${slug}`;

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
