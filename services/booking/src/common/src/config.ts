export function die(reason: string): never {
  console.error(reason);
  process.exit(1);
}

export const baseConfig = {
  BookingDSN:
    "mysql://test:test@localhost/test?supportBigNumbers=true&bigNumberStrings=true",
  ReservationDSN: "mysql://test:test@localhost/test",
  CallbackDSN: "mysql://test:test@localhost/test",
  OwnURL: "http://localhost",
  InstitutePrefix: ["http://localhost"],
  AmqpUrl: "amqp://localhost:5672/",
};
