import http from 'k6/http'
import { logResult } from '../dyanamicScenarios/utils.js'
import { DEV, UAT, getBaseUrl } from '../envUrl.js'
import { CONFIG } from '../dyanamicScenarios/envVars.js'

export const MIL_AUTH_API_NAMES = {
    authToken: 'milAuth/token',
}

const REGISTERED_ENVS = [DEV, UAT]

const innerBaseUrl = `${getBaseUrl(REGISTERED_ENVS, 'mil')}`
const API_PREFIX = '/auth'




export function authToken() {
    const apiName = MIL_AUTH_API_NAMES.authToken

    const baseUrl = innerBaseUrl

    const body = `client_secret=${CONFIG.AUTH_KEYS.CLIENT_SECRET}&client_id=${CONFIG.AUTH_KEYS.CLIENT_ID}&grant_type=client_credentials`

    const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    const res = http.post(
        `${baseUrl}${API_PREFIX}/token`,
        body,
        headers,
        { tags: { apiName } }
    )

    logResult(apiName, res)

    return res

}
