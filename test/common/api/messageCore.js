import http from 'k6/http'
import { logResult } from '../dyanamicScenarios/utils.js'
import { DEV, UAT, getBaseUrl } from '../envUrl.js'


export const MESSAGECORE_API_NAMES = {
    sendMessage: 'message-core/sendMessage',
}

const REGISTERED_ENVS = [DEV, UAT]

const innerBaseUrl = `${getBaseUrl(REGISTERED_ENVS, 'emd')}`
const API_PREFIX = '/emd/message-core'

export function sendMessage(body,token) {
    const apiName = MESSAGECORE_API_NAMES.sendMessage

    const baseUrl = innerBaseUrl

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    const res = http.post(
        `${baseUrl}${API_PREFIX}/sendMessage`, 
        JSON.stringify(body),
        headers,
        { tags: { apiName } }
    )

    

    logResult(apiName, res.body)

    return res

}




