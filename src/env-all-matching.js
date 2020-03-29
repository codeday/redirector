module.exports = key => {
  return Object.keys(process.env)
    .filter(env => env.substr(0, key.length) === key)
    .map(env => process.env[env]);
};
