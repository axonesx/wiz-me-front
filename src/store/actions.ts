import Api from "@/api"
import { httpClientApi } from "@/api/helpers/http-client-api"
import { FETCH_PARAMETERS, FETCH_PARAMETERS_SUCCESS, SET_GLOBAL_ERROR } from "./mutation-types"
import { IRootStoreState } from "./types"
import { IAction } from "./types/action"

const fetchParameters: IAction<IRootStoreState, Api> = async ({ commit }, api) => {
    commit(FETCH_PARAMETERS)
    const request = await api.Parameters.fetch()
    const apiUrl = request.apiUrl
    httpClientApi.defaults.baseURL = apiUrl
    commit(FETCH_PARAMETERS_SUCCESS)
}

const setGlobalError: IAction<IRootStoreState, string | undefined> = ({ commit }, error) => {
    commit(SET_GLOBAL_ERROR, error)
  }

export default {
    fetchParameters, setGlobalError,
}