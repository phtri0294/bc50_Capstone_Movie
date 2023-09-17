import Development from "./dev";
import Production from "./prod";

const getEnv = (_env) => {
  if (_env) {
    return _env;
  }

  return "development";
};

const env = process.env.NODE_ENV;

const config = {
  development: {
    ...Development,
  },

  production: {
    ...Production,
  },
};

export default config[getEnv(env)];
