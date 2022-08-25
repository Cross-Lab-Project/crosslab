import {
    Booking,
    Timeslot
} from "../generated/types"
import {
    putBookingLockByIDSignature,
    deleteBookingLockByIDSignature,
    postBookingCallbackByIDSignature
} from "../generated/signatures/booking"

export const putBookingLockByID: putBookingLockByIDSignature = async (parameters, user) => {
    // add your implementation here
    return {
        status: 500,
        body: "TODO",
    }
}

export const deleteBookingLockByID: deleteBookingLockByIDSignature = async (parameters, user) => {
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
