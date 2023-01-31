import {
    Booking,
    Timeslot
} from "./generated/types"
import {
    putBookingByIDLockSignature,
    deleteBookingByIDLockSignature,
    postBookingCallbackByIDSignature
} from "./generated/signatures"

export const putBookingByIDLock: putBookingByIDLockSignature = async (parameters, user) => {
    // add your implementation here
    return {
        status: 500,
        body: "TODO",
    }
}

export const deleteBookingByIDLock: deleteBookingByIDLockSignature = async (parameters, user) => {
    // add your implementation here
    return {
        status: 500,
        body: "TODO",
    }
}

export const postBookingCallbackByID: postBookingCallbackByIDSignature = async (parameters, user) => {
    // add your implementation here
    return {
        status: 500,
        body: "TODO",
    }
}
