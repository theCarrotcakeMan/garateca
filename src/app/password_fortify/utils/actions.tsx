import axios from 'axios';

const getFormOptions = async (setBranchOptions, setRoleOptions) => {
  // TODO: Define baseUrl as env variable
  const apiUrl = 'http://localhost:3000/api/branches';
  const apiUrlRoles = 'http://localhost:3000/api/roles';

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
