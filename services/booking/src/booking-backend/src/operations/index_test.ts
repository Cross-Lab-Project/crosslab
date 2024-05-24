import { baseConfig } from '@crosslab/booking-service-common';
import {
    fakeServerConfig,
    getFakeInstitutePrefix,
    getFakeOwnURL,
    getSQLDNS,
    resetFakeServerVars,
    setupDummySql,
    startFakeServer,
    stopFakeServer,
    tearDownDummySql,
    getFakeRequest,
  } from '@crosslab/booking-service-test-common';
import * as mocha from 'mocha';

import { } from './index';
import {config} from '../config' 

mocha.describe('operations.ts', function () {
    this.timeout(10000);

    mocha.before(function () {
        // Config - use both global config and local config to ensure different application parts work with same config
        baseConfig.OwnURL = getFakeOwnURL();
        baseConfig.InstitutePrefix = getFakeInstitutePrefix();
        baseConfig.ReservationDSN = getSQLDNS();
    
        config.OwnURL = getFakeOwnURL();
        config.InstitutePrefix = getFakeInstitutePrefix();
        config.ReservationDSN = getSQLDNS();

        startFakeServer();
      });
    
      mocha.after(function () {
        stopFakeServer();
      });
    
      mocha.beforeEach(async function () {
        // Reset server status
        resetFakeServerVars();
    
        // Setup database
        await setupDummySql();
      });
    
      mocha.afterEach(async function () {
        await tearDownDummySql();
      });

      mocha.it('putBookingByIDLock no authorization', async function (){
        throw Error("Not implemented");
      });

      mocha.it('putBookingByIDLock lock success', async function (){
        throw Error("Not implemented");
      });

      mocha.it('putBookingByIDLock already locked', async function (){
        throw Error("Not implemented");
      });

      mocha.it('putBookingByIDLock wrong status', async function (){
        throw Error("Not implemented");
      });



      mocha.it('deleteBookingByIDLock no authorization', async function (){
        throw Error("Not implemented");
      });

      mocha.it('deleteBookingByIDLock unlock success', async function (){
        throw Error("Not implemented");
      });

      mocha.it('deleteBookingByIDLock already unlocked', async function (){
        throw Error("Not implemented");
      });

      mocha.it('deleteBookingByIDLock wrong status', async function (){
        throw Error("Not implemented");
      });
});
