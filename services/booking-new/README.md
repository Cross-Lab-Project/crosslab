# Booking Service

This is an implementation of a CrossLab-compatible booking service. It supports the timeslot-based booking of experiments and their devices.

## Booking an Experiment (without federated devices)

When booking an experiment the booking service needs to check if all devices are available for the requested timeslot. There are multiple different types of devices each of which needs to be treated differently.

- **Concrete Devices**: Concrete devices have available timeslots, which can be retrieved from its device service and booked timeslots, which can be retrieved from its booking service. The booked timeslots need to be removed from the available timeslots. The remaining timeslots may be booked.
- **Edge Instantiable Devices**: Edge instantiable devices are always available.
- **Cloud Instantiable Devices**: Cloud instantiable devices are currently also always available. In the future there may be an additional property called `maxInstances` to limit the amount of instances that are available at any given time.
- **Device Groups**: Device groups can be flattened to contain only the remaining three types of devices, which then need to be handled accordingly. The booking service needs to associate the reserved device of the group with the group itself.

If all given devices of an experiment are available for the given timeslot the booking will be created. 

## Locking a Booking

Before an experiment can be started the associated booking needs to be locked. The booking will then stop trying to find new devices for device groups if something should change. All devices contained in the booking when first locked will be considered essential for the booking. This means if any of them become unavailable the booking will be deleted. However new devices may be added to a locked booking. These will be considered optional. Optional devices may be removed from a booking.

## Handling Device Changes

The booking service should handle the deletion or changing availability of a device.

- **Deletion of a Device**
    - `group`: Try to find a new device contained in the group to replace the deleted device.
        - `success`: booking will be updated to use the new device.
        - `failure`: booking will be deleted.
    - `other`: The booking will be deleted.
- **Availability Changed**
    - check if the reservations associated with the device can still exist and delete reservations that are now impossible.
    - try to update affected bookings according to the rules when deleting a device.

## Booking an Experiment (with federated devices)

Federated devices cannot be directly reserved by the local booking service. Instead the local booking service needs to create a subbooking at the remote booking service. This subbooking needs to be associated with the corresponding devices.