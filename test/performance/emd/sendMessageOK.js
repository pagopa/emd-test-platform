
import { group, sleep } from 'k6';
import { sendMessage } from '../../common/api/messageCore.js';
import { assert, statusOk } from '../../common/assertions.js'
import  defaultHandleSummaryBuilder  from '../../common/handleSummaryBuilder.js'
import { defaultApiOptionsBuilder } from '../../common/dyanamicScenarios/defaultOptions.js'
import { logErrorResult } from '../../common/dyanamicScenarios/utils.js'
import { authToken } from '../../common/api/milAuth.js'
import { check, fail } from 'k6'

const application = 'emd'

const testName = 'sendMessageOK'

export const options = defaultApiOptionsBuilder(application, testName)

//export const handleSummary = defaultHandleSummaryBuilder(application, testName)

export function setup() {

   let res = authToken()

   let success = check(res, {
    'login riuscito': (res) => res.status === 200 
   })

    if (!success){
        fail('[SETUP] Error in gettin token. Shutdown.')
    }

    const responseBody = JSON.parse(res.body);
    const accessToken = responseBody.access_token;
    return {accessToken};
  }

export default function (data) {

    let messageId = generateUUID();
    group('Message Core API', () => {
        group('Outcome should be OK', () => {
            const body = {
                messageId: messageId, 
                recipientId: "BRTVNL63E26X000U",
                triggerDateTime: "2024-06-21T12:34:56Z",
                senderDescription: "Comune di Pontecagnano",
                messageUrl: "https://www.google.com",
                message: "Nuova notifica",
                originId: "origindId",
                associatedPayment: true
            }
            const res = sendMessage(
                body,
                data.accessToken
            )
            assert(res, [statusOk()])
        })
    })
    sleep(1)

}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}