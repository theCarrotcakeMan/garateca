import axios from 'axios';
import { store } from '/src/redux/store';
import { setCurrentContent } from '/src/redux/Features/Progress/smartIndexSlice';

const getLessonDetail = async (slug, setLessonDetail, setContents) => {

  // TODO: Define baseUrl as env variable
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}lesson/${slug}`;

  try {
    await axios.get(apiUrl)
      .then(response => {
        setLessonDetail(response.data);
        store.dispatch(setCurrentContent(response.data.contents));
        const responseContent = { ...response.data };
        console.log("Hey from the content manager", responseContent);
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
