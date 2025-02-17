import { expect, test } from "vitest";
import { Appointment } from "./appointment";
import { getFutureDate } from "../tests/utils/get-future-date";

test("create an appointment", () => {
  const startsAt = getFutureDate("2024-08-10");
  const endsAt = getFutureDate("2024-08-11");

  const appointment = new Appointment({
    customer: "Jhon Doe",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("Jhon Doe");
});

test("cannot create an appointment with end date before start date", () => {
  const startsAt = getFutureDate("2024-08-10");
  const endsAt = getFutureDate("2024-08-09");

  expect(() => {
    return new Appointment({
      customer: "Jhon Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appointment with start date before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: "Jhon Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
