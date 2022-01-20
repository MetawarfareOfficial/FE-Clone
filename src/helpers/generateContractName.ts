import { uniqueNamesGenerator, adjectives, names, animals, Config } from 'unique-names-generator';

const config: Config = {
  dictionaries: [adjectives, names, animals],
  separator: '_',
};

export const generateContractName = (): string => {
  let isValidContractName = false;
  let contractName = '';
  do {
    contractName = uniqueNamesGenerator(config);
    const existedName = false; // call api here;
    if (!existedName) {
      isValidContractName = true;
    }
  } while (!isValidContractName);

  return contractName;
};
