cd ../../services/auth && npm install && docker build . -t crosslab/auth-service
cd ../../services/device && npm install && docker build . -t crosslab/device-service
cd ../../services/experiment && npm install && docker build . -t crosslab/experiment-service
cd ../../services/federation && npm install && docker build . -t crosslab/federation-service
cd ../../services/gateway && docker build . -t crosslab/gateway-service
cd ../../services/update && npm install && docker build . -t crosslab/update-service