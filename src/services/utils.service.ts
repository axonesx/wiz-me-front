import { ErrorObject } from "@vuelidate/core"

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
 const isEmpty = (value: string | number | object): boolean => {
    if (value === null) {
      return true
    } else if (typeof value !== 'number' && value === '') {
      return true
    } else if (typeof value === 'undefined' || value === undefined) {
      return true
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        if(value.toString().length !== 0){
            return false
        }
        return true
    } else {
      return false
    }
  }

const isAllItemsExist = function(items: string[] | number[] | object[]): boolean {
    let isExist = true
    items.forEach((item) => {
        if(isEmpty(item)){
            isExist = false
        }
    })
    return isExist
}

// eslint-disable-next-line
const formValidation = function (errors:ErrorObject[], items: any[]): boolean {
  const isAllRequiredItemsExist = isAllItemsExist(items)
  if (errors.length === 0 && isAllRequiredItemsExist) {
    return false
  } else {
    return true
  }
}

export {
    isEmpty,
    isAllItemsExist,
    formValidation,
}