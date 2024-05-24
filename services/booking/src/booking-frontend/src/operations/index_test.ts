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

import { config } from '../config';
import { } from './index';

mocha.describe('operations.ts', function () {
    this.timeout(10000);

    mocha.before(function () {
        // Config
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

      mocha.it('postBooking authorization failed', async function (){
        throw Error("Not implemented");
      });

      mocha.it('postBooking single local device available', async function (){
        throw Error("Not implemented");
      });

      mocha.it('postBooking single local device not available', async function (){
        throw Error("Not implemented");
      });

      mocha.it('postBooking local group available', async function (){
        throw Error("Not implemented");
      });

      mocha.it('postBooking local group single device not available', async function (){
        throw Error("Not implemented");
      });

      mocha.it('postBooking local group all devices not available', async function (){
        throw Error("Not implemented");
      });

      mocha.it('postBooking local edge device', async function (){
        throw Error("Not implemented");
      });

      mocha.it('postBooking local instantiable device', async function (){
        throw Error("Not implemented");
      });



      mocha.it('getBookingByID authorization failed', async function (){
        throw Error("Not implemented");
      });

      mocha.it('getBookingByID success', async function (){
        throw Error("Not implemented");
      });

      mocha.it('getBookingByID booking not available', async function (){
        throw Error("Not implemented");
      });



      mocha.it('deleteBookingByID authorization failed', async function (){
        throw Error("Not implemented");
      });

      mocha.it('deleteBookingByID success', async function (){
        throw Error("Not implemented");
      });

      mocha.it('deleteBookingByID booking not available', async function (){
        throw Error("Not implemented");
      });



      mocha.it('patchBookingByID authorization failed', async function (){
        throw Error("Not implemented");
      });

      mocha.it('patchBookingByID success unlocked', async function (){
        throw Error("Not implemented");
      });

      mocha.it('patchBookingByID success locked', async function (){
        throw Error("Not implemented");
      });

      mocha.it('patchBookingByID booking not available', async function (){
        throw Error("Not implemented");
      });

      mocha.it('patchBookingByID wrong status unlocked', async function (){
        throw Error("Not implemented");
      });

      mocha.it('patchBookingByID wrong status locked', async function (){
        throw Error("Not implemented");
      });



      mocha.it('deleteBookingByIDDestroy authorization failed', async function (){
        throw Error("Not implemented");
      });

      mocha.it('deleteBookingByIDDestroy success', async function (){
        throw Error("Not implemented");
      });

      mocha.it('deleteBookingByIDDestroy booking not available', async function (){
        throw Error("Not implemented");
      });
});
