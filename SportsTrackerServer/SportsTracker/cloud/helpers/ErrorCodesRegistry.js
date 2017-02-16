/**
 * Created by sabir on 22.06.16.
 */

var ErrorCodesRegistry = {

    PERMISSION_DENIED: {
        code: 700
    },

    INCORRECT_INPUT_DATA: {
        code: 701
    },

    UNKNOWN_ERROR: {
        code: 705
    },

    USER_WITH_SPECIFIED_EMAIL_ALREADY_EXISTS: {
        code: 706
    },

    USER_WITH_SPECIFIED_ID_IS_NOT_FOUND: {
        code: 707
    },

    INCORRECT_SIGNUP_CREDENTIALS: {
        code: 782
    },

    INCORRECT_LOGIN_CREDENTIALS: {
        code: 783
    }

};

module.exports = ErrorCodesRegistry;