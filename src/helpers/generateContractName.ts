import { uniqueNamesGenerator, adjectives, names, animals, Config } from 'unique-names-generator';

const config: Config = {
  dictionaries: [adjectives, names, animals],
  separator: '_',
};

export const generateContractName = (): string => {
  return uniqueNamesGenerator(config);
};
