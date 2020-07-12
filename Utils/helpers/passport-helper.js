const { uuid } = require('uuidv4');
const models = require('../../Models');

const createUser = async (accessToken, profile) => {
  // save the profile id in a variable
  const value = `${profile.id}`;
  const data = {
    user_id: uuid(),
    gender: 'male',
    first_name: profile.displayName,
    last_name: profile.displayName,
    username: profile.username,
    email: profile.emails[0].value,
    password: '12345678',
    picture_url: profile.photos[0].value,
    provider: profile.provider,
    verification_token: accessToken,
  };

  let dataToCreate;
  // check provider to know how to populate the povider id field
  if (profile.provider === 'google') {
    dataToCreate = { ...data, googleId: value };
  } else if (profile.provider === 'github') {
    dataToCreate = { ...data, githubId: value };
  } else {
    dataToCreate = { ...data, linkedinId: value };
  }

  // create user with created object
  const newUser = await models.User.create(dataToCreate);
  return newUser;
};
module.exports = createUser;
