// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from "express";
import { getAll, create, get, remove, update } from "../data/events.js";
import { eventData } from '../data/index.js';
import { ObjectId } from "mongodb";
const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const events = await getAll();
      return res.json(events);
    }
    catch (e) {
      return res.status(404).send(e);
    }
  })
  .post(async (req, res) => {
    const body2 = req.body;
    try {
      const final = await create(body2.eventName, body2.description, body2.eventLocation, body2.contactEmail, body2.maxCapacity, body2.priceOfAdmission, body2.eventDate, body2.startTime, body2.endTime, body2.publicEvent);
      // if (!(body2.eventName) || !(body2.description) || !(body2.eventLocation) || !(body2.contactEmail) || !(body2.maxCapacity) || !(priceOfAdmission) || !(eventDate) || !(startTime) || !(endTime) || !(publicEvent)) {
      //   return res.status(400).send(e);
      // }
      return res.json(final);
    }
    catch (e) {
      return res.status(400).send(e);
    }
  });

router
  .route('/:eventId')
  .get(async (req, res) => {
    const eventId1 = req.params.eventId;
    try {
      ObjectId.isValid(eventId1);
    }
    catch (e) {
      return res.status(400).send(e);
    }

    try {
      const event1 = await get(eventId1);
      return res.json(event1);
    }
    catch (e) {
      return res.status(404).send(e);
    }
  })
  .delete(async (req, res) => {
    const eventId1 = req.params.eventId;
    try {
      ObjectId.isValid(eventId1);
    }
    catch (e) {
      return res.status(400).send(e);
    }
    try {
      const event1 = await remove(eventId1);
      return res.json(event1);
    }
    catch (e) {
      return res.status(404).send(e);
    }
  })
  .put(async (req, res) => {
    const body2 = req.body;
    const eventId1 = req.params.eventId;
    try {
      ObjectId.isValid(eventId1);
    }
    catch (e) {
      return res.status(400).send(e);
    }
    try {
      const event1 = await eventData.update(eventId1, body2.eventName, body2.description, body2.eventLocation, body2.contactEmail, body2.maxCapacity, body2.priceOfAdmission, body2.eventDate, body2.startTime, body2.endTime, body2.publicEvent);
      return res.json(event1);
    }
    catch (e) {
      return res.status(400).send(e);
    }
  });

export default router;