import axios from 'axios';

const getFormOptions = async (setBranchOptions, setRoleOptions) => {
  // TODO: Define baseUrl as env variable
  // const apiUrl = `${process.env.API_BASE_URL}auth`;

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}branches`;
  const apiUrlRoles = `${process.env.NEXT_PUBLIC_API_BASE_URL}roles`;

  try {
    await axios.get(apiUrl)
      .then(response => {
        setBranchOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching branches:', error);
      });

    await axios.get(apiUrlRoles)
      .then(response => {
        setRoleOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });

  } catch (error) {
    console.log(error);

  }

}

const initUrlParamsInformation = async (setInvite, setEmployee) => {

  const urlParams = new URLSearchParams(window.location.search);

  setInvite(urlParams.get('invite'));
  setEmployee(urlParams.get('employee'));

}

export { getFormOptions, initUrlParamsInformation };
