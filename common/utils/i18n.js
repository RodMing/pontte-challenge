"use strict";

const translateAttribute = (dict, attribute) => {
  let translated = attribute;
  Object.keys(dict).forEach(field => {
    if (attribute.search(field) >= 0) {
      translated = dict[field];
    }
  });

  return translated;
};

module.exports = dict => ({
  type: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(dict, attribute)}' deve ser ${
        params.type
      }`,
      path: attribute
    };
  },
  required: ({ dataPath, params }) => {
    let attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    if (attribute) {
      attribute += ".";
    }
    attribute += params.missingProperty;
    return {
      message: `Campo '${translateAttribute(dict, attribute)}' é obrigatório`,
      path: attribute
    };
  },
  minimum: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(dict, attribute)}' deve ser ${
        params.comparison
      } a ${params.limit}`,
      path: attribute
    };
  },
  exclusiveMinimum: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(dict, attribute)}' deve ser ${
        params.comparison
      } a ${params.limit}`,
      path: attribute
    };
  },
  format: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(
        dict,
        attribute
      )}' deve ser no formato ${params.format}`,
      path: attribute
    };
  },
  multipleOf: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(
        dict,
        attribute
      )}' deve ser múltiplo de ${params.multipleOf}`,
      path: attribute
    };
  },
  minItems: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(
        dict,
        attribute
      )}' deve possuir no mínimo ${params.limit} item`,
      path: attribute
    };
  },
  uniqueItems: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(
        dict,
        attribute
      )}' deve possuir itens diferentes`,
      path: attribute
    };
  },
  minLength: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(
        dict,
        attribute
      )}' deve possuir no mínimo ${params.limit} caracteres`,
      path: attribute
    };
  },
  maxLength: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(
        dict,
        attribute
      )}' deve possuir no máximo ${params.limit} caracteres`,
      path: attribute
    };
  },
  enum: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(
        dict,
        attribute
      )}' deve ser umas das opções ${params.allowedValues}`,
      path: attribute
    };
  },
  pattern: ({ dataPath, params }) => {
    const attribute = dataPath.replace(/[.]{1}\w{4}[.]?/, "");
    return {
      message: `Campo '${translateAttribute(
        dict,
        attribute
      )}' não está no padrão válido`,
      path: attribute
    };
  }
});
