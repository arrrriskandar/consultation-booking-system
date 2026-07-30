import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";

import app from "../src/app.js";
import prisma from "../src/config/prisma.js";

describe("Booking API", () => {
  it("should prevent double booking under concurrent requests", async () => {
    const bookingRequest = {
      slotId: 1,
      patientId: 1,
    };

    const [response1, response2] = await Promise.all([
      request(app).post("/api/bookings").send(bookingRequest),
      request(app).post("/api/bookings").send(bookingRequest),
    ]);

    const successResponses = [response1, response2].filter(
      (response) => response.status === 201,
    );

    const conflictResponses = [response1, response2].filter(
      (response) => response.status === 409,
    );

    expect(successResponses).to.have.lengthOf(1);
    expect(conflictResponses).to.have.lengthOf(1);

    expect(successResponses[0].body).to.include({
      slotId: 1,
      patientId: 1,
      status: "CONFIRMED",
    });

    expect(conflictResponses[0].body.message).to.equal(
      "Appointment slot is no longer available. Please choose a different slot.",
    );

    const bookings = await prisma.booking.findMany();

    expect(bookings).to.have.lengthOf(1);

    expect(bookings[0]).to.include({
      slotId: 1,
      patientId: 1,
      status: "CONFIRMED",
    });
  });
});
