import { uniqueNamesGenerator, adjectives, names, animals, Config } from 'unique-names-generator';

const config: Config = {
  dictionaries: [adjectives, names, animals],
  separator: '_',
};

export const generateContractName = (): string => {
  const contractName = uniqueNamesGenerator(config);
  return contractName.charAt(0).toUpperCase() + contractName.slice(1);
};
