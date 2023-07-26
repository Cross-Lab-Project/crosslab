The availability of a device is a list of timeslots during which a device can be used in an experiment. Currently the availability of a device is handled via the route `/devices/{device_id}/availability` which only allows `POST` requests. Such a `POST` request can contain an array of `AvailabilityRules` which are appended to the current list of the device. Afterwards the available timeslots of the device are calculated for 365 days. The availability of a device can currently only be retrieved for a concrete device via a `GET` request on the route `/devices/{device_id}` where `{device_id}` is the id of the concrete device.

This approach needs to be adapted because of its shortcomings:
- The calculated availability of a device which is sent on a `GET` request may become outdated since it is only updated when a new rule is added
- The transmission of the availability on each `GET` request of a concrete device seems unnecessary
- Only concrete devices have availability, but instantiable cloud devices could also have times of unavailability
- Rules cannot currently be removed (plan was to remove them when receiving the rule `{available: false}`)

One idea would be the introduction of further routes for the handling of the availability of devices:
- Add `GET` on route `/devices/{device_id}/availability` to view the current availability of a device, with query parameters for start and end to set a requested timeframe
  - if the query parameter `start` is not set, the current time will be used
  - if the query parameter `end` is not set, the current time plus a fixed offset (e.g. a week or 28 days) will be used
  - the query parameters `start` and `end` should conform to the `date-time` format with `end` being larger than `start`
- Add `DELETE` on route `/devices/{device_id}/availability` to delete all rules
- Remove availability from response to `GET` request on route `/devices/{device_id}`
- Add availability to instantiable devices (e.g. expected downtime)
- Calculate availability of a device group by merging availability of the contained devices

Further opinions and ideas on this topic are welcome, especially when considering possible requirements of the booking service.
