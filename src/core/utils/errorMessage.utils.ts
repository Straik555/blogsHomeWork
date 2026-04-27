export const errorMessage = {
  notFound: (field: string, entity: string): string =>
    `Not found ${entity} with that ${field}`,
  charactersLength: (field: string, min: number, max: number): string =>
    `The ${field} must be between ${min} and ${max} characters`,
  isString: (field: string): string => `The ${field} must be a string`,
  isRequired: (field: string): string => `The ${field} is required`,
};
