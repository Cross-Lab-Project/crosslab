This is the Parameter service to use as a Crosslab SOA service. It
allows to transmit variouse numeric parameters / values between
different devices.

Parameter Producer
------------------

.. code:: python

   service = ParameterService__Producer(
       "position",
       [
           {"name": "x", "unit": "m", "minimum": -1.2, "maximum": 1.2},
           {"name": "y", "unit": "m", "minimum": -1.2, "maximum": 1.2},
           {"name": "z", "unit": "m", "minimum": 0, "maximum": 0.5},
       ],
   )
   deviceHandler.add_service(service)

When any parameter changes (or is initialized) the service inform the
service via:

.. code:: python

   await service.updateParameter("x", 0.5)

Parameter Consumer
==================

.. code:: python

   service = ParameterService__Consumer(
       "position",
       [
           {"name": "x", "unit": "m"},
           {"name": "y", "unit": "m"},
           {"name": "z", "unit": "m", "minimum": 0, "maximum": 1},
           {"name": "ANY", "unit": "ANY"},
       ],
   )

   deviceHandler.add_service(service)

The special name / unit “ANY” allows to receive any parameter. When a
new parameter gets connected / disconnect the service will emit the
following callback:

.. code:: python

   def parameterListChanged(event: ParameterListChangedEvent):
       print(event)
       # event.parameters is a list of all parameters

   service.on("parameterListChanged", parameterListChanged)

When a parameter changes the service will emit the following callback:

.. code:: python

   def parameterChanged(event: ParameterChangedEvent):
       print(event)
       # event.parameter is the changed parameter

   service.on("parameterChanged", parameterChanged)